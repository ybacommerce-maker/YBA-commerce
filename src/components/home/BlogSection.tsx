"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { IMG } from "@/lib/images";

interface Post {
  tag: string;
  title: string;
  excerpt: string;
  meta: string;
  img: string;
  emoji: string;
}

const DESTAQUE: Post = {
  tag: "Receitas",
  title: "Salada baiana de tomate, manga e coentro fresco",
  excerpt:
    "Uma receita rápida, colorida e cheia de sabor que celebra o melhor da colheita da semana — pronta em 10 minutos com ingredientes que chegam fresquinhos na sua porta.",
  meta: "5 min de leitura",
  img: IMG.tomate,
  emoji: "🍅",
};

const POSTS: Post[] = [
  {
    tag: "Dicas",
    title: "Como conservar suas folhas frescas por muito mais tempo",
    excerpt: "",
    meta: "4 min de leitura",
    img: IMG.alface,
    emoji: "🥬",
  },
  {
    tag: "Receitas",
    title: "Doce de banana da terra: a receita da vovó baiana",
    excerpt: "",
    meta: "6 min de leitura",
    img: IMG.banana,
    emoji: "🍌",
  },
  {
    tag: "Nutrição",
    title: "Beterraba: 5 formas de usar e turbinar seus sucos",
    excerpt: "",
    meta: "3 min de leitura",
    img: IMG.beterraba,
    emoji: "🫘",
  },
];

export default function BlogSection() {
  return (
    <section className="bg-cream-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="eyebrow">Do blog da YBÁ</span>
            <h2 className="display mt-2 text-3xl font-bold text-earth md:text-4xl">
              Receitas & histórias da roça
            </h2>
          </div>
          <Link
            href="/produtos"
            className="hidden items-center gap-1.5 text-sm font-semibold text-brick hover:underline md:inline-flex"
          >
            Ver tudo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* DESTAQUE */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="card card-hover group overflow-hidden"
          >
            <div className="relative">
              <SafeImage
                src={DESTAQUE.img}
                alt={DESTAQUE.title}
                emoji={DESTAQUE.emoji}
                className="aspect-[16/10] w-full"
                imgClassName="transition duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-brick px-3 py-1 text-xs font-bold text-cream shadow-soft">
                {DESTAQUE.tag}
              </span>
            </div>
            <div className="p-6">
              <h3 className="display text-2xl font-bold leading-tight text-earth transition group-hover:text-brick">
                {DESTAQUE.title}
              </h3>
              <p className="mt-2 text-earth/75">{DESTAQUE.excerpt}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-earth/50">
                <Clock className="h-3.5 w-3.5" /> {DESTAQUE.meta}
              </div>
            </div>
          </motion.article>

          {/* LISTA */}
          <div className="flex flex-col gap-4">
            {POSTS.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="card card-hover group flex items-center gap-4 overflow-hidden p-3"
              >
                <SafeImage
                  src={p.img}
                  alt={p.title}
                  emoji={p.emoji}
                  className="h-24 w-28 shrink-0 rounded-xl"
                  imgClassName="transition duration-500 group-hover:scale-105"
                />
                <div className="flex-1 py-1 pr-2">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-olive-600">
                    {p.tag}
                  </span>
                  <h3 className="mt-1 font-bold leading-tight text-earth transition group-hover:text-brick">
                    {p.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-earth/50">
                    <Clock className="h-3 w-3" /> {p.meta}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
