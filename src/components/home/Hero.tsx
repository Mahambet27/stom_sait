"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Activity,
  CalendarCheck,
  CheckCircle2,
  MessageCircle,
  MoveRight,
  ShieldCheck,
  Sparkles,
  Star
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";

const benefits = [
  "Прием взрослых и детей",
  "Современное оборудование",
  "Прозрачные цены от",
  "Запись без ожидания звонка",
  "WhatsApp для быстрого контакта"
];

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen px-4 pt-32">
      <div className="noise" />
      <div className="absolute left-1/2 top-16 h-96 w-96 -translate-x-1/2 rounded-full bg-cyanGlow/10 blur-3xl" />
      <div className="absolute right-0 top-44 h-80 w-80 rounded-full bg-roseGlow/10 blur-3xl" />
      <div className="absolute left-8 top-1/3 h-56 w-56 rounded-full bg-violetGlow/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(14)].map((_, index) => (
          <motion.span
            key={index}
            className="absolute h-1 w-1 rounded-full bg-cyanGlow/60"
            style={{ left: `${8 + index * 7}%`, top: `${18 + (index % 6) * 11}%` }}
            animate={{ y: [0, -18, 0], opacity: [0.18, 0.85, 0.18] }}
            transition={{ duration: 3.2 + index * 0.16, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 pb-20 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/70 backdrop-blur">
            <Sparkles size={16} className="text-cyanGlow" />
            AqTis Dental Clinic · Астана
          </div>
          <h1 className="text-balance text-5xl font-black leading-tight tracking-normal text-white md:text-7xl">
            Стоматология в Астане с онлайн-записью 24/7
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68 md:text-xl">
            Лечение, чистка, имплантация и эстетическая стоматология в современной клинике.
            Выберите услугу, врача и удобное время — администратор подтвердит запись.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <GlowButton href="#booking" className="shine-button">
              Записаться онлайн <MoveRight size={18} />
            </GlowButton>
            <GlowButton href="#services" variant="secondary">
              Посмотреть услуги
            </GlowButton>
            <GlowButton href="https://wa.me/77770000000" variant="secondary">
              <MessageCircle size={18} /> Написать в WhatsApp
            </GlowButton>
          </div>
          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + index * 0.06 }}
                className="flex items-center gap-2 rounded-[8px] border border-white/10 bg-white/7 px-4 py-3 text-sm text-white/75 backdrop-blur"
              >
                <CheckCircle2 size={16} className="text-mintGlow" />
                {benefit}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[8px] border border-white/12 bg-white/6 shadow-soft">
            <Image
              src="/images/dentflow-hero.png"
              alt="Демо-фото современной стоматологической клиники AqTis Dental"
              width={900}
              height={640}
              priority
              className="aspect-[4/3] w-full object-cover opacity-82"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
            <div className="absolute right-8 top-8 rounded-[8px] border border-cyanGlow/25 bg-ink/55 px-4 py-3 text-sm text-cyanGlow backdrop-blur">
              Dental scan active
            </div>
          </div>

          <GlassCard className="absolute -left-2 top-8 w-56 p-4 md:-left-8">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-[8px] bg-cyanGlow/18 text-cyanGlow">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">Айдана Сейткалиева</p>
                <p className="text-xs text-white/55">рейтинг 4.9 · демо-фото</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="absolute -right-2 bottom-28 w-60 p-4 md:-right-8">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-bold">Сегодня свободно</p>
              <CalendarCheck size={18} className="text-mintGlow" />
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs text-white/70">
              {["10:30", "14:00", "15:30", "18:30"].map((slot) => (
                <span key={slot} className="rounded-[8px] bg-white/8 py-2">
                  {slot}
                </span>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="absolute -bottom-4 left-6 right-6 p-4">
            <div className="grid grid-cols-3 gap-3 text-center text-xs text-white/60">
              <div>
                <Activity className="mx-auto mb-1 text-cyanGlow" size={18} />
                37 заявок
              </div>
              <div>
                <Star className="mx-auto mb-1 text-roseGlow" size={18} />
                4.9 рейтинг
              </div>
              <div>
                <CalendarCheck className="mx-auto mb-1 text-mintGlow" size={18} />
                24/7 запись
              </div>
            </div>
            <div className="mt-3 flex h-12 items-end gap-1">
              {[36, 48, 30, 58, 44, 68, 55, 74].map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-t bg-gradient-to-t from-cyanGlow/35 to-cyanGlow"
                  style={{ height }}
                />
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-center text-xs text-white/45 md:block">
        <div className="mx-auto mb-2 h-9 w-5 rounded-full border border-white/20 p-1">
          <motion.div
            className="mx-auto h-2 w-2 rounded-full bg-cyanGlow"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        </div>
        листайте ниже
      </div>
    </section>
  );
}
