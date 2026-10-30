"use client";
// Generic form renderer for the Site Content editor. Renders any section from content-schema.ts.
import { useId, useRef, useState } from "react";
import {
  ChevronDown, ChevronUp, ArrowUp, ArrowDown, Copy, Trash2, Plus, Upload, X, ImageIcon, PlayCircle, Loader2, Link2,
} from "lucide-react";
import type { Field } from "@/lib/content-schema";
import { Icon, iconNames } from "@/components/icon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Obj = Record<string, any>;

const SITE_LINKS = [
  "/", "/for-schools", "/programs", "/competitions", "/success-stories", "/blog", "/about", "/contact",
  "/contact?type=proposal", "/contact?type=demo", "/contact?type=parent", "/contact?type=partnership",
  "/child-assessment", "/school-readiness-assessment", "/competition-registration", "/verify", "/student-dashboard",
];

// ---------- helpers ----------
export function blankFor(fields: Field[], itemLabel = "item"): Obj {
  const out: Obj = {};
  for (const f of fields) {
    switch (f.kind) {
      case "group":
        if (f.key) out[f.key] = blankFor(f.fields);
        else Object.assign(out, blankFor(f.fields));
        break;
      case "number": out[f.key] = 0; break;
      case "boolean": out[f.key] = true; break;
      case "link": out[f.key] = { label: "", href: "" }; break;
      case "strings": case "list": case "images": out[f.key] = []; break;
      case "select": out[f.key] = f.options[0] ?? ""; break;
      case "icon": out[f.key] = "Sparkles"; break;
      default: out[f.key] = "";
    }
  }
  if (fields.some((f) => f.key === "id")) out.id = `${itemLabel.replace(/\s+/g, "-")}-${Date.now().toString(36)}`;
  return out;
}

function move<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr;
  const next = [...arr];
  const [x] = next.splice(from, 1);
  next.splice(to, 0, x);
  return next;
}

function youtubeId(url: string) {
  return url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)?.[1] ?? null;
}

/** Same path-encoding the public site uses, so /public files with spaces preview correctly. */
function previewSrc(src: string) {
  if (!src) return "";
  if (/^(https?:|data:|blob:)/i.test(src)) return src;
  return src.split("/").map((seg) => (seg ? encodeURIComponent(decodeURIComponent(seg)) : seg)).join("/");
}

function FieldLabel({ label, help, htmlFor }: { label: string; help?: string; htmlFor?: string }) {
  return (
    <div className="mb-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-ink">{label}</label>
      {help && <p className="text-xs text-slate-400">{help}</p>}
    </div>
  );
}

// ---------- main renderer ----------
export function FieldsEditor({ fields, value, onChange }: { fields: Field[]; value: Obj; onChange: (v: Obj) => void }) {
  const set = (key: string, v: unknown) => onChange({ ...value, [key]: v });
  return (
    <div className="grid gap-5">
      {fields.map((f, i) => {
        const k = `${f.kind}-${f.key}-${i}`;
        switch (f.kind) {
          case "group":
            return (
              <GroupBox key={k} label={f.label} help={f.help} collapsed={f.collapsed}>
                {f.key
                  ? <FieldsEditor fields={f.fields} value={value?.[f.key] ?? {}} onChange={(v) => set(f.key, v)} />
                  : <FieldsEditor fields={f.fields} value={value} onChange={onChange} />}
              </GroupBox>
            );
          case "list":
            return <ListEditor key={k} field={f} value={value?.[f.key] ?? []} onChange={(v) => set(f.key, v)} />;
          case "strings":
            return <StringsEditor key={k} label={f.label} help={f.help} itemLabel={f.itemLabel ?? "item"} multiline={f.multiline} value={value?.[f.key] ?? []} onChange={(v) => set(f.key, v)} />;
          default:
            return <ScalarField key={k} field={f} value={value?.[f.key]} onChange={(v) => set(f.key, v)} />;
        }
      })}
    </div>
  );
}

