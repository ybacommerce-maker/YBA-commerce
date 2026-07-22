// Logo YBA em SVG (desenho geometrico simples inspirado na marca).
// Voce pode trocar depois por uma imagem PNG na pasta /public.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 120 60" width="54" height="27" aria-hidden="true">
        <g fill="#8A2417">
          {/* Y */}
          <polygon points="4,4 16,4 22,24 28,4 40,4 28,34 28,56 16,56 16,34" />
          {/* B (estilizado) */}
          <path d="M46 4 h20 a10 10 0 0 1 0 24 a10 10 0 0 1 0 24 h-20 v-12 h18 a2 2 0 0 0 0-6 h-18 v-12 h18 a2 2 0 0 0 0-6 h-18 z" />
          {/* A com acento */}
          <polygon points="86,56 98,4 110,4 122,56 110,56 106,40 102,40 98,56" />
          <polygon points="100,-2 112,-2 108,2 104,2" transform="translate(0,4)" />
        </g>
      </svg>
      <span className="display text-2xl font-bold tracking-widest text-brick">
        YBÁ
      </span>
    </span>
  );
}
