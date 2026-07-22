import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "YBÁ — Orgânicos da Bahia",
  description:
    "Colheita comum, união que frutifica. Produtos orgânicos direto da roça baiana.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Fontes da marca carregadas no navegador (sem dependencia no build).
            Fraunces = titulos com serifa organica | Inter = texto limpo. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* O CartProvider precisa envolver TODO o site para o carrinho
            funcionar em qualquer pagina. */}
        <CartProvider>{children}</CartProvider>
        {/* Notificacoes bonitas (toasts) em qualquer pagina */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#fffdf7",
              border: "1px solid #EADCB8",
              color: "#3E2C22",
              borderRadius: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
