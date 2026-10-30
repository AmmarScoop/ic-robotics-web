"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, MessageCircle, FileText, Target } from "lucide-react";
import { Icon } from "@/components/icon";
import { PhotoGallery } from "@/components/photo-gallery";
import { mediaSrc } from "@/lib/media-src";
import { contractingMessage, whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import type { ContractSystem } from "@/lib/site-defaults";

export function ContractingSystems({ systems, whatsapp }: { systems: ContractSystem[]; whatsapp: string }) {
  const list = systems.filter((s) => s.title);
  const [active, setActive] = useState(list[0]?.id ?? "");

  // Deep links: /contracting-systems#event-booking
  useEffect(() => {
    const pick = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id && list.some((s) => s.id === id)) setActive(id);
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, [list]);

  function choose(id: string) {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
    if (window.innerWidth < 1024) document.getElementById("system-details")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const sys = list.find((s) => s.id === active) ?? list[0];
  if (!sys) return null;
  const href = whatsappLink(whatsapp, contractingMessage(sys.title, sys.arabic, sys.message));

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
      {/* System picker */}
      <div className="grid content-start gap-3" role="tablist" aria-label="Contracting systems">
        {list.map((s, i) => {
          const on = s.id === sys.id;
          return (
            <button key={s.id} role="tab" aria-selected={on} onClick={() => choose(s.id)}
              className={cn("flex items-start gap-4 rounded-2xl border p-4 text-left transition",
                on ? "border-brand-300 bg-white shadow-glow" : "border-slate-200 bg-white/70 hover:border-brand-200 hover:bg-white")}>
              <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white", on ? "bg-gradient-to-br from-brand-600 to-grape-500" : "bg-slate-300")}>
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-xs font-bold text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-bold text-ink">{s.title}</span>
                  {s.arabic && <span className="text-sm text-slate-500" dir="rtl">{s.arabic}</span>}
                </span>
                <span className="mt-0.5 block text-sm text-slate-600">{s.summary}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Details */}
      <div id="system-details" className="scroll-mt-28">
        <AnimatePresence mode="wait">
          <motion.div key={sys.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
            className="card-surface overflow-hidden p-0" role="tabpanel">
            {sys.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={mediaSrc(sys.image)} alt={sys.title} className="aspect-[16/7] w-full object-cover" />
            ) : (
              <div className="flex items-center gap-4 bg-gradient-to-r from-brand-600 to-grape-600 p-7 text-white">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15"><Icon name={sys.icon} className="h-7 w-7" /></span>
                <div>
                  <p className="text-2xl font-extrabold">{sys.title}</p>
                  {sys.arabic && <p className="text-left text-white/80" dir="rtl">{sys.arabic}</p>}
                </div>
              </div>
            )}
            <div className="p-7">
              {sys.image && (
                <div className="mb-4">
                  <p className="text-2xl font-extrabold text-ink">{sys.title}</p>
                  {sys.arabic && <p className="text-left text-slate-500" dir="rtl">{sys.arabic}</p>}
                </div>
              )}
              {sys.details.filter(Boolean).map((d, i) => <p key={i} className="mb-3 text-slate-700" dir="auto">{d}</p>)}

              {sys.includes.length > 0 && (
                <>
                  <p className="mt-6 text-xs font-bold uppercase tracking-wide text-slate-400">What&apos;s included</p>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {sys.includes.map((x) => <li key={x} className="flex items-start gap-2 text-sm text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {x}</li>)}
                  </ul>
                </>
              )}
              {sys.bestFor && (
                <p className="mt-6 flex items-start gap-2 rounded-2xl bg-brand-50 p-4 text-sm text-brand-800"><Target className="mt-0.5 h-4 w-4 shrink-0" /> <span><b>Best for:</b> {sys.bestFor}</span></p>
              )}
              <PhotoGallery photos={sys.photos} alt={sys.title} className="mt-6" />

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href={href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-base font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#1ebe5b]">
                  <MessageCircle className="h-5 w-5" /> {sys.buttonLabel || "Request this system"}
                </a>
                {sys.presentation && (
                  <a href={mediaSrc(sys.presentation)} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-200 px-6 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50">
                    <FileText className="h-4 w-4" /> View presentation
                  </a>
                )}
              </div>
              <p className="mt-3 text-xs text-slate-400">Opens WhatsApp with a ready message to our School Department — just add your school&apos;s name and send.</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
