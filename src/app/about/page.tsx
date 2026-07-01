import type { Metadata } from "next";
import { Target, Eye, Award, Gavel, Users } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { StatCard } from "@/components/stat-card";
import { CTASection } from "@/components/cta-section";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Reveal } from "@/components/reveal";
import { impactStats } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us — Nine Years Building Future Innovators",
  description: "IC Robotics is a kids technology academy preparing children for the future through Robotics, Coding, AI and STEM — with international competition and judging experience.",
};

const team = [
  { name: "Founder & CEO", role: "Vision & School Partnerships" },
  { name: "Head of Curriculum", role: "Robotics · Coding · AI" },
  { name: "Head of Competitions", role: "International Coach & Judge" },
  { name: "Head of Trainers", role: "Trainer Certification" },
];

const accreditations = ["STEM Accreditation", "International Competition Partner", "Certified Trainer Program", "School Partnership Standard"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About IC Robotics"
        title="Building The Next Generation Of Innovators"
        subtitle="For nine years we've helped schools and parents prepare children for a future shaped by Robotics, Coding and AI."
      />

      {/* Overview */}
      <section className="container-x py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow mb-4">Company Overview</span>
            <h2 className="text-3xl font-extrabold text-ink">A future-skills academy, not a training center</h2>
            <p className="mt-4 text-slate-600">
              IC Robotics partners with schools and families to deliver world-class STEM education: progressive
              curriculum, certified trainers, robotics labs, assessments, student portfolios, certificates and a
              proven competition pathway that reaches the international stage.
            </p>
            <p className="mt-4 text-slate-600">
              We&apos;ve trained 15,000+ students, entered 8,000+ competition participants and delivered partnerships
              as large as 1,500 students in a single school.
            </p>
          </Reveal>
          <MediaPlaceholder label="Our story" className="aspect-[4/3]" tone="grape" />
        </div>
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-5">
          {impactStats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-gradient-to-b from-white to-brand-50/40 py-16">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card-surface h-full p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white"><Target className="h-6 w-6" /></div>
              <h3 className="mt-4 text-xl font-bold text-ink">Mission</h3>
              <p className="mt-2 text-slate-600">To make future-skills education accessible, measurable and inspiring for every child — by empowering schools with everything they need to deliver it.</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card-surface h-full p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-grape-600 text-white"><Eye className="h-6 w-6" /></div>
              <h3 className="mt-4 text-xl font-bold text-ink">Vision</h3>
              <p className="mt-2 text-slate-600">A generation of confident creators who shape technology rather than fear it — starting in the classroom and reaching the world stage.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Accreditations + judging */}
      <section className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Accreditations" title="Recognized standards" center={false} />
            <ul className="mt-8 space-y-3">
              {accreditations.map((a) => (
                <li key={a} className="flex items-center gap-3 card-surface p-4"><Award className="h-5 w-5 text-accent-500" /><span className="font-semibold text-ink">{a}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="International Judges Experience" title="We don't just compete — we judge" center={false} />
            <div className="mt-8 card-surface p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white"><Gavel className="h-6 w-6" /></div>
              <p className="mt-4 text-slate-600">
                Our coaches have served as judges and mentors at international robotics competitions — giving our
                students an insider understanding of exactly what wins on the world stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gradient-to-b from-brand-50/40 to-white py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Our Team" title="The people behind IC Robotics" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.06}>
                <div className="card-surface p-6 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-grape-500 text-white"><Users className="h-8 w-8" /></div>
                  <p className="mt-4 font-bold text-ink">{m.name}</p>
                  <p className="text-sm text-slate-500">{m.role}</p>
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
