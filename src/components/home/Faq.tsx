"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, HelpCircle } from "lucide-react";

const PERGUNTAS = [
  {
    q: "Onde vocês entregam?",
    a: "Entregamos em Salvador e em toda a região metropolitana (Lauro de Freitas, Camaçari, Simões Filho e mais). Acima de R$ 80 o frete é grátis; abaixo disso, R$ 12 fixos.",
  },
  {
    q: "Os produtos são realmente orgânicos?",
    a: "Sim! Trabalhamos apenas com agricultores familiares que cultivam sem agrotóxicos e sem adubo químico. É comida de verdade, de solo vivo, colhida no ponto certo.",
  },
  {
    q: "Quando meu pedido é colhido e entregue?",
    a: "Os pedidos são colhidos no dia, direto das hortas parceiras, e entregues em poucas horas — da terra à sua mesa em até 24h.",
  },
  {
    q: "Quais formas de pagamento vocês aceitam?",
    a: "Você paga com PIX (confirmação na hora), boleto ou cartão de crédito, tudo com segurança no checkout.",
  },
  {
    q: "Como funciona a Cesta da Semana?",
    a: "É uma seleção do agricultor com 8 a 10 itens da estação — sempre variada, fresca e no melhor custo. Perfeita para quem quer praticidade e diversidade.",
  },
];

export default function Faq() {
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-8 text-center">
        <span className="eyebrow justify-center">
          <HelpCircle className="h-4 w-4" /> Dúvidas frequentes
        </span>
        <h2 className="display mt-2 text-3xl font-bold text-earth md:text-4xl">
          Tudo que você precisa saber
        </h2>
      </div>

      <div className="space-y-3">
        {PERGUNTAS.map((item, i) => {
          const open = aberta === i;
          return (
            <div
              key={i}
              className={`card overflow-hidden transition ${
                open ? "shadow-card" : ""
              }`}
            >
              <button
                onClick={() => setAberta(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={open}
              >
                <span className="font-semibold text-earth">{item.q}</span>
                <motion.span
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    open ? "bg-brick text-cream" : "bg-cream-200 text-brick"
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-5 pb-5 text-earth/75">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
