"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GlowButton } from "@/components/ui/GlowButton";

const links = [
  { label: "Главная", href: "#home" },
  { label: "Услуги", href: "#services" },
  { label: "Врачи", href: "#doctors" },
  { label: "Запись", href: "#booking" },
  { label: "Пакеты", href: "#pricing" },
  { label: "Контакты", href: "#contacts" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-[8px] border border-white/12 bg-ink/60 px-4 backdrop-blur-2xl transition-all duration-300 ${
          compact ? "py-2 shadow-glow" : "py-3"
        }`}
      >
        <Link href="#home" className="flex items-center gap-2 font-black">
          <span className="grid h-10 w-10 place-items-center rounded-[8px] bg-white text-ink shadow-glow">
            <Sparkles size={20} />
          </span>
          <span className="relative">
            AqTis Dental
            <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-cyanGlow to-roseGlow" />
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[8px] px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <GlowButton href="/admin/login" variant="secondary" className="min-h-10 px-4 py-2">
            Админ
          </GlowButton>
        </div>

        <button
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          className="grid h-10 w-10 place-items-center rounded-[8px] border border-white/15 bg-white/10 lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-2 max-w-7xl rounded-[8px] border border-white/12 bg-ink/92 p-3 backdrop-blur-2xl lg:hidden"
          >
            <div className="grid gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-[8px] px-4 py-3 text-white/75 transition hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <GlowButton href="/admin/login" variant="primary" className="mt-2 w-full">
                Админ
              </GlowButton>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
