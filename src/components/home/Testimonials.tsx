"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const DEPOIMENTOS = [
  {
    nome: "Ana Souza",
    cidade: "Salvador, BA",
    texto:
      "A diferença no sabor é absurda. A alface chega no dia, crocante de verdade. Virou rotina da minha casa.",
    emoji: "👩🏽",
  },
  {
    nome: "Carlos Lima",
    cidade: "Lauro de Freitas, BA",
    texto:
      "Comprar da YBÁ é apoiar quem planta com respeito à terra. Entrega rápida e atendimento no capricho.",
    emoji: "🧔🏽",
  },
  {
    nome: "Beatriz Rocha",
    cidade: "Camaçari, BA",
    texto:
      "As cestas são lindas e fresquíssimas. Minha família toda passou a comer mais legumes por causa delas!",
    emoji: "👩🏾",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-cream-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 text-center">
          <span className="eyebrow justify-center">Quem prova, aprova</span>
          <h2 className="display mt-2 text-3xl font-bold text-earth md:text-4xl">
            Histórias que a roça escreve
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {DEPOIMENTOS.map((d, i) => (
            <motion.div
              key={d.nome}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card relative p-6"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-cream-200" />
              <div className="mb-3 flex items-center gap-0.5 text-mustard">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-mustard" />
                ))}
              </div>
              <p className="text-earth/80">“{d.texto}”</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-200 text-xl">
                  {d.emoji}
                </span>
                <div>
                  <p className="font-bold text-earth">{d.nome}</p>
                  <p className="text-xs text-earth/60">{d.cidade}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
