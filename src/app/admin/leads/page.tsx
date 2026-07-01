"use client";
import { useEffect, useMemo, useState } from "react";
import { Download, Search, AlertTriangle, Inbox } from "lucide-react";
import { AdminShell, useAdminApi } from "@/components/admin/admin-shell";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Lead } from "@/lib/types";

export default function LeadsPage() {
  const api = useAdminApi();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [kind, setKind] = useState("");

  useEffect(() => {
    (async () => {
      try { setLeads(await api.list("leads") as Lead[]); }
      catch (e: any) { setErr(e.message); }
      finally { setLoading(false); }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const kinds = useMemo(() => Array.from(new Set(leads.map((l) => l.kind))), [leads]);
  const filtered = leads.filter((l) => {
    const matchKind = !kind || l.kind === kind;
    const hay = `${l.name ?? ""} ${l.email ?? ""} ${l.phone ?? ""} ${JSON.stringify(l.payload)}`.toLowerCase();
    return matchKind && (!q || hay.includes(q.toLowerCase()));
  });

  function exportCsv() {
    const rows = [["Date", "Kind", "Name", "Email", "Phone", "Details"]];
    filtered.forEach((l) => rows.push([
      new Date(l.created_at).toISOString(), l.kind, l.name ?? "", l.email ?? "", l.phone ?? "",
      JSON.stringify(l.payload).replace(/"/g, "'"),
    ]));
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url; a.download = `ic-robotics-leads-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AdminShell title="Leads">
      {err && <div className="mb-6 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700"><AlertTriangle className="h-4 w-4" /> {err}</div>}

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, phone…" className="pl-9" />
        </div>
        <div className="w-full sm:w-52"><Select value={kind} onChange={(e) => setKind(e.target.value)}><option value="">All types</option>{kinds.map((k) => <option key={k} value={k}>{k}</option>)}</Select></div>
        <Button variant="outline" onClick={exportCsv} disabled={!filtered.length}><Download className="h-4 w-4" /> Export CSV</Button>
      </div>

      <div className="card-surface overflow-hidden p-0">
        {loading ? (
          <p className="p-8 text-slate-400">Loading…</p>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center p-12 text-center text-slate-400"><Inbox className="mb-2 h-8 w-8" /> No leads yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                <tr><th className="p-4">Date</th><th className="p-4">Type</th><th className="p-4">Name</th><th className="p-4">Contact</th><th className="p-4">Details</th></tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr key={l.id} className="border-b border-slate-50 align-top">
                    <td className="whitespace-nowrap p-4 text-slate-500">{new Date(l.created_at).toLocaleDateString()}</td>
                    <td className="p-4"><span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">{l.kind}</span></td>
                    <td className="p-4 font-semibold text-ink">{l.name || "—"}</td>
                    <td className="p-4 text-slate-600"><div>{l.email || "—"}</div><div className="text-xs text-slate-400">{l.phone || ""}</div></td>
                    <td className="max-w-xs p-4"><pre className="whitespace-pre-wrap break-words text-xs text-slate-500">{JSON.stringify(l.payload, null, 0)}</pre></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
