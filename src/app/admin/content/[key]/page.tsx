"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, RotateCcw, Save, Loader2, AlertTriangle, Undo2 } from "lucide-react";
import { AdminShell, useAdminApi } from "@/components/admin/admin-shell";
import { SetupBanner, useSetupStatus } from "@/components/admin/setup-banner";
import { FieldsEditor } from "@/components/admin/fields";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { sectionByKey, type SectionDef } from "@/lib/content-schema";
import type { SectionKey } from "@/lib/site-defaults";

export default function ContentEditorPage({ params }: { params: { key: string } }) {
  const def = sectionByKey[params.key as SectionKey];
  if (!def) notFound();
  return <Editor def={def} />;
}

function Editor({ def }: { def: SectionDef }) {
  const api = useAdminApi();
  const { toast } = useToast();
  const status = useSetupStatus();
  const [value, setValue] = useState<Record<string, any> | null>(null);
  const [savedJson, setSavedJson] = useState("");
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const j = await api.get(`content/${def.key}`);
      setValue(j.data); setSavedJson(JSON.stringify(j.data)); setUpdatedAt(j.updated_at); setErr("");
    } catch (e: any) { setErr(e.message); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [def.key]);
  useEffect(() => { load(); }, [load]);

  const dirty = useMemo(() => value !== null && JSON.stringify(value) !== savedJson, [value, savedJson]);

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => { if (dirty) { e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  async function save() {
    if (!value) return;
    setSaving(true);
    try {
      const j = await api.send(`content/${def.key}`, "PUT", { data: value });
      setValue(j.data); setSavedJson(JSON.stringify(j.data)); setUpdatedAt(j.updated_at);
      toast({ title: "Saved & published", description: `${def.title} is now live on the website.` });
    } catch (e: any) {
      toast({ title: "Couldn't save", description: e.message });
    } finally { setSaving(false); }
  }

  async function reset() {
    if (!confirm(`Reset “${def.title}” back to the original website content? Your edits to this section will be removed.`)) return;
    setSaving(true);
    try {
      const j = await api.send(`content/${def.key}`, "DELETE");
      setValue(j.data); setSavedJson(JSON.stringify(j.data)); setUpdatedAt(null);
      toast({ title: "Reset to original", description: `${def.title} now shows the original content.` });
    } catch (e: any) { toast({ title: "Couldn't reset", description: e.message }); }
    finally { setSaving(false); }
  }

  // Ctrl/Cmd + S to save
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") { e.preventDefault(); if (dirty && !saving) save(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  return (
    <AdminShell
      title={def.title}
      actions={def.preview && (
        <Link href={def.preview} target="_blank" className="hidden items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 sm:inline-flex">
          View on site <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      )}
    >
      <div className="mx-auto max-w-3xl pb-28">
        <Link href="/admin/content" className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-brand-700">
          <ArrowLeft className="h-4 w-4" /> All sections
        </Link>
        <p className="mb-6 text-sm text-slate-500">{def.description}</p>

        <SetupBanner status={status} need={["content"]} />
        {err && status?.content !== false && (
          <div className="mb-6 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
            <AlertTriangle className="h-4 w-4 shrink-0" /> {err}
          </div>
        )}

        {value ? (
          <FieldsEditor fields={def.fields} value={value} onChange={setValue} />
        ) : !err ? (
          <div className="flex items-center gap-2 p-8 text-slate-400"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</div>
        ) : null}
      </div>

      {value && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur lg:left-64">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-3 px-5 py-3">
            <p className="mr-auto text-sm">
              {dirty
                ? <span className="font-semibold text-amber-600">● Unsaved changes</span>
                : updatedAt
                  ? <span className="text-slate-500">Saved · {new Date(updatedAt).toLocaleString()}</span>
                  : <span className="text-slate-400">Showing original website content</span>}
            </p>
            {dirty && (
              <button onClick={() => setValue(JSON.parse(savedJson))} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100">
                <Undo2 className="h-4 w-4" /> Discard
              </button>
            )}
            {updatedAt && !dirty && (
              <button onClick={reset} disabled={saving} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100">
                <RotateCcw className="h-4 w-4" /> Reset to original
              </button>
            )}
            <Button onClick={save} disabled={!dirty || saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} {saving ? "Saving…" : "Save & publish"}
            </Button>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
