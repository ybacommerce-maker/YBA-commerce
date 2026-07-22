"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, PackageOpen } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product, Category } from "@/lib/types";

const CATEGORIES: { key: Category | "todos"; label: string; emoji: string }[] = [
  { key: "todos", label: "Todos", emoji: "🌿" },
  { key: "verduras", label: "Verduras", emoji: "🥬" },
  { key: "legumes", label: "Legumes", emoji: "🥕" },
  { key: "frutas", label: "Frutas", emoji: "🥭" },
  { key: "temperos", label: "Temperos", emoji: "🌶️" },
  { key: "graos", label: "Grãos", emoji: "🫘" },
  { key: "cestas", label: "Cestas", emoji: "🧺" },
];

type Sort = "destaque" | "menor" | "maior" | "nome";

export default function ProductGrid({ products }: { products: Product[] }) {
  const [cat, setCat] = useState<Category | "todos">("todos");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>("destaque");

  const filtered = useMemo(() => {
    const list = products.filter((p) => {
      const okCat = cat === "todos" || p.category === cat;
      const okSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return okCat && okSearch;
    });
    const sorted = [...list];
    if (sort === "menor") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "maior") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "nome") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    return sorted;
  }, [products, cat, search, sort]);

  return (
    <div>
      {/* barra de filtros */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-earth/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar produto..."
              className="inp pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-earth/50" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="inp w-auto cursor-pointer py-2"
            >
              <option value="destaque">Em destaque</option>
              <option value="menor">Menor preço</option>
              <option value="maior">Maior preço</option>
              <option value="nome">Nome (A-Z)</option>
            </select>
          </div>
        </div>

        {/* pills de categoria */}
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {CATEGORIES.map((c) => {
            const active = cat === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                className={`relative shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                  active ? "text-cream" : "text-earth hover:bg-cream-200"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="cat-pill"
                    className="absolute inset-0 rounded-full bg-brick shadow-soft"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative flex items-center gap-1.5">
                  <span>{c.emoji}</span>
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mb-4 text-sm text-earth/50">
        {filtered.length}{" "}
        {filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}
      </p>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <PackageOpen className="h-12 w-12 text-earth/30" />
          <p className="font-semibold text-earth">Nenhum produto encontrado</p>
          <p className="text-sm text-earth/50">
            Tente outra busca ou categoria.
          </p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
