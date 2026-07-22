import { Truck, Sprout, ShieldCheck, Recycle } from "lucide-react";

const ITENS = [
  {
    icon: Truck,
    t: "Frete grátis",
    d: "Acima de R$ 80 em Salvador e região",
  },
  { icon: Sprout, t: "Colhido no dia", d: "Da horta à sua casa em até 24h" },
  { icon: ShieldCheck, t: "Pagamento seguro", d: "PIX, boleto e cartão" },
  { icon: Recycle, t: "Embalagem eco", d: "Retornável e sem plástico" },
];

// Faixa slim de vantagens (logo abaixo do hero).
export default function FeatureStrip() {
  return (
    <section className="border-y border-cream-200 bg-white/60">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-5 px-6 py-6 md:grid-cols-4">
        {ITENS.map((i) => (
          <div key={i.t} className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brick/10 text-brick">
              <i.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-earth">{i.t}</p>
              <p className="text-xs leading-tight text-earth/60">{i.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
