"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X, Trash2, Plus, Minus, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatBRL } from "@/lib/format";
import { calcularFrete, FRETE_GRATIS_ACIMA_DE } from "@/lib/frete";

// ==========================================================
//  MINI-CARRINHO — painel lateral que desliza da direita.
//  Controlado pelo Header (props open / onClose).
// ==========================================================
export default function MiniCart({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, setQuantity, remove, subtotal } = useCart();
  const frete = calcularFrete(subtotal);
  const faltaFrete = Math.max(0, FRETE_GRATIS_ACIMA_DE - subtotal);
  const progresso = Math.min(100, (subtotal / FRETE_GRATIS_ACIMA_DE) * 100);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* fundo escuro */}
          <motion.div
            className="fixed inset-0 z-50 bg-earth/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* painel */}
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream-50 shadow-lift"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            role="dialog"
            aria-label="Carrinho de compras"
          >
            {/* cabecalho */}
            <div className="flex items-center justify-between border-b border-cream-200 bg-white/70 px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-brick" />
                <h2 className="text-lg font-bold text-earth">Seu carrinho</h2>
                <span className="rounded-full bg-brick/10 px-2 py-0.5 text-xs font-bold text-brick">
                  {items.length}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="rounded-full p-2 text-earth/60 transition hover:bg-earth/5 hover:text-brick"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-200">
                  <ShoppingBag className="h-9 w-9 text-brick/50" />
                </div>
                <p className="font-semibold text-earth">
                  Seu carrinho está vazio
                </p>
                <p className="text-sm text-earth/60">
                  Leve uma cesta fresquinha pra casa 🌱
                </p>
                <button onClick={onClose} className="btn-brick mt-2">
                  Ver produtos
                </button>
              </div>
            ) : (
              <>
                {/* barra de frete gratis */}
                <div className="border-b border-cream-200 bg-white/50 px-5 py-3">
                  <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-earth/70">
                    <Truck className="h-3.5 w-3.5 text-olive" />
                    {frete === 0 ? (
                      <span className="font-semibold text-olive-600">
                        Você ganhou frete grátis! 🎉
                      </span>
                    ) : (
                      <span>
                        Faltam{" "}
                        <b className="text-brick">{formatBRL(faltaFrete)}</b> para
                        o frete grátis
                      </span>
                    )}
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-cream-200">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-olive to-mustard"
                      initial={{ width: 0 }}
                      animate={{ width: `${progresso}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* lista de itens */}
                <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-3 rounded-2xl border border-cream-200 bg-white/80 p-3"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream-200">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <p className="line-clamp-1 text-sm font-semibold text-earth">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-earth/60">
                            {formatBRL(item.product.price)} / {item.product.unit}
                          </p>
                          <div className="mt-auto flex items-center justify-between pt-1">
                            <div className="flex items-center rounded-full border border-cream-200 bg-cream-50">
                              <button
                                onClick={() =>
                                  setQuantity(item.product.id, item.quantity - 1)
                                }
                                className="p-1.5 text-brick"
                                aria-label="Diminuir"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-6 text-center text-sm font-bold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  setQuantity(item.product.id, item.quantity + 1)
                                }
                                className="p-1.5 text-brick"
                                aria-label="Aumentar"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <span className="text-sm font-bold text-brick">
                              {formatBRL(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => remove(item.product.id)}
                          aria-label="Remover"
                          className="self-start text-earth/40 transition hover:text-brick"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* rodape */}
                <div className="border-t border-cream-200 bg-white/70 px-5 py-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-earth/70">Subtotal</span>
                    <span className="text-xl font-bold text-brick">
                      {formatBRL(subtotal)}
                    </span>
                  </div>
                  <Link
                    href="/carrinho"
                    onClick={onClose}
                    className="btn-brick w-full"
                  >
                    Ver carrinho e finalizar
                  </Link>
                  <button
                    onClick={onClose}
                    className="mt-2 w-full text-center text-sm text-earth/60 hover:text-brick"
                  >
                    Continuar comprando
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
