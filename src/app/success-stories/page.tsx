import type { Metadata } from "next";
import { CheckCircle2, Medal } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { TestimonialCard } from "@/components/testimonial-card";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { getTestimonials } from "@/lib/content";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Success Stories — School Case Studies & Student Wins",
  description: "Real results from IC Robotics: school case studies (MMC, SKY Schools), student success stories, parent and school-leader testimonials and international achievements.",
};

export const revalidate = 60;

export default async function SuccessStoriesPage() {
  const [testimonials, content] = await Promise.all([getTestimonials(), getSiteContent()]);
  const p = content.stories;
  const parents = testimonials.filter((t) => t.type === "Parent");
  const leaders = testimonials.filter((t) => t.type === "Principal");
  const students = testimonials.filter((t) => t.type === "Student");

  return (
    <>
      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} subtitle={p.hero.subtitle} />

      {/* School case studies */}
      <section className="container-x py-16">
        <SectionHeading eyebrow={p.caseStudies.eyebrow} title={p.caseStudies.title} subtitle={p.caseStudies.subtitle} />
        <div className="mt-12 space-y-8">
          {content.caseStudies.items.map((c) => (
            <Reveal key={c.id}>
              <div className="card-surface overflow-hidden p-0">
                <div className="flex flex-col gap-1 bg-gradient-to-r from-brand-600 to-grape-600 p-7 text-white sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-2xl font-extrabold">{c.school}</h3>
                  <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold">{c.students}</span>
                </div>
                <div className="grid gap-6 p-7 md:grid-cols-3">
                  <Block label="Challenge" value={c.challenge} />
                  <Block label="Solution" value={c.solution} />
                  <Block label="Impact" value={c.impact} />
                </div>
                <div className="border-t border-slate-100 p-7">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Student Outcomes</p>
                  <ul className="mt-3 flex flex-wrap gap-3">
                    {c.outcomes.map((o) => (
                      <li key={o} className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Student stories */}
      <section className="bg-gradient-to-b from-white to-brand-50/40 py-16">
        <div className="container-x">
          <SectionHeading eyebrow={p.students.eyebrow} title={p.students.title} subtitle={p.students.subtitle} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {(students.length ? students : testimonials).slice(0, 3).map((t) => <TestimonialCard key={t.id} story={t} />)}
          </div>
        </div>
      </section>

      {/* Parent + leader testimonials */}
      <section className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={p.parents.eyebrow} title={p.parents.title} subtitle={p.parents.subtitle} center={false} />
            <div className="mt-8 grid gap-6">{parents.map((t) => <TestimonialCard key={t.id} story={t} />)}</div>
          </div>
          <div>
            <SectionHeading eyebrow={p.leaders.eyebrow} title={p.leaders.title} subtitle={p.leaders.subtitle} center={false} />
            <div className="mt-8 grid gap-6">{leaders.map((t) => <TestimonialCard key={t.id} story={t} />)}</div>
          </div>
        </div>
      </section>

      {/* International achievements */}
      <section className="bg-gradient-to-b from-brand-50/40 to-white py-16">
        <div className="container-x">
          <SectionHeading eyebrow={p.achievements.eyebrow} title={p.achievements.title} subtitle={p.achievements.subtitle} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.achievements.items.map((a, i) => (
              <Reveal key={a} delay={i * 0.05}>
                <div className="flex items-center gap-3 card-surface p-5">
                  <Medal className="h-6 w-6 shrink-0 text-accent-500" />
                  <span className="font-semibold text-ink">{a}</span>
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

function Block({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-brand-600">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{value}</p>
    </div>
  );
}
