"use client";

import { motion } from "framer-motion";
import { Check, MessageCircle, MoveRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";

const packages = [
  {
    price: "15 000 ₸",
    title: "Старт для WhatsApp",
    items: [
      "описание клиники",
      "тексты услуг",
      "быстрые ответы для администратора",
      "сценарий консультации",
      "оформление для 2GIS/Instagram/WhatsApp"
    ]
  },
  {
    price: "30 000 ₸",
    title: "Мини-лендинг",
    items: [
      "одна страница",
      "услуги и цены",
      "блок врачей",
      "контакты",
      "кнопки WhatsApp/Instagram/2GIS",
      "адаптация под телефон"
    ]
  },
  {
    price: "50 000 ₸",
    title: "Мини-сайт + заявка",
    featured: true,
    items: [
      "всё из мини-лендинга",
      "форма заявки",
      "отправка заявки в WhatsApp или таблицу",
      "базовая настройка под клинику"
    ]
  },
  {
    price: "100 000 ₸",
    title: "Расширенный сайт",
    items: [
      "главная",
      "услуги",
      "врачи",
      "контакты",
      "онлайн-запись",
      "простая панель заявок",
      "отзывы/FAQ",
      "премиум-анимации",
      "мобильная версия"
    ]
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-roseGlow">
              Пакеты для стоматологий
            </p>
            <h2 className="text-3xl font-black md:text-5xl">Можно начать с простого и расти дальше</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <GlowButton href="#booking">
              Начать с демо-версии <MoveRight size={18} />
            </GlowButton>
            <GlowButton href="https://wa.me/77770000000" variant="secondary">
              <MessageCircle size={18} /> Обсудить в WhatsApp
            </GlowButton>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((pack, index) => (
            <motion.div
              key={pack.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard
                interactive
                className={`h-full p-5 ${pack.featured ? "border-cyanGlow/45 shadow-glow" : ""}`}
              >
                {pack.featured ? (
                  <span className="mb-4 inline-flex rounded-full border border-cyanGlow/35 bg-cyanGlow/10 px-3 py-1 text-xs font-semibold text-cyanGlow">
                    лучший старт
                  </span>
                ) : null}
                <p className="text-3xl font-black">{pack.price}</p>
                <h3 className="mt-3 text-xl font-black">{pack.title}</h3>
                <div className="mt-5 grid gap-3">
                  {pack.items.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-white/62">
                      <Check size={16} className="mt-0.5 shrink-0 text-mintGlow" />
                      {item}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
