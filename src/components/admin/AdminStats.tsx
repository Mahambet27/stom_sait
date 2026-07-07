import { CalendarClock, CheckCircle2, ClipboardList, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Appointment } from "@/lib/types";

export function AdminStats({ appointments }: { appointments: Appointment[] }) {
  const today = new Date().toISOString().slice(0, 10);
  const stats = [
    {
      label: "Новые заявки",
      value: appointments.filter((item) => item.status === "new").length,
      icon: Sparkles
    },
    {
      label: "Подтверждено",
      value: appointments.filter((item) => item.status === "confirmed").length,
      icon: CheckCircle2
    },
    {
      label: "Сегодня",
      value: appointments.filter((item) => item.appointmentDate === today).length,
      icon: CalendarClock
    },
    {
      label: "Всего заявок",
      value: appointments.length,
      icon: ClipboardList
    }
  ];

  return (
    <div className="mb-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <GlassCard key={stat.label} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/50">{stat.label}</p>
                <p className="mt-2 text-3xl font-black">{stat.value}</p>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-[8px] bg-cyanGlow/12 text-cyanGlow">
                <Icon size={22} />
              </span>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
