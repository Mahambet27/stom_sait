"use client";

import { Edit3, Plus, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { deleteService, makeLocalId, saveService } from "@/lib/storage";
import type { Service } from "@/lib/types";

type ServiceForm = Omit<Service, "priceFrom" | "durationMinutes"> & {
  priceFrom: string;
  durationMinutes: string;
};

const emptyForm: ServiceForm = {
  id: "",
  title: "",
  description: "",
  priceFrom: "",
  durationMinutes: "",
  icon: "sparkles",
  isActive: true,
  popular: false
};

export function ServicesManager({
  services,
  onChanged
}: {
  services: Service[];
  onChanged: () => Promise<void>;
}) {
  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const [editing, setEditing] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    await saveService({
      ...form,
      id: form.id || makeLocalId("service"),
      title: form.title.trim(),
      description: form.description.trim(),
      priceFrom: Number(form.priceFrom) || 0,
      durationMinutes: Number(form.durationMinutes) || 30
    });
    setForm(emptyForm);
    setEditing(false);
    await onChanged();
  };

  const edit = (service: Service) => {
    setEditing(true);
    setForm({
      ...service,
      popular: service.popular ?? false,
      priceFrom: String(service.priceFrom),
      durationMinutes: String(service.durationMinutes)
    });
  };

  const remove = async (id: string) => {
    await deleteService(id);
    await onChanged();
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[420px_1fr]">
      <form onSubmit={submit} className="glass rounded-[8px] p-5">
        <h2 className="mb-4 text-xl font-black">{editing ? "Редактировать услугу" : "Добавить услугу"}</h2>
        <Field label="Название" value={form.title} onChange={(value) => setForm({ ...form, title: value })} />
        <Field label="Описание" value={form.description} onChange={(value) => setForm({ ...form, description: value })} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Цена от" type="number" value={form.priceFrom} onChange={(value) => setForm({ ...form, priceFrom: value })} />
          <Field label="Минуты" type="number" value={form.durationMinutes} onChange={(value) => setForm({ ...form, durationMinutes: value })} />
        </div>
        <Field label="Иконка" value={form.icon} onChange={(value) => setForm({ ...form, icon: value })} />
        <label className="mb-3 flex items-center gap-2 text-sm text-white/65">
          <input type="checkbox" checked={form.isActive} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} />
          Услуга активна
        </label>
        <label className="mb-4 flex items-center gap-2 text-sm text-white/65">
          <input type="checkbox" checked={form.popular ?? false} onChange={(event) => setForm({ ...form, popular: event.target.checked })} />
          Показывать badge популярно
        </label>
        <GlowButton type="submit" className="w-full">
          <Plus size={17} /> {editing ? "Сохранить" : "Добавить"}
        </GlowButton>
      </form>

      <div className="glass rounded-[8px] p-4">
        <div className="grid gap-3">
          {services.map((service) => (
            <div key={service.id} className="rounded-[8px] border border-white/10 bg-white/7 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="font-bold">{service.title}</p>
                  <p className="mt-1 text-sm text-white/50">{service.description}</p>
                  <p className="mt-2 text-sm text-cyanGlow">
                    от {service.priceFrom.toLocaleString("ru-KZ")} ₸ · {service.durationMinutes} мин
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="icon-button" onClick={() => edit(service)} aria-label="Редактировать услугу">
                    <Edit3 size={17} />
                  </button>
                  <button className="icon-button text-roseGlow" onClick={() => remove(service.id)} aria-label="Удалить услугу">
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="mb-3 block">
      <span className="mb-2 block text-sm text-white/55">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[8px] border border-white/10 bg-white/8 px-4 py-3 outline-none transition focus:border-cyanGlow/60"
      />
    </label>
  );
}
