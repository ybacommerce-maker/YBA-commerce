"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { CHART } from "@/lib/chart";
import { formatBRL } from "@/lib/format";

const tooltipStyle = {
  backgroundColor: "#fff",
  border: "1px solid #EADCB8",
  borderRadius: 8,
  fontSize: 13,
};

// Receita x Despesas por mes (barras)
export function ReceitaDespesaChart({
  data,
}: {
  data: { mes: string; receita: number; despesas: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} vertical={false} />
        <XAxis dataKey="mes" tick={{ fill: CHART.text, fontSize: 12 }} />
        <YAxis tick={{ fill: CHART.text, fontSize: 12 }} />
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(v: number) => formatBRL(v)}
        />
        <Legend />
        <Bar dataKey="receita" name="Receita" fill={CHART.series[0]} radius={[4, 4, 0, 0]} />
        <Bar dataKey="despesas" name="Despesas" fill={CHART.series[1]} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Evolucao do lucro (linha)
export function LucroChart({
  data,
}: {
  data: { mes: string; receita: number; despesas: number }[];
}) {
  const comLucro = data.map((d) => ({
    mes: d.mes,
    lucro: d.receita - d.despesas,
  }));
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={comLucro}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} vertical={false} />
        <XAxis dataKey="mes" tick={{ fill: CHART.text, fontSize: 12 }} />
        <YAxis tick={{ fill: CHART.text, fontSize: 12 }} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => formatBRL(v)} />
        <Line
          type="monotone"
          dataKey="lucro"
          name="Lucro"
          stroke={CHART.brick}
          strokeWidth={2}
          dot={{ r: 4, fill: CHART.brick }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// Despesas por categoria (pizza)
export function DespesasPieChart({
  data,
}: {
  data: { categoria: string; valor: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="valor"
          nameKey="categoria"
          cx="50%"
          cy="50%"
          outerRadius={90}
          label={(e) => e.categoria}
        >
          {data.map((_, i) => (
            <Cell
              key={i}
              fill={CHART.series[i % CHART.series.length]}
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => formatBRL(v)} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

// Receita por mes (area com gradiente) — visual de "tendencia"
export function ReceitaAreaChart({
  data,
}: {
  data: { mes: string; receita: number; despesas: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="areaReceita" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={CHART.olive} stopOpacity={0.45} />
            <stop offset="95%" stopColor={CHART.olive} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} vertical={false} />
        <XAxis dataKey="mes" tick={{ fill: CHART.text, fontSize: 12 }} />
        <YAxis tick={{ fill: CHART.text, fontSize: 12 }} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => formatBRL(v)} />
        <Area
          type="monotone"
          dataKey="receita"
          name="Receita"
          stroke={CHART.olive}
          strokeWidth={2.5}
          fill="url(#areaReceita)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// Produtos mais vendidos (barras horizontais)
export function TopProdutosChart({
  data,
}: {
  data: { nome: string; qtd: number; receita: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} horizontal={false} />
        <XAxis type="number" tick={{ fill: CHART.text, fontSize: 12 }} />
        <YAxis
          type="category"
          dataKey="nome"
          width={120}
          tick={{ fill: CHART.text, fontSize: 11 }}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(v: number, n) =>
            n === "receita" ? formatBRL(v) : `${v} un`
          }
        />
        <Bar dataKey="qtd" name="Unidades" radius={[0, 6, 6, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={CHART.series[i % CHART.series.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// Distribuicao de status dos pedidos (rosca / donut)
const STATUS_CORES: Record<string, string> = {
  pendente: "#eda100",
  pago: "#1baf7a",
  enviado: "#2a78d6",
  entregue: "#008300",
  cancelado: "#8A2417",
};
export function StatusDonut({
  data,
}: {
  data: { status: string; qtd: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="qtd"
          nameKey="status"
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={3}
        >
          {data.map((d, i) => (
            <Cell
              key={i}
              fill={STATUS_CORES[d.status] || CHART.series[i % CHART.series.length]}
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend
          formatter={(value) => (
            <span className="capitalize text-earth/80">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
