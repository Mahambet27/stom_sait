import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 font-bold text-white">
          <Sparkles size={18} className="text-cyanGlow" />
          AqTis Dental Clinic
        </div>
        <p>Демо-версия стоматологического сайта с онлайн-записью, админкой и AI-помощником.</p>
      </div>
    </footer>
  );
}
