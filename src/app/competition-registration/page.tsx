import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { CompetitionRegisterForm } from "@/components/competition-register-form";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Competition Registration — FLL, WRO, Robot Challenge, Technoxian",
  description: "Register a student's interest for IC Robotics competitions: FLL, WRO, Robot Challenge and Technoxian. Free training pathway and coaching.",
};

export const revalidate = 300;

export default async function CompetitionRegistrationPage() {
  const content = await getSiteContent();
  const competitions = content.competitions.items;
  const hero = content.registration.hero;
  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} subtitle={hero.subtitle} />
      <section className="container-x max-w-3xl py-14">
        <Suspense fallback={<div className="card-surface p-8 text-slate-400">Loading form…</div>}>
          <CompetitionRegisterForm competitions={competitions.map((c) => ({ id: c.id, name: c.name }))} />
        </Suspense>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {competitions.map((c) => (
            <div key={c.id} className="card-surface p-4 text-center text-sm font-semibold text-slate-600">{c.name.split("(")[0].trim()}</div>
          ))}
        </div>
      </section>
    </>
  );
}
