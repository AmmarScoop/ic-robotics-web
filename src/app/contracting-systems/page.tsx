import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ContractingSystems } from "@/components/contracting-systems";
import { CTASection } from "@/components/cta-section";
import { getSiteContent } from "@/lib/site-content";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contracting Systems — How Schools Work With I.C Robotics",
  description: "Six flexible ways for schools to bring Robotics, Programming and AI into their school: all students, optional enrollment, event booking, summer camp, stage-based and competition programs.",
};

export const revalidate = 300;

export default async function ContractingSystemsPage() {
  const c = await getSiteContent();
  const p = c.contracting;
  const phone = c.settings.schoolsWhatsapp || c.settings.whatsapp || c.settings.phone;
  return (
    <>
      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} subtitle={p.hero.subtitle} />

      {/* How it works */}
      {p.journey.length > 0 && (
        <section className="container-x pt-14">
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.journey.map((j, i) => (
              <Reveal key={j.title + i} delay={i * 0.05}>
                <li className="card-surface flex h-full items-start gap-3 p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-grape-500 text-sm font-bold text-white">{i + 1}</span>
                  <span>
                    <span className="block font-bold text-ink">{j.title}</span>
                    <span className="block text-sm text-slate-600">{j.blurb}</span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>
      )}

      <section className="container-x py-14">
        <ContractingSystems systems={p.systems} whatsapp={phone} />
      </section>

      {p.note && (
        <section className="container-x">
          <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6 text-center sm:flex-row sm:text-left">
            <p className="font-semibold text-emerald-900">{p.note}</p>
            <a href={whatsappLink(phone, "Hello I.C Robotics School Department, we'd like help choosing the right contracting system for our school.")} target="_blank" rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1ebe5b]">
              <MessageCircle className="h-4 w-4" /> Message the School Department
            </a>
          </div>
        </section>
      )}

      <CTASection {...c.cta} />
    </>
  );
}
