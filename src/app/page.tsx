import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { TrustLogos } from "@/components/trust-logos";
import { StatCard } from "@/components/stat-card";
import { IconCard } from "@/components/icon-card";
import { HomeLeadSection } from "@/components/home-lead-section";
import { CTASection } from "@/components/cta-section";
import { TestimonialCard } from "@/components/testimonial-card";
import { CompetitionCard } from "@/components/competition-card";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import {
  impactStats, futureSkills, trustIndicators, howItWorks, assessmentOutcomes,
  competitions, caseStudies, schoolReceives,
} from "@/lib/data";
import { getTestimonials } from "@/lib/content";
import { VideoBlock } from "@/components/video-block";
import { videos } from "@/lib/videos";

export const revalidate = 60;

export default async function HomePage() {
  const testimonials = await getTestimonials();
  return (
    <>
      <HeroSection />

      {/* Trusted by schools */}
      <section className="container-x py-8">
        <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-slate-400">Trusted by forward-thinking schools</p>
        <TrustLogos />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {trustIndicators.map((t) => (
            <span key={t} className="flex items-center gap-1.5 rounded-full border border-slate-100 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-brand-500" /> {t}
            </span>
          ))}
        </div>
      </section>

      {/* Why future skills matter */}
      <section className="container-x py-16">
        <SectionHeading
          eyebrow="Why Future Skills Matter"
          title="Three skills that prepare children for tomorrow's jobs"
          subtitle="Robotics, Coding and Artificial Intelligence are the literacy of the next generation. Here's how each one builds career-ready thinking."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {futureSkills.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="card-surface flex h-full flex-col p-7 transition hover:-translate-y-1 hover:shadow-glow">
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-white ${i === 0 ? "bg-gradient-to-br from-brand-500 to-brand-700" : i === 1 ? "bg-gradient-to-br from-accent-400 to-accent-600" : "bg-gradient-to-br from-grape-500 to-grape-700"}`}>
                  <Icon name={s.icon} className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{s.blurb}</p>
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Leads to careers like</p>
                  <p className="mt-1 text-sm font-semibold text-brand-700">{s.jobs.join(" · ")}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Our impact */}
      <section className="bg-gradient-to-b from-white to-brand-50/40 py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Our Impact" title="Nine years. Measurable outcomes." />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
            {impactStats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* Lead generation */}
      <HomeLeadSection />

      {/* How it works */}
      <section className="container-x py-16">
        <SectionHeading eyebrow="How It Works" title="From questions to a clear learning path" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {howItWorks.map((h, i) => (
            <Reveal key={h.step} delay={i * 0.08}>
              <div className="relative card-surface h-full p-7">
                <span className="absolute -top-4 left-7 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-grape-500 text-sm font-bold text-white shadow-soft">{h.step}</span>
                <h3 className="mt-3 text-lg font-bold text-ink">{h.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{h.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {assessmentOutcomes.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.06}>
              <div className="card-surface flex items-center gap-4 p-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white ${i === 0 ? "bg-brand-600" : i === 1 ? "bg-accent-500" : "bg-grape-600"}`}>
                  <Icon name={o.icon} className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-ink">{o.title}</p>
                  <p className="text-sm text-slate-500">{o.track}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild size="lg"><Link href="/child-assessment">Start Free Assessment <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
      </section>

      {/* School partnership preview */}
      <section className="container-x py-16">
        <div className="card-surface grid items-center gap-10 overflow-hidden p-8 lg:grid-cols-2 sm:p-10">
          <div>
            <span className="eyebrow mb-4">School Partnership</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink">A complete, plug-and-play STEM program for your school</h2>
            <p className="mt-4 text-slate-600">
              IC Robotics delivers everything: curriculum, certified trainers, robotics kits, student reports, competitions
              and parent satisfaction — fully integrated into your school.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {schoolReceives.map((s) => (
                <div key={s.title} className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-700">
                  <Icon name={s.icon} className="h-4 w-4 text-brand-500" /> {s.title}
                </div>
              ))}
            </div>
            <Button asChild size="lg" className="mt-8"><Link href="/contact?type=proposal">Request School Proposal</Link></Button>
          </div>
          <VideoBlock src={videos.schoolWalkthrough} label="School program walkthrough" className="aspect-[4/3]" tone="brand" />
        </div>
      </section>

      {/* Success stories preview */}
      <section className="bg-gradient-to-b from-brand-50/40 to-white py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Success Stories" title="Loved by schools, parents and students" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => <TestimonialCard key={t.id} story={t} />)}
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {caseStudies.map((c) => (
              <Reveal key={c.id}>
                <div className="card-surface p-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-600">{c.school}</p>
                  <p className="mt-1 text-lg font-bold text-ink">{c.students}</p>
                  <p className="mt-2 text-sm text-slate-600">{c.impact}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline"><Link href="/success-stories">See all success stories <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
        </div>
      </section>

      {/* Latest competitions */}
      <section className="container-x py-16">
        <SectionHeading eyebrow="Latest Competitions" title="Where our students compete on the world stage" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {competitions.map((c) => <CompetitionCard key={c.id} competition={c} />)}
        </div>
      </section>

      <CTASection />
    </>
  );
}
