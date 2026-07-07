"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Clock, HeartHandshake, MessageCircle, ShieldCheck, UsersRound } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const benefits = [
  {
    title: "Без очередей",
    text: "Пациент оставляет онлайн-заявку в удобное время, даже ночью.",
    icon: Clock
  },
  {
    title: "Прозрачность",
    text: "Услуги, цены от и длительность приема видны заранее.",
    icon: ShieldCheck
  },
  {
    title: "Команда",
    text: "Врачи с опытом от 6 до 12 лет и понятной специализацией.",
    icon: UsersRound
  },
  {
    title: "Для семьи",
    text: "Взрослый, детский, эстетический и хирургический прием в одном месте.",
    icon: HeartHandshake
  },
  {
    title: "Быстрый контакт",
    text: "WhatsApp, Instagram, 2GIS и звонок остаются рядом с онлайн-записью.",
    icon: MessageCircle
  },
  {
    title: "Забота",
    text: "Администратор видит заявку в панели и подтверждает прием.",
    icon: BadgeCheck
  }
];

export function WhyChooseUs() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-mintGlow">
            Почему выбирают нас
          </p>
          <h2 className="text-3xl font-black md:text-5xl">Доверие строится до первого звонка</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard interactive className="h-full p-5">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-[8px] bg-white text-ink shadow-glow">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="mt-3 leading-7 text-white/60">{item.text}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
