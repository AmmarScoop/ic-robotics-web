import { NextResponse } from "next/server";
import { requireService, bad } from "@/lib/api";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const svc = requireService();
  if ("error" in svc) return svc.error;
  let b: any; try { b = await req.json(); } catch { return bad("Invalid JSON body"); }
  const { data, error } = await svc.client.from("testimonials").update({
    type: b.type, name: b.name, role: b.role, quote: b.quote, published: b.published, sort: b.sort,
  }).eq("id", params.id).select().single();
  if (error) return bad(error.message, 500);
  return NextResponse.json({ data });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const svc = requireService();
  if ("error" in svc) return svc.error;
  const { error } = await svc.client.from("testimonials").delete().eq("id", params.id);
  if (error) return bad(error.message, 500);
  return NextResponse.json({ ok: true });
}
