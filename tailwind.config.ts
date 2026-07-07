import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#05070d",
        obsidian: "#080b12",
        glass: "rgba(255,255,255,0.08)",
        cyanGlow: "#3ee7ff",
        violetGlow: "#8b5cf6",
        roseGlow: "#ff4fd8",
        mintGlow: "#63f7c8"
      },
      boxShadow: {
        glow: "0 0 40px rgba(62, 231, 255, 0.22)",
        violet: "0 0 38px rgba(139, 92, 246, 0.25)",
        soft: "0 24px 80px rgba(0, 0, 0, 0.45)"
      },
      backgroundImage: {
        "dent-gradient":
          "radial-gradient(circle at 20% 10%, rgba(62, 231, 255, 0.18), transparent 28%), radial-gradient(circle at 82% 18%, rgba(255, 79, 216, 0.12), transparent 24%), linear-gradient(135deg, #05070d 0%, #0b1020 46%, #070a12 100%)"
      }
    }
  },
  plugins: []
};

export default config;
