"use client";

import { useState } from "react";

// ==========================================================
//  SAFE IMAGE — mostra a foto e, se ela falhar (404, offline),
//  troca por um painel com gradiente da marca + emoji, para
//  nunca aparecer uma caixa vazia.
// ==========================================================
export default function SafeImage({
  src,
  alt,
  emoji = "🌱",
  className = "",
  imgClassName = "",
  priority = false,
}: {
  src: string;
  alt: string;
  emoji?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  const [err, setErr] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {err ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-olive/25 via-cream-200 to-mustard/25">
          <span className="text-6xl opacity-80" aria-hidden="true">
            {emoji}
          </span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setErr(true)}
          loading={priority ? "eager" : "lazy"}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}
