import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { OrientationCTA } from "@/components/orientation-cta";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact — Request a Proposal, Book a Demo, Partner With Us",
  description: "Get in touch with IC Robotics to request a school proposal, book a free demo, become a partner school, or ask a parent/competition question.",
};

export const revalidate = 300;

export default async function ContactPage() {
  const { contact: p, settings: s } = await getSiteContent();
  return (
    <>
      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} subtitle={p.hero.subtitle} />

      <section className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="grid gap-4">
              {p.routes.map((r, i) => (
                <Reveal key={r.title + i} delay={i * 0.06}>
                  <div className="flex items-start gap-4 card-surface p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-grape-500 text-white"><Icon name={r.icon} className="h-5 w-5" /></div>
                    <div>
                      <p className="font-bold text-ink">{r.title}</p>
                      <p className="text-sm text-slate-600">{r.blurb}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-6 card-surface p-6">
              <h3 className="font-bold text-ink">{p.infoTitle}</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {s.email && <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand-500" /> <a href={`mailto:${s.email}`} className="hover:text-brand-700">{s.email}</a></li>}
                {s.phone && <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand-500" /> <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="hover:text-brand-700">{s.phone}</a></li>}
                {s.whatsapp && <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-brand-500" /> WhatsApp {s.whatsapp}</li>}
                {s.addresses.filter(Boolean).map((a) => (
                  <li key={a} className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /> {a}</li>
                ))}
              </ul>
            </div>
          </div>
          <Suspense fallback={<div className="card-surface p-8 text-slate-400">Loading form…</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </section>

      <OrientationCTA data={p.orientation} />
    </>
  );
}
