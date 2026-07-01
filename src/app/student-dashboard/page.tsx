import type { Metadata } from "next";
import { Award, Star, Trophy, FolderKanban, GraduationCap, Flame, Zap } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { DashboardCard } from "@/components/dashboard-card";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { dashboardDemo as d } from "@/lib/data";

export const metadata: Metadata = {
  title: "Student Dashboard Demo — Track Every Learner's Progress",
  description: "A demo of the IC Robotics student dashboard: levels, achievements, attendance, projects, certificates, badges, points and competition history.",
};

export default function StudentDashboardPage() {
  return (
    <>
      <PageHero eyebrow="Student Dashboard" title="Every Student's Progress, Beautifully Tracked" subtitle="A live demo of what students, parents and schools see inside IC Robotics." />

      <section className="container-x py-14">
        <Reveal>
          <div className="card-surface flex flex-col items-start gap-6 p-7 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-600 to-grape-500 text-2xl font-extrabold text-white">AK</div>
            <div className="flex-1">
              <h2 className="text-2xl font-extrabold text-ink">{d.student}</h2>
              <p className="text-brand-700">{d.level}</p>
            </div>
            <div className="flex gap-6">
              <div className="text-center"><p className="flex items-center justify-center gap-1 text-2xl font-extrabold text-accent-500"><Zap className="h-5 w-5" />{d.points.toLocaleString()}</p><p className="text-xs text-slate-500">Points</p></div>
              <div className="text-center"><p className="flex items-center justify-center gap-1 text-2xl font-extrabold text-brand-600"><Flame className="h-5 w-5" />{d.attendance}%</p><p className="text-xs text-slate-500">Attendance</p></div>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard label="Current Level" value="6" hint={d.level} />
          <DashboardCard label="Completion" value={`${d.completion}%`} hint="Program milestones" />
          <DashboardCard label="Achievements" value={d.achievements.length} hint="Unlocked" />
          <DashboardCard label="Certificates" value={d.certificates.length} hint="Verified" />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="card-surface p-6">
              <h3 className="flex items-center gap-2 font-bold text-ink"><Star className="h-5 w-5 text-accent-500" /> Badges</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {d.badges.map((b) => <Badge key={b} className="bg-accent-50 text-accent-700">{b}</Badge>)}
              </div>
              <h3 className="mt-6 flex items-center gap-2 font-bold text-ink"><Award className="h-5 w-5 text-grape-500" /> Achievements</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {d.achievements.map((a) => <li key={a} className="rounded-xl bg-slate-50 px-3 py-2">{a}</li>)}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="card-surface p-6">
              <h3 className="flex items-center gap-2 font-bold text-ink"><FolderKanban className="h-5 w-5 text-brand-500" /> Projects</h3>
              <ul className="mt-3 space-y-2">
                {d.projects.map((p) => (
                  <li key={p.name} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm">
                    <span className="font-semibold text-ink">{p.name}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${p.status === "Completed" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{p.status}</span>
                  </li>
                ))}
              </ul>
              <h3 className="mt-6 flex items-center gap-2 font-bold text-ink"><GraduationCap className="h-5 w-5 text-brand-500" /> Certificates</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {d.certificates.map((c) => <li key={c} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{c}</li>)}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-6 card-surface p-6">
            <h3 className="flex items-center gap-2 font-bold text-ink"><Trophy className="h-5 w-5 text-accent-500" /> Competition History</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {d.competitionHistory.map((c) => (
                <div key={c.event} className="flex items-center justify-between rounded-2xl border border-slate-100 p-4">
                  <div><p className="font-semibold text-ink">{c.event}</p><p className="text-xs text-slate-500">{c.year}</p></div>
                  <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-bold text-accent-700">{c.result}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
