create extension if not exists pgcrypto;

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  price_from integer,
  duration_minutes integer,
  icon text,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

create table if not exists doctors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  specialty text,
  experience_years integer,
  rating numeric default 5,
  image_url text,
  description text,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  patient_name text not null,
  patient_phone text not null,
  service_id uuid references services(id),
  doctor_id uuid references doctors(id),
  appointment_date date not null,
  appointment_time text not null,
  comment text,
  status text default 'new' check (status in ('new', 'confirmed', 'cancelled', 'completed')),
  created_at timestamp with time zone default now()
);

insert into services (title, description, price_from, duration_minutes, icon)
values
  ('Консультация стоматолога', 'Осмотр, диагностика, понятный план лечения и ответы на вопросы перед началом процедур.', 5000, 30, 'stethoscope'),
  ('Профессиональная чистка', 'AirFlow, ультразвук и полировка для профилактики, свежего дыхания и гладкой эмали.', 18000, 60, 'sparkles'),
  ('Лечение кариеса', 'Бережное лечение, эстетичные пломбы и подбор оттенка под естественный цвет зуба.', 25000, 60, 'shield'),
  ('Удаление зуба', 'Аккуратная хирургия с обезболиванием, рекомендациями и контролем после приема.', 20000, 45, 'activity'),
  ('Отбеливание зубов', 'Контролируемое осветление улыбки с учетом чувствительности и состояния эмали.', 45000, 90, 'sun'),
  ('Имплантация', 'Консультация хирурга, планирование и восстановление зуба на импланте.', 180000, 120, 'cross'),
  ('Брекеты / ортодонтия', 'Коррекция прикуса, брекеты и элайнеры для взрослых и подростков.', 250000, 40, 'scan'),
  ('Детская стоматология', 'Мягкий прием, профилактика и лечение молочных зубов без лишнего стресса.', 12000, 40, 'heart')
on conflict do nothing;

insert into doctors (name, specialty, experience_years, rating, image_url, description)
values
  ('Айдана Сейткалиева', 'терапевт-стоматолог', 8, 4.9, '/images/demo/doctor-aidana.svg', 'Лечение кариеса, реставрация зубов, консультация взрослых пациентов.'),
  ('Ерлан Мухамедов', 'хирург-имплантолог', 12, 5, '/images/demo/doctor-erlan.svg', 'Удаление зубов, имплантация, хирургическая подготовка.'),
  ('Мадина Оразова', 'ортодонт', 9, 4.8, '/images/demo/doctor-madina.svg', 'Брекеты, элайнеры, исправление прикуса у взрослых и подростков.'),
  ('Тимур Ахметов', 'детский стоматолог', 6, 4.9, '/images/demo/doctor-timur.svg', 'Мягкий подход к детям, профилактика, лечение молочных зубов.'),
  ('Алия Нурланова', 'эстетическая стоматология', 10, 5, '/images/demo/doctor-aliya.svg', 'Отбеливание, виниры, эстетические реставрации.')
on conflict do nothing;
