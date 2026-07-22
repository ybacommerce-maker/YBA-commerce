import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta da marca YBA (estilo Bahia / agro / natural)
        cream: {
          DEFAULT: "#F5EAD2", // fundo creme das artes
          50: "#FBF6EA",
          100: "#F5EAD2",
          200: "#EADCB8",
          300: "#DFC99A",
        },
        brick: {
          // vermelho terracota do logo YBA
          DEFAULT: "#8A2417",
          50: "#F7E7E2",
          100: "#E3A99C",
          200: "#D98B7B",
          400: "#A8331F",
          500: "#8A2417",
          600: "#75200F",
          700: "#5C1A0D",
        },
        olive: {
          DEFAULT: "#6B7233",
          50: "#EEF0E2",
          100: "#D6DBB8",
          500: "#6B7233",
          600: "#565B29",
          700: "#42461F",
        },
        mustard: {
          DEFAULT: "#C98A2B",
          50: "#FBEFD9",
          500: "#C98A2B",
          600: "#A66E1E",
        },
        earth: {
          DEFAULT: "#3E2C22",
          600: "#54392C",
        },
      },
      fontFamily: {
        // Preenchidas via CSS vars (next/font). Fallbacks seguros.
        display: ["var(--font-display)", "Fraunces", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 10px -3px rgba(62,44,34,0.12)",
        card: "0 6px 24px -8px rgba(62,44,34,0.18)",
        lift: "0 18px 40px -14px rgba(62,44,34,0.30)",
        glow: "0 0 0 1px rgba(138,36,23,0.15), 0 10px 30px -10px rgba(138,36,23,0.35)",
      },
      borderRadius: {
        "2xl": "1.1rem",
        "3xl": "1.6rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-16px) rotate(3deg)" },
        },
        shimmer: { "100%": { transform: "translateX(100%)" } },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pop: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "60%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.8s ease both",
        float: "float 5s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        shimmer: "shimmer 1.8s infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        marquee: "marquee 26s linear infinite",
        pop: "pop 0.35s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
