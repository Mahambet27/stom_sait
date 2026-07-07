"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { deleteAppointment, updateAppointmentStatus } from "@/lib/storage";
import type { Appointment, AppointmentStatus, Doctor, Service } from "@/lib/types";

const statuses: { value: "all" | AppointmentStatus; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "new", label: "Новые" },
  { value: "confirmed", label: "Подтверждено" },
  { value: "cancelled", label: "Отменено" },
  { value: "completed", label: "Завершено" }
];

export function AppointmentsTable({
  appointments,
  services,
  doctors,
  onChanged
}: {
  appointments: Appointment[];
  services: Service[];
  doctors: Doctor[];
  onChanged: () => Promise<void>;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | AppointmentStatus>("all");

  const serviceMap = useMemo(() => new Map(services.map((item) => [item.id, item.title])), [services]);
  const doctorMap = useMemo(() => new Map(doctors.map((item) => [item.id, item.name])), [doctors]);

  const filtered = appointments.filter((appointment) => {
    const matchesStatus = status === "all" || appointment.status === status;
    const search = query.toLowerCase();
    const matchesQuery =
      appointment.patientName.toLowerCase().includes(search) ||
      appointment.patientPhone.toLowerCase().includes(search);
    return matchesStatus && matchesQuery;
  });

  const setAppointmentStatus = async (id: string, nextStatus: AppointmentStatus) => {
    await updateAppointmentStatus(id, nextStatus);
    await onChanged();
  };

  const removeAppointment = async (id: string) => {
    await deleteAppointment(id);
    await onChanged();
  };

  const renderActions = (appointment: Appointment) => (
    <div className="flex flex-wrap gap-2">
      <MiniAction onClick={() => setAppointmentStatus(appointment.id, "confirmed")}>Подтвердить</MiniAction>
      <MiniAction onClick={() => setAppointmentStatus(appointment.id, "cancelled")}>Отменить</MiniAction>
      <MiniAction onClick={() => setAppointmentStatus(appointment.id, "completed")}>Завершить</MiniAction>
      <MiniAction danger onClick={() => removeAppointment(appointment.id)}>Удалить</MiniAction>
    </div>
  );

  return (
    <div className="glass rounded-[8px] p-4">
      <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35" size={17} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Поиск по имени или телефону"
            className="w-full rounded-[8px] border border-white/10 bg-white/8 py-3 pl-10 pr-4 outline-none transition focus:border-cyanGlow/60 xl:w-80"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {statuses.map((item) => (
            <button
              key={item.value}
              onClick={() => setStatus(item.value)}
              className={`rounded-[8px] border px-3 py-2 text-sm transition ${
                status === item.value
                  ? "border-cyanGlow/50 bg-cyanGlow/12 text-white"
                  : "border-white/10 bg-white/7 text-white/55 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-[8px] border border-dashed border-white/15 p-10 text-center text-white/45">
          Заявок пока нет
        </div>
      ) : (
        <>
          <div className="grid gap-3 md:hidden">
            {filtered.map((appointment) => (
              <div key={appointment.id} className="rounded-[8px] border border-white/10 bg-white/7 p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold">{appointment.patientName}</p>
                    <p className="text-sm text-white/45">{appointment.patientPhone}</p>
                  </div>
                  <Badge status={appointment.status} />
                </div>
                <div className="grid gap-2 text-sm text-white/60">
                  <p><span className="text-white/38">Услуга:</span> {serviceMap.get(appointment.serviceId) ?? "Услуга удалена"}</p>
                  <p><span className="text-white/38">Врач:</span> {doctorMap.get(appointment.doctorId) ?? "Врач удален"}</p>
                  <p><span className="text-white/38">Дата:</span> {appointment.appointmentDate} · {appointment.appointmentTime}</p>
                </div>
                <div className="mt-4">{renderActions(appointment)}</div>
              </div>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[980px] border-separate border-spacing-y-2 text-sm">
              <thead className="text-left text-white/45">
                <tr>
                  <th className="px-3 py-2">Пациент</th>
                  <th className="px-3 py-2">Услуга</th>
                  <th className="px-3 py-2">Врач</th>
                  <th className="px-3 py-2">Дата</th>
                  <th className="px-3 py-2">Статус</th>
                  <th className="px-3 py-2">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((appointment) => (
                  <tr key={appointment.id} className="bg-white/7">
                    <td className="rounded-l-[8px] px-3 py-3">
                      <p className="font-bold">{appointment.patientName}</p>
                      <p className="text-white/45">{appointment.patientPhone}</p>
                    </td>
                    <td className="px-3 py-3">{serviceMap.get(appointment.serviceId) ?? "Услуга удалена"}</td>
                    <td className="px-3 py-3">{doctorMap.get(appointment.doctorId) ?? "Врач удален"}</td>
                    <td className="px-3 py-3">
                      {appointment.appointmentDate} · {appointment.appointmentTime}
                    </td>
                    <td className="px-3 py-3">
                      <Badge status={appointment.status} />
                    </td>
                    <td className="rounded-r-[8px] px-3 py-3">{renderActions(appointment)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function MiniAction({
  children,
  onClick,
  danger = false
}: {
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[8px] border px-2.5 py-1.5 text-xs transition ${
        danger
          ? "border-roseGlow/30 text-roseGlow hover:bg-roseGlow/10"
          : "border-white/10 text-white/55 hover:border-cyanGlow/40 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
