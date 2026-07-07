"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";

export function Modal({
  title,
  open,
  onClose,
  children
}: {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-ink/70 p-4 backdrop-blur">
      <div className="glass max-h-[calc(100vh-2rem)] w-full max-w-xl overflow-y-auto rounded-[8px] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-black">{title}</h3>
          <button
            aria-label="Закрыть"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-[8px] bg-white/8 text-white/70 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
