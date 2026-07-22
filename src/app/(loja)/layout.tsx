import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// Layout da LOJA: tudo aqui dentro ganha cabecalho e rodape.
// (o painel /admin tem o proprio layout, sem esse cabecalho)
export default function LojaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-[70vh]">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
