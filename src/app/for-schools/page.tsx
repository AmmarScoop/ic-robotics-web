import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { IconCard } from "@/components/icon-card";
import { CTASection } from "@/components/cta-section";
import { DashboardCard } from "@/components/dashboard-card";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "For Schools — Transform Your School Into a Future Skills Hub",
  description: "Bring world-class Robotics, Coding, AI, competitions and STEM learning into your school with a complete plug-and-play partnership model.",
};

export const revalidate = 300;

export default async function ForSchoolsPage() {
  const c = await getSiteContent();
  const p = c.schools;
  return (
    <>
      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} subtitle={p.hero.subtitle}>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          {p.hero.primary.label && <Button asChild size="lg"><Link href={p.hero.primary.href}>{p.hero.primary.label}</Link></Button>}
          {p.hero.secondary.label && <Button asChild variant="outline" size="lg"><Link href={p.hero.secondary.href}>{p.hero.secondary.label}</Link></Button>}
        </div>
      </PageHero>

      {/* Why schools choose */}
      <section className="container-x py-16">
        <SectionHeading eyebrow={p.why.eyebrow} title={p.why.title} subtitle={p.why.subtitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {p.why.items.map((w, i) => (
            <IconCard key={w.title} icon={w.icon} title={w.title} index={i} tone={i % 3 === 0 ? "brand" : i % 3 === 1 ? "accent" : "grape"} />
          ))}
        </div>
      </section>

      {/* Partnership models */}
      <section className="bg-gradient-to-b from-white to-brand-50/40 py-16">
        <div className="container-x">
          <SectionHeading eyebrow={p.models.eyebrow} title={p.models.title} subtitle={p.models.subtitle} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.contracting.systems.filter((m) => m.title).map((m, i) => (
              <Link key={m.id} href={`/contracting-systems#${m.id}`} className="block h-full">
                <IconCard icon={m.icon} title={m.title} blurb={m.summary} index={i} tone={i % 2 ? "grape" : "brand"} />
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline"><Link href="/contracting-systems">Compare all contracting systems <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
        </div>
      </section>

      {/* What schools receive */}
      <section className="container-x py-16">
        <SectionHeading eyebrow={p.receives.eyebrow} title={p.receives.title} subtitle={p.receives.subtitle} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {p.receives.items.map((s, i) => <IconCard key={s.title} icon={s.icon} title={s.title} blurb={s.blurb} index={i} tone={i % 3 === 0 ? "brand" : i % 3 === 1 ? "accent" : "grape"} />)}
        </div>
      </section>

      {/* Readiness assessment preview */}
      <section className="container-x py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-grape-600 to-brand-700 p-8 text-white sm:p-12">
            <div className="max-w-xl">
              {p.readiness.badge && <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">{p.readiness.badge}</span>}
              <h2 className="mt-4 text-3xl font-extrabold">{p.readiness.title}</h2>
              {p.readiness.body && <p className="mt-3 text-white/85">{p.readiness.body}</p>}
              {p.readiness.button.label && <Button asChild variant="accent" size="lg" className="mt-7"><Link href={p.readiness.button.href}>{p.readiness.button.label} <ArrowRight className="h-4 w-4" /></Link></Button>}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Success highlight */}
      <section className="bg-gradient-to-b from-brand-50/40 to-white py-16">
        <div className="container-x">
          <SectionHeading eyebrow={p.proven.eyebrow} title={p.proven.title} subtitle={p.proven.subtitle} />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {c.caseStudies.items.filter((cs) => cs.impact).map((cs) => (
              <Reveal key={cs.id}>
                <div className="card-surface p-7">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-600">{cs.school} · {cs.students}</p>
                  <p className="mt-3 text-slate-700">{cs.impact}</p>
                  <ul className="mt-4 space-y-2">
                    {cs.outcomes.map((o) => (
                      <li key={o} className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> {o}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* School dashboard preview */}
      <section className="container-x py-16">
        <SectionHeading eyebrow={p.dashboard.eyebrow} title={p.dashboard.title} subtitle={p.dashboard.subtitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {p.dashboard.cards.map((d) => <DashboardCard key={d.label} label={d.label} value={d.value} hint={d.hint} />)}
        </div>
      </section>

      <CTASection {...p.cta} />
    </>
  );
}
