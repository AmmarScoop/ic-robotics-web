"use client";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, AlertTriangle, Star } from "lucide-react";
import { AdminShell, useAdminApi } from "@/components/admin/admin-shell";
import { Modal } from "@/components/admin/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import type { Testimonial } from "@/lib/types";

const blank: Partial<Testimonial> = { type: "Parent", name: "", role: "", quote: "", published: true, sort: 0 };

export default function ReviewsPage() {
  const api = useAdminApi();
  const { toast } = useToast();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [err, setErr] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Testimonial>>(blank);
  const [saving, setSaving] = useState(false);

  async function load() { try { setItems(await api.list("testimonials") as Testimonial[]); } catch (e: any) { setErr(e.message); } }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  function openNew() { setEditing(blank); setOpen(true); }
  function openEdit(t: Testimonial) { setEditing(t); setOpen(true); }

  async function save(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    try {
      if (editing.id) await api.update("testimonials", editing.id, editing);
      else await api.create("testimonials", editing);
      toast({ title: "Saved", description: "Review updated on the site." });
      setOpen(false); await load();
    } catch (e: any) { toast({ title: "Error", description: e.message }); }
    finally { setSaving(false); }
  }

  async function remove(t: Testimonial) {
    if (!confirm(`Delete review from ${t.name}?`)) return;
    try { await api.remove("testimonials", t.id); toast({ title: "Deleted" }); await load(); }
    catch (e: any) { toast({ title: "Error", description: e.message }); }
  }

  return (
    <AdminShell title="Reviews & Testimonials">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-slate-500">{items.length} review{items.length === 1 ? "" : "s"}</p>
        <Button onClick={openNew}><Plus className="h-4 w-4" /> Add review</Button>
      </div>
      {err && <div className="mb-6 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700"><AlertTriangle className="h-4 w-4" /> {err}</div>}

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((t) => (
          <div key={t.id} className="card-surface p-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">{t.type}</span>
              <div className="flex gap-1">
                <button onClick={() => openEdit(t)} aria-label="Edit" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-brand-600"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => remove(t)} aria-label="Delete" className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <p className="text-sm text-slate-700">“{t.quote}”</p>
            <p className="mt-3 text-sm font-bold text-ink">{t.name}</p>
            <p className="text-xs text-slate-500">{t.role}</p>
            {t.published === false && <span className="mt-2 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-500">Hidden</span>}
          </div>
        ))}
        {items.length === 0 && !err && <div className="col-span-full flex flex-col items-center rounded-3xl border border-dashed border-slate-200 p-12 text-slate-400"><Star className="mb-2 h-8 w-8" /> No reviews yet — add your first.</div>}
      </div>

      <Modal open={open} title={editing.id ? "Edit review" : "Add review"} onClose={() => setOpen(false)}>
        <form onSubmit={save} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Type" htmlFor="t-type"><Select id="t-type" value={editing.type} onChange={(e) => setEditing((s) => ({ ...s, type: e.target.value as any }))}><option>Parent</option><option>Student</option><option>Principal</option><option>School</option></Select></Field>
            <Field label="Sort order" htmlFor="t-sort"><Input id="t-sort" type="number" value={editing.sort ?? 0} onChange={(e) => setEditing((s) => ({ ...s, sort: Number(e.target.value) }))} /></Field>
          </div>
          <Field label="Name" htmlFor="t-name" required><Input id="t-name" value={editing.name} onChange={(e) => setEditing((s) => ({ ...s, name: e.target.value }))} required /></Field>
          <Field label="Role / context" htmlFor="t-role"><Input id="t-role" value={editing.role} onChange={(e) => setEditing((s) => ({ ...s, role: e.target.value }))} placeholder="e.g. Parent of Yara, age 10" /></Field>
          <Field label="Quote" htmlFor="t-quote" required><Textarea id="t-quote" value={editing.quote} onChange={(e) => setEditing((s) => ({ ...s, quote: e.target.value }))} required /></Field>
          <label className="flex items-center gap-2 text-sm font-semibold text-ink"><input type="checkbox" checked={editing.published ?? true} onChange={(e) => setEditing((s) => ({ ...s, published: e.target.checked }))} /> Published (visible on site)</label>
          <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save review"}</Button>
        </form>
      </Modal>
    </AdminShell>
  );
}
