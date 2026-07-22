import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/db";

// POST /api/webhook/asaas
// O Asaas chama esta URL automaticamente quando um pagamento muda de status
// (ex: quando o PIX e pago). Aqui atualizamos o pedido para "pago".
//
// Configure no painel do Asaas em: Integracoes > Notificacoes (Webhooks)
// URL: https://SEU-SITE.vercel.app/api/webhook/asaas
export async function POST(req: NextRequest) {
  try {
    const event = await req.json();
    const tipo = event?.event; // ex: PAYMENT_RECEIVED, PAYMENT_CONFIRMED
    const payment = event?.payment;

    console.log("[Asaas webhook]", tipo, payment?.id);

    const pagos = ["PAYMENT_RECEIVED", "PAYMENT_CONFIRMED"];
    if (isSupabaseConfigured() && pagos.includes(tipo) && payment?.description) {
      // Extrai o id do pedido da descricao "Pedido YBÁ #<id>"
      const match = String(payment.description).match(/#(\S+)/);
      const orderId = match?.[1];
      if (orderId) {
        const supabase = createAdminClient();
        await supabase
          .from("orders")
          .update({ status: "pago" })
          .eq("id", orderId);
      }
    }

    // Sempre responda 200 rapido, senao o Asaas fica reenviando.
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Erro no webhook:", err);
    return NextResponse.json({ received: true });
  }
}
