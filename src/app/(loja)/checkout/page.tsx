"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatBRL } from "@/lib/format";
import { calcularFrete } from "@/lib/frete";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const frete = calcularFrete(subtotal);
  const total = subtotal + frete;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    address: "",
    city: "Salvador",
    payment: "PIX",
  });
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<null | {
    ok: boolean;
    message: string;
    pixCode?: string;
    invoiceUrl?: string;
  }>(null);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function finalizar(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResultado(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: items.map((i) => ({
            id: i.product.id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
          })),
          shipping: frete,
          total,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao processar pedido");
      setResultado({
        ok: true,
        message: data.message,
        pixCode: data.pixCode,
        invoiceUrl: data.invoiceUrl,
      });
      clear();
    } catch (err: any) {
      setResultado({ ok: false, message: err.message });
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0 && !resultado) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="display text-2xl font-bold text-earth">
          Seu carrinho está vazio
        </h1>
        <a href="/produtos" className="btn-brick mt-6">
          Ver produtos
        </a>
      </div>
    );
  }

  if (resultado?.ok) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-olive text-3xl text-cream">
          ✓
        </div>
        <h1 className="display mt-4 text-3xl font-bold text-earth">
          Pedido recebido!
        </h1>
        <p className="mt-2 text-earth/70">{resultado.message}</p>

        {resultado.pixCode && (
          <div className="card mt-6 p-5 text-left">
            <p className="text-sm font-semibold text-earth">
              Copie o código PIX (copia e cola):
            </p>
            <textarea
              readOnly
              value={resultado.pixCode}
              className="mt-2 w-full rounded-md border border-cream-200 bg-cream-50 p-2 text-xs"
              rows={3}
            />
          </div>
        )}
        {resultado.invoiceUrl && (
          <a
            href={resultado.invoiceUrl}
            target="_blank"
            className="btn-brick mt-6"
          >
            Abrir fatura para pagar
          </a>
        )}
        <div>
          <a href="/produtos" className="btn-outline mt-6">
            Voltar à loja
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="display mb-8 text-3xl font-bold text-earth">Checkout</h1>
      <form onSubmit={finalizar} className="grid gap-8 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          <div className="card p-6">
            <h2 className="mb-4 font-bold text-earth">Seus dados</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nome completo" required value={form.name} onChange={(v) => update("name", v)} />
              <Field label="E-mail" type="email" required value={form.email} onChange={(v) => update("email", v)} />
              <Field label="WhatsApp / Telefone" required value={form.phone} onChange={(v) => update("phone", v)} placeholder="71999990000" />
              <Field label="CPF" value={form.cpf} onChange={(v) => update("cpf", v)} placeholder="000.000.000-00" />
            </div>
          </div>

          <div className="card p-6">
            <h2 className="mb-4 font-bold text-earth">Entrega</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Endereço completo" required value={form.address} onChange={(v) => update("address", v)} placeholder="Rua, número, bairro" />
              <Field label="Cidade" required value={form.city} onChange={(v) => update("city", v)} />
            </div>
          </div>

          <div className="card p-6">
            <h2 className="mb-4 font-bold text-earth">Pagamento</h2>
            <div className="flex flex-wrap gap-3">
              {["PIX", "BOLETO", "CREDIT_CARD"].map((p) => (
                <label
                  key={p}
                  className={`cursor-pointer rounded-md border-2 px-4 py-2 text-sm font-semibold ${
                    form.payment === p
                      ? "border-brick bg-brick text-cream"
                      : "border-cream-200 bg-white text-earth"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={p}
                    checked={form.payment === p}
                    onChange={(e) => update("payment", e.target.value)}
                    className="hidden"
                  />
                  {p === "PIX" ? "PIX" : p === "BOLETO" ? "Boleto" : "Cartão"}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Resumo */}
        <div className="card h-fit p-6">
          <h2 className="mb-4 font-bold text-earth">Seu pedido</h2>
          <div className="space-y-2 text-sm">
            {items.map((i) => (
              <div key={i.product.id} className="flex justify-between">
                <span className="text-earth/70">
                  {i.quantity}× {i.product.name}
                </span>
                <span>{formatBRL(i.product.price * i.quantity)}</span>
              </div>
            ))}
            <div className="my-3 border-t border-cream-200" />
            <div className="flex justify-between">
              <span className="text-earth/70">Subtotal</span>
              <span>{formatBRL(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-earth/70">Frete</span>
              <span>{frete === 0 ? "Grátis" : formatBRL(frete)}</span>
            </div>
            <div className="mt-2 flex justify-between text-lg font-bold text-brick">
              <span>Total</span>
              <span>{formatBRL(total)}</span>
            </div>
          </div>

          {resultado && !resultado.ok && (
            <p className="mt-4 rounded-md bg-brick-50 p-2 text-sm text-brick">
              {resultado.message}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn-brick mt-6 w-full">
            {loading ? "Processando..." : "Confirmar pedido"}
          </button>
          <p className="mt-3 text-center text-xs text-earth/50">
            Ambiente de testes — nenhuma cobrança real é feita.
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-earth">
        {label} {required && <span className="text-brick">*</span>}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-cream-200 bg-white px-3 py-2 text-sm outline-none focus:border-brick"
      />
    </label>
  );
}
