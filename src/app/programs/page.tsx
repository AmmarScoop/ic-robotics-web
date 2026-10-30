import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { ProgramCard } from "@/components/program-card";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { getSiteContent } from "@/lib/site-content";
import { RoboticsStages } from "@/components/robotics-stages";

export const metadata: Metadata = {
  title: "Programs — Robotics, Coding & AI for KG to Secondary",
  description: "Explore IC Robotics programs: Robotics (KG, Primary, Prep, Secondary), Coding (Scratch, App, Web, Python) and AI (Fundamentals, Projects, Machine Learning).",
};

const trackIcons: Record<string, string> = { Robotics: "Bot", Coding: "Code2", AI: "BrainCircuit" };

export const revalidate = 300;

export default async function ProgramsPage() {
  const { programs: p } = await getSiteContent();
  return (
    <>
      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} subtitle={p.hero.subtitle} />

      {p.tracks.map((track, ti) => (
        <section key={track.key} className={ti % 2 ? "bg-gradient-to-b from-white to-brand-50/40 py-16" : "py-16"}>
          <div className="container-x">
            <Reveal className="mb-10 flex items-center gap-4">
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white ${ti === 0 ? "bg-gradient-to-br from-brand-500 to-brand-700" : ti === 1 ? "bg-gradient-to-br from-accent-400 to-accent-600" : "bg-gradient-to-br from-grape-500 to-grape-700"}`}>
                <Icon name={trackIcons[track.key] ?? "Sparkles"} className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-ink">{track.title}</h2>
                <p className="text-slate-600">{track.key === "Robotics" && p.robotics.subtitle ? p.robotics.subtitle : track.blurb}</p>
              </div>
            </Reveal>
            {track.key === "Robotics" && p.robotics.stages.length > 0 ? (
              <RoboticsStages stages={p.robotics.stages} />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {p.items.filter((it) => it.track === track.key).map((it) => <ProgramCard key={it.id} program={it} />)}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Roadmap */}
      <section className="container-x py-16">
        <SectionHeading eyebrow={p.roadmap.eyebrow} title={p.roadmap.title} subtitle={p.roadmap.subtitle} />
        <div className="mt-14 space-y-6">
          {p.roadmap.rows.map((r, i) => (
            <Reveal key={r.stage + i} delay={i * 0.06}>
              <div className="relative card-surface grid gap-4 p-6 md:grid-cols-[160px_1fr]">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-grape-500 text-sm font-bold text-white">{i + 1}</span>
                  <div>
                    <p className="font-extrabold text-ink">{r.stage}</p>
                    <p className="text-xs text-slate-500">Ages {r.ages}</p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <RoadCell tone="brand" label="Robotics" value={r.robotics} />
                  <RoadCell tone="accent" label="Coding" value={r.coding} />
                  <RoadCell tone="grape" label="AI" value={r.ai} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection {...p.cta} />
    </>
  );
}

function RoadCell({ tone, label, value }: { tone: "brand" | "accent" | "grape"; label: string; value: string }) {
  const tones = { brand: "bg-brand-50 text-brand-700", accent: "bg-accent-50 text-accent-700", grape: "bg-grape-50 text-grape-700" };
  return (
    <div className={`rounded-2xl p-3 ${tones[tone]}`}>
      <p className="text-[10px] font-bold uppercase tracking-wide opacity-70">{label}</p>
      <p className="mt-0.5 text-sm font-semibold">{value}</p>
    </div>
  );
}
