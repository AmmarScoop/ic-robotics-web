"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import type { Stat } from "@/lib/data";

export function StatCard({ stat, index = 0 }: { stat: Stat; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(stat.value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.value]);

  return (
    <div
      ref={ref}
      className="card-surface flex flex-col items-center gap-1 px-4 py-8 text-center transition hover:-translate-y-1 hover:shadow-glow"
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <span className="text-3xl font-extrabold text-brand-600 sm:text-4xl">
        {stat.prefix}{n.toLocaleString()}{stat.suffix}
      </span>
      <span className="text-sm font-medium text-slate-500">{stat.label}</span>
    </div>
  );
}
