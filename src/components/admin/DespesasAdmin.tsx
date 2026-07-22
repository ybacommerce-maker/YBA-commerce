"use client";

import { useState } from "react";
import { Plus, Trash2, Wallet } from "lucide-react";
import { toast } from "sonner";
import { Expense } from "@/lib/types";
import { formatBRL, formatDate } from "@/lib/format";
import StatCard from "./StatCard";

const CATEGORIAS = [
  "Insumos",
  "Logística",
  "Embalagem",
  "Compras",
  "Marketing",
  "Salários",
  "Outros",
];

export default function DespesasAdmin({ initial }: { initial: Expense[] }) {
  const [expenses, setExpenses] = useState<Expense[]>(initial);
  const [form, setForm] = useState({
    description: "",
    category: "Insumos",
    amount: "",
    date: "",
  });
  const [salvando, setSalvando] = useState(false);

  const total = expenses.reduce((s, e) => s + e.amount, 0);

  async function adicionar(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    const payload = {
      description: form.description,
      category: form.category,
      amount: Number(form.amount),
      date: form.date || new Date().toISOString().slice(0, 10),
    };
    const res = await fetch("/api/admin/despesas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setSalvando(false);
    if (res.ok) {
      setExpenses((prev) => [data.expense, ...prev]);
      setForm({ description: "", category: "Insumos", amount: "", date: "" });
      toast.success("Despesa adicionada");
    } else {
      toast.error(data.error || "Erro ao salvar");
    }
  }

  async function excluir(exp: Expense) {
    if (!confirm("Excluir esta despesa?")) return;
    const res = await fetch("/api/admin/despesas", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: exp.id }),
    });
    if (res.ok) {
      setExpenses((prev) => prev.filter((x) => x.id !== exp.id));
      toast.success("Despesa removida");
    }
  }

  return (
    <div>
      <h1 className="display mb-1 text-3xl font-bold text-earth">Despesas</h1>
      <p className="mb-6 text-earth/60">Controle os gastos do negócio</p>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard label="Total de despesas" count={total} format="brl" accent="brick" icon={Wallet} />
        <StatCard label="Lançamentos" count={expenses.length} accent="earth" />
        <StatCard
          label="Média por lançamento"
          count={expenses.length ? total / expenses.length : 0}
          format="brl"
          accent="mustard"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Formulario */}
        <form onSubmit={adicionar} className="card h-fit p-5">
          <h2 className="mb-4 font-bold text-earth">Nova despesa</h2>
          <label className="mb-1 block text-sm font-medium">Descrição</label>
          <input
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="mb-3 w-full rounded-md border border-cream-200 px-3 py-2 text-sm outline-none focus:border-brick"
          />
          <label className="mb-1 block text-sm font-medium">Categoria</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="mb-3 w-full rounded-md border border-cream-200 px-3 py-2 text-sm outline-none focus:border-brick"
          >
            {CATEGORIAS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <label className="mb-1 block text-sm font-medium">Valor (R$)</label>
          <input
            required
            type="number"
            step="0.01"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="mb-3 w-full rounded-md border border-cream-200 px-3 py-2 text-sm outline-none focus:border-brick"
          />
          <label className="mb-1 block text-sm font-medium">Data</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="mb-4 w-full rounded-md border border-cream-200 px-3 py-2 text-sm outline-none focus:border-brick"
          />
          <button disabled={salvando} className="btn-brick w-full">
            <Plus className="h-4 w-4" />
            {salvando ? "Salvando..." : "Adicionar despesa"}
          </button>
        </form>

        {/* Lista */}
        <div className="card overflow-x-auto lg:col-span-2">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-cream-200 text-earth/60">
              <tr>
                <th className="p-3">Descrição</th>
                <th className="p-3">Categoria</th>
                <th className="p-3">Data</th>
                <th className="p-3">Valor</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((e) => (
                <tr key={e.id} className="border-b border-cream-100 hover:bg-cream-50">
                  <td className="p-3 font-medium text-earth">{e.description}</td>
                  <td className="p-3 text-earth/70">{e.category}</td>
                  <td className="p-3 text-earth/70">{formatDate(e.date)}</td>
                  <td className="p-3 font-semibold text-brick">{formatBRL(e.amount)}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => excluir(e)}
                      className="rounded-lg p-1.5 text-earth/50 transition hover:bg-brick/10 hover:text-brick"
                      aria-label="Excluir"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
