import { CalendarDays, GraduationCap, MapPin, Medal, Users, Activity, School } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { mediaSrc } from "@/lib/media-src";
import { cn } from "@/lib/utils";
import type { SchoolStory } from "@/lib/site-defaults";

/** A partner school: real building photo, location and (verified) statistics. Empty stats are hidden. */
export function SchoolCard({ s, featured = false }: { s: SchoolStory; featured?: boolean }) {
  const programs = (s.programs ?? []).filter(Boolean);
  const achievements = (s.achievements ?? []).filter(Boolean);
  const stats = [
    s.students && { icon: Users, label: "Students", value: s.students },
    s.since && { icon: CalendarDays, label: "Partner since", value: s.since },
    s.participation && { icon: Activity, label: "Student participation", value: s.participation },
  ].filter(Boolean) as { icon: typeof Users; label: string; value: string }[];

  return (
    <Reveal className="h-full">
      <article className={cn("card-surface flex h-full flex-col overflow-hidden p-0", featured && "ring-2 ring-brand-100")}>
        <div className={cn("relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-50 via-white to-grape-50", featured ? "aspect-[16/9]" : "aspect-[16/8]")}>
          {s.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mediaSrc(s.photo)} alt={`${s.school} building`} className="h-full w-full object-cover" />
          ) : s.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mediaSrc(s.logo)} alt={`${s.school} logo`} className={cn("object-contain", featured ? "h-32 w-auto" : "h-20 w-auto")} />
          ) : (
            <School className="h-12 w-12 text-brand-300" />
          )}
          {s.photo && s.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mediaSrc(s.logo)} alt="" className="absolute bottom-3 left-3 h-14 w-14 rounded-xl bg-white object-contain p-1 shadow-soft" />
          )}
          {featured && <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-700 shadow-sm">Featured partner</span>}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className={cn("font-extrabold text-ink", featured ? "text-2xl" : "text-lg")}>{s.school}</h3>
          {s.location && <p className="mt-1 flex items-start gap-1.5 text-sm text-slate-500"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /> {s.location}</p>}
          {stats.length > 0 && (
            <dl className={cn("mt-4 grid gap-3", featured ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1")}>
              {stats.map((x) => (
                <div key={x.label} className="rounded-2xl bg-slate-50 p-3">
                  <dt className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400"><x.icon className="h-3.5 w-3.5" /> {x.label}</dt>
                  <dd className="mt-1 font-bold text-ink">{x.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {programs.length > 0 && (
            <div className="mt-4">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-400"><GraduationCap className="h-3.5 w-3.5" /> Programs delivered</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">{programs.map((x) => <li key={x} className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">{x}</li>)}</ul>
            </div>
          )}
          {achievements.length > 0 && (
            <div className="mt-4">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-400"><Medal className="h-3.5 w-3.5" /> Competitions & achievements</p>
              <ul className="mt-2 space-y-1.5">{achievements.map((x) => <li key={x} className="text-sm text-slate-700">• {x}</li>)}</ul>
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}
