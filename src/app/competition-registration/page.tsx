import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { CompetitionRegisterForm } from "@/components/competition-register-form";
import { competitions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Competition Registration — FLL, WRO, Robot Challenge, Technoxian",
  description: "Register a student's interest for IC Robotics competitions: FLL, WRO, Robot Challenge and Technoxian. Free training pathway and coaching.",
};

export default function CompetitionRegistrationPage() {
  return (
    <>
      <PageHero eyebrow="Register" title="Register For A Competition" subtitle="Secure your student's place in national and international robotics competitions — we handle the training." />
      <section className="container-x max-w-3xl py-14">
        <Suspense fallback={<div className="card-surface p-8 text-slate-400">Loading form…</div>}>
          <CompetitionRegisterForm />
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
