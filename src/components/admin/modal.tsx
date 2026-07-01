"use client";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Modal({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8">
          <motion.div className="fixed inset-0 bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-lg rounded-3xl bg-white p-6 shadow-glow"
            initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }}
            role="dialog" aria-modal="true" aria-label={title}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-ink">{title}</h2>
              <button onClick={onClose} aria-label="Close" className="rounded-lg p-1 text-slate-400 hover:text-ink"><X className="h-5 w-5" /></button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
