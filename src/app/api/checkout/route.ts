import { NextRequest, NextResponse } from "next/server";
import {
  isAsaasConfigured,
  createCustomer,
  createPayment,
  getPixQrCode,
} from "@/lib/asaas";
import { createAdminClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/db";

// POST /api/checkout
// Recebe o pedido do checkout, salva no banco (se configurado) e
// cria a cobranca no Asaas (se configurado).
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, items, shipping, total } = body;

    if (!customer?.name || !customer?.email || !items?.length) {
      return NextResponse.json(
        { error: "Dados do pedido incompletos." },
        { status: 400 }
      );
    }

    // 1) Salva o pedido no Supabase (se estiver configurado)
    let orderId = `demo-${Date.now()}`;
    if (isSupabaseConfigured()) {
      try {
        const supabase = createAdminClient();
        const { data, error } = await supabase
          .from("orders")
          .insert({
            customer_name: customer.name,
            customer_email: customer.email,
            customer_phone: customer.phone,
            address: customer.address,
            city: customer.city,
            total,
            shipping,
            status: "pendente",
            payment_method: customer.payment,
          })
          .select("id")
          .single();
        if (!error && data) orderId = data.id;
      } catch (e) {
        console.error("Erro ao salvar pedido:", e);
      }
    }

    // 2) Se o Asaas NAO estiver configurado, devolve sucesso "de mentira"
    //    para a demo continuar funcionando.
    if (!isAsaasConfigured()) {
      return NextResponse.json({
        ok: true,
        orderId,
        message:
          "Pedido registrado (modo demonstração — Asaas ainda não configurado). Assim que você colocar a chave do Asaas, a cobrança real é gerada aqui.",
      });
    }

    // 3) Cria/acha o cliente no Asaas
    const asaasCustomer = await createCustomer({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      cpfCnpj: customer.cpf,
    });

    // 4) Cria a cobranca
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 3);
    const payment = await createPayment({
      customerId: asaasCustomer.id,
      value: Number(total.toFixed(2)),
      billingType: customer.payment,
      description: `Pedido YBÁ #${orderId}`,
      dueDate: dueDate.toISOString().slice(0, 10),
    });

    // 5) Se for PIX, busca o codigo copia-e-cola
    let pixCode: string | undefined;
    if (customer.payment === "PIX") {
      try {
        const pix = await getPixQrCode(payment.id);
        pixCode = pix.payload;
      } catch {}
    }

    return NextResponse.json({
      ok: true,
      orderId,
      paymentId: payment.id,
      invoiceUrl: payment.invoiceUrl,
      pixCode,
      message:
        customer.payment === "PIX"
          ? "Use o código PIX abaixo para pagar. Confirmação automática!"
          : "Cobrança criada! Abra a fatura para concluir o pagamento.",
    });
  } catch (err: any) {
    console.error("Erro no checkout:", err);
    return NextResponse.json(
      { error: err.message || "Erro ao processar o pedido." },
      { status: 500 }
    );
  }
}
