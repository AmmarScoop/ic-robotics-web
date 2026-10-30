import { Award, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { mediaSrc } from "@/lib/media-src";
import type { Accreditation } from "@/lib/site-defaults";

export function AccreditationCards({ items }: { items: Accreditation[] }) {
  const list = items.filter((a) => a.name);
  if (!list.length) return null;
  return (
    <div className={`grid gap-5 ${list.length > 1 ? "md:grid-cols-2" : ""}`}>
      {list.map((a, i) => (
        <Reveal key={a.name + i} delay={i * 0.06}>
          <div className="card-surface flex h-full items-center gap-5 p-6">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-white">
              {a.logo
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={mediaSrc(a.logo)} alt={`${a.name} logo`} className="h-full w-full object-contain p-2" />
                : <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-500 to-grape-600 text-white"><Award className="h-9 w-9" /></span>}
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-extrabold text-ink">{a.name}</h3>
              {a.description && <p className="mt-1 text-sm leading-relaxed text-slate-600" dir="auto">{a.description}</p>}
              {a.link && (
                <a href={a.link} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:underline">
                  Learn more <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
