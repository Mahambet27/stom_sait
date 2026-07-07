"use client";

import { motion } from "framer-motion";
import { Building2, Clock, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";

export function ContactSection() {
  return (
    <section id="contacts" className="px-4 py-24">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyanGlow">
            Контакты
          </p>
          <h2 className="text-3xl font-black md:text-5xl">AqTis Dental Clinic в Астане</h2>
          <p className="mt-5 text-white/60">
            Демо-адрес указан только для презентации. Для коммерческой версии его нужно заменить
            на реальный адрес клиники и подключить карту.
          </p>

          <div className="mt-8 grid gap-3">
            <Info icon={<MapPin size={18} />} title="Адрес" text="Астана, район Есиль, примерный адрес для демо" />
            <Info icon={<Phone size={18} />} title="Телефон" text="+7 777 000 00 00" />
            <Info icon={<Clock size={18} />} title="График" text="Пн–Сб: 09:00–20:00 · Вс: по записи" />
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <GlowButton href="https://wa.me/77770000000" variant="primary">
              <MessageCircle size={18} /> WhatsApp
            </GlowButton>
            <GlowButton href="https://instagram.com" variant="secondary">
              <Instagram size={18} /> Instagram
            </GlowButton>
            <GlowButton href="https://2gis.kz/astana" variant="secondary">
              <Building2 size={18} /> 2GIS
            </GlowButton>
            <GlowButton href="tel:+77770000000" variant="secondary">
              <Phone size={18} /> Позвонить
            </GlowButton>
          </div>
        </motion.div>

        <GlassCard className="min-h-[420px] overflow-hidden p-4">
          <div className="relative h-full min-h-[390px] rounded-[8px] border border-white/10 bg-obsidian">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />
            <div className="absolute left-[18%] top-[26%] h-24 w-24 rounded-full border border-violetGlow/25 bg-violetGlow/10 blur-sm" />
            <div className="absolute right-[18%] top-[20%] h-20 w-20 rounded-full border border-cyanGlow/25 bg-cyanGlow/10 blur-sm" />
            <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyanGlow/35 bg-cyanGlow/10 shadow-glow" />
            <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyanGlow" />
            <div className="absolute bottom-6 left-6 right-6 rounded-[8px] border border-white/10 bg-ink/72 p-4 backdrop-blur">
              <p className="font-bold">AqTis Dental Clinic</p>
              <p className="mt-1 text-sm text-white/55">
                Dark map placeholder. Реальная карта и точный адрес подключаются после согласования клиники.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function Info({
  icon,
  title,
  text
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-white/7 p-4">
      <span className="grid h-10 w-10 place-items-center rounded-[8px] bg-white/10 text-cyanGlow">
        {icon}
      </span>
      <span>
        <span className="block text-sm text-white/45">{title}</span>
        <span className="font-semibold">{text}</span>
      </span>
    </div>
  );
}
