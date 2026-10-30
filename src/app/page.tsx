import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2, School, Users, PartyPopper, Presentation } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { TrustLogos } from "@/components/trust-logos";
import { StatCard } from "@/components/stat-card";
import { IconCard } from "@/components/icon-card";
import { HomeLeadSection } from "@/components/home-lead-section";
import { CTASection } from "@/components/cta-section";
import { TestimonialCard } from "@/components/testimonial-card";
import { CompetitionCard } from "@/components/competition-card";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { getTestimonials } from "@/lib/content";
import { getSiteContent } from "@/lib/site-content";
import { VideoBlock } from "@/components/video-block";
import { AccreditationCards } from "@/components/accreditation-cards";
import { Flag } from "@/components/flag";
import { PhotoGallery } from "@/components/photo-gallery";
import type { EventBlock } from "@/lib/site-defaults";

export const revalidate = 60;

export default async function HomePage() {
  const [testimonials, c] = await Promise.all([getTestimonials(), getSiteContent()]);
  const home = c.home;
  return (
    <>
      <HeroSection hero={home.hero} video={c.videos.hero} />

      {/* Trusted by schools */}
      <section className="container-x py-8">
        {c.partners.title && <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-slate-400">{c.partners.title}</p>}
        <TrustLogos partners={c.partners.items} />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {home.trustIndicators.map((t) => (
            <span key={t} className="flex items-center gap-1.5 rounded-full border border-slate-100 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-brand-500" /> {t}
            </span>
          ))}
        </div>
      </section>

      {/* International accreditations */}
      {c.accreditations.items.length > 0 && (
        <section className="container-x py-12">
          <SectionHeading eyebrow={c.accreditations.eyebrow} title={c.accreditations.title} subtitle={c.accreditations.subtitle} />
          <div className="mx-auto mt-10 max-w-4xl"><AccreditationCards items={c.accreditations.items} /></div>
        </section>
      )}

      {/* Founders' introduction videos (shown once at least one video link is added) */}
      {c.founders.videos.some((v) => v.url) && (
        <section className="bg-gradient-to-b from-white to-brand-50/40 py-16">
          <div className="container-x">
            <SectionHeading eyebrow={c.founders.eyebrow} title={c.founders.title} subtitle={c.founders.subtitle} />
            <div className={`mx-auto mt-12 grid gap-8 ${c.founders.videos.filter((v) => v.url).length > 1 ? "max-w-5xl md:grid-cols-2" : "max-w-3xl"}`}>
              {c.founders.videos.filter((v) => v.url).map((v, i) => (
                <Reveal key={v.name + i} delay={i * 0.08}>
                  <div className="card-surface p-3">
                    <VideoBlock src={v.url} label={v.name} className="aspect-video" />
                    <div className="px-3 pb-2 pt-4">
                      <p className="text-lg font-bold text-ink">{v.name}</p>
                      {v.role && <p className="text-sm text-slate-500">{v.role}</p>}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Marketing message: more than courses */}
      <section className="container-x py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <span className="eyebrow mb-4">{home.message.eyebrow}</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{home.message.title}</h2>
            {home.message.subtitle && <p className="mt-4 text-lg leading-relaxed text-slate-600">{home.message.subtitle}</p>}
            <ul className="mt-6 flex flex-wrap gap-2">
              {home.message.method.map((m) => (
                <li key={m} className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-2 text-sm font-semibold text-brand-700"><CheckCircle2 className="h-4 w-4" /> {m}</li>
              ))}
            </ul>
          </Reveal>
          <div className="grid gap-4">
            {home.message.system.map((it, i) => (
              <Reveal key={it.title + i} delay={i * 0.06}>
                <div className="card-surface flex items-start gap-4 p-5">
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white ${i === 0 ? "from-brand-500 to-brand-700" : i === 1 ? "from-accent-400 to-accent-600" : "from-grape-500 to-grape-700"}`}>
                    <Icon name={it.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-bold text-ink">{it.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{it.blurb}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why future skills matter */}
      <section className="container-x py-16">
        <SectionHeading eyebrow={home.skills.eyebrow} title={home.skills.title} subtitle={home.skills.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {home.skills.items.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="card-surface flex h-full flex-col p-7 transition hover:-translate-y-1 hover:shadow-glow">
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-white ${i === 0 ? "bg-gradient-to-br from-brand-500 to-brand-700" : i === 1 ? "bg-gradient-to-br from-accent-400 to-accent-600" : "bg-gradient-to-br from-grape-500 to-grape-700"}`}>
                  <Icon name={s.icon} className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{s.blurb}</p>
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{home.skills.careersLabel}</p>
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
          <SectionHeading eyebrow={home.impact.eyebrow} title={home.impact.title} subtitle={home.impact.subtitle} />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
            {c.stats.items.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* International presence (flags) */}
      {c.global.countries.length > 0 && (
        <section className="container-x py-16">
          <SectionHeading eyebrow={c.global.eyebrow} title={c.global.title} subtitle={c.global.subtitle} />
          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {c.global.countries.map((ct, i) => (
              <Reveal key={ct.code + i} delay={i * 0.04}>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-3 shadow-sm">
                  <Flag code={ct.code} name={ct.name} className="h-7 w-10" />
                  <span className="font-semibold text-ink">{ct.name}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline"><Link href="/competitions">See our competitions <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
        </section>
      )}

      {/* Lead generation */}
      <HomeLeadSection lead={home.lead} video={c.videos.leadSection} />

      {/* Small groups + responsibilities */}
      <section className="container-x py-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-700 via-brand-600 to-grape-600 p-8 text-white shadow-glow sm:p-10">
              <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">{home.ratio.eyebrow}</span>
              <p className="mt-6 text-6xl font-extrabold tracking-tight sm:text-7xl">{home.ratio.value}</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-white/70">Engineer : Students</p>
              <h2 className="mt-6 text-2xl font-extrabold">{home.ratio.title}</h2>
              {home.ratio.body && <p className="mt-3 text-white/85">{home.ratio.body}</p>}
              <ul className="mt-6 space-y-2.5">
                {home.ratio.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-sm text-white/90"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" /> {pt}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="card-surface h-full p-8 sm:p-10">
              <span className="eyebrow mb-4">{home.responsibilities.eyebrow}</span>
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{home.responsibilities.title}</h2>
              {home.responsibilities.subtitle && <p className="mt-3 text-slate-600">{home.responsibilities.subtitle}</p>}
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl bg-brand-50/70 p-5">
                  <p className="flex items-center gap-2 font-bold text-brand-700"><Users className="h-5 w-5" /> {home.responsibilities.academyTitle}</p>
                  <ul className="mt-3 space-y-2.5">
                    {home.responsibilities.academy.map((x) => <li key={x} className="flex items-start gap-2 text-sm text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /> {x}</li>)}
                  </ul>
                </div>
                <div className="rounded-2xl bg-accent-50 p-5">
                  <p className="flex items-center gap-2 font-bold text-accent-700"><School className="h-5 w-5" /> {home.responsibilities.schoolTitle}</p>
                  <ul className="mt-3 space-y-2.5">
                    {home.responsibilities.school.map((x) => <li key={x} className="flex items-start gap-2 text-sm text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" /> {x}</li>)}
                  </ul>
                </div>
              </div>
              <Button asChild variant="outline" className="mt-8"><Link href="/contracting-systems">See our contracting systems <ArrowRight className="h-4 w-4" /></Link></Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Orientation Day + Robotics Day */}
      <section className="bg-gradient-to-b from-white to-brand-50/40 py-16">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <EventCard data={c.events.orientation} icon="orientation" />
          <EventCard data={c.events.roboticsDay} icon="robotics" editions={c.events.roboticsDay.editions} />
        </div>
      </section>

      {/* How it works */}
      <section className="container-x py-16">
        <SectionHeading eyebrow={home.howItWorks.eyebrow} title={home.howItWorks.title} subtitle={home.howItWorks.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {home.howItWorks.steps.map((h, i) => (
            <Reveal key={h.title + i} delay={i * 0.08}>
              <div className="relative card-surface h-full p-7">
                <span className="absolute -top-4 left-7 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-grape-500 text-sm font-bold text-white shadow-soft">{i + 1}</span>
                <h3 className="mt-3 text-lg font-bold text-ink">{h.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{h.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {home.howItWorks.outcomes.map((o, i) => (
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
          <Button asChild size="lg"><Link href={home.howItWorks.button.href}>{home.howItWorks.button.label} <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
      </section>

      {/* School partnership preview */}
      <section className="container-x py-16">
        <div className="card-surface grid items-center gap-10 overflow-hidden p-8 lg:grid-cols-2 sm:p-10">
          <div>
            <span className="eyebrow mb-4">{home.partnership.eyebrow}</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink">{home.partnership.title}</h2>
            {home.partnership.subtitle && <p className="mt-4 text-slate-600">{home.partnership.subtitle}</p>}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {c.schools.receives.items.map((s) => (
                <div key={s.title} className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-700">
                  <Icon name={s.icon} className="h-4 w-4 text-brand-500" /> {s.title}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg"><Link href={home.partnership.button.href}>{home.partnership.button.label}</Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/contracting-systems">Contracting systems</Link></Button>
            </div>
          </div>
          <VideoBlock src={c.videos.partnership} label={home.partnership.videoLabel} className="aspect-[4/3]" tone="brand" />
        </div>
      </section>

      {/* Success stories preview */}
      <section className="bg-gradient-to-b from-brand-50/40 to-white py-16">
        <div className="container-x">
          <SectionHeading eyebrow={home.stories.eyebrow} title={home.stories.title} subtitle={home.stories.subtitle} />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => <TestimonialCard key={t.id} story={t} />)}
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {c.caseStudies.items.filter((cs) => cs.impact).slice(0, 2).map((cs) => (
              <Reveal key={cs.id}>
                <div className="card-surface p-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-600">{cs.school}</p>
                  <p className="mt-1 text-lg font-bold text-ink">{cs.students}</p>
                  <p className="mt-2 text-sm text-slate-600">{cs.impact}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline"><Link href={home.stories.button.href}>{home.stories.button.label} <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
        </div>
      </section>

      {/* Latest competitions */}
      <section className="container-x py-16">
        <SectionHeading eyebrow={home.competitions.eyebrow} title={home.competitions.title} subtitle={home.competitions.subtitle} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {c.competitions.items.map((comp) => <CompetitionCard key={comp.id} competition={comp} />)}
        </div>
      </section>

      <CTASection {...c.cta} />
    </>
  );
}

function EventCard({ data, icon, editions = [] }: { data: EventBlock; icon: "orientation" | "robotics"; editions?: { title: string; date: string; school: string; summary: string; photos: string[] }[] }) {
  const Ico = icon === "orientation" ? Presentation : PartyPopper;
  const photos = [...data.photos, ...editions.flatMap((e) => e.photos)].filter(Boolean);
  return (
    <Reveal className="h-full">
      <div className="card-surface flex h-full flex-col p-8">
        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white ${icon === "orientation" ? "bg-gradient-to-br from-grape-500 to-grape-700" : "bg-gradient-to-br from-accent-400 to-accent-600"}`}><Ico className="h-6 w-6" /></span>
        <span className="mt-5 text-xs font-bold uppercase tracking-wider text-brand-600">{data.eyebrow}</span>
        <h3 className="mt-1 text-2xl font-extrabold text-ink">{data.title}</h3>
        {data.body && <p className="mt-3 text-slate-600">{data.body}</p>}
        <ul className="mt-5 space-y-2">
          {data.points.map((pt) => <li key={pt} className="flex items-start gap-2 text-sm text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {pt}</li>)}
        </ul>
        {editions.filter((e) => e.title).length > 0 && (
          <div className="mt-6 space-y-3">
            {editions.filter((e) => e.title).map((e, i) => (
              <div key={e.title + i} className="rounded-2xl bg-slate-50 p-4">
                <p className="font-semibold text-ink">{e.title}</p>
                <p className="text-xs text-slate-500">{[e.date, e.school].filter(Boolean).join(" · ")}</p>
                {e.summary && <p className="mt-1.5 text-sm text-slate-600">{e.summary}</p>}
              </div>
            ))}
          </div>
        )}
        {photos.length > 0 && <PhotoGallery photos={photos} alt={data.eyebrow} max={6} className="mt-6" />}
      </div>
    </Reveal>
  );
}
