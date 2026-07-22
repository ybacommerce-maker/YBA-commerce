"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatBRL } from "@/lib/format";
import { calcularFrete, FRETE_GRATIS_ACIMA_DE } from "@/lib/frete";

export default function CarrinhoPage() {
  const { items, setQuantity, remove, subtotal, clear } = useCart();
  const frete = calcularFrete(subtotal);
  const total = subtotal + frete;
  const faltaFrete = Math.max(0, FRETE_GRATIS_ACIMA_DE - subtotal);
  const progresso = Math.min(100, (subtotal / FRETE_GRATIS_ACIMA_DE) * 100);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-cream-200"
        >
          <ShoppingBag className="h-11 w-11 text-brick/50" />
        </motion.div>
        <h1 className="display text-3xl font-bold text-earth">
          Seu carrinho está vazio
        </h1>
        <p className="mt-2 text-earth/70">
          Que tal levar uma cesta fresquinha pra casa?
        </p>
        <Link href="/produtos" className="btn-brick mt-6">
          Ver produtos <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="display mb-8 text-3xl font-bold text-earth">
        Seu carrinho
      </h1>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          {/* barra de progresso do frete gratis */}
          <div className="mb-4 rounded-2xl border border-cream-200 bg-white/60 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4 text-olive" />
              {frete === 0 ? (
                <span className="font-semibold text-olive-600">
                  Você ganhou frete grátis! 🎉
                </span>
              ) : (
                <span className="text-earth/70">
                  Faltam <b className="text-brick">{formatBRL(faltaFrete)}</b>{" "}
                  para o frete grátis
                </span>
              )}
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-cream-200">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-olive to-mustard"
                initial={{ width: 0 }}
                animate={{ width: `${progresso}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 40, height: 0 }}
                  className="card flex items-center gap-4 p-4"
                >
                  <Link
                    href={`/produtos/${item.product.slug}`}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream-200"
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex-1">
                    <Link
                      href={`/produtos/${item.product.slug}`}
                      className="font-semibold text-earth hover:text-brick"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-earth/60">
                      {formatBRL(item.product.price)} / {item.product.unit}
                    </p>
                    <button
                      onClick={() => remove(item.product.id)}
                      className="mt-1 inline-flex items-center gap-1 text-xs text-earth/50 transition hover:text-brick"
                    >
                      <Trash2 className="h-3 w-3" /> Remover
                    </button>
                  </div>
                  <div className="flex items-center rounded-full border border-cream-200 bg-white">
                    <button
                      onClick={() =>
                        setQuantity(item.product.id, item.quantity - 1)
                      }
                      className="p-2 text-brick"
                      aria-label="Diminuir"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(item.product.id, item.quantity + 1)
                      }
                      className="p-2 text-brick"
                      aria-label="Aumentar"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="w-24 text-right font-bold text-earth">
                    {formatBRL(item.product.price * item.quantity)}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <button
            onClick={clear}
            className="mt-4 text-sm text-earth/60 transition hover:text-brick"
          >
            Esvaziar carrinho
          </button>
        </div>

        {/* Resumo */}
        <div className="card h-fit p-6 md:sticky md:top-28">
          <h2 className="mb-4 text-lg font-bold text-earth">Resumo</h2>
          <div className="space-y-2 text-sm">
            <Row label="Subtotal" value={formatBRL(subtotal)} />
            <Row
              label="Frete"
              value={frete === 0 ? "Grátis" : formatBRL(frete)}
            />
            <div className="my-3 border-t border-cream-200" />
            <div className="flex justify-between text-xl font-bold text-brick">
              <span>Total</span>
              <span>{formatBRL(total)}</span>
            </div>
          </div>
          <Link href="/checkout" className="btn-brick mt-6 w-full">
            Finalizar compra <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/produtos"
            className="mt-3 block text-center text-sm text-earth/60 transition hover:text-brick"
          >
            Continuar comprando
          </Link>
          <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-earth/50">
            <ShieldCheck className="h-4 w-4 text-olive" />
            Pagamento seguro • PIX, boleto e cartão
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-earth/70">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
