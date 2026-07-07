"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CalendarCheck, LogOut, Settings, Stethoscope, UsersRound, type LucideIcon } from "lucide-react";
import { AdminStats } from "@/components/admin/AdminStats";
import { AppointmentsTable } from "@/components/admin/AppointmentsTable";
import { DoctorsManager } from "@/components/admin/DoctorsManager";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { getAppointments, getDoctors, getServices } from "@/lib/storage";
import type { Appointment, Doctor, Service } from "@/lib/types";

type Tab = "appointments" | "services" | "doctors" | "settings";

const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: "appointments", label: "Заявки", icon: CalendarCheck },
  { id: "services", label: "Услуги", icon: Stethoscope },
  { id: "doctors", label: "Врачи", icon: UsersRound },
  { id: "settings", label: "Настройки", icon: Settings }
];

export function AdminDashboard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>("appointments");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const [loadedAppointments, loadedServices, loadedDoctors] = await Promise.all([
      getAppointments(),
      getServices(),
      getDoctors()
    ]);
    setAppointments(loadedAppointments);
    setServices(loadedServices);
    setDoctors(loadedDoctors);
    setLoading(false);
  };

  useEffect(() => {
    if (window.localStorage.getItem("dentflow_admin") !== "true") {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
    void loadData();
  }, [router]);

  const title = useMemo(() => tabs.find((item) => item.id === tab)?.label ?? "Заявки", [tab]);

  const logout = () => {
    window.localStorage.removeItem("dentflow_admin");
    router.push("/admin/login");
  };

  if (!ready) {
    return (
      <main className="grid min-h-screen place-items-center bg-dent-gradient text-white">
        <div className="glass rounded-[8px] px-6 py-4 text-white/70">Проверяем доступ...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dent-gradient text-white">
      <div className="noise" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-5 px-4 py-5 pb-24 lg:grid-cols-[260px_1fr] lg:pb-5">
        <aside className="glass sticky top-5 hidden h-[calc(100vh-2.5rem)] rounded-[8px] p-4 lg:block">
          <div className="mb-8">
            <p className="text-xl font-black">AqTis Dental</p>
            <p className="text-sm text-white/45">Premium admin dashboard</p>
          </div>
          <nav className="grid gap-2">
            {tabs.map((item) => (
              <TabButton key={item.id} active={tab === item.id} item={item} onClick={() => setTab(item.id)} />
            ))}
          </nav>
          <button
            onClick={logout}
            className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-[8px] border border-white/10 px-4 py-3 text-sm text-white/60 transition hover:border-roseGlow/40 hover:text-white"
          >
            <LogOut size={17} /> Выйти
          </button>
        </aside>

        <section className="min-w-0">
          <header className="glass mb-5 flex items-center justify-between rounded-[8px] p-4">
            <div>
              <p className="text-sm text-white/45">Панель управления клиникой</p>
              <h1 className="text-2xl font-black">{title}</h1>
            </div>
            <button
              onClick={logout}
              className="grid h-11 w-11 place-items-center rounded-[8px] border border-white/10 bg-white/8 text-white/60 transition hover:text-white lg:hidden"
              aria-label="Выйти"
            >
              <LogOut size={18} />
            </button>
          </header>

          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-28 animate-pulse rounded-[8px] border border-white/10 bg-white/8" />
              ))}
            </div>
          ) : (
            <>
              {tab === "appointments" ? (
                <>
                  <AdminStats appointments={appointments} />
                  <AppointmentsTable
                    appointments={appointments}
                    services={services}
                    doctors={doctors}
                    onChanged={loadData}
                  />
                </>
              ) : null}
              {tab === "services" ? <ServicesManager services={services} onChanged={loadData} /> : null}
              {tab === "doctors" ? <DoctorsManager doctors={doctors} onChanged={loadData} /> : null}
              {tab === "settings" ? (
                <div className="glass rounded-[8px] p-5">
                  <h2 className="text-xl font-black">Настройки</h2>
                  <p className="mt-3 text-white/55">
                    Demo access хранится в localStorage. Позже этот слой можно заменить на Supabase Auth,
                    не меняя структуру панели и таблицы заявок.
                  </p>
                </div>
              ) : null}
            </>
          )}
        </section>
      </div>

      <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 gap-2 rounded-[8px] border border-white/12 bg-ink/88 p-2 backdrop-blur-2xl lg:hidden">
        {tabs.map((item) => (
          <TabButton key={item.id} active={tab === item.id} item={item} onClick={() => setTab(item.id)} compact />
        ))}
      </nav>
    </main>
  );
}

function TabButton({
  item,
  active,
  onClick,
  compact = false
}: {
  item: { label: string; icon: LucideIcon };
  active: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-[8px] border px-3 py-3 text-sm transition ${
        active
          ? "border-cyanGlow/45 bg-cyanGlow/12 text-white shadow-glow"
          : "border-transparent text-white/48 hover:bg-white/8 hover:text-white"
      } ${compact ? "flex-col gap-1 px-1 py-2 text-[11px]" : "justify-start"}`}
    >
      <Icon size={compact ? 17 : 18} />
      {item.label}
    </button>
  );
}
