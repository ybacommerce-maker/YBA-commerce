"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { formatBRL } from "@/lib/format";

type Accent = "brick" | "olive" | "mustard" | "earth";
type FormatKind = "brl" | "int";

// ==========================================================
//  STAT CARD — cartao de numero do painel.
//  Compativel com o uso antigo (value: string).
//  Novo: passe `count` (numero) + `format` para animar a contagem,
//  e `icon` / `trend` para deixar mais rico.
// ==========================================================
export default function StatCard({
  label,
  value,
  count,
  format,
  hint,
  accent = "brick",
  icon: Icon,
  trend,
}: {
  label: string;
  value?: string;
  count?: number;
  format?: FormatKind; // "brl" = moeda | "int" = numero inteiro
  hint?: string;
  accent?: Accent;
  icon?: LucideIcon;
  trend?: number; // variacao % (ex: 12 = +12%)
}) {
  const formattingFn = format === "brl" ? formatBRL : undefined;
  const bar: Record<Accent, string> = {
    brick: "bg-brick",
    olive: "bg-olive",
    mustard: "bg-mustard",
    earth: "bg-earth",
  };
  const tint: Record<Accent, string> = {
    brick: "bg-brick/10 text-brick",
    olive: "bg-olive/15 text-olive-600",
    mustard: "bg-mustard/15 text-mustard-600",
    earth: "bg-earth/10 text-earth",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="card card-hover relative overflow-hidden p-5"
    >
      <div className={`absolute left-0 top-0 h-full w-1.5 ${bar[accent]}`} />
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-earth/60">{label}</p>
        {Icon && (
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${tint[accent]}`}
          >
            <Icon className="h-5 w-5" />
          </span>
        )}
      </div>

      <p className="mt-1 text-2xl font-bold text-earth">
        {typeof count === "number" ? (
          <CountUp
            end={count}
            duration={1.2}
            separator="."
            decimal=","
            formattingFn={formattingFn}
          />
        ) : (
          value
        )}
      </p>

      <div className="mt-1 flex items-center gap-2">
        {typeof trend === "number" && (
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-bold ${
              trend >= 0
                ? "bg-olive/15 text-olive-600"
                : "bg-brick/10 text-brick"
            }`}
          >
            {trend >= 0 ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {Math.abs(trend)}%
          </span>
        )}
        {hint && <p className="text-xs text-earth/50">{hint}</p>}
      </div>
    </motion.div>
  );
}
