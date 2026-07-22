import { createBrowserClient } from "@supabase/ssr";

// Cliente do Supabase para uso no NAVEGADOR (componentes "use client").
// Usa a chave publica (anon), que pode aparecer no front sem problema.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
