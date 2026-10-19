import type { Metadata } from "next";
import { Medal, Trophy } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { CompetitionCard } from "@/components/competition-card";
import { CTASection } from "@/components/cta-section";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Reveal } from "@/components/reveal";
import { getMedia } from "@/lib/content";
import { getSiteContent } from "@/lib/site-content";
import { VideoBlock } from "@/components/video-block";

export const metadata: Metadata = {
  title: "Competitions — FLL, WRO, Robot Challenge & Technoxian",
  description: "IC Robotics students compete nationally and internationally in FLL, WRO, Robot Challenge and Technoxian. Explore our competition journey, achievements and awards.",
};

export const revalidate = 60;

export default async function CompetitionsPage() {
  const [allMedia, content] = await Promise.all([getMedia(), getSiteContent()]);
  const media = allMedia.slice(0, 8);
  const p = content.competitions;
  const competitions = p.items;
  const national = competitions.filter((c) => c.scope === "National");
  const international = competitions.filter((c) => c.scope === "International");
  return (
    <>
      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} subtitle={p.hero.subtitle} />

      <section className="container-x py-16">
        <SectionHeading eyebrow={p.international.eyebrow} title={p.international.title} subtitle={p.international.subtitle} center={false} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(international.length ? international : competitions).map((c) => <CompetitionCard key={c.id} competition={c} />)}
        </div>
      </section>

      {national.length > 0 && (
        <section className="container-x py-4">
          <SectionHeading eyebrow={p.national.eyebrow} title={p.national.title} subtitle={p.national.subtitle} center={false} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {national.map((c) => <CompetitionCard key={c.id} competition={c} />)}
          </div>
        </section>
      )}

      {/* Competition journey */}
      <section className="bg-gradient-to-b from-white to-brand-50/40 py-16">
        <div className="container-x">
          <SectionHeading eyebrow={p.journey.eyebrow} title={p.journey.title} subtitle={p.journey.subtitle} />
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {p.journey.steps.map((j, i) => (
              <Reveal key={j.title + i} delay={i * 0.08}>
                <div className="card-surface h-full p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-grape-500 text-sm font-bold text-white">{i + 1}</span>
                  <h3 className="mt-3 font-bold text-ink">{j.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{j.blurb}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements & awards */}
      <section className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={p.awards.eyebrow} title={p.awards.title} subtitle={p.awards.subtitle} center={false} />
            <ul className="mt-8 space-y-3">
              {content.achievements.items.map((a) => (
                <li key={a} className="flex items-center gap-3 card-surface p-4">
                  <Medal className="h-5 w-5 shrink-0 text-accent-500" />
                  <span className="text-sm font-semibold text-ink">{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow={p.gallery.eyebrow} title={p.gallery.title} subtitle={p.gallery.subtitle} center={false} />
            <div className="mt-8 grid grid-cols-2 gap-4">
              {media.length > 0
                ? media.map((m) => (
                    m.type === "image"
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img key={m.id} src={m.url} alt={m.caption} className="aspect-video w-full rounded-3xl border border-slate-100 object-cover" />
                      : <VideoBlock key={m.id} src={m.url} label={m.caption || "Video"} tone="grape" className="aspect-video" />
                  ))
                : ["Robot run", "Team huddle", "Award ceremony", "Coding sprint"].map((g, i) => (
                    <MediaPlaceholder key={g} label={g} withPlay={false} tone={i % 2 ? "grape" : "brand"} className="aspect-video" />
                  ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection {...p.cta} />
    </>
  );
}
