import type { AppointmentStatus } from "@/lib/types";

const statusStyles: Record<AppointmentStatus, string> = {
  new: "border-cyanGlow/40 bg-cyanGlow/12 text-cyanGlow",
  confirmed: "border-mintGlow/40 bg-mintGlow/12 text-mintGlow",
  cancelled: "border-roseGlow/40 bg-roseGlow/12 text-roseGlow",
  completed: "border-white/20 bg-white/10 text-white/55"
};

const labels: Record<AppointmentStatus, string> = {
  new: "Новая",
  confirmed: "Подтверждено",
  cancelled: "Отменено",
  completed: "Завершено"
};

export function Badge({ status }: { status: AppointmentStatus }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}>
      {labels[status]}
    </span>
  );
}
