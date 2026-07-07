# AqTis Dental Clinic Demo

Демо-сайт стоматологической клиники с услугами, врачами, онлайн-записью, админ-панелью и мобильной адаптацией.

## Команды запуска

```bash
npm.cmd install
npm.cmd run dev
npm.cmd run build
```

## Админка

URL: `/admin/login`

Демо-пароль: `dentflow`

## Env для Vercel

Добавьте переменные окружения в настройках проекта Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_DEMO_ADMIN_PASSWORD
```

Если Supabase не настроен, проект использует `localStorage` fallback.
