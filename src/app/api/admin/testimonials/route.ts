import { NextResponse } from "next/server";
import { requireService, bad } from "@/lib/api";

export async function GET() {
  const svc = requireService();
  if ("error" in svc) return svc.error;
  const { data, error } = await svc.client
    .from("testimonials").select("*").order("sort", { ascending: true });
  if (error) return bad(error.message, 500);
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const svc = requireService();
  if ("error" in svc) return svc.error;
  let b: any; try { b = await req.json(); } catch { return bad("Invalid JSON body"); }
  if (!b?.name || !b?.quote) return bad("name and quote are required");
  const { data, error } = await svc.client.from("testimonials").insert({
    type: b.type ?? "Parent", name: b.name, role: b.role ?? "", quote: b.quote,
    published: b.published ?? true, sort: b.sort ?? 0,
  }).select().single();
  if (error) return bad(error.message, 500);
  return NextResponse.json({ data }, { status: 201 });
}
