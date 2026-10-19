import { NextResponse } from "next/server";
import { requireService } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const svc = requireService();
  if ("error" in svc) return svc.error;

  // ?summary=1 → just the number of unhandled submissions (for the sidebar badge)
  if (new URL(req.url).searchParams.get("summary")) {
    const { count, error } = await svc.client.from("leads").select("id", { count: "exact", head: true }).eq("status", "new");
    if (error) return NextResponse.json({ new: 0, ready: false });
    return NextResponse.json({ new: count ?? 0, ready: true });
  }

  const { data, error } = await svc.client
    .from("leads").select("*").order("created_at", { ascending: false }).limit(2000);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
