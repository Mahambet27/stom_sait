"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Check, Clock, MessageCircle, Phone, UserRound } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { formatPrice } from "@/lib/data";
import { createAppointment, getDoctors, getServices } from "@/lib/storage";
import type { Doctor, Service } from "@/lib/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";

type BookingForm = {
  patientName: string;
  patientPhone: string;
  serviceId: string;
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  comment: string;
};

type BookingErrors = Partial<Record<keyof BookingForm, string>>;

const initialForm: BookingForm = {
  patientName: "",
  patientPhone: "",
  serviceId: "",
  doctorId: "",
  appointmentDate: "",
  appointmentTime: "",
  comment: ""
};

const timeSlots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:30"];

const steps = [
  { id: 1, label: "Услуга" },
  { id: 2, label: "Врач" },
  { id: 3, label: "Дата и время" },
  { id: 4, label: "Контакты" }
];

export function BookingSection() {
  const [form, setForm] = useState<BookingForm>(initialForm);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [availableServices, setAvailableServices] = useState<Service[]>([]);
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    let active = true;
    Promise.all([getServices(), getDoctors()])
      .then(([loadedServices, loadedDoctors]) => {
        if (!active) return;
        setAvailableServices(loadedServices.filter((service) => service.isActive));
        setAvailableDoctors(loadedDoctors.filter((doctor) => doctor.isActive));
      })
      .catch((error) => {
        console.warn("Failed to load booking data", error);
      });
    return () => {
      active = false;
    };
  }, []);

  const selectedService = availableServices.find((service) => service.id === form.serviceId);
  const selectedDoctor = availableDoctors.find((doctor) => doctor.id === form.doctorId);

  const activeStep = useMemo(() => {
    if (!form.serviceId) return 1;
    if (!form.doctorId) return 2;
    if (!form.appointmentDate || !form.appointmentTime) return 3;
    return 4;
  }, [form.appointmentDate, form.appointmentTime, form.doctorId, form.serviceId]);

  const updateField = <Field extends keyof BookingForm>(field: Field, value: BookingForm[Field]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSent(false);
    setSubmitError("");
  };

  const validate = () => {
    const nextErrors: BookingErrors = {};
    if (!form.serviceId) nextErrors.serviceId = "Выберите услугу";
    if (!form.doctorId) nextErrors.doctorId = "Выберите врача";
    if (!form.appointmentDate) nextErrors.appointmentDate = "Выберите дату";
    if (!form.appointmentTime) nextErrors.appointmentTime = "Выберите время";
    if (!form.patientName.trim()) nextErrors.patientName = "Введите имя";
    if (!form.patientPhone.trim()) {
      nextErrors.patientPhone = "Введите телефон";
    } else if (form.patientPhone.replace(/\D/g, "").length < 10) {
      nextErrors.patientPhone = "Телефон должен содержать минимум 10 цифр";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      await createAppointment({
        patientName: form.patientName.trim(),
        patientPhone: form.patientPhone.trim(),
        serviceId: form.serviceId,
        doctorId: form.doctorId,
        appointmentDate: form.appointmentDate,
        appointmentTime: form.appointmentTime,
        comment: form.comment.trim()
      });
      await new Promise((resolve) => window.setTimeout(resolve, 350));
      setSent(true);
    } catch {
      setSubmitError("Не удалось отправить заявку. Проверьте данные и попробуйте еще раз.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="relative px-4 py-24">
      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-violetGlow/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-mintGlow">
            Онлайн-запись
          </p>
          <h2 className="text-3xl font-black md:text-5xl">Выберите услугу, врача и удобное время</h2>
          <p className="mt-5 text-lg leading-8 text-white/62">
            Заявка сохраняется в Supabase, если он подключен. Если env не настроен, демо-версия
            сохраняет заявки в localStorage и продолжает работать без ошибок.
          </p>

          <GlassCard className="mt-8 p-5">
            <div className="mb-4 flex items-center gap-3 text-white/75">
              <CalendarDays className="text-cyanGlow" size={20} />
              <span className="font-bold">Сводка записи</span>
            </div>
            <div className="grid gap-3 text-sm text-white/58">
              <SummaryRow label="Услуга" value={selectedService?.title ?? "Не выбрана"} />
              <SummaryRow label="Врач" value={selectedDoctor?.name ?? "Не выбран"} />
              <SummaryRow
                label="Дата"
                value={
                  form.appointmentDate && form.appointmentTime
                    ? `${form.appointmentDate} в ${form.appointmentTime}`
                    : "Не выбрана"
                }
              />
            </div>
          </GlassCard>
        </div>

        <GlassCard className="relative overflow-hidden p-5 md:p-7">
          <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-cyanGlow/10 blur-3xl" />
          <div className="relative">
            <div className="mb-7 grid grid-cols-4 gap-2">
              {steps.map((step) => {
                const done = activeStep > step.id || sent;
                const current = activeStep === step.id && !sent;
                return (
                  <div
                    key={step.id}
                    className={`rounded-[8px] border px-2 py-3 text-center text-xs transition ${
                      done
                        ? "border-mintGlow/40 bg-mintGlow/10 text-mintGlow"
                        : current
                          ? "border-cyanGlow/50 bg-cyanGlow/10 text-white"
                          : "border-white/10 bg-white/5 text-white/38"
                    }`}
                  >
                    <span className="mx-auto mb-2 grid h-6 w-6 place-items-center rounded-full bg-white/10 text-[11px]">
                      {done ? <Check size={13} /> : step.id}
                    </span>
                    {step.label}
                  </div>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16 }}
                  className="grid min-h-[560px] place-items-center text-center"
                >
                  <div>
                    <motion.div
                      initial={{ scale: 0.6 }}
                      animate={{ scale: 1 }}
                      className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-mintGlow text-ink shadow-glow"
                    >
                      <Check size={34} />
                    </motion.div>
                    <h3 className="text-3xl font-black">Заявка отправлена</h3>
                    <p className="mx-auto mt-3 max-w-sm text-white/62">
                      Администратор AqTis Dental Clinic свяжется с вами для подтверждения.
                    </p>
                    <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                      <GlowButton href="https://wa.me/77770000000">
                        <MessageCircle size={18} /> Написать в WhatsApp
                      </GlowButton>
                      <GlowButton
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setForm(initialForm);
                          setSent(false);
                        }}
                      >
                        Новая заявка
                      </GlowButton>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  onSubmit={onSubmit}
                  className="grid gap-7"
                >
                  <Fieldset title="1. Выберите услугу" error={errors.serviceId}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {availableServices.map((service) => (
                        <Choice
                          key={service.id}
                          active={form.serviceId === service.id}
                          title={service.title}
                          meta={`от ${formatPrice(service.priceFrom)} ₸ · ${service.durationMinutes} мин`}
                          onClick={() => updateField("serviceId", service.id)}
                        />
                      ))}
                    </div>
                  </Fieldset>

                  <Fieldset title="2. Выберите врача" error={errors.doctorId}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {availableDoctors.map((doctor) => (
                        <Choice
                          key={doctor.id}
                          active={form.doctorId === doctor.id}
                          title={doctor.name}
                          meta={`${doctor.specialty} · ${doctor.experienceYears} лет`}
                          onClick={() => updateField("doctorId", doctor.id)}
                        />
                      ))}
                    </div>
                  </Fieldset>

                  <Fieldset title="3. Дата и время">
                    <div className="grid gap-3 md:grid-cols-[1fr_1.4fr]">
                      <label className="block">
                        <span className="mb-2 block text-sm text-white/55">Дата</span>
                        <input
                          type="date"
                          value={form.appointmentDate}
                          min={new Date().toISOString().slice(0, 10)}
                          onChange={(event) => updateField("appointmentDate", event.target.value)}
                          className={inputClass(errors.appointmentDate)}
                        />
                        <ErrorText text={errors.appointmentDate} />
                      </label>
                      <div>
                        <span className="mb-2 block text-sm text-white/55">Время</span>
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                          {timeSlots.map((slot) => (
                            <button
                              type="button"
                              key={slot}
                              onClick={() => updateField("appointmentTime", slot)}
                              className={`rounded-[8px] border px-3 py-3 text-sm transition ${
                                form.appointmentTime === slot
                                  ? "border-cyanGlow bg-cyanGlow text-ink"
                                  : "border-white/10 bg-white/7 text-white/65 hover:border-cyanGlow/45"
                              }`}
                            >
                              <Clock className="mx-auto mb-1" size={15} />
                              {slot}
                            </button>
                          ))}
                        </div>
                        <ErrorText text={errors.appointmentTime} />
                      </div>
                    </div>
                  </Fieldset>

                  <Fieldset title="4. Контакты">
                    <div className="grid gap-3 md:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 flex items-center gap-2 text-sm text-white/55">
                          <UserRound size={15} /> Имя
                        </span>
                        <input
                          value={form.patientName}
                          onChange={(event) => updateField("patientName", event.target.value)}
                          placeholder="Ваше имя"
                          className={inputClass(errors.patientName)}
                        />
                        <ErrorText text={errors.patientName} />
                      </label>
                      <label className="block">
                        <span className="mb-2 flex items-center gap-2 text-sm text-white/55">
                          <Phone size={15} /> Телефон
                        </span>
                        <input
                          value={form.patientPhone}
                          onChange={(event) => updateField("patientPhone", event.target.value)}
                          placeholder="+7 777 000 00 00"
                          className={inputClass(errors.patientPhone)}
                        />
                        <ErrorText text={errors.patientPhone} />
                      </label>
                    </div>
                    <label className="mt-3 block">
                      <span className="mb-2 block text-sm text-white/55">Комментарий</span>
                      <textarea
                        value={form.comment}
                        onChange={(event) => updateField("comment", event.target.value)}
                        placeholder="Например: хочу записаться на чистку после 17:00"
                        rows={4}
                        className={`${inputClass()} resize-none`}
                      />
                    </label>
                  </Fieldset>

                  {submitError ? (
                    <div className="rounded-[8px] border border-roseGlow/35 bg-roseGlow/10 px-4 py-3 text-sm text-roseGlow">
                      {submitError}
                    </div>
                  ) : null}

                  <GlowButton type="submit" disabled={submitting} className="w-full shine-button">
                    {submitting ? "Отправляем заявку..." : "Записаться"}
                  </GlowButton>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-3 last:border-b-0 last:pb-0">
      <span>{label}</span>
      <span className="text-right font-semibold text-white">{value}</span>
    </div>
  );
}

function Fieldset({
  title,
  error,
  children
}: {
  title: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <div className="mb-3 flex items-center justify-between gap-3">
        <legend className="text-lg font-black">{title}</legend>
        <ErrorText text={error} />
      </div>
      {children}
    </fieldset>
  );
}

function Choice({
  active,
  title,
  meta,
  onClick
}: {
  active: boolean;
  title: string;
  meta: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[8px] border p-4 text-left transition duration-300 hover:-translate-y-0.5 ${
        active
          ? "border-cyanGlow bg-cyanGlow/14 shadow-glow"
          : "border-white/10 bg-white/7 hover:border-cyanGlow/45"
      }`}
    >
      <span className="block font-bold">{title}</span>
      <span className="mt-2 block text-sm text-white/55">{meta}</span>
    </button>
  );
}

function inputClass(error?: string) {
  return `w-full rounded-[8px] border bg-white/8 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-cyanGlow/70 ${
    error ? "border-roseGlow/70" : "border-white/10"
  }`;
}

function ErrorText({ text }: { text?: string }) {
  if (!text) return null;
  return <span className="text-xs font-medium text-roseGlow">{text}</span>;
}
