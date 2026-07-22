"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Wallet,
  Clock,
  Receipt,
  Eye,
  X,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import { Order, OrderStatus, OrderItem } from "@/lib/types";
import { formatBRL, formatDate } from "@/lib/format";
import StatCard from "./StatCard";

const STATUSES: OrderStatus[] = [
  "pendente",
  "pago",
  "enviado",
  "entregue",
  "cancelado",
];

const STATUS_COR: Record<string, string> = {
  pendente: "bg-mustard/20 text-mustard-600",
  pago: "bg-olive/15 text-olive-600",
  enviado: "bg-blue-100 text-blue-700",
  entregue: "bg-olive/25 text-olive-600",
  cancelado: "bg-brick/10 text-brick",
};

export default function VendasAdmin({
  initial,
  items,
}: {
  initial: Order[];
  items: OrderItem[];
}) {
  const [orders, setOrders] = useState<Order[]>(initial);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<OrderStatus | "todos">("todos");
  const [detalhe, setDetalhe] = useState<Order | null>(null);

  const filtrados = useMemo(
    () =>
      orders.filter((o) => {
        const okBusca =
          o.customer_name.toLowerCase().includes(busca.toLowerCase()) ||
          o.id.toLowerCase().includes(busca.toLowerCase());
        const okFiltro = filtro === "todos" || o.status === filtro;
        return okBusca && okFiltro;
      }),
    [orders, busca, filtro]
  );

  const receita = orders
    .filter((o) => ["pago", "enviado", "entregue"].includes(o.status))
    .reduce((s, o) => s + o.total, 0);
  const pendentes = orders.filter((o) => o.status === "pendente").length;

  async function mudarStatus(o: Order, status: OrderStatus) {
    const anterior = o.status;
    // atualiza otimista
    setOrders((prev) =>
      prev.map((x) => (x.id === o.id ? { ...x, status } : x))
    );
    const res = await fetch("/api/admin/pedidos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: o.id, status }),
    });
    if (!res.ok) {
      setOrders((prev) =>
        prev.map((x) => (x.id === o.id ? { ...x, status: anterior } : x))
      );
      toast.error("Não foi possível atualizar o status");
    } else {
      toast.success(`Pedido #${o.id} → ${status}`);
    }
  }

  const itensDoPedido = (id: string) =>
    items.filter((i) => i.order_id === id);

  return (
    <div>
      <h1 className="display mb-1 text-3xl font-bold text-earth">Pedidos</h1>
      <p className="mb-6 text-earth/60">
        Acompanhe e atualize o status de cada pedido
      </p>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total de pedidos" count={orders.length} accent="earth" icon={ShoppingCart} />
        <StatCard label="Receita confirmada" count={receita} format="brl" accent="olive" icon={Wallet} />
        <StatCard label="Aguardando pagamento" count={pendentes} accent="mustard" icon={Clock} />
        <StatCard label="Ticket médio" count={orders.length ? receita / orders.length : 0} format="brl" accent="brick" icon={Receipt} />
      </div>

      {/* filtros */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-earth/40" />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por cliente ou #pedido..."
            className="inp pl-9"
          />
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {(["todos", ...STATUSES] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f as OrderStatus | "todos")}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition ${
                filtro === f
                  ? "bg-brick text-cream"
                  : "bg-white text-earth hover:bg-cream-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-cream-200 text-earth/60">
            <tr>
              <th className="p-3">Pedido</th>
              <th className="p-3">Cliente</th>
              <th className="p-3">Cidade</th>
              <th className="p-3">Data</th>
              <th className="p-3">Pagamento</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((o) => (
              <tr
                key={o.id}
                className="border-b border-cream-100 hover:bg-cream-50"
              >
                <td className="p-3 font-mono text-xs text-earth/60">#{o.id}</td>
                <td className="p-3 font-medium text-earth">{o.customer_name}</td>
                <td className="p-3 text-earth/70">{o.city}</td>
                <td className="p-3 text-earth/70">{formatDate(o.created_at)}</td>
                <td className="p-3 text-earth/70">{o.payment_method}</td>
                <td className="p-3 font-semibold text-brick">
                  {formatBRL(o.total)}
                </td>
                <td className="p-3">
                  <select
                    value={o.status}
                    onChange={(e) =>
                      mudarStatus(o, e.target.value as OrderStatus)
                    }
                    className={`cursor-pointer rounded-full border-0 px-2 py-1 text-xs font-semibold capitalize outline-none ring-1 ring-inset ring-black/5 ${
                      STATUS_COR[o.status] || "bg-earth/10 text-earth"
                    }`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s} className="bg-white text-earth">
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => setDetalhe(o)}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-brick transition hover:bg-brick/10"
                  >
                    <Eye className="h-4 w-4" /> Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtrados.length === 0 && (
          <p className="py-10 text-center text-sm text-earth/50">
            Nenhum pedido encontrado.
          </p>
        )}
      </div>

      {/* modal de detalhe */}
      <AnimatePresence>
        {detalhe && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-earth/40 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDetalhe(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-lift"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-earth">
                    Pedido #{detalhe.id}
                  </h2>
                  <p className="text-xs text-earth/50">
                    {formatDate(detalhe.created_at)}
                  </p>
                </div>
                <button
                  onClick={() => setDetalhe(null)}
                  className="rounded-full p-1.5 text-earth/50 hover:bg-earth/5"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="rounded-2xl bg-cream-50 p-4 text-sm">
                <p className="font-semibold text-earth">
                  {detalhe.customer_name}
                </p>
                <div className="mt-2 space-y-1 text-earth/70">
                  <p className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" /> {detalhe.customer_email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" /> {detalhe.customer_phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" /> {detalhe.address},{" "}
                    {detalhe.city}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-2 text-sm font-semibold text-earth">Itens</p>
                {itensDoPedido(detalhe.id).length === 0 ? (
                  <p className="rounded-xl bg-cream-50 p-3 text-sm text-earth/50">
                    Sem detalhamento de itens para este pedido.
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {itensDoPedido(detalhe.id).map((it, i) => (
                      <div
                        key={i}
                        className="flex justify-between rounded-xl bg-cream-50 px-3 py-2 text-sm"
                      >
                        <span className="text-earth/80">
                          {it.quantity}× {it.product_name}
                        </span>
                        <span className="font-semibold text-earth">
                          {formatBRL(it.quantity * it.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 space-y-1 border-t border-cream-200 pt-4 text-sm">
                <div className="flex justify-between text-earth/70">
                  <span>Frete</span>
                  <span>{formatBRL(detalhe.shipping)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-brick">
                  <span>Total</span>
                  <span>{formatBRL(detalhe.total)}</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-2 text-sm font-semibold text-earth">
                  Atualizar status
                </p>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        mudarStatus(detalhe, s);
                        setDetalhe({ ...detalhe, status: s });
                      }}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition ${
                        detalhe.status === s
                          ? "bg-brick text-cream"
                          : "bg-cream-100 text-earth hover:bg-cream-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
