"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sprout, Star, Leaf } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { IMG } from "@/lib/images";

// Hero editorial: texto forte à esquerda, colagem de imagens à direita.
export default function Hero() {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative overflow-hidden bg-cream-50">
      {/* textura suave de fundo */}
      <div className="mesh pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-olive/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 md:grid-cols-2 md:gap-14 md:py-20">
        {/* COLUNA DE TEXTO */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-sm font-semibold text-olive-600 ring-1 ring-olive/20"
          >
            <Sprout className="h-4 w-4" />
            Agroecologia • direto da Bahia
          </motion.span>

          <motion.h1
            variants={item}
            className="display text-[2.7rem] font-black leading-[1.02] text-earth md:text-6xl"
          >
            Do pé à sua mesa,{" "}
            <span className="text-gradient">sem intermediários</span>.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-md text-balance text-earth/75"
          >
            Verduras, frutas e temperos orgânicos colhidos no dia direto das
            hortas familiares baianas. Comida de verdade, com raiz e sabor —
            entregue fresquinha na sua porta.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href="/produtos" className="btn-brick">
              Montar minha cesta <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/#como-funciona" className="btn-outline">
              Como funciona
            </Link>
          </motion.div>

          {/* prova social */}
          <motion.div
            variants={item}
            className="mt-9 flex items-center gap-4 border-t border-cream-200 pt-6"
          >
            <div className="flex -space-x-2">
              {["🧑🏽‍🌾", "👩🏾‍🍳", "🧑🏼‍🌾", "👨🏽‍🌾"].map((e, i) => (
                <span
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-cream bg-white text-lg shadow-soft"
                >
                  {e}
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-mustard">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-mustard" />
                ))}
                <span className="ml-1 text-sm font-bold text-earth">4,9</span>
              </div>
              <span className="text-xs text-earth/60">
                +500 famílias baianas comprando orgânico
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* COLAGEM DE IMAGENS */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* linha decorativa pontilhada */}
          <svg
            className="pointer-events-none absolute -left-8 -top-6 hidden h-24 w-40 text-mustard/60 md:block"
            viewBox="0 0 160 96"
            fill="none"
          >
            <path
              d="M2 80 C 40 10, 120 10, 158 60"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 8"
              strokeLinecap="round"
            />
          </svg>

          <div className="grid aspect-[4/5] grid-cols-2 grid-rows-2 gap-3 md:gap-4">
            <SafeImage
              src={IMG.manga}
              alt="Frutas orgânicas frescas"
              emoji="🥭"
              priority
              className="row-span-2 h-full rounded-[1.6rem] shadow-lift ring-1 ring-black/5"
            />
            <SafeImage
              src={IMG.tomate}
              alt="Tomates orgânicos"
              emoji="🍅"
              className="rounded-[1.4rem] shadow-card ring-1 ring-black/5"
            />
            <SafeImage
              src={IMG.beterraba}
              alt="Beterrabas colhidas na roça"
              emoji="🫘"
              className="rounded-[1.4rem] shadow-card ring-1 ring-black/5"
            />
          </div>

          {/* selo flutuante */}
          <motion.div
            className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white/95 p-3 shadow-lift backdrop-blur"
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-olive/15 text-xl">
              <Leaf className="h-5 w-5 text-olive-600" />
            </span>
            <div>
              <p className="text-sm font-bold text-earth">100% orgânico</p>
              <p className="text-xs text-earth/60">Colhido hoje na roça</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
