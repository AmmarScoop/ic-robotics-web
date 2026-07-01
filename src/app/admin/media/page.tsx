"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, AlertTriangle, Images, Film, ImageIcon } from "lucide-react";
import { AdminShell, useAdminApi } from "@/components/admin/admin-shell";
import { Modal } from "@/components/admin/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import type { MediaItem } from "@/lib/types";

const blank: Partial<MediaItem> = { type: "image", url: "", caption: "", tags: "" };

export default function MediaPage() {
  const api = useAdminApi();
  const { toast } = useToast();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [err, setErr] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<MediaItem>>(blank);
  const [saving, setSaving] = useState(false);

  async function load() { try { setItems(await api.list("media") as MediaItem[]); } catch (e: any) { setErr(e.message); } }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    try { await api.create("media", editing); toast({ title: "Added to library" }); setOpen(false); setEditing(blank); await load(); }
    catch (e: any) { toast({ title: "Error", description: e.message }); }
    finally { setSaving(false); }
  }

  async function remove(m: MediaItem) {
    if (!confirm("Remove this media item?")) return;
    try { await api.remove("media", m.id); toast({ title: "Removed" }); await load(); }
    catch (e: any) { toast({ title: "Error", description: e.message }); }
  }

  return (
    <AdminShell title="Media Library">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-slate-500">{items.length} item{items.length === 1 ? "" : "s"} — photos & videos used across the site</p>
        <Button onClick={() => { setEditing(blank); setOpen(true); }}><Plus className="h-4 w-4" /> Add media</Button>
      </div>
      {err && <div className="mb-6 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700"><AlertTriangle className="h-4 w-4" /> {err}</div>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m) => (
          <div key={m.id} className="card-surface overflow-hidden p-0">
            <div className="relative aspect-video bg-slate-100">
              {m.type === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.url} alt={m.caption} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-slate-400"><Film className="h-8 w-8" /></div>
              )}
              <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                {m.type === "image" ? <ImageIcon className="h-3 w-3" /> : <Film className="h-3 w-3" />} {m.type}
              </span>
              <button onClick={() => remove(m)} aria-label="Delete" className="absolute right-2 top-2 rounded-lg bg-white/90 p-1.5 text-red-500 hover:bg-white"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="p-4">
              <p className="truncate text-sm font-semibold text-ink">{m.caption || "Untitled"}</p>
              {m.tags && <p className="truncate text-xs text-slate-400">{m.tags}</p>}
              <p className="mt-1 truncate text-xs text-brand-600">{m.url}</p>
            </div>
          </div>
        ))}
        {items.length === 0 && !err && <div className="col-span-full flex flex-col items-center rounded-3xl border border-dashed border-slate-200 p-12 text-slate-400"><Images className="mb-2 h-8 w-8" /> Library is empty — add a photo or video URL.</div>}
      </div>

      <Modal open={open} title="Add media" onClose={() => setOpen(false)}>
        <form onSubmit={save} className="grid gap-4">
          <Field label="Type" htmlFor="m-type"><Select id="m-type" value={editing.type} onChange={(e) => setEditing((s) => ({ ...s, type: e.target.value as any }))}><option value="image">Image</option><option value="video">Video</option></Select></Field>
          <Field label="URL" htmlFor="m-url" required><Input id="m-url" value={editing.url} onChange={(e) => setEditing((s) => ({ ...s, url: e.target.value }))} placeholder="https://…" required /></Field>
          <Field label="Caption" htmlFor="m-cap"><Input id="m-cap" value={editing.caption} onChange={(e) => setEditing((s) => ({ ...s, caption: e.target.value }))} /></Field>
          <Field label="Tags (comma separated)" htmlFor="m-tags"><Input id="m-tags" value={editing.tags} onChange={(e) => setEditing((s) => ({ ...s, tags: e.target.value }))} placeholder="gallery, competition" /></Field>
          <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Add to library"}</Button>
        </form>
      </Modal>
    </AdminShell>
  );
}
