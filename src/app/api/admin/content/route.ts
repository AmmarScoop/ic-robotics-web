import { NextResponse } from "next/server";
import { requireService } from "@/lib/api";
import { siteDefaults } from "@/lib/site-defaults";

export const dynamic = "force-dynamic";

/** All sections: which are customised and when they were last saved. */
export async function GET() {
  const svc = requireService();
  if ("error" in svc) return svc.error;
  const { data, error } = await svc.client.from("site_content").select("key,updated_at");
  if (error) return NextResponse.json({ error: error.message, code: error.code }, { status: 500 });
  const saved = Object.fromEntries((data ?? []).map((r) => [r.key, r.updated_at]));
  return NextResponse.json({
    data: Object.keys(siteDefaults).map((key) => ({ key, updated_at: saved[key] ?? null })),
  });
}

