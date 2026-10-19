"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Download, Search, AlertTriangle, Inbox, X, Mail, Phone, MessageCircle, Trash2, Loader2, RefreshCw, CheckSquare, Square, ExternalLink,
} from "lucide-react";
import { AdminShell, useAdminApi } from "@/components/admin/admin-shell";
import { SetupBanner, useSetupStatus } from "@/components/admin/setup-banner";
import { Icon } from "@/components/icon";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import type { Lead } from "@/lib/types";
import {
  STATUSES, statusOf, formType, FORM_TYPES, leadRows, leadName, leadEmail, leadPhone, leadSummary, whatsappHref, type LeadStatus,
} from "@/lib/forms";

const RANGES = [
  { value: "", label: "Any time" },
  { value: "1", label: "Today" },
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 3 months" },
];

function when(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const sameDay = d.toDateString() === today.toDateString();
  return sameDay
    ? `Today ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    : d.toLocaleDateString([], { day: "numeric", month: "short", year: d.getFullYear() === today.getFullYear() ? undefined : "numeric" });
}

function notifyChanged() {
  window.dispatchEvent(new Event("icr-leads-changed"));
}

export default function LeadsPage() {
  const api = useAdminApi();
  const { toast } = useToast();
  const setup = useSetupStatus();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [kind, setKind] = useState("");
  const [status, setStatus] = useState<"" | LeadStatus>("");
  const [range, setRange] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    setLoading(true);
    try { setLeads(await api.list("leads") as Lead[]); setErr(""); }
    catch (e: any) { setErr(e.message); }
    finally { setLoading(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { load(); }, [load]);

  // Deep link: /admin/leads?id=… opens that submission
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (id) setOpenId(id);
  }, []);

  const kinds = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach((l) => { counts[l.kind] = (counts[l.kind] ?? 0) + 1; });
    const ordered = Object.keys(FORM_TYPES).filter((k) => counts[k]);
    const extra = Object.keys(counts).filter((k) => !FORM_TYPES[k]);
    return [...ordered, ...extra].map((k) => ({ kind: k, count: counts[k] }));
  }, [leads]);

  const filtered = useMemo(() => {
    const since = range ? Date.now() - Number(range) * 86400000 : 0;
    const t = q.trim().toLowerCase();
    return leads.filter((l) => {
      if (kind && l.kind !== kind) return false;
      if (status && (l.status ?? "new") !== status) return false;
      if (since && new Date(l.created_at).getTime() < since) return false;
      if (!t) return true;
      return `${leadName(l)} ${leadEmail(l) ?? ""} ${leadPhone(l) ?? ""} ${l.notes ?? ""} ${JSON.stringify(l.payload)}`.toLowerCase().includes(t);
    });
  }, [leads, kind, status, range, q]);

  const newCount = leads.filter((l) => (l.status ?? "new") === "new").length;
  const open = leads.find((l) => l.id === openId) ?? null;

  async function update(l: Lead, patch: Partial<Pick<Lead, "status" | "notes">>, quiet = false) {
    const prev = leads;
    setLeads((ls) => ls.map((x) => (x.id === l.id ? { ...x, ...patch } : x)));
    try {
      await api.send(`leads/${l.id}`, "PUT", patch);
      notifyChanged();
      if (!quiet) toast({ title: patch.status ? `Marked as ${statusOf({ status: patch.status }).label}` : "Notes saved" });
    } catch (e: any) {
      setLeads(prev);
      toast({ title: "Couldn't update", description: e.message });
    }
  }

  async function remove(ids: string[]) {
    if (!confirm(ids.length === 1 ? "Delete this submission permanently?" : `Delete ${ids.length} submissions permanently?`)) return;
    try {
      await Promise.all(ids.map((id) => api.remove("leads", id)));
      setLeads((ls) => ls.filter((l) => !ids.includes(l.id)));
      setSelected(new Set()); if (openId && ids.includes(openId)) setOpenId(null);
      notifyChanged();
      toast({ title: ids.length === 1 ? "Submission deleted" : `${ids.length} submissions deleted` });
    } catch (e: any) { toast({ title: "Couldn't delete", description: e.message }); }
  }

  async function bulkStatus(s: LeadStatus) {
    const ids = Array.from(selected);
    const prev = leads;
    setLeads((ls) => ls.map((x) => (selected.has(x.id) ? { ...x, status: s } : x)));
    try {
      await Promise.all(ids.map((id) => api.send(`leads/${id}`, "PUT", { status: s })));
      notifyChanged(); setSelected(new Set());
      toast({ title: `${ids.length} marked as ${statusOf({ status: s }).label}` });
    } catch (e: any) { setLeads(prev); toast({ title: "Couldn't update", description: e.message }); }
  }

  function exportCsv() {
    const keys = new Set<string>();
    const flat = filtered.map((l) => {
      const row: Record<string, string> = {};
      leadRows(l).forEach((r) => { row[r.label] = r.value; keys.add(r.label); });
      return { l, row };
    });
    const extra = Array.from(keys);
    const header = ["Date", "Form", "Status", "Name", "Email", "Phone", ...extra, "Notes"];
    const lines = [header, ...flat.map(({ l, row }) => [
      new Date(l.created_at).toLocaleString(), formType(l.kind).label, statusOf(l).label,
      leadName(l), leadEmail(l) ?? "", leadPhone(l) ?? "", ...extra.map((k) => row[k] ?? ""), l.notes ?? "",
    ])];
    // BOM so Excel opens Arabic text correctly
    const csv = "﻿" + lines.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url; a.download = `ic-robotics-submissions-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  const allChecked = filtered.length > 0 && filtered.every((l) => selected.has(l.id));
  const toggleAll = () => setSelected(allChecked ? new Set() : new Set(filtered.map((l) => l.id)));
  const toggle = (id: string) => setSelected((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <AdminShell
      title="Form submissions"
      actions={<>
        <button onClick={load} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-ink" aria-label="Refresh" title="Refresh"><RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} /></button>
        <Button variant="outline" size="sm" onClick={exportCsv} disabled={!filtered.length}><Download className="h-4 w-4" /> Export</Button>
      </>}
    >
      <SetupBanner status={setup} need={["inbox"]} />
      {err && <div className="mb-6 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700"><AlertTriangle className="h-4 w-4" /> {err}</div>}

      {/* Form tabs */}
      <div className="-mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-1">
        <TabButton active={!kind} onClick={() => setKind("")} label="All forms" count={leads.length} icon="Inbox" />
        {kinds.map((k) => (
          <TabButton key={k.kind} active={kind === k.kind} onClick={() => setKind(k.kind)} label={formType(k.kind).short} count={k.count} icon={formType(k.kind).icon} />
        ))}
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, phone, message, notes…" className="pl-9" />
        </div>
        <div className="flex gap-3">
          <div className="w-40"><Select value={status} onChange={(e) => setStatus(e.target.value as any)} aria-label="Status">
            <option value="">All statuses</option>
            {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}{s.value === "new" ? ` (${newCount})` : ""}</option>)}
          </Select></div>
          <div className="w-40"><Select value={range} onChange={(e) => setRange(e.target.value)} aria-label="Date range">
            {RANGES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
          </Select></div>
        </div>
      </div>

      {/* Bulk actions */}
      {selected.size > 0 && (
        <div className="mb-3 flex flex-wrap items-center gap-2 rounded-2xl bg-ink px-4 py-2.5 text-sm text-white">
          <span className="mr-2 font-semibold">{selected.size} selected</span>
          {STATUSES.map((s) => (
            <button key={s.value} onClick={() => bulkStatus(s.value)} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold hover:bg-white/20">Mark {s.label}</button>
          ))}
          <button onClick={() => remove(Array.from(selected))} className="ml-auto inline-flex items-center gap-1 rounded-full bg-red-500/90 px-3 py-1 text-xs font-semibold hover:bg-red-500"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
          <button onClick={() => setSelected(new Set())} className="rounded-full p-1 hover:bg-white/10" aria-label="Clear selection"><X className="h-4 w-4" /></button>
        </div>
      )}

      <div className="card-surface overflow-hidden p-0">
        {loading && leads.length === 0 ? (
          <p className="flex items-center gap-2 p-8 text-slate-400"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</p>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center p-12 text-center text-slate-400"><Inbox className="mb-2 h-8 w-8" /> {leads.length ? "No submissions match these filters." : "No form submissions yet."}</div>
        ) : (
          <>
          {/* Phones: compact cards */}
          <ul className="divide-y divide-slate-100 sm:hidden">
            {filtered.map((l) => {
              const st = statusOf(l);
              return (
                <li key={l.id}>
                  <button onClick={() => setOpenId(l.id)} className="flex w-full items-start gap-3 p-4 text-left">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><Icon name={formType(l.kind).icon} className="h-4 w-4" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className={cn("truncate text-sm text-ink", st.value === "new" ? "font-bold" : "font-semibold")}>{leadName(l)}</span>
                        <span className={cn("ml-auto shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1", st.tone)}>{st.label}</span>
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-slate-500">{formType(l.kind).short}{leadSummary(l) ? ` · ${leadSummary(l)}` : ""}</span>
                      <span className="mt-0.5 block text-[11px] text-slate-400">{when(l.created_at)}{leadPhone(l) ? ` · ${leadPhone(l)}` : ""}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="hidden overflow-x-auto sm:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="w-10 p-3 pl-4"><button onClick={toggleAll} aria-label="Select all">{allChecked ? <CheckSquare className="h-4 w-4 text-brand-600" /> : <Square className="h-4 w-4" />}</button></th>
                  <th className="p-3">Received</th><th className="p-3">Form</th><th className="p-3">Name</th><th className="p-3">Contact</th><th className="p-3">Details</th><th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => {
                  const st = statusOf(l);
                  const isNew = st.value === "new";
                  return (
                    <tr key={l.id} onClick={() => setOpenId(l.id)}
                      className={cn("cursor-pointer border-b border-slate-50 align-top transition hover:bg-brand-50/40", openId === l.id && "bg-brand-50/60")}>
                      <td className="p-3 pl-4" onClick={(e) => { e.stopPropagation(); toggle(l.id); }}>
                        {selected.has(l.id) ? <CheckSquare className="h-4 w-4 text-brand-600" /> : <Square className="h-4 w-4 text-slate-300" />}
                      </td>
                      <td className="whitespace-nowrap p-3 text-slate-500">
                        <span className="flex items-center gap-2">{isNew && <span className="h-2 w-2 rounded-full bg-flag-500" />}{when(l.created_at)}</span>
                      </td>
                      <td className="p-3"><span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700"><Icon name={formType(l.kind).icon} className="h-3.5 w-3.5" />{formType(l.kind).short}</span></td>
                      <td className={cn("p-3 text-ink", isNew ? "font-bold" : "font-semibold")}>{leadName(l)}</td>
                      <td className="p-3 text-slate-600"><div className="max-w-[220px] truncate">{leadEmail(l) || "—"}</div><div className="text-xs text-slate-400">{leadPhone(l) || ""}</div></td>
                      <td className="max-w-xs p-3 text-xs text-slate-500"><div className="line-clamp-2">{leadSummary(l) || "—"}</div></td>
                      <td className="p-3"><span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1", st.tone)}><span className={cn("h-1.5 w-1.5 rounded-full", st.dot)} />{st.label}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          </>
        )}
      </div>
      <p className="mt-3 text-xs text-slate-400">Showing {filtered.length} of {leads.length} submissions</p>

      <AnimatePresence>
        {open && <LeadDrawer key={open.id} lead={open} onClose={() => setOpenId(null)} onUpdate={update} onDelete={() => remove([open.id])} />}
      </AnimatePresence>
    </AdminShell>
  );
}

function TabButton({ active, onClick, label, count, icon }: { active: boolean; onClick: () => void; label: string; count: number; icon: string }) {
  return (
    <button onClick={onClick}
      className={cn("inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition",
        active ? "border-brand-600 bg-brand-600 text-white shadow-soft" : "border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:text-brand-700")}>
      <Icon name={icon} className="h-4 w-4" /> {label}
      <span className={cn("rounded-full px-1.5 text-xs", active ? "bg-white/20" : "bg-slate-100 text-slate-500")}>{count}</span>
    </button>
  );
}

function LeadDrawer({ lead: l, onClose, onUpdate, onDelete }: {
  lead: Lead; onClose: () => void; onUpdate: (l: Lead, p: Partial<Pick<Lead, "status" | "notes">>, quiet?: boolean) => Promise<void>; onDelete: () => void;
}) {
  const [notes, setNotes] = useState(l.notes ?? "");
  const [savingNotes, setSavingNotes] = useState(false);
  const email = leadEmail(l);
  const phone = leadPhone(l);
  const st = statusOf(l);
  const ft = formType(l.kind);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <motion.div className="absolute inset-0 bg-black/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.aside
        className="absolute inset-y-0 right-0 flex w-full max-w-lg flex-col bg-white shadow-2xl"
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 380, damping: 38 }}
        role="dialog" aria-modal="true" aria-label="Submission details"
      >
        <div className="flex items-start gap-3 border-b border-slate-100 p-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-grape-500 text-white"><Icon name={ft.icon} className="h-5 w-5" /></span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{ft.label}</p>
            <h2 className="truncate text-lg font-bold text-ink">{leadName(l)}</h2>
            <p className="text-xs text-slate-500">{new Date(l.created_at).toLocaleString()}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-ink" aria-label="Close"><X className="h-5 w-5" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {/* Quick contact */}
          <div className="flex flex-wrap gap-2">
            {email && <a href={`mailto:${email}`} className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100"><Mail className="h-3.5 w-3.5" /> Email</a>}
            {phone && <a href={`tel:${phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100"><Phone className="h-3.5 w-3.5" /> Call</a>}
            {phone && <a href={whatsappHref(phone)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"><MessageCircle className="h-3.5 w-3.5" /> WhatsApp</a>}
            <a href={ft.page} target="_blank" className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200"><ExternalLink className="h-3.5 w-3.5" /> Form page</a>
          </div>

          {/* Status */}
          <p className="mt-6 text-xs font-bold uppercase tracking-wide text-slate-400">Status</p>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {STATUSES.map((s) => (
              <button key={s.value} onClick={() => s.value !== st.value && onUpdate(l, { status: s.value })}
                className={cn("flex items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-semibold ring-1 transition",
                  s.value === st.value ? s.tone + " ring-2" : "bg-white text-slate-500 ring-slate-200 hover:bg-slate-50")}>
                <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} /> {s.label}
              </button>
            ))}
          </div>

          {/* Answers */}
          <p className="mt-6 text-xs font-bold uppercase tracking-wide text-slate-400">Submitted details</p>
          <dl className="mt-2 divide-y divide-slate-100 rounded-2xl border border-slate-100">
            {leadRows(l).map((r) => (
              <div key={r.key + r.label} className="grid grid-cols-[minmax(0,40%)_1fr] gap-3 px-4 py-2.5 text-sm">
                <dt className="text-slate-500">{r.label}</dt>
                <dd className="whitespace-pre-wrap break-words font-medium text-ink" dir="auto">{r.value}</dd>
              </div>
            ))}
          </dl>

          {/* Notes */}
          <p className="mt-6 text-xs font-bold uppercase tracking-wide text-slate-400">Internal notes</p>
          <Textarea className="mt-2 min-h-[96px]" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Called on Monday — wants a demo next week." dir="auto" />
          <div className="mt-2 flex justify-end">
            <Button size="sm" disabled={notes === (l.notes ?? "") || savingNotes}
              onClick={async () => { setSavingNotes(true); await onUpdate(l, { notes }); setSavingNotes(false); }}>
              {savingNotes ? "Saving…" : "Save notes"}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 p-4">
          <button onClick={onDelete} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /> Delete</button>
          {st.value === "new" && <Button size="sm" variant="outline" onClick={() => onUpdate(l, { status: "contacted" })}>Mark as contacted</Button>}
        </div>
      </motion.aside>
    </div>
  );
}
