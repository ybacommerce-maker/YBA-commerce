"use client";

import { useMemo, useState } from "react";
import { formatBRL } from "@/lib/format";
import StatCard from "@/components/admin/StatCard";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function SimuladorPage() {
  const [ticket, setTicket] = useState(65); // ticket medio (R$)
  const [margem, setMargem] = useState(55); // margem bruta (%)
  const [pedidosDia, setPedidosDia] = useState(8);
  const [dias, setDias] = useState(26);
  const [despesasFixas, setDespesasFixas] = useState(2500);
  const [investimentoMkt, setInvestimentoMkt] = useState(500);

  const r = useMemo(() => {
    const pedidosMes = pedidosDia * dias;
    const receita = pedidosMes * ticket;
    const custoProdutos = receita * (1 - margem / 100);
    const despesas = despesasFixas + investimentoMkt;
    const lucro = receita - custoProdutos - despesas;
    const margemLiquida = receita ? (lucro / receita) * 100 : 0;
    // Ponto de equilibrio (quantos pedidos para lucro zero)
    const lucroPorPedido = ticket * (margem / 100);
    const pedidosEquilibrio = lucroPorPedido
      ? Math.ceil(despesas / lucroPorPedido)
      : 0;

    // Projecao de 6 meses com crescimento de 8% ao mes
    const projecao = Array.from({ length: 6 }, (_, i) => {
      const fator = Math.pow(1.08, i);
      const rec = receita * fator;
      const luc = rec - rec * (1 - margem / 100) - despesas;
      return {
        mes: `Mês ${i + 1}`,
        receita: Math.round(rec),
        lucro: Math.round(luc),
      };
    });

    return {
      pedidosMes,
      receita,
      custoProdutos,
      despesas,
      lucro,
      margemLiquida,
      pedidosEquilibrio,
      projecao,
    };
  }, [ticket, margem, pedidosDia, dias, despesasFixas, investimentoMkt]);

  return (
    <div>
      <h1 className="display mb-1 text-3xl font-bold text-earth">
        Simulador de vendas
      </h1>
      <p className="mb-6 text-earth/60">
        Ajuste as premissas e veja a projeção do negócio. Ótimo para planejar e
        apresentar para investidores.
      </p>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Controles */}
        <div className="card h-fit p-5">
          <h2 className="mb-4 font-bold text-earth">Premissas</h2>
          <Slider label="Ticket médio" value={ticket} set={setTicket} min={20} max={200} step={5} format={(v) => formatBRL(v)} />
          <Slider label="Margem bruta" value={margem} set={setMargem} min={10} max={80} step={1} format={(v) => `${v}%`} />
          <Slider label="Pedidos por dia" value={pedidosDia} set={setPedidosDia} min={1} max={60} step={1} format={(v) => String(v)} />
          <Slider label="Dias de venda/mês" value={dias} set={setDias} min={10} max={31} step={1} format={(v) => String(v)} />
          <Slider label="Despesas fixas/mês" value={despesasFixas} set={setDespesasFixas} min={0} max={15000} step={100} format={(v) => formatBRL(v)} />
          <Slider label="Investimento marketing" value={investimentoMkt} set={setInvestimentoMkt} min={0} max={5000} step={50} format={(v) => formatBRL(v)} />
        </div>

        {/* Resultados */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            <StatCard label="Pedidos/mês" value={String(r.pedidosMes)} accent="earth" />
            <StatCard label="Receita/mês" value={formatBRL(r.receita)} accent="olive" />
            <StatCard label="Lucro/mês" value={formatBRL(r.lucro)} hint={`Margem líquida ${r.margemLiquida.toFixed(1)}%`} accent={r.lucro >= 0 ? "mustard" : "brick"} />
            <StatCard label="Custo dos produtos" value={formatBRL(r.custoProdutos)} accent="brick" />
            <StatCard label="Despesas totais" value={formatBRL(r.despesas)} accent="brick" />
            <StatCard label="Ponto de equilíbrio" value={`${r.pedidosEquilibrio} pedidos`} hint="para lucro zero" accent="earth" />
          </div>

          <div className="card mt-4 p-5">
            <h2 className="mb-4 font-bold text-earth">
              Projeção 6 meses (crescimento 8%/mês)
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={r.projecao}>
                <defs>
                  <linearGradient id="gRec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2a78d6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2a78d6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gLuc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8A2417" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8A2417" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EADCB8" vertical={false} />
                <XAxis dataKey="mes" tick={{ fill: "#3E2C22", fontSize: 12 }} />
                <YAxis tick={{ fill: "#3E2C22", fontSize: 12 }} />
                <Tooltip formatter={(v: number) => formatBRL(v)} contentStyle={{ borderRadius: 8, border: "1px solid #EADCB8" }} />
                <Area type="monotone" dataKey="receita" name="Receita" stroke="#2a78d6" strokeWidth={2} fill="url(#gRec)" />
                <Area type="monotone" dataKey="lucro" name="Lucro" stroke="#8A2417" strokeWidth={2} fill="url(#gLuc)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  set,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: number;
  set: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}) {
  return (
    <div className="mb-4">
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-medium text-earth">{label}</span>
        <span className="font-bold text-brick">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        className="w-full accent-brick"
      />
    </div>
  );
}
