"use client";

import { Edit3, Plus, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { deleteDoctor, makeLocalId, saveDoctor } from "@/lib/storage";
import type { Doctor } from "@/lib/types";

type DoctorForm = Omit<Doctor, "experienceYears" | "rating"> & {
  experienceYears: string;
  rating: string;
};

const emptyForm: DoctorForm = {
  id: "",
  name: "",
  specialty: "",
  experienceYears: "",
  rating: "5",
  imageUrl: "",
  description: "",
  isActive: true
};

export function DoctorsManager({
  doctors,
  onChanged
}: {
  doctors: Doctor[];
  onChanged: () => Promise<void>;
}) {
  const [form, setForm] = useState<DoctorForm>(emptyForm);
  const [editing, setEditing] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim()) return;
    await saveDoctor({
      ...form,
      id: form.id || makeLocalId("doctor"),
      name: form.name.trim(),
      specialty: form.specialty.trim(),
      experienceYears: Number(form.experienceYears) || 1,
      rating: Number(form.rating) || 5,
      imageUrl: form.imageUrl || undefined,
      description: form.description || undefined
    });
    setForm(emptyForm);
    setEditing(false);
    await onChanged();
  };

  const edit = (doctor: Doctor) => {
    setEditing(true);
    setForm({
      ...doctor,
      imageUrl: doctor.imageUrl ?? "",
      description: doctor.description ?? "",
      experienceYears: String(doctor.experienceYears),
      rating: String(doctor.rating)
    });
  };

  const remove = async (id: string) => {
    await deleteDoctor(id);
    await onChanged();
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[420px_1fr]">
      <form onSubmit={submit} className="glass rounded-[8px] p-5">
        <h2 className="mb-4 text-xl font-black">{editing ? "Редактировать врача" : "Добавить врача"}</h2>
        <Field label="Имя" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
        <Field label="Специальность" value={form.specialty} onChange={(value) => setForm({ ...form, specialty: value })} />
        <Field label="Описание" value={form.description ?? ""} onChange={(value) => setForm({ ...form, description: value })} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Опыт" type="number" value={form.experienceYears} onChange={(value) => setForm({ ...form, experienceYears: value })} />
          <Field label="Рейтинг" type="number" value={form.rating} onChange={(value) => setForm({ ...form, rating: value })} />
        </div>
        <Field label="Фото URL" value={form.imageUrl ?? ""} onChange={(value) => setForm({ ...form, imageUrl: value })} />
        <label className="mb-4 flex items-center gap-2 text-sm text-white/65">
          <input type="checkbox" checked={form.isActive} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} />
          Врач активен
        </label>
        <GlowButton type="submit" className="w-full">
          <Plus size={17} /> {editing ? "Сохранить" : "Добавить"}
        </GlowButton>
      </form>

      <div className="glass rounded-[8px] p-4">
        <div className="grid gap-3">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="rounded-[8px] border border-white/10 bg-white/7 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="font-bold">{doctor.name}</p>
                  <p className="mt-1 text-sm text-white/50">{doctor.specialty}</p>
                  <p className="mt-2 text-sm text-cyanGlow">
                    {doctor.experienceYears} лет · рейтинг {doctor.rating}
                  </p>
                  {doctor.description ? <p className="mt-2 text-sm text-white/45">{doctor.description}</p> : null}
                </div>
                <div className="flex gap-2">
                  <button className="icon-button" onClick={() => edit(doctor)} aria-label="Редактировать врача">
                    <Edit3 size={17} />
                  </button>
                  <button className="icon-button text-roseGlow" onClick={() => remove(doctor.id)} aria-label="Удалить врача">
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
