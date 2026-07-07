"use client";

import { motion } from "framer-motion";
import { Check, MessageCircle, MoveRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";

const packages = [
  {
    price: "50 000 ₸",
    title: "Мини-сайт + заявка",
    description: "Базовое решение для клиники, чтобы принимать заявки через сайт.",
    badge: "лучший старт",
    items: [
      "одна современная страница",
      "услуги и цены",
      "блок врачей",
      "контакты",
      "кнопки WhatsApp / Instagram / 2GIS",
      "форма заявки",
      "адаптация под телефон",
      "базовая настройка под клинику"
    ]
  },
  {
    price: "100 000 ₸",
    title: "Расширенный сайт",
    description: "Более сильная презентация клиники с онлайн-записью и доверием.",
    items: [
      "главная страница",
      "услуги",
      "врачи",
      "контакты",
      "онлайн-запись",
      "простая панель заявок",
      "отзывы / FAQ",
      "премиум-анимации",
      "мобильная версия"
    ]
  },
  {
    price: "150 000 ₸",
    title: "Сильный сайт для клиники",
    description: "Полноценный продающий сайт для стоматологии с красивым дизайном и заявками.",
    badge: "оптимальный выбор",
    items: [
      "современный премиум-дизайн",
      "главная + услуги + врачи + контакты",
      "онлайн-запись",
      "форма заявки",
      "отзывы и FAQ",
      "SEO-база",
      "адаптация под телефон",
      "улучшенная презентация услуг",
      "подготовка к Vercel / домену"
    ]
  },
  {
    price: "250 000–300 000 ₸",
    title: "Полноценный сайт",
    description: "Максимально проработанный сайт для серьёзной клиники.",
    badge: "полный запуск",
    items: [
      "многостраничный сайт",
      "главная",
      "отдельные страницы услуг",
      "врачи",
      "онлайн-запись",
      "админ-панель заявок",
      "отзывы / FAQ / преимущества",
      "WhatsApp / Instagram / 2GIS",
      "SEO-структура",
      "аналитика заявок",
      "премиум-анимации",
      "полная мобильная адаптация",
      "подготовка к коммерческому запуску"
    ]
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black md:text-5xl">
              Пакеты создания сайта для клиник
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/66 md:text-lg">
              Можно начать с мини-сайта за 50 000 ₸ или сразу сделать полноценный сайт с онлайн-записью, админкой и сильной презентацией клиники.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
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
                className={`flex h-full flex-col p-5 ${pack.badge ? "border-cyanGlow/45 shadow-glow" : ""}`}
              >
                {pack.badge ? (
                  <span className="mb-4 inline-flex rounded-full border border-cyanGlow/35 bg-cyanGlow/10 px-3 py-1 text-xs font-semibold text-cyanGlow">
                    {pack.badge}
                  </span>
                ) : null}
                <p className="text-2xl font-black leading-tight md:text-3xl">{pack.price}</p>
                <h3 className="mt-3 text-xl font-black">{pack.title}</h3>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/66">{pack.description}</p>
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
