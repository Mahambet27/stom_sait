import type { Doctor, Service } from "@/lib/types";

export const services: Service[] = [
  {
    id: "consultation",
    title: "Консультация стоматолога",
    description: "Осмотр, диагностика, понятный план лечения и ответы на вопросы перед началом процедур.",
    priceFrom: 5000,
    durationMinutes: 30,
    icon: "stethoscope",
    isActive: true,
    popular: true
  },
  {
    id: "cleaning",
    title: "Профессиональная чистка",
    description: "AirFlow, ультразвук и полировка для профилактики, свежего дыхания и гладкой эмали.",
    priceFrom: 18000,
    durationMinutes: 60,
    icon: "sparkles",
    isActive: true,
    popular: true
  },
  {
    id: "caries",
    title: "Лечение кариеса",
    description: "Бережное лечение, эстетичные пломбы и подбор оттенка под естественный цвет зуба.",
    priceFrom: 25000,
    durationMinutes: 60,
    icon: "shield",
    isActive: true,
    popular: true
  },
  {
    id: "extraction",
    title: "Удаление зуба",
    description: "Аккуратная хирургия с обезболиванием, рекомендациями и контролем после приема.",
    priceFrom: 20000,
    durationMinutes: 45,
    icon: "activity",
    isActive: true
  },
  {
    id: "whitening",
    title: "Отбеливание зубов",
    description: "Контролируемое осветление улыбки с учетом чувствительности и состояния эмали.",
    priceFrom: 45000,
    durationMinutes: 90,
    icon: "sun",
    isActive: true
  },
  {
    id: "implantation",
    title: "Имплантация",
    description: "Консультация хирурга, планирование и восстановление зуба на импланте.",
    priceFrom: 180000,
    durationMinutes: 120,
    icon: "cross",
    isActive: true
  },
  {
    id: "orthodontics",
    title: "Брекеты / ортодонтия",
    description: "Коррекция прикуса, брекеты и элайнеры для взрослых и подростков.",
    priceFrom: 250000,
    durationMinutes: 40,
    icon: "scan",
    isActive: true
  },
  {
    id: "kids",
    title: "Детская стоматология",
    description: "Мягкий прием, профилактика и лечение молочных зубов без лишнего стресса.",
    priceFrom: 12000,
    durationMinutes: 40,
    icon: "heart",
    isActive: true
  }
];

export const doctors: Doctor[] = [
  {
    id: "aidana",
    name: "Айдана Сейткалиева",
    specialty: "терапевт-стоматолог",
    experienceYears: 8,
    rating: 4.9,
    imageUrl: "/images/demo/doctor-aidana.svg",
    description: "Лечение кариеса, реставрация зубов, консультация взрослых пациентов.",
    isActive: true
  },
  {
    id: "erlan",
    name: "Ерлан Мухамедов",
    specialty: "хирург-имплантолог",
    experienceYears: 12,
    rating: 5,
    imageUrl: "/images/demo/doctor-erlan.svg",
    description: "Удаление зубов, имплантация, хирургическая подготовка.",
    isActive: true
  },
  {
    id: "madina",
    name: "Мадина Оразова",
    specialty: "ортодонт",
    experienceYears: 9,
    rating: 4.8,
    imageUrl: "/images/demo/doctor-madina.svg",
    description: "Брекеты, элайнеры, исправление прикуса у взрослых и подростков.",
    isActive: true
  },
  {
    id: "timur",
    name: "Тимур Ахметов",
    specialty: "детский стоматолог",
    experienceYears: 6,
    rating: 4.9,
    imageUrl: "/images/demo/doctor-timur.svg",
    description: "Мягкий подход к детям, профилактика, лечение молочных зубов.",
    isActive: true
  },
  {
    id: "aliya",
    name: "Алия Нурланова",
    specialty: "эстетическая стоматология",
    experienceYears: 10,
    rating: 5,
    imageUrl: "/images/demo/doctor-aliya.svg",
    description: "Отбеливание, виниры, эстетические реставрации.",
    isActive: true
  }
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("ru-KZ").format(value);
