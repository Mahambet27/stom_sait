import { doctors as seedDoctors, services as seedServices } from "@/lib/data";
import { isSupabaseConfigured, supabase, warnSupabaseFallback } from "@/lib/supabaseClient";
import type { Appointment, AppointmentInput, AppointmentStatus, Doctor, Service } from "@/lib/types";

const keys = {
  services: "dentflow_services",
  doctors: "dentflow_doctors",
  appointments: "dentflow_appointments"
};

type ServiceRow = {
  id: string;
  title: string;
  description: string | null;
  price_from: number | null;
  duration_minutes: number | null;
  icon: string | null;
  is_active: boolean | null;
};

type DoctorRow = {
  id: string;
  name: string;
  specialty: string | null;
  experience_years: number | null;
  rating: number | null;
  image_url: string | null;
  description: string | null;
  is_active: boolean | null;
};

type AppointmentRow = {
  id: string;
  patient_name: string;
  patient_phone: string;
  service_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  comment: string | null;
  status: AppointmentStatus;
  created_at: string;
};

function canUseLocalStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function readLocal<T>(key: string, fallback: T): T {
  if (!canUseLocalStorage()) return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) {
    writeLocal(key, fallback);
    return fallback;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    writeLocal(key, fallback);
    return fallback;
  }
}

function writeLocal<T>(key: string, value: T) {
  if (!canUseLocalStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function mapService(row: ServiceRow): Service {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    priceFrom: row.price_from ?? 0,
    durationMinutes: row.duration_minutes ?? 0,
    icon: row.icon ?? "sparkles",
    isActive: row.is_active ?? true
  };
}

function mapServiceToRow(service: Service) {
  return {
    id: service.id,
    title: service.title,
    description: service.description,
    price_from: service.priceFrom,
    duration_minutes: service.durationMinutes,
    icon: service.icon,
    is_active: service.isActive
  };
}

function mapDoctor(row: DoctorRow): Doctor {
  return {
    id: row.id,
    name: row.name,
    specialty: row.specialty ?? "",
    experienceYears: row.experience_years ?? 0,
    rating: row.rating ?? 5,
    imageUrl: row.image_url ?? undefined,
    description: row.description ?? undefined,
    isActive: row.is_active ?? true
  };
}

function mapDoctorToRow(doctor: Doctor) {
  return {
    id: doctor.id,
    name: doctor.name,
    specialty: doctor.specialty,
    experience_years: doctor.experienceYears,
    rating: doctor.rating,
    image_url: doctor.imageUrl ?? null,
    description: doctor.description ?? null,
    is_active: doctor.isActive
  };
}

function mapAppointment(row: AppointmentRow): Appointment {
  return {
    id: row.id,
    patientName: row.patient_name,
    patientPhone: row.patient_phone,
    serviceId: row.service_id,
    doctorId: row.doctor_id,
    appointmentDate: row.appointment_date,
    appointmentTime: row.appointment_time,
    comment: row.comment ?? "",
    status: row.status,
    createdAt: row.created_at
  };
}

function mapAppointmentInput(input: AppointmentInput) {
  return {
    patient_name: input.patientName,
    patient_phone: input.patientPhone,
    service_id: input.serviceId,
    doctor_id: input.doctorId,
    appointment_date: input.appointmentDate,
    appointment_time: input.appointmentTime,
    comment: input.comment ?? null
  };
}

export async function getServices(): Promise<Service[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from("services").select("*").order("created_at");
      if (error) throw error;
      return ((data ?? []) as ServiceRow[]).map(mapService);
    } catch (error) {
      console.warn("Failed to load services from Supabase, using localStorage fallback", error);
    }
  }
  warnSupabaseFallback();
  return readLocal<Service[]>(keys.services, seedServices);
}

export async function getDoctors(): Promise<Doctor[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from("doctors").select("*").order("created_at");
      if (error) throw error;
      return ((data ?? []) as DoctorRow[]).map(mapDoctor);
    } catch (error) {
      console.warn("Failed to load doctors from Supabase, using localStorage fallback", error);
    }
  }
  warnSupabaseFallback();
  return readLocal<Doctor[]>(keys.doctors, seedDoctors);
}

