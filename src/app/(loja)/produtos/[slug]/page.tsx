import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  Leaf,
  Truck,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";
import { getProductBySlug, getProducts } from "@/lib/db";
import { formatBRL } from "@/lib/format";
import AddToCart from "@/components/AddToCart";
import Reveal from "@/components/Reveal";

export default async function ProdutoPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      {/* breadcrumb */}
      <nav className="mb-6 flex items-center gap-1 text-sm text-earth/60">
        <Link href="/" className="hover:text-brick">
          Início
        </Link>
        <span>/</span>
        <Link href="/produtos" className="hover:text-brick">
          Produtos
        </Link>
        <span>/</span>
        <span className="font-medium capitalize text-earth">
          {product.category}
        </span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-cream-200 shadow-card ring-1 ring-black/5">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover"
              priority
            />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-olive/90 px-3 py-1 text-xs font-bold text-cream shadow-soft">
              <Leaf className="h-3.5 w-3.5" /> Orgânico certificado
            </span>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-xl bg-cream-200 ring-1 ring-cream-200"
              >
                <Image
                  src={product.image}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover opacity-90"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <Link
            href="/produtos"
            className="mb-3 inline-flex items-center gap-1 text-sm text-brick hover:underline"
          >
            <ChevronLeft className="h-4 w-4" /> Voltar para produtos
          </Link>
          <span className="block w-fit rounded-full bg-olive/15 px-3 py-1 text-sm font-semibold capitalize text-olive-600">
            {product.category}
          </span>
          <h1 className="display mt-3 text-4xl font-bold text-earth">
            {product.name}
          </h1>
          <p className="mt-3 text-4xl font-black text-brick">
            {formatBRL(product.price)}
            <span className="text-base font-normal text-earth/60">
              {" "}
              / {product.unit}
            </span>
          </p>
          <p className="mt-4 text-earth/80">{product.description}</p>

          <div className="mt-4 flex items-center gap-2 text-sm">
            {product.stock > 0 ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-olive/10 px-3 py-1 font-semibold text-olive-600">
                <PackageCheck className="h-4 w-4" />
                {product.stock} em estoque
              </span>
            ) : (
              <span className="rounded-full bg-brick/10 px-3 py-1 font-semibold text-brick">
                Esgotado no momento
              </span>
            )}
          </div>

          <div className="mt-8">
            <AddToCart product={product} />
          </div>

          {/* selos de confianca */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { icon: Truck, t: "Entrega rápida", d: "Salvador e região" },
              { icon: Leaf, t: "Colhido no dia", d: "Frescor garantido" },
              { icon: ShieldCheck, t: "Sem agrotóxico", d: "100% orgânico" },
            ].map((b) => (
              <div
                key={b.t}
                className="rounded-2xl border border-cream-200 bg-white/60 p-3 text-center"
              >
                <b.icon className="mx-auto h-5 w-5 text-brick" />
                <p className="mt-1.5 text-xs font-bold text-earth">{b.t}</p>
                <p className="text-[11px] text-earth/60">{b.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-cream-50 p-5 text-sm text-earth/80">
            <p className="font-semibold text-earth">Entrega YBÁ</p>
            <p className="mt-1">
              Entregamos em Salvador e região metropolitana. Frete calculado no
              checkout. Acima de R$ 80,00, o frete é grátis. 🌱
            </p>
          </div>
        </div>
      </div>

      <Reveal>
        <RelacionadosNota />
      </Reveal>
    </div>
  );
}

async function RelacionadosNota() {
  const all = await getProducts();
  const outros = all.slice(0, 4);
  return (
    <div className="mt-16">
      <h2 className="display mb-5 text-2xl font-bold text-earth">
        Você também vai gostar
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-5">
        {outros.map((p) => (
          <Link
            key={p.id}
            href={`/produtos/${p.slug}`}
            className="card card-hover overflow-hidden"
          >
            <div className="relative h-32">
              <Image src={p.image} alt={p.name} fill className="object-cover" />
            </div>
            <div className="p-3">
              <p className="line-clamp-1 text-sm font-semibold text-earth">
                {p.name}
              </p>
              <p className="text-sm font-bold text-brick">
                {formatBRL(p.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Gera as paginas dos produtos no build (bom para SEO e velocidade)
export async function generateStaticParams() {
  const all = await getProducts();
  return all.map((p) => ({ slug: p.slug }));
}
