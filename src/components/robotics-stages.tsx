"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Target, Trophy, Wrench, X, Cpu, ChevronRight, Puzzle, Sparkles, ListChecks, PlayCircle } from "lucide-react";
import { PhotoGallery } from "@/components/photo-gallery";
import { VideoBlock } from "@/components/video-block";
import { mediaSrc } from "@/lib/media-src";
import { cn } from "@/lib/utils";
import type { Kit, RoboticsStage } from "@/lib/site-defaults";

const BLOCKS = [
  { key: "teach", label: "What We Teach", icon: BookOpen, tone: "bg-brand-50 text-brand-700" },
  { key: "objectives", label: "Learning Objectives", icon: Target, tone: "bg-grape-50 text-grape-700" },
  { key: "outcomes", label: "Learning Outcomes", icon: Trophy, tone: "bg-accent-50 text-accent-700" },
  { key: "activities", label: "Practical Activities", icon: Wrench, tone: "bg-emerald-50 text-emerald-700" },
] as const;

export function RoboticsStages({ stages }: { stages: RoboticsStage[] }) {
  const list = stages.filter((s) => s.tab || s.title);
  const [active, setActive] = useState(list[0]?.id ?? "");
  const [kit, setKit] = useState<Kit | null>(null);

  useEffect(() => {
    const pick = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id && list.some((s) => s.id === id)) setActive(id);
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, [list]);

  const stage = list.find((s) => s.id === active) ?? list[0];
  if (!stage) return null;

  return (
    <div>
      {/* Stage tabs */}
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2" role="tablist" aria-label="Robotics stages">
        {list.map((s) => {
          const on = s.id === stage.id;
          return (
            <button key={s.id} role="tab" aria-selected={on}
              onClick={() => { setActive(s.id); history.replaceState(null, "", `#${s.id}`); }}
              className={cn("shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition",
                on ? "border-brand-600 bg-gradient-to-r from-brand-600 to-grape-500 text-white shadow-soft" : "border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:text-brand-700")}>
              {s.tab || s.title}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={stage.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}
          className="mt-6 card-surface p-6 sm:p-8" role="tabpanel">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-2xl font-extrabold text-ink">{stage.title}</h3>
              {stage.summary && <p className="mt-2 max-w-2xl text-slate-600">{stage.summary}</p>}
            </div>
            {stage.grades && <span className="w-fit shrink-0 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700">{stage.grades}</span>}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {BLOCKS.map((b) => {
              const items = (stage[b.key] as string[]).filter(Boolean);
              if (!items.length) return null;
              return (
                <div key={b.key} className="rounded-2xl border border-slate-100 p-5">
                  <p className="flex items-center gap-2 font-bold text-ink">
                    <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg", b.tone)}><b.icon className="h-4 w-4" /></span>
                    {b.label}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {items.map((x) => <li key={x} className="flex items-start gap-2 text-sm text-slate-700"><ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" /> {x}</li>)}
                  </ul>
                </div>
              );
            })}
          </div>

          {stage.kits.filter((k) => k.name).length > 0 && (
            <div className="mt-10">
              <h4 className="flex items-center gap-2 text-lg font-bold text-ink"><Cpu className="h-5 w-5 text-brand-600" /> Robotics kits we use in this stage</h4>
              <p className="mt-1 text-sm text-slate-500">Click a kit to see what's inside, the skills it builds and what students make with it.</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stage.kits.filter((k) => k.name).map((k, i) => (
                  <button key={k.name + i} onClick={() => setKit(k)}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft">
                    <div className={cn("flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-grape-50", k.image ? "aspect-[4/3]" : "h-28")}>
                      {k.image
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <img src={mediaSrc(k.image)} alt={k.name} className="h-full w-full object-contain p-4" />
                        : <Cpu className="h-10 w-10 text-brand-300" />}
                    </div>
                    <div className="flex items-center justify-between gap-2 p-4">
                      <div className="min-w-0">
                        <p className="truncate font-bold text-ink">{k.name}</p>
                        {k.ages && <p className="text-xs text-slate-500">{k.ages}</p>}
                      </div>
                      <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-700">Details <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {stage.photos.filter(Boolean).length > 0 && (
            <div className="mt-10">
              <h4 className="text-lg font-bold text-ink">Our students in schools</h4>
              <PhotoGallery photos={stage.photos} alt={`${stage.title} students`} className="mt-4" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>{kit && <KitModal kit={kit} onClose={() => setKit(null)} />}</AnimatePresence>
    </div>
  );
}

function KitModal({ kit, onClose }: { kit: Kit; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);

  const sections = [
    { label: "Components & tools inside", items: kit.components, icon: Puzzle },
    { label: "Skills students learn", items: kit.skills, icon: Sparkles },
    { label: "Activities & projects", items: kit.activities, icon: Wrench },
    { label: "Learning results", items: kit.outcomes, icon: ListChecks },
  ].filter((x) => x.items.filter(Boolean).length);

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto p-4 sm:p-8">
      <motion.div className="fixed inset-0 bg-ink/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div role="dialog" aria-modal="true" aria-label={kit.name}
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-glow"
        initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }}>
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-slate-500 shadow hover:text-ink"><X className="h-5 w-5" /></button>
        <div className="grid sm:grid-cols-[1fr_1.2fr]">
          <div className="flex min-h-[200px] items-center justify-center bg-gradient-to-br from-brand-50 via-white to-grape-50 p-6">
            {kit.image
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={mediaSrc(kit.image)} alt={kit.name} className="max-h-64 w-full object-contain" />
              : <Cpu className="h-20 w-20 text-brand-300" />}
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Robotics kit</p>
            <h3 className="mt-1 text-2xl font-extrabold text-ink">{kit.name}</h3>
            {kit.ages && <p className="mt-1 text-sm font-semibold text-slate-500">Suitable for: {kit.ages}</p>}
            {kit.summary && <p className="mt-3 text-slate-600">{kit.summary}</p>}
          </div>
        </div>
        {sections.length > 0 && (
          <div className="grid gap-4 border-t border-slate-100 p-6 sm:grid-cols-2 sm:p-8">
            {sections.map((sec) => (
              <div key={sec.label}>
                <p className="flex items-center gap-2 text-sm font-bold text-ink"><sec.icon className="h-4 w-4 text-brand-600" /> {sec.label}</p>
                <ul className="mt-2 space-y-1.5">
                  {sec.items.filter(Boolean).map((x) => <li key={x} className="flex items-start gap-2 text-sm text-slate-600"><ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" /> {x}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}
        {kit.video && (
          <div className="border-t border-slate-100 p-6 sm:p-8">
            <p className="mb-3 flex items-center gap-2 text-sm font-bold text-ink"><PlayCircle className="h-4 w-4 text-grape-600" /> See it in action</p>
            <VideoBlock src={kit.video} label={`${kit.name} video`} className="aspect-video" tone="grape" />
          </div>
        )}
      </motion.div>
    </div>
  );
}
