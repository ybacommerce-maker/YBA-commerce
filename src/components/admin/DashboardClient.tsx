"use client";

import Link from "next/link";
import {
  Wallet,
  TrendingDown,
  PiggyBank,
  Landmark,
  Receipt,
  ShoppingCart,
  Boxes,
  Users,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import StatCard from "./StatCard";
import {
  ReceitaDespesaChart,
  ReceitaAreaChart,
  LucroChart,
  DespesasPieChart,
  TopProdutosChart,
  StatusDonut,
} from "./Charts";
import { formatBRL } from "@/lib/format";
import type { DashboardStats } from "@/lib/admin";

const STATUS_COR: Record<string, string> = {
  pendente: "bg-mustard/20 text-mustard-600",
  pago: "bg-olive/15 text-olive-600",
  enviado: "bg-blue-100 text-blue-700",
  entregue: "bg-olive/25 text-olive-600",
  cancelado: "bg-brick/10 text-brick",
};

export interface RecentOrder {
  id: string;
  customer_name: string;
  city: string;
  total: number;
  status: string;
}

export default function DashboardClient({
  stats,
  recentOrders,
  produtosAtivos,
  produtosTotal,
  clientes,
  usuariosTotal,
  isDemo,
}: {
  stats: DashboardStats;
  recentOrders: RecentOrder[];
  produtosAtivos: number;
  produtosTotal: number;
  clientes: number;
  usuariosTotal: number;
  isDemo: boolean;
}) {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="display text-3xl font-bold text-earth">Dashboard</h1>
          <p className="text-earth/60">Visão geral do seu negócio 🌱</p>
        </div>
        {isDemo && (
          <span className="rounded-full bg-mustard/20 px-3 py-1 text-xs font-semibold text-mustard-600">
            Modo demonstração (dados fictícios)
          </span>
        )}
      </div>

      {/* Cartoes principais (com contagem animada) */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Receita" count={stats.receita} format="brl" hint={`${stats.pedidosPagos} pedidos pagos`} accent="olive" icon={Wallet} trend={12} />
        <StatCard label="Despesas" count={stats.despesasTotal} format="brl" accent="brick" icon={TrendingDown} trend={-4} />
        <StatCard label="Lucro" count={stats.lucro} format="brl" hint={`Margem ${stats.margemLucro.toFixed(1)}%`} accent="mustard" icon={PiggyBank} trend={8} />
        <StatCard label="Capital atual" count={stats.capital} format="brl" hint="Capital inicial + lucro" accent="earth" icon={Landmark} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Ticket médio" count={stats.ticketMedio} format="brl" accent="olive" icon={Receipt} />
        <StatCard label="Total de pedidos" count={stats.totalPedidos} accent="earth" icon={ShoppingCart} />
        <StatCard label="Produtos ativos" count={produtosAtivos} hint={`${produtosTotal} cadastrados`} accent="olive" icon={Boxes} />
        <StatCard label="Clientes" count={clientes} hint={`${usuariosTotal} usuários no total`} accent="mustard" icon={Users} />
      </div>

      {/* Graficos principais */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <h2 className="mb-4 font-bold text-earth">Receita x Despesas por mês</h2>
          <ReceitaDespesaChart data={stats.vendasPorMes} />
        </div>
        <div className="card p-5">
          <h2 className="mb-4 font-bold text-earth">Status dos pedidos</h2>
          <StatusDonut data={stats.statusPedidos} />
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-4 font-bold text-earth">Evolução do lucro</h2>
          <LucroChart data={stats.vendasPorMes} />
        </div>
        <div className="card p-5">
          <h2 className="mb-4 font-bold text-earth">Tendência de receita</h2>
          <ReceitaAreaChart data={stats.vendasPorMes} />
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-4 font-bold text-earth">Produtos mais vendidos</h2>
          <TopProdutosChart data={stats.topProdutos} />
        </div>
        <div className="card p-5">
          <h2 className="mb-4 font-bold text-earth">Despesas por categoria</h2>
          <DespesasPieChart data={stats.vendasPorCategoria} />
        </div>
      </div>

      {/* Estoque baixo + ultimos pedidos */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-bold text-earth">
              <AlertTriangle className="h-4 w-4 text-mustard-600" />
              Estoque baixo
            </h2>
            <Link
              href="/admin/produtos"
              className="text-xs font-semibold text-brick hover:underline"
            >
              Gerenciar
            </Link>
          </div>
          {stats.estoqueBaixo.length === 0 ? (
            <p className="py-8 text-center text-sm text-earth/50">
              Nenhum produto com estoque baixo. 👍
            </p>
          ) : (
            <div className="space-y-2">
              {stats.estoqueBaixo.slice(0, 6).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-xl bg-cream-50 px-3 py-2"
                >
                  <span className="text-sm font-medium text-earth">{p.name}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                      p.stock <= 5
                        ? "bg-brick/10 text-brick"
                        : "bg-mustard/20 text-mustard-600"
                    }`}
                  >
                    {p.stock} un
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-earth">Últimos pedidos</h2>
            <Link
              href="/admin/vendas"
              className="flex items-center gap-1 text-xs font-semibold text-brick hover:underline"
            >
              Ver todos <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {recentOrders.map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between rounded-xl bg-cream-50 px-3 py-2 text-sm"
              >
                <div>
                  <p className="font-semibold text-earth">{o.customer_name}</p>
                  <p className="text-xs text-earth/50">{o.city}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${
                      STATUS_COR[o.status] || "bg-earth/10 text-earth"
                    }`}
                  >
                    {o.status}
                  </span>
                  <p className="w-20 text-right font-bold text-brick">
                    {formatBRL(o.total)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
