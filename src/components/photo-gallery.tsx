"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { mediaSrc } from "@/lib/media-src";
import { cn } from "@/lib/utils";

/** Responsive photo grid with a full-screen viewer. Renders nothing when there are no photos. */
export function PhotoGallery({ photos, alt = "Photo", className, max }: { photos: string[]; alt?: string; className?: string; max?: number }) {
  const list = (photos ?? []).filter(Boolean);
  const [open, setOpen] = useState<number | null>(null);
  const shown = max ? list.slice(0, max) : list;
  const extra = list.length - shown.length;

  useEffect(() => {
    if (open === null) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % list.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + list.length) % list.length));
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, list.length]);

  if (list.length === 0) return null;
  return (
    <>
      <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3", className)}>
        {shown.map((p, i) => (
          <button key={p + i} type="button" onClick={() => setOpen(i)} className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mediaSrc(p)} alt={`${alt} ${i + 1}`} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105" />
            {extra > 0 && i === shown.length - 1 && (
              <span className="absolute inset-0 flex items-center justify-center bg-ink/60 text-lg font-bold text-white">+{extra}</span>
            )}
          </button>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)} role="dialog" aria-modal="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mediaSrc(list[open])} alt={`${alt} ${open + 1}`} className="max-h-[85vh] max-w-full rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
            <button className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20" aria-label="Close" onClick={() => setOpen(null)}><X className="h-5 w-5" /></button>
            {list.length > 1 && (
              <>
                <button className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20" aria-label="Previous" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + list.length) % list.length); }}><ChevronLeft className="h-6 w-6" /></button>
                <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20" aria-label="Next" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % list.length); }}><ChevronRight className="h-6 w-6" /></button>
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70">{open + 1} / {list.length}</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
