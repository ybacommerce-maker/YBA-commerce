"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Leaf,
  ShoppingCart,
  Users,
  Wallet,
  Target,
  LogOut,
  Store,
  type LucideIcon,
} from "lucide-react";
import Logo from "@/components/Logo";

const MENU: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/produtos", label: "Produtos", icon: Leaf },
  { href: "/admin/vendas", label: "Pedidos", icon: ShoppingCart },
  { href: "/admin/usuarios", label: "Usuários", icon: Users },
  { href: "/admin/despesas", label: "Despesas", icon: Wallet },
  { href: "/admin/simulador", label: "Simulador", icon: Target },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // A pagina de login nao usa o menu lateral
  if (pathname === "/admin/login") return <>{children}</>;

  async function sair() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen bg-cream-50">
      {/* Menu lateral */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-earth text-cream md:flex">
        <div className="border-b border-cream/10 p-5">
          <span className="display text-2xl font-black tracking-widest text-cream">
            YBÁ
          </span>
          <p className="text-xs text-cream/50">Painel administrativo</p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brick/30 px-2.5 py-1 text-[11px] font-semibold text-cream">
            <span className="h-1.5 w-1.5 rounded-full bg-olive" /> Superadmin
          </span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {MENU.map((m) => {
            const active = isActive(m.href);
            return (
              <Link
                key={m.href}
                href={m.href}
                className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active ? "text-cream" : "text-cream/70 hover:bg-cream/10"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="admin-active"
                    className="absolute inset-0 rounded-xl bg-brick"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <m.icon className="relative h-4 w-4" />
                <span className="relative">{m.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="space-y-1 p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-cream/60 transition hover:bg-cream/10"
          >
            <Store className="h-4 w-4" /> Ver a loja
          </Link>
          <button
            onClick={sair}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-cream/60 transition hover:bg-cream/10"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </aside>

      {/* Conteudo */}
      <div className="flex-1 pb-20 md:pb-0">
        {/* Topo mobile */}
        <div className="flex items-center justify-between bg-earth p-4 text-cream md:hidden">
          <Logo />
          <button
            onClick={sair}
            className="flex items-center gap-1 text-sm"
            aria-label="Sair"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>

        <div className="p-5 md:p-8">{children}</div>

        {/* Nav inferior mobile */}
        <nav className="no-scrollbar fixed bottom-0 left-0 right-0 z-30 flex justify-between gap-1 overflow-x-auto border-t border-cream-200 bg-white px-2 py-2 md:hidden">
          {MENU.map((m) => {
            const active = isActive(m.href);
            return (
              <Link
                key={m.href}
                href={m.href}
                className={`flex min-w-[60px] flex-col items-center gap-0.5 rounded-lg px-2 py-1 text-[10px] font-medium ${
                  active ? "text-brick" : "text-earth/60"
                }`}
              >
                <m.icon className="h-5 w-5" />
                {m.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
