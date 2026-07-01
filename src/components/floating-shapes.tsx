"use client";
import { motion } from "framer-motion";

const shapes = [
  { c: "bg-brand-200/50", s: "h-16 w-16 rounded-2xl", x: "8%", y: "18%", d: 0 },
  { c: "bg-accent-300/60", s: "h-10 w-10 rounded-full", x: "82%", y: "12%", d: 1 },
  { c: "bg-grape-300/50", s: "h-20 w-20 rounded-[38%]", x: "88%", y: "62%", d: 0.6 },
  { c: "bg-brand-300/40", s: "h-8 w-8 rounded-lg rotate-45", x: "14%", y: "72%", d: 1.4 },
  { c: "bg-accent-400/50", s: "h-6 w-6 rounded-full", x: "50%", y: "8%", d: 0.9 },
];

export function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {shapes.map((sh, i) => (
        <motion.div
          key={i}
          className={`absolute ${sh.s} ${sh.c} blur-[1px]`}
          style={{ left: sh.x, top: sh.y }}
          animate={{ y: [0, -18, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6 + sh.d * 2, repeat: Infinity, ease: "easeInOut", delay: sh.d }}
        />
      ))}
    </div>
  );
}
