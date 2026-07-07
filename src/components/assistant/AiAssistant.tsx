"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X } from "lucide-react";
import { FormEvent, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

const quickPrompts = ["Цены", "Записаться", "Детский прием", "Болит зуб"];

function answerFor(message: string) {
  const normalized = message.toLowerCase();
  if (normalized.includes("чист") || normalized.includes("цен")) {
    return "Профессиональная чистка начинается от 18 000 ₸. Обычно процедура длится около 60 минут.";
  }
  if (normalized.includes("бол") || normalized.includes("зуб")) {
    return "Я не ставлю диагноз, но при боли лучше записаться на консультацию стоматолога как можно скорее.";
  }
  if (normalized.includes("сегодня") || normalized.includes("можно") || normalized.includes("запис")) {
    return "Вы можете выбрать удобное время в форме онлайн-записи, а администратор подтвердит запись.";
  }
  if (normalized.includes("имплан")) {
    return "Имплантация начинается от 180 000 ₸. Для точного плана нужна консультация хирурга-имплантолога.";
  }
  if (normalized.includes("дет")) {
    return "В клинике есть детский стоматолог. Можно выбрать детскую стоматологию в форме записи.";
  }
  return "Я AqTis Dental Assistant. Могу подсказать цены, врачей и направить к онлайн-записи, но диагнозы и медицинские заключения не ставлю.";
}

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Здравствуйте! Я AqTis Dental Assistant. Подскажу по услугам и помогу перейти к записи."
    }
  ]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((current) => [
      ...current,
      { role: "user", text: trimmed },
      { role: "assistant", text: answerFor(trimmed) }
    ]);
    setInput("");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <button
        aria-label="Открыть AqTis Dental Assistant"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-white text-ink shadow-glow transition hover:-translate-y-1 hover:bg-cyanGlow"
      >
        <Bot size={24} />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.aside
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.96 }}
            className="fixed bottom-24 right-4 z-50 flex h-[560px] max-h-[calc(100vh-8rem)] w-[calc(100vw-2rem)] max-w-sm flex-col rounded-[8px] border border-white/12 bg-ink/90 shadow-soft backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-[8px] bg-cyanGlow/16 text-cyanGlow">
                  <Bot size={20} />
                </span>
                <div>
                  <p className="font-bold">AqTis Dental Assistant</p>
                  <p className="text-xs text-white/45">demo answers, no API</p>
                </div>
              </div>
              <button
                aria-label="Закрыть помощника"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-[8px] bg-white/8 text-white/70 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[86%] rounded-[8px] px-3 py-2 text-sm leading-6 ${
                    message.role === "assistant"
                      ? "bg-white/10 text-white/75"
                      : "ml-auto bg-cyanGlow text-ink"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/65 transition hover:border-cyanGlow/50 hover:text-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <form onSubmit={onSubmit} className="flex gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Спросите про услугу..."
                  className="min-w-0 flex-1 rounded-[8px] border border-white/10 bg-white/8 px-3 py-3 text-sm outline-none transition placeholder:text-white/35 focus:border-cyanGlow/60"
                />
                <button
                  aria-label="Отправить"
                  className="grid h-12 w-12 place-items-center rounded-[8px] bg-white text-ink transition hover:bg-cyanGlow disabled:opacity-50"
                  disabled={!input.trim()}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
