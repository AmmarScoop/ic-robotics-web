import { NextResponse } from "next/server";
import { requireService, bad } from "@/lib/api";

export const dynamic = "force-dynamic";

const STATUSES = ["new", "contacted", "converted", "closed"];

/** Update a submission's status and/or internal notes. */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const svc = requireService();
  if ("error" in svc) return svc.error;
  let b: any;
  try { b = await req.json(); } catch { return bad("Invalid JSON body"); }
  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (b.status !== undefined) {
    if (!STATUSES.includes(b.status)) return bad("Invalid status");
    patch.status = b.status;
  }
  if (b.notes !== undefined) patch.notes = String(b.notes);
  const { data, error } = await svc.client.from("leads").update(patch).eq("id", params.id).select().single();
  if (error) return NextResponse.json({ error: error.message, code: error.code }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const svc = requireService();
  if ("error" in svc) return svc.error;
  const { error } = await svc.client.from("leads").delete().eq("id", params.id);
  if (error) return bad(error.message, 500);
  return NextResponse.json({ ok: true });
}
