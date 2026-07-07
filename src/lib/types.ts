export type Service = {
  id: string;
  title: string;
  description: string;
  priceFrom: number;
  durationMinutes: number;
  icon: string;
  isActive: boolean;
  popular?: boolean;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experienceYears: number;
  rating: number;
  imageUrl?: string;
  description?: string;
  isActive: boolean;
};

export type AppointmentStatus = "new" | "confirmed" | "cancelled" | "completed";

export type Appointment = {
  id: string;
  patientName: string;
  patientPhone: string;
  serviceId: string;
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  comment?: string;
  status: AppointmentStatus;
  createdAt: string;
};

export type AppointmentInput = Omit<Appointment, "id" | "status" | "createdAt">;
