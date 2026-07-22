"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";

const NUMEROS = [
  { end: 500, suffix: "+", label: "famílias atendidas" },
  { end: 40, suffix: "+", label: "produtos da roça" },
  { end: 100, suffix: "%", label: "sem agrotóxicos" },
  { end: 24, suffix: "h", label: "da colheita à mesa" },
];

// Faixa de numeros com contagem animada quando entra na tela.
export default function StatsBand() {
  return (
    <section className="border-b border-cream-200 bg-white/50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
        {NUMEROS.map((n, i) => (
          <motion.div
            key={n.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="text-center"
          >
            <p className="display text-4xl font-black text-brick md:text-5xl">
              <CountUp
                end={n.end}
                suffix={n.suffix}
                duration={2}
                enableScrollSpy
                scrollSpyOnce
              />
            </p>
            <p className="mt-1 text-xs text-earth/60 md:text-sm">{n.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
