import type { Metadata } from "next";
import { Medal, Trophy } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { CompetitionCard } from "@/components/competition-card";
import { CTASection } from "@/components/cta-section";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Reveal } from "@/components/reveal";
import { competitions, internationalAchievements } from "@/lib/data";
import { getMedia } from "@/lib/content";
import { VideoBlock } from "@/components/video-block";

export const metadata: Metadata = {
  title: "Competitions — FLL, WRO, Robot Challenge & Technoxian",
  description: "IC Robotics students compete nationally and internationally in FLL, WRO, Robot Challenge and Technoxian. Explore our competition journey, achievements and awards.",
};

const journey = [
  { step: "Discover", blurb: "Students join competition-ready program tracks." },
  { step: "Train", blurb: "Coaching, mock rounds and mentor feedback." },
  { step: "Qualify", blurb: "Compete nationally to earn a place." },
  { step: "Compete Globally", blurb: "Represent on the international stage." },
];

export default async function CompetitionsPage() {
  const media = (await getMedia()).slice(0, 8);
  const national = competitions.filter((c) => c.scope === "National");
  const international = competitions.filter((c) => c.scope === "International");
  return (
    <>
      <PageHero
        eyebrow="Competitions"
        title="Where Students Compete On The World Stage"
        subtitle="From national qualifiers to international championships — we prepare, coach and take students all the way."
      />

      <section className="container-x py-16">
        <SectionHeading eyebrow="International Competitions" title="Global championships we compete in" center={false} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(international.length ? international : competitions).map((c) => <CompetitionCard key={c.id} competition={c} />)}
        </div>
      </section>

      {national.length > 0 && (
        <section className="container-x py-4">
          <SectionHeading eyebrow="National Competitions" title="National qualifiers & leagues" center={false} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {national.map((c) => <CompetitionCard key={c.id} competition={c} />)}
          </div>
        </section>
      )}

      {/* Competition journey */}
      <section className="bg-gradient-to-b from-white to-brand-50/40 py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Competition Journey" title="From classroom to championship" />
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {journey.map((j, i) => (
              <Reveal key={j.step} delay={i * 0.08}>
                <div className="card-surface h-full p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-grape-500 text-sm font-bold text-white">{i + 1}</span>
                  <h3 className="mt-3 font-bold text-ink">{j.step}</h3>
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
            <SectionHeading eyebrow="Student Achievements" title="International Awards" center={false} />
            <ul className="mt-8 space-y-3">
              {internationalAchievements.map((a) => (
                <li key={a} className="flex items-center gap-3 card-surface p-4">
                  <Medal className="h-5 w-5 shrink-0 text-accent-500" />
                  <span className="text-sm font-semibold text-ink">{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Gallery" title="Moments from the arena" center={false} />
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

      <CTASection title="Want your students on the podium?" primary={{ label: "Register Interest", href: "/competition-registration" }} secondary={{ label: "Request School Proposal", href: "/contact?type=proposal" }} />
    </>
  );
}
