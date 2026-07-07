"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      aria-label="Наверх"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white shadow-glow backdrop-blur transition hover:-translate-y-1 hover:border-cyanGlow/60"
    >
      <ArrowUp size={18} />
    </button>
  );
}
