"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Menu, X, Leaf } from "lucide-react";
import Logo from "./Logo";
import MiniCart from "./MiniCart";
import { useCart } from "@/context/CartContext";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/admin", label: "Painel" },
];

export default function Header() {
  const { count } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // menu mobile
  const [cartOpen, setCartOpen] = useState(false); // mini-carrinho
  const [scrolled, setScrolled] = useState(false);

  // deixa o header mais compacto/solido ao rolar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* faixa de aviso no topo */}
      <div className="yba-pattern text-cream">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-1.5 text-center text-xs font-medium">
          <Leaf className="h-3.5 w-3.5" />
          Frete grátis acima de R$ 80 em Salvador e região • colhido no dia
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-cream-200 bg-cream/90 shadow-soft backdrop-blur-md"
            : "border-b border-transparent bg-cream/60 backdrop-blur"
        }`}
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 transition-all duration-300 ${
            scrolled ? "py-2" : "py-3"
          }`}
        >
          <Link href="/" aria-label="YBA - inicio" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => {
              const active =
                l.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(l.href.replace("/#sobre", "/"));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition hover:text-brick ${
                    l.label === "Painel" ? "text-olive-600" : "text-earth"
                  }`}
                >
                  {l.label}
                  {active && l.href !== "/#sobre" && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brick"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCartOpen(true)}
              className="group relative flex items-center gap-2 rounded-full bg-brick px-4 py-2 text-sm font-semibold text-cream shadow-soft transition hover:-translate-y-0.5 hover:bg-brick-600 hover:shadow-card"
              aria-label="Abrir carrinho"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Carrinho</span>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-mustard px-1 text-xs font-bold text-earth ring-2 ring-cream"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              type="button"
              aria-label="Abrir menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-200 bg-white/60 text-brick md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* menu mobile */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-cream-200 bg-cream md:hidden"
            >
              <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
                {LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-3 py-3 font-medium transition hover:bg-cream-200 ${
                      l.label === "Painel" ? "text-olive-600" : "text-earth"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <MiniCart open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
