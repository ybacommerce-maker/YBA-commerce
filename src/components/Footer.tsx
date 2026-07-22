import Link from "next/link";
import { Instagram, MessageCircle, MapPin, Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20">
      <div className="yba-pattern h-3 w-full" />
      <div className="bg-earth text-cream">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-4">
          <div className="md:col-span-1">
            <p className="display text-3xl font-black tracking-widest">YBÁ</p>
            <p className="mt-3 text-sm text-cream/70">
              Colheita comum, união que frutifica. Orgânicos de verdade, direto
              da roça baiana.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-cream/10 px-3 py-1 text-xs font-semibold text-cream/80">
              <Leaf className="h-3.5 w-3.5" /> 100% agroecológico
            </span>
          </div>

          <div>
            <p className="mb-3 font-semibold">Navegar</p>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>
                <Link href="/produtos" className="transition hover:text-mustard">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/carrinho" className="transition hover:text-mustard">
                  Carrinho
                </Link>
              </li>
              <li>
                <Link href="/#sobre" className="transition hover:text-mustard">
                  Sobre a YBÁ
                </Link>
              </li>
              <li>
                <Link href="/admin" className="transition hover:text-mustard">
                  Painel Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 font-semibold">Categorias</p>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>
                <Link href="/produtos" className="transition hover:text-mustard">
                  Verduras & Legumes
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="transition hover:text-mustard">
                  Frutas
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="transition hover:text-mustard">
                  Temperos & Grãos
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="transition hover:text-mustard">
                  Cestas orgânicas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 font-semibold">Contato</p>
            <ul className="space-y-2.5 text-sm text-cream/70">
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-mustard" />
                (71) 99322-0037
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-mustard" />
                Salvador — Bahia
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-mustard" />
                @yba.organicos
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/15 py-4 text-center text-xs text-cream/50">
          © {new Date().getFullYear()} YBÁ Orgânicos — Projeto demonstrativo.
          Feito com raiz e afeto na Bahia.
        </div>
      </div>
    </footer>
  );
}
