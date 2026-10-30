import type { Metadata } from "next";
import { Medal, Trophy } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { CompetitionCard } from "@/components/competition-card";
import { ParticipationCard } from "@/components/participation-card";
import { CTASection } from "@/components/cta-section";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Reveal } from "@/components/reveal";
import { Flag } from "@/components/flag";
import { getMedia } from "@/lib/content";
import { getSiteContent } from "@/lib/site-content";
import { VideoBlock } from "@/components/video-block";
import { mediaSrc } from "@/lib/media-src";
import type { Participation } from "@/lib/site-defaults";
import type { Competition } from "@/lib/data";

export const metadata: Metadata = {
  title: "Competitions — Students Competing on the World Stage",
  description: "I.C Robotics students represent their schools in local and international robotics, coding and innovation competitions — including FIRST LEGO League, Robot Challenge, GRC, WRO and Technoxian, and international participations in China and South Korea.",
};

export const revalidate = 60;

const norm = (s: string) => (s || "").toLowerCase().replace(/\(.*?\)/g, "").replace(/[^a-z0-9]+/g, " ").trim();

/** Does a participation belong to this competition? Matches on the competition's id or name. */
function belongsTo(p: Participation, c: Competition) {
  const pc = norm(p.competition);
  const name = norm(c.name);
  if (!pc) return false;
  return pc === norm(c.id) || pc.includes(name) || name.includes(pc) || pc.split(" ").includes(norm(c.id));
}

/** Newest first; entries without a year go last. */
const byYear = (a: Participation, b: Participation) => (Number(b.year) || 0) - (Number(a.year) || 0);

export default async function CompetitionsPage() {
  const [allMedia, content] = await Promise.all([getMedia(), getSiteContent()]);
  const media = allMedia.slice(0, 8);
  const p = content.competitions;
  const competitions = p.items.filter((c) => c.name);
  const parts = content.participations.items.filter((x) => x.competition || x.summary);
  const international = parts.filter((x) => x.scope === "International");
  const docs = competitions
    .map((c) => ({ c, items: parts.filter((x) => belongsTo(x, c)).sort(byYear) }))
    .filter((d) => d.items.length > 0);
  const documented = new Set(docs.flatMap((d) => d.items));
  const otherNational = parts.filter((x) => x.scope !== "International" && !documented.has(x));
  const countries = content.global.countries;

  return (
    <>
      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} subtitle={p.hero.subtitle} />

      {/* Intro message */}
      {(p.intro.length > 0 || countries.length > 0) && (
        <section className="container-x pt-14">
          <Reveal>
            <div className="card-surface grid items-center gap-8 p-8 lg:grid-cols-[1.4fr_1fr] sm:p-10">
              <div className="space-y-4">
                {p.intro.filter(Boolean).map((para, i) => <p key={i} className={i === 0 ? "text-lg font-semibold leading-relaxed text-ink" : "leading-relaxed text-slate-600"}>{para}</p>)}
              </div>
              {countries.length > 0 && (
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  {countries.map((ct) => (
                    <span key={ct.code} className="flex items-center gap-2 rounded-full border border-slate-100 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">
                      <Flag code={ct.code} name={ct.name} className="h-4 w-6" /> {ct.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        </section>
      )}

      {/* International participations first */}
      {international.length > 0 && (
        <section className="container-x py-16">
          <SectionHeading eyebrow={p.participations.eyebrow} title={p.participations.title} subtitle={p.participations.subtitle} center={false} />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {international.map((x, i) => <ParticipationCard key={i} p={x} />)}
          </div>
        </section>
      )}

      {/* Competitions we take part in */}
      <section className="container-x py-16">
        <SectionHeading eyebrow={p.international.eyebrow} title={p.international.title} subtitle={p.international.subtitle} center={false} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {competitions.map((c) => {
            const d = docs.find((x) => x.c.id === c.id);
            return <CompetitionCard key={c.id} competition={c} docsHref={`#${c.id}`} docsCount={d?.items.length ?? 0} />;
          })}
        </div>
      </section>

      {/* Documentation per competition, grouped by category and year */}
      {docs.map(({ c, items }) => {
        const cats = Array.from(new Set(items.map((x) => x.category || "")));
        return (
          <section key={c.id} id={c.id} className="scroll-mt-24 border-t border-slate-100 bg-gradient-to-b from-white to-brand-50/30 py-16">
            <div className="container-x">
              <Reveal className="flex items-center gap-4">
                {c.logo
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={mediaSrc(c.logo)} alt={`${c.name} logo`} className="h-14 w-auto max-w-[140px] object-contain" />
                  : <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-grape-500 text-white"><Trophy className="h-7 w-7" /></span>}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Our participations</p>
                  <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{c.name}</h2>
                </div>
              </Reveal>
              {cats.map((cat) => (
                <div key={cat || "all"} className="mt-8">
                  {cat && <h3 className="mb-4 text-lg font-bold text-ink">{cat}</h3>}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items.filter((x) => (x.category || "") === cat).map((x, i) => <ParticipationCard key={i} p={x} showCompetition={false} />)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {otherNational.length > 0 && (
        <section className="container-x py-16">
          <SectionHeading eyebrow={p.national.eyebrow} title={p.national.title} subtitle={p.national.subtitle} center={false} />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherNational.map((x, i) => <ParticipationCard key={i} p={x} />)}
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

      {/* Achievements & gallery */}
      <section className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          {content.achievements.items.filter(Boolean).length > 0 && (
            <div>
              <SectionHeading eyebrow={p.awards.eyebrow} title={p.awards.title} subtitle={p.awards.subtitle} center={false} />
              <ul className="mt-8 space-y-3">
                {content.achievements.items.filter(Boolean).map((a) => (
                  <li key={a} className="flex items-center gap-3 card-surface p-4">
                    <Medal className="h-5 w-5 shrink-0 text-accent-500" />
                    <span className="text-sm font-semibold text-ink">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