export async function getAppointments(): Promise<Appointment[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return ((data ?? []) as AppointmentRow[]).map(mapAppointment);
    } catch (error) {
      console.warn("Failed to load appointments from Supabase, using localStorage fallback", error);
    }
  }
  warnSupabaseFallback();
  return readLocal<Appointment[]>(keys.appointments, []);
}

export async function createAppointment(input: AppointmentInput): Promise<Appointment> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .insert(mapAppointmentInput(input))
        .select("*")
        .single();
      if (error) throw error;
      return mapAppointment(data as AppointmentRow);
    } catch (error) {
      console.warn("Failed to create appointment in Supabase, using localStorage fallback", error);
    }
  }
  warnSupabaseFallback();
  const appointments = readLocal<Appointment[]>(keys.appointments, []);
  const appointment: Appointment = {
    ...input,
    id: createId(),
    status: "new",
    createdAt: new Date().toISOString()
  };
  const next = [appointment, ...appointments];
  writeLocal(keys.appointments, next);
  return appointment;
}

export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
      if (error) throw error;
      return;
    } catch (error) {
      console.warn("Failed to update appointment in Supabase, using localStorage fallback", error);
    }
  }
  warnSupabaseFallback();
  const appointments = readLocal<Appointment[]>(keys.appointments, []);
  writeLocal(
    keys.appointments,
    appointments.map((appointment) =>
      appointment.id === id ? { ...appointment, status } : appointment
    )
  );
}

export async function deleteAppointment(id: string) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("appointments").delete().eq("id", id);
      if (error) throw error;
      return;
    } catch (error) {
      console.warn("Failed to delete appointment in Supabase, using localStorage fallback", error);
    }
  }
  warnSupabaseFallback();
  const appointments = readLocal<Appointment[]>(keys.appointments, []);
  writeLocal(
    keys.appointments,
    appointments.filter((appointment) => appointment.id !== id)
  );
}

export async function saveService(service: Service) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("services").upsert(mapServiceToRow(service));
      if (error) throw error;
      return;
    } catch (error) {
      console.warn("Failed to save service in Supabase, using localStorage fallback", error);
    }
  }
  warnSupabaseFallback();
  const current = readLocal<Service[]>(keys.services, seedServices);
  const next = current.some((item) => item.id === service.id)
    ? current.map((item) => (item.id === service.id ? service : item))
    : [service, ...current];
  writeLocal(keys.services, next);
}

export async function deleteService(id: string) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
      return;
    } catch (error) {
      console.warn("Failed to delete service in Supabase, using localStorage fallback", error);
    }
  }
  warnSupabaseFallback();
  writeLocal(
    keys.services,
    readLocal<Service[]>(keys.services, seedServices).filter((service) => service.id !== id)
  );
}

export async function saveDoctor(doctor: Doctor) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("doctors").upsert(mapDoctorToRow(doctor));
      if (error) throw error;
      return;
    } catch (error) {
      console.warn("Failed to save doctor in Supabase, using localStorage fallback", error);
    }
  }
  warnSupabaseFallback();
  const current = readLocal<Doctor[]>(keys.doctors, seedDoctors);
  const next = current.some((item) => item.id === doctor.id)
    ? current.map((item) => (item.id === doctor.id ? doctor : item))
    : [doctor, ...current];
  writeLocal(keys.doctors, next);
}

export async function deleteDoctor(id: string) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("doctors").delete().eq("id", id);
      if (error) throw error;
      return;
    } catch (error) {
      console.warn("Failed to delete doctor in Supabase, using localStorage fallback", error);
    }
  }
  warnSupabaseFallback();
  writeLocal(
    keys.doctors,
    readLocal<Doctor[]>(keys.doctors, seedDoctors).filter((doctor) => doctor.id !== id)
  );
}

export function makeLocalId(prefix: string) {
  void prefix;
  return createId();
}
