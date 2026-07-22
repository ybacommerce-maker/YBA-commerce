"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Check, Star, Leaf } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/lib/types";
import { formatBRL } from "@/lib/format";
import { useCart } from "@/context/CartContext";

// Emoji por categoria — usado como fallback quando a foto nao carrega
const CATEGORY_EMOJI: Record<string, string> = {
  verduras: "🥬",
  legumes: "🥕",
  frutas: "🥭",
  temperos: "🌶️",
  graos: "🫘",
  cestas: "🧺",
};

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);
  const emoji = CATEGORY_EMOJI[product.category] ?? "🌱";
  const semEstoque = product.stock <= 0;

  function handleAdd() {
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
    toast.success(`${product.name} no carrinho`, {
      description: `${formatBRL(product.price)} / ${product.unit}`,
      icon: "🛒",
    });
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="card card-hover group flex flex-col overflow-hidden"
    >
      <Link
        href={`/produtos/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-cream-200"
      >
        {imgError || !product.image ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-gradient-to-br from-cream-100 to-cream-200">
            <span className="text-5xl" aria-hidden="true">
              {emoji}
            </span>
            <span className="px-3 text-center text-xs font-semibold text-earth/60">
              {product.name}
            </span>
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 300px"
            className="object-cover transition duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        )}

        {/* vinheta no hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-earth/25 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        {/* selos */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-mustard px-2 py-0.5 text-[11px] font-bold text-earth shadow-soft">
              <Star className="h-3 w-3 fill-earth" /> Destaque
            </span>
          )}
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-olive/90 px-2 py-0.5 text-[11px] font-bold text-cream shadow-soft">
            <Leaf className="h-3 w-3" /> Orgânico
          </span>
        </div>

        {semEstoque && (
          <div className="absolute inset-0 flex items-center justify-center bg-cream/70">
            <span className="rounded-full bg-earth px-3 py-1 text-xs font-bold text-cream">
              Esgotado
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-olive-600">
          {product.category}
        </span>
        <Link href={`/produtos/${product.slug}`}>
          <h3 className="display font-bold leading-tight text-earth transition hover:text-brick">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-earth/70">
          {product.description}
        </p>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <span className="text-lg font-bold text-brick">
              {formatBRL(product.price)}
            </span>
            <span className="text-xs text-earth/60"> / {product.unit}</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            disabled={semEstoque}
            className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-cream shadow-soft transition disabled:cursor-not-allowed disabled:opacity-40 ${
              added ? "bg-olive-600" : "bg-olive hover:bg-olive-600"
            }`}
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            {added ? (
              <Check className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">
              {added ? "Adicionado" : "Adicionar"}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
