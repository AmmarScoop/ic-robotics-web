import { NextResponse } from "next/server";
import { requireService, bad } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET() {
  const svc = requireService();
  if ("error" in svc) return svc.error;
  const { data, error } = await svc.client
    .from("media").select("*").order("created_at", { ascending: false });
  if (error) return bad(error.message, 500);
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const svc = requireService();
  if ("error" in svc) return svc.error;
  let b: any; try { b = await req.json(); } catch { return bad("Invalid JSON body"); }
  if (!b?.url) return bad("url is required");
  const { data, error } = await svc.client.from("media").insert({
    type: b.type ?? "image", url: b.url, caption: b.caption ?? "", tags: b.tags ?? "",
  }).select().single();
  if (error) return bad(error.message, 500);
  return NextResponse.json({ data }, { status: 201 });
}