function ScalarField({ field: f, value, onChange }: { field: Field; value: any; onChange: (v: any) => void }) {
  const id = useId();
  switch (f.kind) {
    case "text":
      return <div><FieldLabel label={f.label} help={f.help} htmlFor={id} /><Input id={id} value={value ?? ""} placeholder={f.placeholder} onChange={(e) => onChange(e.target.value)} /></div>;
    case "textarea":
      return <div><FieldLabel label={f.label} help={f.help} htmlFor={id} /><Textarea id={id} rows={f.rows ?? 3} className="min-h-0" value={value ?? ""} onChange={(e) => onChange(e.target.value)} /></div>;
    case "number":
      return <div><FieldLabel label={f.label} help={f.help} htmlFor={id} /><Input id={id} type="number" value={value ?? 0} onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))} /></div>;
    case "date":
      return <div><FieldLabel label={f.label} help={f.help} htmlFor={id} /><Input id={id} type="date" value={value ?? ""} onChange={(e) => onChange(e.target.value)} /></div>;
    case "boolean":
      return (
        <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-ink">
          <input type="checkbox" className="h-4 w-4 accent-brand-600" checked={value !== false} onChange={(e) => onChange(e.target.checked)} />
          {f.label}
        </label>
      );
    case "select":
      return (
        <div>
          <FieldLabel label={f.label} help={f.help} htmlFor={id} />
          <Select id={id} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
            {!f.options.includes(value) && value && <option value={value}>{value}</option>}
            {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
          </Select>
        </div>
      );
    case "link":
      return <LinkField label={f.label} help={f.help} value={value ?? { label: "", href: "" }} onChange={onChange} />;
    case "image":
      return <ImageField label={f.label} help={f.help} value={value ?? ""} onChange={onChange} />;
    case "images":
      return <ImagesField label={f.label} help={f.help} value={Array.isArray(value) ? value : []} onChange={onChange} />;
    case "video":
      return <VideoField label={f.label} help={f.help} value={value ?? ""} onChange={onChange} />;
    case "icon":
      return <IconField label={f.label} value={value ?? "Sparkles"} onChange={onChange} />;
    default:
      return null;
  }
}

