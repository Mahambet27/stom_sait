"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShow(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative grid place-items-center">
            <motion.div
              className="absolute h-32 w-32 rounded-full border border-cyanGlow/40"
              animate={{ scale: [0.85, 1.18, 0.85], opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute h-52 w-52 rounded-full border border-violetGlow/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <div className="glass z-10 flex items-center gap-3 rounded-[8px] px-6 py-4">
              <Sparkles className="text-cyanGlow" size={24} />
              <div>
                <p className="text-sm text-white/55">загрузка сайта клиники</p>
                <p className="text-lg font-bold tracking-[0.18em]">AqTis Dental</p>
              </div>
            </div>
            <motion.div
              className="mt-36 h-1 w-56 rounded-full bg-gradient-to-r from-cyanGlow via-violetGlow to-roseGlow"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.05, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
