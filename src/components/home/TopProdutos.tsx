"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Product, Category } from "@/lib/types";

const TABS: { key: Category | "todos"; label: string }[] = [
  { key: "todos", label: "Populares" },
  { key: "verduras", label: "Verduras" },
  { key: "legumes", label: "Legumes" },
  { key: "frutas", label: "Frutas" },
  { key: "temperos", label: "Temperos" },
  { key: "cestas", label: "Cestas" },
];

// Seção de produtos com abas de categoria (inspirada no "Top Destinations").
export default function TopProdutos({ products }: { products: Product[] }) {
  const [tab, setTab] = useState<Category | "todos">("todos");

  const lista = useMemo(() => {
    const base =
      tab === "todos"
        ? [...products].sort(
            (a, b) => Number(b.featured) - Number(a.featured)
          )
        : products.filter((p) => p.category === tab);
    return base.slice(0, 8);
  }, [products, tab]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      {/* cabeçalho da seção */}
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="eyebrow">Da roça pra você</span>
          <h2 className="display mt-2 text-3xl font-bold text-earth md:text-4xl">
            Mais frescos da semana
          </h2>
        </div>
        <Link
          href="/produtos"
          className="group hidden items-center gap-1.5 rounded-full border border-cream-300 px-4 py-2 text-sm font-semibold text-earth transition hover:border-brick hover:text-brick md:inline-flex"
        >
          Explorar tudo
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>

      {/* abas */}
      <div className="no-scrollbar mb-7 flex gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                active ? "text-cream" : "text-earth hover:bg-cream-200"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="top-tab"
                  className="absolute inset-0 rounded-full bg-earth shadow-soft"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* grid */}
      {lista.length === 0 ? (
        <p className="py-16 text-center text-earth/50">
          Nenhum produto nesta categoria por enquanto.
        </p>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {lista.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <Link
        href="/produtos"
        className="btn-outline mx-auto mt-8 flex w-fit md:hidden"
      >
        Explorar tudo <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