// ---------- containers ----------
function GroupBox({ label, help, collapsed, children }: { label: string; help?: string; collapsed?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(!collapsed);
  return (
    <section className="rounded-2xl border border-slate-200 bg-white">
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left">
        <span>
          <span className="block font-bold text-ink">{label}</span>
          {help && <span className="block text-xs text-slate-400">{help}</span>}
        </span>
        {open ? <ChevronUp className="h-4 w-4 shrink-0 text-slate-400" /> : <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />}
      </button>
      {open && <div className="border-t border-slate-100 px-5 py-5">{children}</div>}
    </section>
  );
}

function ItemActions({ index, total, onMove, onDuplicate, onRemove }: {
  index: number; total: number; onMove: (to: number) => void; onDuplicate?: () => void; onRemove: () => void;
}) {
  const btn = "rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent";
  return (
    <div className="flex shrink-0 items-center gap-0.5">
      <button type="button" className={btn} disabled={index === 0} onClick={() => onMove(index - 1)} aria-label="Move up" title="Move up"><ArrowUp className="h-4 w-4" /></button>
      <button type="button" className={btn} disabled={index === total - 1} onClick={() => onMove(index + 1)} aria-label="Move down" title="Move down"><ArrowDown className="h-4 w-4" /></button>
      {onDuplicate && <button type="button" className={btn} onClick={onDuplicate} aria-label="Duplicate" title="Duplicate"><Copy className="h-4 w-4" /></button>}
      <button type="button" className={cn(btn, "hover:bg-red-50 hover:text-red-500")} onClick={onRemove} aria-label="Delete" title="Delete"><Trash2 className="h-4 w-4" /></button>
    </div>
  );
}

function ListEditor({ field, value, onChange }: { field: Extract<Field, { kind: "list" }>; value: Obj[]; onChange: (v: Obj[]) => void }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const items = Array.isArray(value) ? value : [];
  const titleOf = (it: Obj, i: number) => {
    const t = field.titleKey ? it?.[field.titleKey] : undefined;
    return (typeof t === "string" && t.trim()) || `${field.itemLabel.charAt(0).toUpperCase()}${field.itemLabel.slice(1)} ${i + 1}`;
  };
  return (
    <div>
      <FieldLabel label={`${field.label} (${items.length})`} help={field.help} />
      <div className="grid gap-2">
        {items.map((it, i) => {
          const open = openIdx === i;
          const thumb = field.fields.find((f) => f.kind === "image" || f.kind === "icon");
          return (
            <div key={i} className={cn("rounded-2xl border bg-white transition", open ? "border-brand-200 shadow-soft" : "border-slate-200")}>
              <div className="flex items-center gap-2 px-3 py-2">
                <button type="button" onClick={() => setOpenIdx(open ? null : i)} className="flex min-w-0 flex-1 items-center gap-3 py-1 text-left">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500">{i + 1}</span>
                  {thumb?.kind === "image" && it?.[thumb.key] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={previewSrc(it[thumb.key])} alt="" className="h-7 w-7 shrink-0 rounded-md object-contain" />
                  )}
                  {thumb?.kind === "icon" && <Icon name={it?.[thumb.key]} className="h-4 w-4 shrink-0 text-brand-600" />}
                  <span className="truncate text-sm font-semibold text-ink">{titleOf(it, i)}</span>
                  {open ? <ChevronUp className="ml-auto h-4 w-4 shrink-0 text-slate-400" /> : <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-slate-400" />}
                </button>
                <ItemActions
                  index={i} total={items.length}
                  onMove={(to) => { onChange(move(items, i, to)); setOpenIdx(open ? to : openIdx); }}
                  onDuplicate={() => {
                    const copy = JSON.parse(JSON.stringify(it));
                    if ("id" in copy) copy.id = `${copy.id}-copy`;
                    const next = [...items]; next.splice(i + 1, 0, copy); onChange(next); setOpenIdx(i + 1);
                  }}
                  onRemove={() => { if (confirm(`Delete “${titleOf(it, i)}”?`)) { onChange(items.filter((_, j) => j !== i)); setOpenIdx(null); } }}
                />
              </div>
              {open && (
                <div className="border-t border-slate-100 bg-slate-50/50 p-4">
                  <FieldsEditor fields={field.fields} value={it ?? {}} onChange={(v) => onChange(items.map((x, j) => (j === i ? v : x)))} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => { onChange([...items, blankFor(field.fields, field.itemLabel)]); setOpenIdx(items.length); }}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 py-2.5 text-sm font-semibold text-slate-500 transition hover:border-brand-300 hover:text-brand-700"
      >
        <Plus className="h-4 w-4" /> Add {field.itemLabel}
      </button>
    </div>
  );
}

function StringsEditor({ label, help, itemLabel, multiline, value, onChange }: {
  label: string; help?: string; itemLabel: string; multiline?: boolean; value: string[]; onChange: (v: string[]) => void;
}) {
  const items = Array.isArray(value) ? value : [];
  return (
    <div>
      <FieldLabel label={`${label} (${items.length})`} help={help} />
      <div className="grid gap-2">
        {items.map((s, i) => (
          <div key={i} className="flex items-start gap-2">
            {multiline
              ? <Textarea rows={3} className="min-h-0" value={s} onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))} />
              : <Input value={s} onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))} />}
            <div className="pt-1.5">
              <ItemActions index={i} total={items.length} onMove={(to) => onChange(move(items, i, to))} onRemove={() => onChange(items.filter((_, j) => j !== i))} />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="mt-2 flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
      >
        <Plus className="h-4 w-4" /> Add {itemLabel}
      </button>
    </div>
  );
}

// ---------- special fields ----------
function LinkField({ label, help, value, onChange }: { label: string; help?: string; value: { label: string; href: string }; onChange: (v: any) => void }) {
  const listId = useId();
  return (
    <div>
      <FieldLabel label={label} help={help ?? "Leave the text empty to hide this button."} />
      <div className="grid gap-2 sm:grid-cols-2">
        <Input value={value.label ?? ""} placeholder="Button text" onChange={(e) => onChange({ ...value, label: e.target.value })} />
        <div className="relative">
          <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input value={value.href ?? ""} list={listId} placeholder="/contact or https://…" className="pl-9" onChange={(e) => onChange({ ...value, href: e.target.value })} />
          <datalist id={listId}>{SITE_LINKS.map((l) => <option key={l} value={l} />)}</datalist>
        </div>
      </div>
    </div>
  );
}

export async function uploadFile(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const r = await fetch("/api/admin/upload", { method: "POST", body });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || "Upload failed");
  return j.url as string;
}

export function ImageField({ label, help, value, onChange }: { label: string; help?: string; value: string; onChange: (v: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [broken, setBroken] = useState(false);

  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true); setErr("");
    try { onChange(await uploadFile(file)); setBroken(false); }
    catch (x: any) { setErr(x.message); }
    finally { setBusy(false); }
  }

  return (
    <div>
      <FieldLabel label={label} help={help} />
      <div className="flex items-start gap-3">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-[repeating-conic-gradient(#f1f5f9_0%_25%,#fff_0%_50%)] bg-[length:16px_16px]">
          {value && !broken
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={previewSrc(value)} alt="" className="h-full w-full object-contain" onError={() => setBroken(true)} onLoad={() => setBroken(false)} />
            : <ImageIcon className="h-6 w-6 text-slate-300" />}
        </div>
        <div className="min-w-0 flex-1">
          <Input value={value} placeholder="Upload an image or paste a link" onChange={(e) => { setBroken(false); onChange(e.target.value); }} />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button type="button" disabled={busy} onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60">
              {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />} {busy ? "Uploading…" : "Upload image"}
            </button>
            {value && (
              <button type="button" onClick={() => onChange("")} className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100">
                <X className="h-3.5 w-3.5" /> Remove
              </button>
            )}
            <span className="text-[11px] text-slate-400">PNG, JPG, WebP or SVG · max 4 MB</span>
          </div>
          {broken && value && <p className="mt-1 text-xs text-amber-600">This image can&apos;t be previewed — check the link.</p>}
          {err && <p className="mt-1 text-xs font-medium text-red-500">{err}</p>}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={pick} />
        </div>
      </div>
    </div>
  );
}

function ImagesField({ label, help, value, onChange }: { label: string; help?: string; value: string[]; onChange: (v: string[]) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState("");
  const [err, setErr] = useState("");
  const [link, setLink] = useState("");

  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    setErr("");
    let next = [...value];
    for (let i = 0; i < files.length; i++) {
      setBusy(`Uploading ${i + 1} of ${files.length}…`);
      try { next = [...next, await uploadFile(files[i])]; onChange(next); }
      catch (x: any) { setErr(`${files[i].name}: ${x.message}`); }
    }
    setBusy("");
  }

  return (
    <div>
      <FieldLabel label={`${label} (${value.length})`} help={help ?? "Upload real photos. You can select several at once and reorder them with the arrows."} />
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {value.map((src, i) => (
            <div key={src + i} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewSrc(src)} alt="" className="aspect-[4/3] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-gradient-to-t from-black/60 to-transparent p-1 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
                <div className="flex">
                  <button type="button" disabled={i === 0} onClick={() => onChange(move(value, i, i - 1))} className="rounded p-1 text-white hover:bg-white/20 disabled:opacity-30" aria-label="Move left"><ArrowUp className="h-3.5 w-3.5 -rotate-90" /></button>
                  <button type="button" disabled={i === value.length - 1} onClick={() => onChange(move(value, i, i + 1))} className="rounded p-1 text-white hover:bg-white/20 disabled:opacity-30" aria-label="Move right"><ArrowDown className="h-3.5 w-3.5 -rotate-90" /></button>
                </div>
                <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="rounded p-1 text-white hover:bg-red-500/80" aria-label="Remove photo"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button type="button" disabled={!!busy} onClick={() => fileRef.current?.click()}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60">
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />} {busy || "Upload photos"}
        </button>
        <div className="flex min-w-[220px] flex-1 items-center gap-1">
          <Input value={link} onChange={(e) => setLink(e.target.value)} placeholder="…or paste an image link" className="h-8 text-xs" />
          <button type="button" disabled={!link.trim()} onClick={() => { onChange([...value, link.trim()]); setLink(""); }}
            className="rounded-full px-2.5 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50 disabled:opacity-40">Add</button>
        </div>
      </div>
      {err && <p className="mt-1 text-xs font-medium text-red-500">{err}</p>}
      <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={pick} />
    </div>
  );
}

function VideoField({ label, help, value, onChange }: { label: string; help?: string; value: string; onChange: (v: string) => void }) {
  const id = useId();
  const yt = youtubeId(value);
  const isShort = /youtube\.com\/shorts\//i.test(value);
  const kind = !value ? "No video — a placeholder is shown" : yt ? (isShort ? "YouTube Short · shown in a tall player" : "YouTube video") : /vimeo\.com/i.test(value) ? "Vimeo video" : "Video file link";
  return (
    <div>
      <FieldLabel label={label} help={help ?? "Paste a YouTube, YouTube Shorts, Vimeo or .mp4 link."} htmlFor={id} />
      <div className="flex items-start gap-3">
        <div className="relative flex h-16 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
          {yt
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={`https://img.youtube.com/vi/${yt}/mqdefault.jpg`} alt="" className="h-full w-full object-cover" />
            : null}
          <PlayCircle className={cn("absolute h-6 w-6", yt ? "text-white drop-shadow" : "text-slate-300")} />
        </div>
        <div className="min-w-0 flex-1">
          <Input id={id} value={value} placeholder="https://youtu.be/…" onChange={(e) => onChange(e.target.value.trim())} />
          <p className="mt-1.5 text-xs text-slate-400">{kind}</p>
        </div>
      </div>
    </div>
  );
}

function IconField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <FieldLabel label={label} />
      <button type="button" onClick={() => setOpen((o) => !o)}
        className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-ink shadow-sm hover:border-brand-300">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-grape-500 text-white"><Icon name={value} className="h-4 w-4" /></span>
        {value}
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>
      {open && (
        <div className="mt-2 grid max-w-md grid-cols-8 gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-soft">
          {iconNames.map((n) => (
            <button key={n} type="button" title={n} onClick={() => { onChange(n); setOpen(false); }}
              className={cn("flex h-9 w-full items-center justify-center rounded-lg transition hover:bg-brand-50 hover:text-brand-700", n === value ? "bg-brand-600 text-white hover:bg-brand-600 hover:text-white" : "text-slate-500")}>
              <Icon name={n} className="h-4 w-4" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
