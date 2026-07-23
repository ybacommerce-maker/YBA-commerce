"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Check } from "lucide-react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setOk(true);
    toast.success("Inscrição confirmada!", {
      description: "Você vai receber as novidades da colheita 🌱",
    });
    setEmail("");
    setTimeout(() => setOk(false), 2500);
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="relative overflow-hidden rounded-3xl bg-earth px-6 py-14 text-center text-cream shadow-lift md:px-16">
        {/* brilhos suaves da marca */}
        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-brick/40 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-olive/30 blur-2xl" />
        {/* padrao geometrico discreto da marca no topo */}
        <div className="yba-pattern pointer-events-none absolute inset-x-0 top-0 h-1.5 opacity-70" />

        <div className="relative">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-mustard text-earth"
          >
            <Mail className="h-7 w-7" />
          </motion.div>
          <h2 className="display text-3xl font-bold md:text-4xl">
            Receba a colheita da semana
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-cream/70">
            Ofertas, cestas novas e dicas de agroecologia direto no seu e-mail.
            Sem spam, só coisa boa da roça.
          </p>

          <form
            onSubmit={enviar}
            className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full rounded-full border border-cream/20 bg-cream/10 px-5 py-3 text-cream outline-none placeholder:text-cream/40 focus:border-mustard"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-full bg-mustard px-6 py-3 font-semibold text-earth transition hover:bg-mustard-600"
            >
              {ok ? (
                <>
                  <Check className="h-4 w-4" /> Feito
                </>
              ) : (
                <>
                  Inscrever <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
