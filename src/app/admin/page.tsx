"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Inbox, Star, Newspaper, Images, ArrowRight, AlertTriangle, BellDot, CalendarDays, PanelsTopLeft, CheckCircle2, Circle } from "lucide-react";
import { AdminShell, useAdminApi } from "@/components/admin/admin-shell";
import { SetupBanner, useSetupStatus } from "@/components/admin/setup-banner";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";
import type { Lead } from "@/lib/types";
import { formType, leadName, leadSummary, statusOf } from "@/lib/forms";

const QUICK = [
  { key: "home", label: "Home page", icon: "LayoutDashboard" },
  { key: "settings", label: "Contact info & links", icon: "Cog" },
  { key: "videos", label: "Videos", icon: "Video" },
  { key: "partners", label: "Partner logos", icon: "Handshake" },
  { key: "programs", label: "Programs", icon: "GraduationCap" },
  { key: "competitions", label: "Competitions", icon: "Trophy" },
  { key: "certificates", label: "Certificates", icon: "Award" },
  { key: "about", label: "About page", icon: "Users" },
];

export default function AdminOverview() {
  const api = useAdminApi();
  const setup = useSetupStatus();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [counts, setCounts] = useState({ testimonials: 0, posts: 0, media: 0 });
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [l, testimonials, posts, media] = await Promise.all([
          api.list("leads"), api.list("testimonials"), api.list("posts"), api.list("media"),
        ]);
        setLeads(l as Lead[]);
        setCounts({ testimonials: testimonials.length, posts: posts.length, media: media.length });
      } catch (e: any) { setErr(e.message); }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = useMemo(() => {
    const week = Date.now() - 7 * 86400000;
    const byKind: Record<string, number> = {};
    leads.forEach((l) => { byKind[l.kind] = (byKind[l.kind] ?? 0) + 1; });
    return {
      fresh: leads.filter((l) => (l.status ?? "new") === "new").length,
      week: leads.filter((l) => new Date(l.created_at).getTime() >= week).length,
      byKind: Object.entries(byKind).sort((a, b) => b[1] - a[1]),
    };
  }, [leads]);

  const cards = [
    { label: "New submissions", value: stats.fresh, href: "/admin/leads", icon: BellDot, tone: "from-flag-400 to-flag-600" },
    { label: "Submissions this week", value: stats.week, href: "/admin/leads", icon: CalendarDays, tone: "from-brand-500 to-brand-700" },
    { label: "All submissions", value: leads.length, href: "/admin/leads", icon: Inbox, tone: "from-grape-500 to-grape-700" },
    { label: "Reviews", value: counts.testimonials, href: "/admin/reviews", icon: Star, tone: "from-accent-400 to-accent-600" },
    { label: "Articles", value: counts.posts, href: "/admin/articles", icon: Newspaper, tone: "from-grape-500 to-brand-600" },
    { label: "Media items", value: counts.media, href: "/admin/media", icon: Images, tone: "from-brand-500 to-grape-600" },
  ];

  const checklist = setup && [
    { ok: setup.supabase, label: "Database connected" },
    { ok: setup.content, label: "Site content editing enabled" },
    { ok: setup.inbox, label: "Submission status & notes enabled" },
    { ok: setup.storage, label: "Image uploads enabled" },
  ];

  return (
    <AdminShell title="Overview">
      <SetupBanner status={setup} need={["content", "inbox"]} />
      {err && (
        <div className="mb-6 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
          <AlertTriangle className="h-4 w-4" /> {err}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="card-surface group flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-glow">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white ${c.tone}`}><c.icon className="h-5 w-5" /></div>
            <div>
              <p className="text-3xl font-extrabold leading-none text-ink">{c.value}</p>
              <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-slate-500">{c.label} <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" /></p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* Recent submissions */}
        <div className="card-surface p-0">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="font-bold text-ink">Latest form submissions</h2>
            <Link href="/admin/leads" className="text-sm font-semibold text-brand-700 hover:underline">View all</Link>
          </div>
          {leads.length === 0 ? (
            <p className="p-6 text-sm text-slate-400">No submissions yet. They appear here as soon as someone fills a form on the website.</p>
          ) : (
            <ul className="divide-y divide-slate-50">
              {leads.slice(0, 7).map((l) => {
                const st = statusOf(l);
                return (
                  <li key={l.id}>
                    <Link href={`/admin/leads?id=${l.id}`} className="flex items-center gap-3 px-5 py-3 transition hover:bg-brand-50/40">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><Icon name={formType(l.kind).icon} className="h-4 w-4" /></span>
                      <span className="min-w-0 flex-1">
                        <span className={cn("block truncate text-sm text-ink", st.value === "new" ? "font-bold" : "font-semibold")}>{leadName(l)}</span>
                        <span className="block truncate text-xs text-slate-500">{formType(l.kind).short}{leadSummary(l) ? ` · ${leadSummary(l)}` : ""}</span>
                      </span>
                      <span className="shrink-0 text-right">
                        <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1", st.tone)}>{st.label}</span>
                        <span className="mt-0.5 block text-[11px] text-slate-400">{new Date(l.created_at).toLocaleDateString()}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="grid content-start gap-6">
          {/* By form */}
          <div className="card-surface p-5">
            <h2 className="font-bold text-ink">Submissions by form</h2>
            <div className="mt-4 space-y-3">
              {stats.byKind.length === 0 && <p className="text-sm text-slate-400">Nothing yet.</p>}
              {stats.byKind.map(([k, n]) => (
                <div key={k}>
                  <div className="flex items-center justify-between text-sm"><span className="font-semibold text-slate-600">{formType(k).short}</span><span className="font-bold text-ink">{n}</span></div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-grape-500" style={{ width: `${(n / leads.length) * 100}%` }} /></div>
                </div>
              ))}
            </div>
          </div>

          {/* Setup checklist */}
          {checklist && (
            <div className="card-surface p-5">
              <h2 className="font-bold text-ink">Dashboard status</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {checklist.map((c) => (
                  <li key={c.label} className="flex items-center gap-2">
                    {c.ok ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Circle className="h-4 w-4 text-slate-300" />}
                    <span className={c.ok ? "text-slate-700" : "text-slate-400"}>{c.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Quick edit */}
      <div className="mt-6 card-surface p-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-bold text-ink"><PanelsTopLeft className="h-4 w-4 text-brand-600" /> Edit website content</h2>
          <Link href="/admin/content" className="text-sm font-semibold text-brand-700 hover:underline">All sections</Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {QUICK.map((q) => (
            <Link key={q.key} href={`/admin/content/${q.key}`} className="flex items-center gap-2 rounded-xl border border-slate-100 px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700">
              <Icon name={q.icon} className="h-4 w-4 shrink-0" /> {q.label}
            </Link>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
