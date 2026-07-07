import type { Metadata } from "next";
import { Suspense } from "react";
import { Handshake, CalendarCheck, FileText, Mail, Phone, MapPin } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { OrientationCTA } from "@/components/orientation-cta";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact — Request a Proposal, Book a Demo, Partner With Us",
  description: "Get in touch with IC Robotics to request a school proposal, book a free demo, become a partner school, or ask a parent/competition question.",
};

const routes = [
  { icon: FileText, title: "Request Proposal", blurb: "A tailored plan and pricing for your school." },
  { icon: CalendarCheck, title: "Book Demo", blurb: "A live 45-minute orientation for your team." },
  { icon: Handshake, title: "Become A Partner School", blurb: "Join our school partnership network." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's Build The Future Together" subtitle="Whether you're a school leader, a parent or a partner — we'd love to hear from you." />

      <section className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="grid gap-4">
              {routes.map((r, i) => (
                <Reveal key={r.title} delay={i * 0.06}>
                  <div className="flex items-start gap-4 card-surface p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-grape-500 text-white"><r.icon className="h-5 w-5" /></div>
                    <div>
                      <p className="font-bold text-ink">{r.title}</p>
                      <p className="text-sm text-slate-600">{r.blurb}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-6 card-surface p-6">
              <h3 className="font-bold text-ink">Contact Information</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand-500" /> info@icroboticsschools.com</li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand-500" /> 01044424957</li>
                <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /> Ahmed Maher, Al-Toukhy Tower, next to CIB Bank</li>
                <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /> Gezira El Ward Club, next to El Mohamady Restaurant</li>
              </ul>
            </div>
          </div>
          <Suspense fallback={<div className="card-surface p-8 text-slate-400">Loading form…</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </section>

      <OrientationCTA />
    </>
  );
}
