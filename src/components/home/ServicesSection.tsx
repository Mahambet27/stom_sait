"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Cross,
  Heart,
  Scan,
  Shield,
  Sparkles,
  Stethoscope,
  Sun,
  Timer
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { formatPrice, services } from "@/lib/data";

const icons = {
  stethoscope: Stethoscope,
  sparkles: Sparkles,
  shield: Shield,
  activity: Activity,
  sun: Sun,
  cross: Cross,
  scan: Scan,
  heart: Heart
};

export function ServicesSection() {
  return (
    <section id="services" className="relative px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyanGlow">
              Услуги и цены
            </p>
            <h2 className="text-3xl font-black md:text-5xl">Пациент сразу видит, что выбрать</h2>
          </div>
          <p className="max-w-xl text-white/60">
            Прозрачные цены от, понятная длительность приема и быстрый переход к онлайн-записи.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = icons[service.icon as keyof typeof icons] ?? Sparkles;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.04 }}
              >
                <GlassCard interactive className="group relative h-full overflow-hidden p-5">
                  <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-cyanGlow/16 to-transparent" />
                  </div>
                  <div className="relative">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-[8px] bg-white text-ink shadow-glow">
                        <Icon size={22} />
                      </div>
                      {service.popular ? (
                        <span className="rounded-full border border-roseGlow/35 bg-roseGlow/10 px-3 py-1 text-xs font-semibold text-roseGlow">
                          популярно
                        </span>
                      ) : null}
                    </div>
                    <h3 className="min-h-14 text-xl font-black">{service.title}</h3>
                    <p className="mt-3 min-h-24 text-sm leading-6 text-white/60">{service.description}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                      <span className="font-bold text-white">от {formatPrice(service.priceFrom)} ₸</span>
                      <span className="flex items-center gap-1 text-white/55">
                        <Timer size={15} />
                        {service.durationMinutes} мин
                      </span>
                    </div>
                    <GlowButton href="#booking" variant="secondary" className="mt-5 w-full">
                      Записаться
                    </GlowButton>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
