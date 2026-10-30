import { Calendar, ExternalLink, Medal, School, Users } from "lucide-react";
import { Flag } from "@/components/flag";
import { PhotoGallery } from "@/components/photo-gallery";
import { VideoBlock } from "@/components/video-block";
import { Reveal } from "@/components/reveal";
import { mediaSrc } from "@/lib/media-src";
import type { Participation } from "@/lib/site-defaults";

/** One documented competition participation, with its evidence (photos, video, link). */
export function ParticipationCard({ p, showCompetition = true }: { p: Participation; showCompetition?: boolean }) {
  const photos = p.photos.filter(Boolean);
  return (
    <Reveal className="h-full">
      <article className="card-surface flex h-full flex-col overflow-hidden p-0">
        <div className="flex items-start gap-3 border-b border-slate-100 p-5">
          {p.countryCode ? <Flag code={p.countryCode} name={p.country} className="mt-0.5 h-7 w-10" /> : null}
          <div className="min-w-0 flex-1">
            {showCompetition && <h3 className="font-bold text-ink">{p.competition}{p.category ? ` — ${p.category}` : ""}</h3>}
            {!showCompetition && p.category && <h3 className="font-bold text-ink">{p.category}</h3>}
            <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-slate-500">
              {p.country && <span>{p.country}</span>}
              {p.year && <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {p.year}</span>}
              <span className="rounded-full bg-grape-50 px-2 py-0.5 text-[10px] font-bold uppercase text-grape-600">{p.scope}</span>
            </p>
          </div>
          {p.result && <span className="flex shrink-0 items-center gap-1 rounded-full bg-accent-100 px-3 py-1 text-xs font-bold text-accent-700"><Medal className="h-3.5 w-3.5" /> {p.result}</span>}
        </div>
        <div className="flex flex-1 flex-col p-5">
          {(p.school || p.team) && (
            <div className="mb-3 space-y-1 text-sm">
              {p.school && <p className="flex items-center gap-2 font-semibold text-ink"><School className="h-4 w-4 text-brand-500" /> {p.school}</p>}
              {p.team && <p className="flex items-center gap-2 text-slate-600"><Users className="h-4 w-4 text-brand-500" /> {p.team}</p>}
            </div>
          )}
          {p.summary && <p className="text-sm leading-relaxed text-slate-600" dir="auto">{p.summary}</p>}
          {photos.length > 0 && <PhotoGallery photos={photos} alt={`${p.competition} ${p.year}`} max={6} className="mt-4" />}
          {p.video && <VideoBlock src={p.video} label={`${p.competition} video`} className="mt-4 aspect-video" tone="grape" />}
          {p.evidence && (
            <a href={mediaSrc(p.evidence)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">
              View certificate / official result <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}
