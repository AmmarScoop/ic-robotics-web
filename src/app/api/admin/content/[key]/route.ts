import { NextResponse } from "next/server";
import { requireService, bad, revalidateSite } from "@/lib/api";
import { siteDefaults, type SectionKey } from "@/lib/site-defaults";
import { mergeContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

function isSection(key: string): key is SectionKey {
  return Object.prototype.hasOwnProperty.call(siteDefaults, key);
}

/** One section, merged over its defaults, plus the untouched defaults (for "reset"). */
export async function GET(_req: Request, { params }: { params: { key: string } }) {
  if (!isSection(params.key)) return bad("Unknown section", 404);
  const svc = requireService();
  if ("error" in svc) return svc.error;
  const { data, error } = await svc.client.from("site_content").select("data,updated_at").eq("key", params.key).maybeSingle();
  if (error) return NextResponse.json({ error: error.message, code: error.code }, { status: 500 });
  const defaults = siteDefaults[params.key];
  return NextResponse.json({
    data: mergeContent(defaults, data?.data),
    defaults,
    updated_at: data?.updated_at ?? null,
  });
}

export async function PUT(req: Request, { params }: { params: { key: string } }) {
  if (!isSection(params.key)) return bad("Unknown section", 404);
  const svc = requireService();
  if ("error" in svc) return svc.error;
  let body: any;
  try { body = await req.json(); } catch { return bad("Invalid JSON body"); }
  if (!body || typeof body.data !== "object" || Array.isArray(body.data)) return bad("Expected { data: {...} }");
  const updated_at = new Date().toISOString();
  const { error } = await svc.client
    .from("site_content")
    .upsert({ key: params.key, data: body.data, updated_at }, { onConflict: "key" });
  if (error) return NextResponse.json({ error: error.message, code: error.code }, { status: 500 });
  revalidateSite();
  return NextResponse.json({ data: mergeContent(siteDefaults[params.key], body.data), updated_at });
}

/** Reset a section back to the built-in defaults. */
export async function DELETE(_req: Request, { params }: { params: { key: string } }) {
  if (!isSection(params.key)) return bad("Unknown section", 404);
  const svc = requireService();
  if ("error" in svc) return svc.error;
  const { error } = await svc.client.from("site_content").delete().eq("key", params.key);
  if (error) return NextResponse.json({ error: error.message, code: error.code }, { status: 500 });
  revalidateSite();
  return NextResponse.json({ data: siteDefaults[params.key], updated_at: null });
}
