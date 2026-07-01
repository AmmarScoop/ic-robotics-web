"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Inbox, Star, Newspaper, Images, ArrowRight, AlertTriangle } from "lucide-react";
import { AdminShell, useAdminApi } from "@/components/admin/admin-shell";

export default function AdminOverview() {
  const api = useAdminApi();
  const [counts, setCounts] = useState({ leads: 0, testimonials: 0, posts: 0, media: 0 });
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [leads, testimonials, posts, media] = await Promise.all([
          api.list("leads"), api.list("testimonials"), api.list("posts"), api.list("media"),
        ]);
        setCounts({ leads: leads.length, testimonials: testimonials.length, posts: posts.length, media: media.length });
      } catch (e: any) { setErr(e.message); }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cards = [
    { label: "Leads", value: counts.leads, href: "/admin/leads", icon: Inbox, tone: "from-brand-500 to-brand-700" },
    { label: "Reviews", value: counts.testimonials, href: "/admin/reviews", icon: Star, tone: "from-accent-400 to-accent-600" },
    { label: "Articles", value: counts.posts, href: "/admin/articles", icon: Newspaper, tone: "from-grape-500 to-grape-700" },
    { label: "Media", value: counts.media, href: "/admin/media", icon: Images, tone: "from-brand-500 to-grape-600" },
  ];

  return (
    <AdminShell title="Overview">
      {err && (
        <div className="mb-6 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
          <AlertTriangle className="h-4 w-4" /> {err} — check your Supabase environment variables.
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="card-surface group p-6 transition hover:-translate-y-1 hover:shadow-glow">
            <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white ${c.tone}`}><c.icon className="h-5 w-5" /></div>
            <p className="text-3xl font-extrabold text-ink">{c.value}</p>
            <p className="flex items-center gap-1 text-sm font-semibold text-slate-500">{c.label} <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" /></p>
          </Link>
        ))}
      </div>
      <div className="mt-8 card-surface p-6">
        <h2 className="font-bold text-ink">Welcome to your dashboard</h2>
        <p className="mt-2 text-sm text-slate-600">Manage everything that appears on the site: view incoming leads, edit the reviews shown across pages, publish blog articles, and curate the media library. Changes are saved to Supabase and appear on the public site immediately.</p>
      </div>
    </AdminShell>
  );
}
