import { NextResponse } from "next/server";
import { requireService, bad } from "@/lib/api";

/** Finds the first non-empty string for any of the keys, searching nested objects too. */
function pick(obj: any, keys: string[]): string | null {
  if (!obj || typeof obj !== "object") return null;
  for (const k of keys) if (typeof obj[k] === "string" && obj[k].trim()) return obj[k].trim().slice(0, 300);
  for (const v of Object.values(obj)) {
    if (v && typeof v === "object" && !Array.isArray(v)) { const r = pick(v, keys); if (r) return r; }
  }
  return null;
}

export async function POST(req: Request) {
  let body: any;
  try { body = await req.json(); } catch { return bad("Invalid JSON body"); }
  if (!body?.kind) return bad("Missing 'kind'");
  if (JSON.stringify(body).length > 20000) return bad("Submission too large", 413);

  const svc = requireService();
  if ("error" in svc) return svc.error;

  const { error } = await svc.client.from("leads").insert({
    kind: String(body.kind),
    name: body.name ?? pick(body.payload, ["name", "parentName", "studentName", "schoolName"]),
    email: body.email ?? pick(body.payload, ["email"]),
    phone: body.phone ?? pick(body.payload, ["phone"]),
    payload: body.payload ?? {},
  });
  if (error) return bad(error.message, 500);
  return NextResponse.json({ ok: true }, { status: 201 });
}
