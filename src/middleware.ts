import { NextRequest, NextResponse } from "next/server";

// Protege as paginas /admin: se nao tiver o cookie de login, manda pro login.
// (Autenticacao simples, boa para demo. Depois da pra trocar por Supabase Auth.)
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Libera a propria pagina de login e a rota de API do login
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  const logado = req.cookies.get("yba_admin")?.value === "ok";
  if (!logado) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
