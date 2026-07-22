import { Product } from "./types";
import { PRODUCTS } from "./data";
import { createClient } from "./supabase/server";

// ==========================================================
//  CAMADA DE DADOS (com "plano B")
//  Se o Supabase estiver configurado, busca do banco de verdade.
//  Se NAO estiver, usa os dados ficticios de src/lib/data.ts.
//  Assim o site nunca fica quebrado enquanto voce aprende.
// ==========================================================

export function isSupabaseConfigured(): boolean {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("SEU-PROJETO") &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return PRODUCTS.filter((p) => p.active);

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("name");
    if (error || !data || data.length === 0) return PRODUCTS.filter((p) => p.active);
    return data as Product[];
  } catch {
    return PRODUCTS.filter((p) => p.active);
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.featured);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}
