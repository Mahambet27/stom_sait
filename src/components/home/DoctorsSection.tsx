"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight, Star } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { doctors } from "@/lib/data";

export function DoctorsSection() {
  return (
    <section id="doctors" className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-roseGlow">
              Команда
            </p>
            <h2 className="text-3xl font-black md:text-5xl">Врачи, которым доверяют семьи</h2>
          </div>
          <ChevronRight className="hidden text-white/40 md:block" />
        </div>

        <div className="scrollbar-hide flex snap-x gap-4 overflow-x-auto pb-4">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, x: 36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="min-w-[82%] snap-center sm:min-w-[48%] lg:min-w-[31%] xl:min-w-[24%]"
            >
              <GlassCard interactive className="h-full p-5">
                <div className="relative mb-5 aspect-square overflow-hidden rounded-[8px] bg-gradient-to-br from-cyanGlow/25 via-violetGlow/25 to-roseGlow/20">
                  {doctor.imageUrl ? (
                    <Image
                      src={doctor.imageUrl}
                      alt={`Демо-фото врача ${doctor.name}`}
                      fill
                      sizes="(max-width: 768px) 82vw, 24vw"
                      className="object-cover"
                    />
                  ) : null}
                  <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-ink/70 px-3 py-1 text-xs text-white/65 backdrop-blur">
                    Демо-фото
                  </span>
                </div>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-black">{doctor.name}</h3>
                    <p className="mt-1 text-sm text-cyanGlow">{doctor.specialty}</p>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-xs">
                    <Star size={13} className="fill-roseGlow text-roseGlow" />
                    {doctor.rating.toFixed(1)}
                  </span>
                </div>
                <p className="mb-3 text-sm text-white/55">{doctor.experienceYears} лет опыта</p>
                <p className="mb-5 min-h-20 text-sm leading-6 text-white/58">{doctor.description}</p>
                <GlowButton href="#booking" variant="secondary" className="w-full">
                  Записаться
                </GlowButton>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
