"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Lock, Sparkles } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";

const adminPassword = process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD || "dentflow";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === adminPassword) {
      window.localStorage.setItem("dentflow_admin", "true");
      router.push("/admin");
      return;
    }
    setError("Неверный пароль");
  };

  return (
    <main className="grid min-h-screen place-items-center bg-dent-gradient px-4 text-white">
      <div className="noise" />
      <form onSubmit={onSubmit} className="glass relative z-10 w-full max-w-md rounded-[8px] p-6">
        <div className="mb-7 flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-[8px] bg-white text-ink shadow-glow">
            <Sparkles size={22} />
          </span>
          <div>
            <h1 className="text-2xl font-black">AqTis Dental Admin</h1>
            <p className="text-sm text-white/50">Демо-доступ к панели заявок клиники</p>
          </div>
        </div>
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm text-white/60">
            <Lock size={15} /> Пароль администратора
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
            className="w-full rounded-[8px] border border-white/10 bg-white/8 px-4 py-3 outline-none transition focus:border-cyanGlow/70"
            placeholder="Введите пароль"
          />
        </label>
        {error ? <p className="mt-3 text-sm text-roseGlow">{error}</p> : null}
        <GlowButton type="submit" className="mt-6 w-full">
          Войти
        </GlowButton>
        <p className="mt-4 text-xs text-white/40">
          Для локального демо без env используйте пароль: dentflow
        </p>
      </form>
    </main>
  );
}
