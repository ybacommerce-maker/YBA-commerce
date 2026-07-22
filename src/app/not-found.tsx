import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-4 text-center">
      <span className="display text-6xl font-bold tracking-widest text-brick">
        YBÁ
      </span>
      <h1 className="mt-4 text-2xl font-bold text-earth">
        Página não encontrada
      </h1>
      <p className="mt-2 text-earth/60">
        Essa colheita ainda não brotou por aqui.
      </p>
      <Link href="/" className="btn-brick mt-6">
        Voltar para a loja
      </Link>
    </div>
  );
}
