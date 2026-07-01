import type { Metadata } from "next";
import { Award, Trophy, PlayCircle, FolderKanban, Medal } from "lucide-react";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { ShareButtons } from "@/components/share-buttons";
import { Reveal } from "@/components/reveal";
import { FloatingShapes } from "@/components/floating-shapes";
import { portfolioDemo as p } from "@/lib/data";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const name = params.slug === p.slug ? p.name : params.slug;
  return {
    title: `${name} — Student Portfolio`,
    description: `Public IC Robotics portfolio for ${name}: projects, videos, certificates, competitions and awards.`,
  };
}

const trackTone: Record<string, string> = { Robotics: "brand", Coding: "accent", AI: "grape" };

export default function PortfolioPage({ params }: { params: { slug: string } }) {
  const name = params.slug === p.slug ? p.name : params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-brand-50/60 to-white">
        <FloatingShapes />
        <div className="container-x relative flex flex-col items-center gap-6 py-14 text-center sm:flex-row sm:text-left">
          <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-brand-600 to-grape-500 text-3xl font-extrabold text-white shadow-glow">
            {name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{name}</h1>
            <p className="mt-1 text-slate-600">{p.tagline}</p>
            <div className="mt-4 flex justify-center sm:justify-start"><ShareButtons title={`${name}'s IC Robotics portfolio`} /></div>
          </div>
        </div>
      </section>

      <section className="container-x py-14">
        <Reveal><h2 className="flex items-center gap-2 text-xl font-bold text-ink"><FolderKanban className="h-5 w-5 text-brand-500" /> Projects</h2></Reveal>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {p.projects.map((proj, i) => (
            <Reveal key={proj.name} delay={i * 0.06}>
              <article className="card-surface overflow-hidden p-0">
                <MediaPlaceholder label={proj.track} withPlay={false} tone={(trackTone[proj.track] as any) ?? "brand"} className="h-36" />
                <div className="p-5">
                  <h3 className="font-bold text-ink">{proj.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{proj.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="card-surface p-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-ink"><PlayCircle className="h-5 w-5 text-grape-500" /> Videos</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {p.videos.map((v) => <MediaPlaceholder key={v} label={v} tone="grape" className="aspect-video" />)}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="card-surface p-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-ink"><Award className="h-5 w-5 text-accent-500" /> Certificates</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.certificates.map((c) => <li key={c} className="rounded-full bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700">{c}</li>)}
              </ul>
              <h2 className="mt-6 flex items-center gap-2 text-xl font-bold text-ink"><Trophy className="h-5 w-5 text-accent-500" /> Competitions</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {p.competitions.map((c) => <li key={c} className="rounded-xl bg-slate-50 px-3 py-2">{c}</li>)}
              </ul>
              <h2 className="mt-6 flex items-center gap-2 text-xl font-bold text-ink"><Medal className="h-5 w-5 text-accent-500" /> Awards</h2>
              <ul className="mt-4 space-y-2">
                {p.awards.map((a) => <li key={a} className="flex items-center gap-2 rounded-xl bg-accent-50 px-3 py-2 text-sm font-semibold text-accent-700"><Medal className="h-4 w-4" /> {a}</li>)}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
