"use client";
import { useEffect, useState } from "react";
import { AlertTriangle, Check, Copy, ExternalLink, Database } from "lucide-react";

export type SetupStatus = { supabase: boolean; content: boolean; inbox: boolean; storage: boolean; projectRef: string | null };

export const MIGRATION_SQL = `-- IC Robotics dashboard upgrade — run once (safe to re-run)
create table if not exists public.site_content (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
drop policy if exists "read site content" on public.site_content;
create policy "read site content" on public.site_content for select using (true);

alter table public.leads add column if not exists status text not null default 'new';
alter table public.leads add column if not exists notes text not null default '';
alter table public.leads add column if not exists updated_at timestamptz not null default now();
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_kind_idx on public.leads (kind);

insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do update set public = true;`;

export function useSetupStatus() {
  const [status, setStatus] = useState<SetupStatus | null>(null);
  useEffect(() => {
    fetch("/api/admin/setup", { cache: "no-store" }).then((r) => r.json()).then(setStatus).catch(() => {});
  }, []);
  return status;
}

/** Shows the one-time database step when the new tables/columns are missing. Renders nothing when ready. */
export function SetupBanner({ status, need = ["content", "inbox"] }: { status: SetupStatus | null; need?: ("content" | "inbox" | "storage")[] }) {
  const [copied, setCopied] = useState(false);
  if (!status) return null;

  if (!status.supabase) {
    return (
      <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="font-bold">Supabase isn&apos;t connected</p>
          <p className="mt-1">Add <code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code> to your hosting environment variables, then redeploy.</p>
        </div>
      </div>
    );
  }

  const missing = need.filter((k) => !status[k]);
  if (missing.length === 0) return null;
  const sqlUrl = status.projectRef ? `https://supabase.com/dashboard/project/${status.projectRef}/sql/new` : "https://supabase.com/dashboard";

  async function copy() {
    try { await navigator.clipboard.writeText(MIGRATION_SQL); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch {}
  }

  return (
    <div className="mb-6 rounded-2xl border border-brand-200 bg-brand-50/60 p-5 text-sm text-slate-700">
      <div className="flex items-start gap-3">
        <Database className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
        <div className="min-w-0 flex-1">
          <p className="font-bold text-ink">One-time database setup needed</p>
          <p className="mt-1">
            {missing.includes("content") && "Saving site content "}
            {missing.includes("content") && missing.includes("inbox") && "and "}
            {missing.includes("inbox") && "tracking form status & notes "}
            {missing.includes("storage") && !missing.includes("content") && !missing.includes("inbox") && "Image uploads "}
            needs a small database update. Copy the SQL below, open the Supabase SQL editor, paste it and press <b>Run</b>. Then refresh this page.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700">
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? "Copied!" : "Copy SQL"}
            </button>
            <a href={sqlUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-4 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-50">
              Open Supabase SQL editor <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <details className="mt-3">
            <summary className="cursor-pointer text-xs font-semibold text-slate-500">Show SQL</summary>
            <pre className="mt-2 max-h-64 overflow-auto rounded-xl bg-ink p-4 text-[11px] leading-relaxed text-slate-100">{MIGRATION_SQL}</pre>
          </details>
        </div>
      </div>
    </div>
  );
}
