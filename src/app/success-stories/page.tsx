import type { Metadata } from "next";
import { CheckCircle2, Medal } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { TestimonialCard } from "@/components/testimonial-card";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { caseStudies, internationalAchievements } from "@/lib/data";
import { getTestimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Success Stories — School Case Studies & Student Wins",
  description: "Real results from IC Robotics: school case studies (MMC, SKY Schools), student success stories, parent and school-leader testimonials and international achievements.",
};

export default async function SuccessStoriesPage() {
  const testimonials = await getTestimonials();
  const parents = testimonials.filter((t) => t.type === "Parent");
  const leaders = testimonials.filter((t) => t.type === "Principal");
  const students = testimonials.filter((t) => t.type === "Student");

  return (
    <>
      <PageHero
        eyebrow="Success Stories"
        title="Real Schools. Real Students. Real Impact."
        subtitle="Case studies and testimonials from the schools, parents and students who built their future with IC Robotics."
      />

      {/* School case studies */}
      <section className="container-x py-16">
        <SectionHeading eyebrow="School Case Studies" title="How schools transformed with IC Robotics" />
        <div className="mt-12 space-y-8">
          {caseStudies.map((c) => (
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
          <SectionHeading eyebrow="Student Success Stories" title="Students who found their path" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {(students.length ? students : testimonials).slice(0, 3).map((t) => <TestimonialCard key={t.id} story={t} />)}
          </div>
        </div>
      </section>

      {/* Parent + leader testimonials */}
      <section className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Parent Testimonials" title="What parents say" center={false} />
            <div className="mt-8 grid gap-6">{parents.map((t) => <TestimonialCard key={t.id} story={t} />)}</div>
          </div>
          <div>
            <SectionHeading eyebrow="School Leaders" title="What principals say" center={false} />
            <div className="mt-8 grid gap-6">{leaders.map((t) => <TestimonialCard key={t.id} story={t} />)}</div>
          </div>
        </div>
      </section>

      {/* International achievements */}
      <section className="bg-gradient-to-b from-brand-50/40 to-white py-16">
        <div className="container-x">
          <SectionHeading eyebrow="International Achievements" title="On the world stage" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {internationalAchievements.map((a, i) => (
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

      <CTASection />
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
