import Link from "next/link";
import { Globe, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaPlaceholder } from "@/components/media-placeholder";
import type { Competition } from "@/lib/data";

export function CompetitionCard({ competition }: { competition: Competition }) {
  return (
    <article className="card-surface flex h-full flex-col overflow-hidden p-0">
      {competition.logo ? (
        <div className="flex h-40 items-center justify-center bg-gradient-to-br from-grape-50/60 via-white to-brand-50/60 p-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={competition.logo} alt={`${competition.name} logo`} className="h-full w-auto max-w-[70%] object-contain" />
        </div>
      ) : (
        <MediaPlaceholder label={competition.name} withPlay={false} tone="grape" className="h-40" />
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-bold text-ink">{competition.name}</h3>
          <span className="rounded-full bg-grape-50 px-2.5 py-1 text-[10px] font-bold uppercase text-grape-600">{competition.scope}</span>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-slate-600">{competition.description}</p>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex items-center gap-2 text-slate-600"><Globe className="h-4 w-4 text-brand-500" /> {competition.countries}</div>
          <div className="flex items-center gap-2 text-slate-600"><Medal className="h-4 w-4 text-accent-500" /> {competition.achievement}</div>
        </dl>
        <Button asChild variant="outline" className="mt-5 w-full">
          <Link href={`/competition-registration?competition=${competition.id}`}>Register Interest</Link>
        </Button>
      </div>
    </article>
  );
}
