import type { Metadata } from "next";
import { Target, Eye, Award, Gavel, Users } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { StatCard } from "@/components/stat-card";
import { CTASection } from "@/components/cta-section";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Reveal } from "@/components/reveal";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About Us — Nine Years Building Future Innovators",
  description: "IC Robotics is a kids technology academy preparing children for the future through Robotics, Coding, AI and STEM — with international competition and judging experience.",
};

export const revalidate = 300;

export default async function AboutPage() {
  const content = await getSiteContent();
  const p = content.about;
  return (
    <>
      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} subtitle={p.hero.subtitle} />

      {/* Overview */}
      <section className="container-x py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            {p.overview.eyebrow && <span className="eyebrow mb-4">{p.overview.eyebrow}</span>}
            <h2 className="text-3xl font-extrabold text-ink">{p.overview.title}</h2>
            {p.overview.paragraphs.filter(Boolean).map((para, i) => (
              <p key={i} className="mt-4 text-slate-600">{para}</p>
            ))}
          </Reveal>
          {p.overview.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.overview.image} alt={p.overview.title} className="aspect-[4/3] w-full rounded-3xl border border-slate-100 object-cover shadow-soft" />
          ) : (
            <MediaPlaceholder label="Our story" className="aspect-[4/3]" tone="grape" />
          )}
        </div>
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-5">
          {content.stats.items.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-gradient-to-b from-white to-brand-50/40 py-16">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card-surface h-full p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white"><Target className="h-6 w-6" /></div>
              <h3 className="mt-4 text-xl font-bold text-ink">{p.mission.title}</h3>
              <p className="mt-2 text-slate-600">{p.mission.body}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card-surface h-full p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-grape-600 text-white"><Eye className="h-6 w-6" /></div>
              <h3 className="mt-4 text-xl font-bold text-ink">{p.vision.title}</h3>
              <p className="mt-2 text-slate-600">{p.vision.body}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Accreditations + judging */}
      <section className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={p.accreditations.eyebrow} title={p.accreditations.title} subtitle={p.accreditations.subtitle} center={false} />
            <ul className="mt-8 space-y-3">
              {p.accreditations.items.map((a) => (
                <li key={a} className="flex items-center gap-3 card-surface p-4"><Award className="h-5 w-5 text-accent-500" /><span className="font-semibold text-ink">{a}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow={p.judges.eyebrow} title={p.judges.title} subtitle={p.judges.subtitle} center={false} />
            <div className="mt-8 card-surface p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white"><Gavel className="h-6 w-6" /></div>
              <p className="mt-4 text-slate-600">{p.judges.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gradient-to-b from-brand-50/40 to-white py-16">
        <div className="container-x">
          <SectionHeading eyebrow={p.team.eyebrow} title={p.team.title} subtitle={p.team.subtitle} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {p.team.members.map((m, i) => (
              <Reveal key={m.name + i} delay={i * 0.06}>
                <div className="card-surface p-6 text-center">
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.photo} alt={m.name} className="mx-auto h-20 w-20 rounded-full object-cover" />
                  ) : (
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-grape-500 text-white"><Users className="h-8 w-8" /></div>
                  )}
                  <p className="mt-4 font-bold text-ink">{m.name}</p>
                  <p className="text-sm text-slate-500">{m.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection {...content.cta} />
    </>
  );
}
