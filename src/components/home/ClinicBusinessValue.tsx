"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const before = [
  "пациент ждёт ответа",
  "администратор отвечает на одинаковые вопросы",
  "цены и услуги приходится объяснять вручную",
  "ночью заявки теряются",
  "сложно показать врачей и преимущества"
];

const after = [
  "пациент видит услуги и цены",
  "выбирает врача и услугу",
  "оставляет заявку 24/7",
  "WhatsApp остается быстрым контактом",
  "админка собирает заявки в одном месте",
  "клиника выглядит современнее"
];

export function ClinicBusinessValue() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyanGlow">
            Для владельцев клиник
          </p>
          <h2 className="text-3xl font-black md:text-5xl">
            Сайт усиливает 2GIS и WhatsApp, а не заменяет их
          </h2>
          <p className="mt-5 text-white/60">
            AqTis Dental показывает, как сайт превращает интерес пациента в структурированную заявку,
            пока привычные каналы связи остаются на месте.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <CompareCard title="Только 2GIS + WhatsApp" items={before} mode="before" />
          <CompareCard title="С DentFlow AI" items={after} mode="after" />
        </div>
      </div>
    </section>
  );
}

function CompareCard({
  title,
  items,
  mode
}: {
  title: string;
  items: string[];
  mode: "before" | "after";
}) {
  const positive = mode === "after";
  const Icon = positive ? CheckCircle2 : XCircle;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <GlassCard
        className={`h-full p-6 ${positive ? "border-mintGlow/25 shadow-glow" : "border-white/10"}`}
      >
        <h3 className="text-2xl font-black">{title}</h3>
        <div className="mt-6 grid gap-3">
          {items.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-[8px] bg-white/7 p-3">
              <Icon size={18} className={positive ? "mt-0.5 text-mintGlow" : "mt-0.5 text-roseGlow"} />
              <span className="text-white/68">{item}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
