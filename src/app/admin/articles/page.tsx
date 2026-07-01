"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, AlertTriangle, Newspaper, ExternalLink } from "lucide-react";
import { AdminShell, useAdminApi } from "@/components/admin/admin-shell";
import { Modal } from "@/components/admin/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import type { Post } from "@/lib/types";

type Row = Post & { read_minutes?: number; published?: boolean };
const blank: Partial<Row> = { audience: "Parents", category: "General", title: "", slug: "", excerpt: "", body: "", readMinutes: 5, published: true };

export default function ArticlesPage() {
  const api = useAdminApi();
  const { toast } = useToast();
  const [items, setItems] = useState<Row[]>([]);
  const [err, setErr] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Row>>(blank);
  const [saving, setSaving] = useState(false);

  async function load() {
    try {
      const rows = await api.list("posts") as any[];
      setItems(rows.map((r) => ({ ...r, readMinutes: r.read_minutes })));
    } catch (e: any) { setErr(e.message); }
  }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  function openNew() { setEditing(blank); setOpen(true); }
  function openEdit(p: Row) { setEditing({ ...p, readMinutes: (p as any).read_minutes ?? p.readMinutes }); setOpen(true); }

  async function save(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    try {
      const body = { ...editing, readMinutes: editing.readMinutes };
      if (editing.id) await api.update("posts", editing.id, body);
      else await api.create("posts", body);
      toast({ title: "Saved", description: "Article published." });
      setOpen(false); await load();
    } catch (e: any) { toast({ title: "Error", description: e.message }); }
    finally { setSaving(false); }
  }

  async function remove(p: Row) {
    if (!confirm(`Delete “${p.title}”?`)) return;
    try { await api.remove("posts", p.id); toast({ title: "Deleted" }); await load(); }
    catch (e: any) { toast({ title: "Error", description: e.message }); }
  }

  return (
    <AdminShell title="Blog Articles">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-slate-500">{items.length} article{items.length === 1 ? "" : "s"}</p>
        <Button onClick={openNew}><Plus className="h-4 w-4" /> New article</Button>
      </div>
      {err && <div className="mb-6 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700"><AlertTriangle className="h-4 w-4" /> {err}</div>}

      <div className="card-surface overflow-hidden p-0">
        {items.length === 0 && !err ? (
          <div className="flex flex-col items-center p-12 text-slate-400"><Newspaper className="mb-2 h-8 w-8" /> No articles yet.</div>
        ) : (
          <div className="divide-y divide-slate-50">
            {items.map((p) => (
              <div key={p.id} className="flex items-center gap-4 p-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">For {p.audience}</span>
                    <span className="text-xs text-slate-400">{p.category}</span>
                    {p.published === false && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-500">Draft</span>}
                  </div>
                  <p className="mt-1 truncate font-semibold text-ink">{p.title}</p>
                  <p className="truncate text-sm text-slate-500">/{p.slug}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <Link href={`/blog/${p.slug}`} target="_blank" aria-label="View" className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-brand-600"><ExternalLink className="h-4 w-4" /></Link>
                  <button onClick={() => openEdit(p)} aria-label="Edit" className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-brand-600"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => remove(p)} aria-label="Delete" className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal open={open} title={editing.id ? "Edit article" : "New article"} onClose={() => setOpen(false)}>
        <form onSubmit={save} className="grid max-h-[70vh] gap-4 overflow-y-auto pr-1">
          <Field label="Title" htmlFor="p-title" required><Input id="p-title" value={editing.title} onChange={(e) => setEditing((s) => ({ ...s, title: e.target.value }))} required /></Field>
          <Field label="Slug (optional — auto from title)" htmlFor="p-slug"><Input id="p-slug" value={editing.slug} onChange={(e) => setEditing((s) => ({ ...s, slug: e.target.value }))} placeholder="my-article" /></Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Audience" htmlFor="p-aud"><Select id="p-aud" value={editing.audience} onChange={(e) => setEditing((s) => ({ ...s, audience: e.target.value as any }))}><option>Parents</option><option>Schools</option></Select></Field>
            <Field label="Category" htmlFor="p-cat"><Input id="p-cat" value={editing.category} onChange={(e) => setEditing((s) => ({ ...s, category: e.target.value }))} /></Field>
            <Field label="Read (min)" htmlFor="p-read"><Input id="p-read" type="number" value={editing.readMinutes ?? 5} onChange={(e) => setEditing((s) => ({ ...s, readMinutes: Number(e.target.value) }))} /></Field>
          </div>
          <Field label="Excerpt" htmlFor="p-exc"><Textarea id="p-exc" value={editing.excerpt} onChange={(e) => setEditing((s) => ({ ...s, excerpt: e.target.value }))} className="min-h-[70px]" /></Field>
          <Field label="Body" htmlFor="p-body"><Textarea id="p-body" value={editing.body} onChange={(e) => setEditing((s) => ({ ...s, body: e.target.value }))} className="min-h-[160px]" placeholder="Full article text…" /></Field>
          <label className="flex items-center gap-2 text-sm font-semibold text-ink"><input type="checkbox" checked={editing.published ?? true} onChange={(e) => setEditing((s) => ({ ...s, published: e.target.checked }))} /> Published</label>
          <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save article"}</Button>
        </form>
      </Modal>
    </AdminShell>
  );
}
