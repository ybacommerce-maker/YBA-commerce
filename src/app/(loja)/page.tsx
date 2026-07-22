import Link from "next/link";
import {
  ArrowRight,
  Leaf,
  Truck,
  ShoppingBasket,
  CheckCircle2,
} from "lucide-react";
import Hero from "@/components/home/Hero";
import FeatureStrip from "@/components/home/FeatureStrip";
import TopProdutos from "@/components/home/TopProdutos";
import BlogSection from "@/components/home/BlogSection";
import Testimonials from "@/components/home/Testimonials";
import Faq from "@/components/home/Faq";
import Newsletter from "@/components/home/Newsletter";
import Reveal from "@/components/Reveal";
import SafeImage from "@/components/SafeImage";
import { IMG } from "@/lib/images";
import { getProducts } from "@/lib/db";

const PASSOS = [
  {
    n: "01",
    t: "Escolha na loja",
    d: "Monte sua cesta com verduras, frutas e temperos frescos.",
    icon: ShoppingBasket,
  },
  {
    n: "02",
    t: "A gente colhe",
    d: "Seu pedido é colhido no dia direto das hortas parceiras.",
    icon: Leaf,
  },
  {
    n: "03",
    t: "Chega na sua porta",
    d: "Entrega rápida em Salvador e região metropolitana.",
    icon: Truck,
  },
];

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div>
      <Hero />
      <FeatureStrip />

      {/* PRODUTOS COM ABAS */}
      <TopProdutos products={products} />

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="scroll-mt-24 bg-cream-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Reveal>
            <div className="mb-10 text-center">
              <span className="eyebrow justify-center">Simples assim</span>
              <h2 className="display mt-2 text-3xl font-bold text-earth md:text-4xl">
                Como funciona a YBÁ
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {PASSOS.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.1}>
                <div className="relative h-full rounded-3xl border border-cream-200 bg-white/70 p-7">
                  <span className="display absolute right-6 top-4 text-5xl font-black text-cream-200">
                    {p.n}
                  </span>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-olive/15 text-olive-600">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <h3 className="display text-xl font-bold text-earth">{p.t}</h3>
                  <p className="mt-2 text-earth/75">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG / RECEITAS */}
      <BlogSection />

      {/* SOBRE — colagem editorial */}
      <section id="sobre" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <SafeImage
                  src={IMG.tomate}
                  alt="Tomates orgânicos colhidos no dia"
                  emoji="🍅"
                  className="mt-8 aspect-[3/4] rounded-[1.4rem] shadow-card ring-1 ring-black/5"
                />
                <SafeImage
                  src={IMG.manga}
                  alt="Frutas frescas da estação"
                  emoji="🥭"
                  className="aspect-[3/4] rounded-[1.4rem] shadow-card ring-1 ring-black/5"
                />
              </div>
              {/* selo flutuante */}
              <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/95 px-4 py-2 shadow-lift backdrop-blur">
                <Leaf className="h-4 w-4 text-olive-600" />
                <span className="text-sm font-bold text-earth">
                  Agricultura familiar
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Nossa história</span>
            <h2 className="display mt-2 text-3xl font-bold text-earth md:text-4xl">
              A união que frutifica
            </h2>
            <p className="mt-4 text-earth/80">
              A YBÁ nasce da colheita comum — o encontro de agricultores que
              acreditam em comida honesta. Cultivamos com respeito à terra e às
              pessoas, no jeito baiano de fazer as coisas: com raiz, com afeto e
              com muito sabor.
            </p>
            <ul className="mt-5 space-y-2">
              {[
                "Produtores parceiros certificados",
                "Embalagens ecológicas e retornáveis",
                "Preço justo da roça à sua mesa",
              ].map((li) => (
                <li key={li} className="flex items-center gap-2 text-earth/80">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-olive" />
                  {li}
                </li>
              ))}
            </ul>
            <Link href="/produtos" className="btn-brick mt-8">
              Fazer meu primeiro pedido <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Testimonials />
      <Faq />
      <Newsletter />
    </div>
  );
}
