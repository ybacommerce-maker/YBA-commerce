"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Star,
  X,
  Package,
  Boxes,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { Product, Category } from "@/lib/types";
import { formatBRL } from "@/lib/format";
import StatCard from "./StatCard";

const CATEGORIAS: Category[] = [
  "verduras",
  "legumes",
  "frutas",
  "temperos",
  "graos",
  "cestas",
];

const VAZIO: Partial<Product> = {
  name: "",
  description: "",
  price: 0,
  cost: 0,
  unit: "kg",
  category: "legumes",
  image:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
  stock: 0,
  active: true,
  featured: false,
};

export default function ProdutosAdmin({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editando, setEditando] = useState<Partial<Product> | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [busca, setBusca] = useState("");

  const filtrados = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(busca.toLowerCase())
      ),
    [products, busca]
  );

  const ativos = products.filter((p) => p.active).length;
  const baixoEstoque = products.filter((p) => p.active && p.stock <= 20).length;

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    if (!editando) return;
    setSalvando(true);
    const isEdit = !!editando.id;
    const res = await fetch("/api/admin/produtos", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editando),
    });
    const data = await res.json();
    setSalvando(false);
    if (!res.ok) {
      toast.error(data.error || "Erro ao salvar");
      return;
    }
    const saved: Product = data.product;
    setProducts((prev) =>
      isEdit
        ? prev.map((p) => (p.id === saved.id ? saved : p))
        : [...prev, saved]
    );
    setEditando(null);
    toast.success(isEdit ? "Produto atualizado" : "Produto criado");
  }

  async function excluir(p: Product) {
    if (!confirm(`Excluir "${p.name}"?`)) return;
    const res = await fetch("/api/admin/produtos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: p.id }),
    });
    if (res.ok) {
      setProducts((prev) => prev.filter((x) => x.id !== p.id));
      toast.success("Produto removido");
    }
  }

  function set<K extends keyof Product>(campo: K, valor: Product[K]) {
    setEditando((e) => (e ? { ...e, [campo]: valor } : e));
  }

  const margem = (p: Partial<Product>) => {
    const preco = p.price || 0;
    const custo = p.cost || 0;
    return preco ? (((preco - custo) / preco) * 100).toFixed(0) : "0";
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="display text-3xl font-bold text-earth">Produtos</h1>
          <p className="text-earth/60">Adicione, edite ou remova produtos</p>
        </div>
        <button onClick={() => setEditando({ ...VAZIO })} className="btn-brick">
          <Plus className="h-4 w-4" /> Novo produto
        </button>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <StatCard label="Total de produtos" count={products.length} accent="earth" icon={Package} />
        <StatCard label="Ativos na loja" count={ativos} accent="olive" icon={Boxes} />
        <StatCard label="Estoque baixo" count={baixoEstoque} accent="mustard" icon={AlertTriangle} />
      </div>

      <div className="relative mb-4 w-full max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-earth/40" />
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar produto..."
          className="inp pl-9"
        />
      </div>

      {/* Tabela */}
      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-cream-200 text-earth/60">
            <tr>
              <th className="p-3">Produto</th>
              <th className="p-3">Categoria</th>
              <th className="p-3">Preço</th>
              <th className="p-3">Custo</th>
              <th className="p-3">Margem</th>
              <th className="p-3">Estoque</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((p) => (
              <tr
                key={p.id}
                className="border-b border-cream-100 hover:bg-cream-50"
              >
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt=""
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <span className="flex items-center gap-1 font-medium text-earth">
                      {p.name}
                      {p.featured && (
                        <Star className="h-3.5 w-3.5 fill-mustard text-mustard" />
                      )}
                    </span>
                  </div>
                </td>
                <td className="p-3 capitalize text-earth/70">{p.category}</td>
                <td className="p-3 font-semibold text-brick">
                  {formatBRL(p.price)}
                </td>
                <td className="p-3 text-earth/70">{formatBRL(p.cost)}</td>
                <td className="p-3 text-earth/70">{margem(p)}%</td>
                <td className="p-3">
                  <span
                    className={
                      p.stock <= 20 ? "font-semibold text-mustard-600" : ""
                    }
                  >
                    {p.stock}
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      p.active
                        ? "bg-olive/15 text-olive-600"
                        : "bg-earth/10 text-earth/60"
                    }`}
                  >
                    {p.active ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => setEditando(p)}
                      className="rounded-lg p-1.5 text-brick transition hover:bg-brick/10"
                      aria-label="Editar"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => excluir(p)}
                      className="rounded-lg p-1.5 text-earth/50 transition hover:bg-brick/10 hover:text-brick"
                      aria-label="Excluir"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtrados.length === 0 && (
          <p className="py-10 text-center text-sm text-earth/50">
            Nenhum produto encontrado.
          </p>
        )}
      </div>

      {/* Modal de edicao */}
      <AnimatePresence>
        {editando && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-earth/40 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEditando(null)}
          >
            <motion.form
              onSubmit={salvar}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-lift"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-earth">
                  {editando.id ? "Editar produto" : "Novo produto"}
                </h2>
                <button
                  type="button"
                  onClick={() => setEditando(null)}
                  className="rounded-full p-1.5 text-earth/50 hover:bg-earth/5"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Campo className="sm:col-span-2" label="Nome">
                  <input
                    required
                    value={editando.name || ""}
                    onChange={(e) => set("name", e.target.value)}
                    className="inp"
                  />
                </Campo>
                <Campo className="sm:col-span-2" label="Descrição">
                  <textarea
                    value={editando.description || ""}
                    onChange={(e) => set("description", e.target.value)}
                    className="inp"
                    rows={2}
                  />
                </Campo>
                <Campo label="Preço (R$)">
                  <input
                    type="number"
                    step="0.01"
                    value={editando.price ?? 0}
                    onChange={(e) => set("price", Number(e.target.value))}
                    className="inp"
                  />
                </Campo>
                <Campo label="Custo (R$)">
                  <input
                    type="number"
                    step="0.01"
                    value={editando.cost ?? 0}
                    onChange={(e) => set("cost", Number(e.target.value))}
                    className="inp"
                  />
                </Campo>
                <Campo label="Unidade">
                  <input
                    value={editando.unit || ""}
                    onChange={(e) => set("unit", e.target.value)}
                    className="inp"
                    placeholder="kg, maço, cesta..."
                  />
                </Campo>
                <Campo label="Estoque">
                  <input
                    type="number"
                    value={editando.stock ?? 0}
                    onChange={(e) => set("stock", Number(e.target.value))}
                    className="inp"
                  />
                </Campo>
                <Campo label="Categoria">
                  <select
                    value={editando.category}
                    onChange={(e) =>
                      set("category", e.target.value as Category)
                    }
                    className="inp capitalize"
                  >
                    {CATEGORIAS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Campo>
                <Campo label="URL da imagem" className="sm:col-span-2">
                  <input
                    value={editando.image || ""}
                    onChange={(e) => set("image", e.target.value)}
                    className="inp"
                  />
                </Campo>
                {editando.image && (
                  <img
                    src={editando.image}
                    alt="Prévia"
                    className="col-span-full h-32 w-full rounded-xl object-cover"
                  />
                )}
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={!!editando.active}
                    onChange={(e) => set("active", e.target.checked)}
                    className="h-4 w-4 accent-brick"
                  />
                  Ativo (aparece na loja)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={!!editando.featured}
                    onChange={(e) => set("featured", e.target.checked)}
                    className="h-4 w-4 accent-brick"
                  />
                  Destaque na home
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditando(null)}
                  className="btn-outline"
                >
                  Cancelar
                </button>
                <button disabled={salvando} className="btn-brick">
                  {salvando ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Campo({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-sm font-medium text-earth">{label}</span>
      {children}
    </label>
  );
}
