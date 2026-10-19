import { NextResponse } from "next/server";
import { getSection } from "@/lib/site-content";

/** Public certificate lookup: GET /api/certificates?id=ICR-2025-... */
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id")?.trim().toUpperCase() ?? "";
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const { items } = await getSection("certificates");
  const cert = items.find((c) => c.id.trim().toUpperCase() === id && c.valid !== false);
  if (!cert) return NextResponse.json({ found: false, id });
  return NextResponse.json({ found: true, id, name: cert.name, course: cert.course, issued: cert.issued });
}
