import { NextResponse } from "next/server";
import { requireService } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET() {
  const svc = requireService();
  if ("error" in svc) return svc.error;
  const { data, error } = await svc.client
    .from("leads").select("*").order("created_at", { ascending: false }).limit(1000);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
