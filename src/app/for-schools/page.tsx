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
import { whySchools, partnershipModels, schoolReceives, caseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "For Schools — Transform Your School Into a Future Skills Hub",
  description: "Bring world-class Robotics, Coding, AI, competitions and STEM learning into your school with a complete plug-and-play partnership model.",
};

export default function ForSchoolsPage() {
  return (
    <>
      <PageHero
        eyebrow="For School Leaders"
        title="Transform Your School Into A Future Skills Hub"
        subtitle="Bring world-class Robotics, Coding, AI, competitions and STEM learning into your school with a complete plug-and-play partnership model."
      >
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg"><Link href="/contact?type=proposal">Request Proposal</Link></Button>
          <Button asChild variant="outline" size="lg"><Link href="/school-readiness-assessment">Check School Readiness</Link></Button>
        </div>
      </PageHero>

      {/* Why schools choose */}
      <section className="container-x py-16">
        <SectionHeading eyebrow="Why Schools Choose IC Robotics" title="Everything you need, delivered end-to-end" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whySchools.map((w, i) => (
            <IconCard key={w.title} icon={w.icon} title={w.title} index={i} tone={i % 3 === 0 ? "brand" : i % 3 === 1 ? "accent" : "grape"} />
          ))}
        </div>
      </section>

      {/* Partnership models */}
      <section className="bg-gradient-to-b from-white to-brand-50/40 py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Partnership Models" title="Choose the model that fits your school" subtitle="Start small or integrate fully — every model scales with you." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partnershipModels.map((p, i) => (
              <IconCard key={p.title} icon={p.icon} title={p.title} blurb={p.blurb} index={i} tone={i % 2 ? "grape" : "brand"} />
            ))}
          </div>
        </div>
      </section>

      {/* What schools receive */}
      <section className="container-x py-16">
        <SectionHeading eyebrow="What Schools Receive" title="A full future-skills toolkit" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {schoolReceives.map((s, i) => <IconCard key={s.title} icon={s.icon} title={s.title} blurb={s.blurb} index={i} tone={i % 3 === 0 ? "brand" : i % 3 === 1 ? "accent" : "grape"} />)}
        </div>
      </section>

      {/* Readiness assessment preview */}
      <section className="container-x py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-grape-600 to-brand-700 p-8 text-white sm:p-12">
            <div className="max-w-xl">
              <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">Free Tool</span>
              <h2 className="mt-4 text-3xl font-extrabold">Is your school ready for future skills education?</h2>
              <p className="mt-3 text-white/85">Answer 9 quick questions and get an instant School Readiness Score with strengths, gaps and next steps.</p>
              <Button asChild variant="accent" size="lg" className="mt-7"><Link href="/school-readiness-assessment">Check Your School Readiness <ArrowRight className="h-4 w-4" /></Link></Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Success highlight */}
      <section className="bg-gradient-to-b from-brand-50/40 to-white py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Proven With Schools" title="MMC International & SKY Schools" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {caseStudies.map((c) => (
              <Reveal key={c.id}>
                <div className="card-surface p-7">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-600">{c.school} · {c.students}</p>
                  <p className="mt-3 text-slate-700">{c.impact}</p>
                  <ul className="mt-4 space-y-2">
                    {c.outcomes.map((o) => (
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
        <SectionHeading eyebrow="School Dashboard Preview" title="Full visibility for school leaders" subtitle="Track engagement, progress and competition-ready students at a glance." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardCard label="Number of Students" value="1,500" hint="Across KG → Secondary" />
          <DashboardCard label="Attendance" value="96%" hint="This term" />
          <DashboardCard label="Completion Rate" value="88%" hint="Program milestones" />
          <DashboardCard label="Top Performers" value="42" hint="Level 5+ students" />
          <DashboardCard label="Competition Candidates" value="120" hint="Ready for nationals" />
          <DashboardCard label="Reports" value="Auto" hint="Parent-facing, monthly" />
        </div>
      </section>

      <CTASection title="Ready to bring future skills to your school?" primary={{ label: "Request Proposal", href: "/contact?type=proposal" }} secondary={{ label: "Book School Demo", href: "/contact?type=demo" }} />
    </>
  );
}
