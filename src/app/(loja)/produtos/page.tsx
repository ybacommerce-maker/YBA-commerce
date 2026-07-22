import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/db";

export const metadata = { title: "Produtos — YBÁ" };

export default async function ProdutosPage() {
  const products = await getProducts();
  return (
    <div>
      {/* faixa de titulo */}
      <div className="mesh border-b border-cream-200">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <span className="eyebrow">Feira orgânica</span>
          <h1 className="display mt-2 text-4xl font-bold text-earth md:text-5xl">
            Nossos produtos
          </h1>
          <p className="mt-2 max-w-lg text-earth/70">
            Tudo orgânico, tudo fresquinho, colhido no dia. Escolha, monte sua
            cesta e receba em casa.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
