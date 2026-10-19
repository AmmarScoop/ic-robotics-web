"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { AdminShell, useAdminApi } from "@/components/admin/admin-shell";
import { SetupBanner, useSetupStatus } from "@/components/admin/setup-banner";
import { Icon } from "@/components/icon";
import { Input } from "@/components/ui/input";
import { sections, sectionGroups } from "@/lib/content-schema";

function ago(iso: string) {
  const s = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  const m = Math.round(s / 60); if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60); if (h < 24) return `${h} h ago`;
  return new Date(iso).toLocaleDateString();
}

export default function ContentIndexPage() {
  const api = useAdminApi();
  const status = useSetupStatus();
  const [saved, setSaved] = useState<Record<string, string | null>>({});
  const [q, setQ] = useState("");

  useEffect(() => {
    api.get("content")
      .then((j) => setSaved(Object.fromEntries(j.data.map((r: any) => [r.key, r.updated_at]))))
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? sections.filter((s) => `${s.title} ${s.description}`.toLowerCase().includes(t)) : sections;
  }, [q]);

  return (
    <AdminShell title="Site content">
      <SetupBanner status={status} need={["content"]} />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm text-slate-500">
          Edit any text, image, video, list or link on the website. Changes go live as soon as you press <b>Save</b>.
        </p>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a section…" className="pl-9" />
        </div>
      </div>

      {sectionGroups.map((g) => {
        const list = filtered.filter((s) => s.group === g);
        if (!list.length) return null;
        return (
          <section key={g} className="mb-8">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">{g}</h2>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((s) => (
                <Link key={s.key} href={`/admin/content/${s.key}`}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-grape-500 text-white">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1 font-bold text-ink">{s.title} <ArrowRight className="h-3.5 w-3.5 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-500" /></span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">{s.description}</span>
                    <span className="mt-2 block text-[11px] font-semibold">
                      {saved[s.key]
                        ? <span className="text-emerald-600">● Edited {ago(saved[s.key]!)}</span>
                        : <span className="text-slate-400">○ Original content</span>}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </AdminShell>
  );
}
