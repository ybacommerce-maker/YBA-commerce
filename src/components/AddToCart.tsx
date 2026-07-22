"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/lib/types";
import { formatBRL } from "@/lib/format";
import { useCart } from "@/context/CartContext";

export default function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const router = useRouter();
  const semEstoque = product.stock <= 0;

  function adicionar() {
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    toast.success(`${qty}× ${product.name} no carrinho`, {
      description: formatBRL(product.price * qty),
      icon: "🛒",
      action: {
        label: "Ver carrinho",
        onClick: () => router.push("/carrinho"),
      },
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-full border border-cream-200 bg-white">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="p-3 text-brick transition hover:text-brick-600"
          aria-label="Diminuir"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center font-bold">{qty}</span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="p-3 text-brick transition hover:text-brick-600"
          aria-label="Aumentar"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={adicionar}
        disabled={semEstoque}
        className="btn-brick"
      >
        {added ? (
          <>
            <Check className="h-4 w-4" /> Adicionado!
          </>
        ) : (
          <>
            <ShoppingBag className="h-4 w-4" /> Adicionar ao carrinho
          </>
        )}
      </motion.button>

      <button
        onClick={() => {
          add(product, qty);
          router.push("/carrinho");
        }}
        disabled={semEstoque}
        className="btn-outline"
      >
        Comprar agora
      </button>
    </div>
  );
}
