import { NextResponse } from "next/server";
import { requireService, bad } from "@/lib/api";

export async function POST(req: Request) {
  let body: any;
  try { body = await req.json(); } catch { return bad("Invalid JSON body"); }
  if (!body?.kind) return bad("Missing 'kind'");

  const svc = requireService();
  if ("error" in svc) return svc.error;

  const { error } = await svc.client.from("leads").insert({
    kind: String(body.kind),
    name: body.name ?? null,
    email: body.email ?? null,
    phone: body.phone ?? null,
    payload: body.payload ?? {},
  });
  if (error) return bad(error.message, 500);
  return NextResponse.json({ ok: true }, { status: 201 });
}
