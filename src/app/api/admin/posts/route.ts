import { NextResponse } from "next/server";
import { requireService, bad } from "@/lib/api";

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export async function GET() {
  const svc = requireService();
  if ("error" in svc) return svc.error;
  const { data, error } = await svc.client
    .from("posts").select("*").order("created_at", { ascending: false });
  if (error) return bad(error.message, 500);
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const svc = requireService();
  if ("error" in svc) return svc.error;
  let b: any; try { b = await req.json(); } catch { return bad("Invalid JSON body"); }
  if (!b?.title) return bad("title is required");
  const { data, error } = await svc.client.from("posts").insert({
    slug: b.slug ? slugify(b.slug) : slugify(b.title),
    audience: b.audience ?? "Parents", category: b.category ?? "General",
    title: b.title, excerpt: b.excerpt ?? "", body: b.body ?? "",
    read_minutes: b.readMinutes ?? 5, published: b.published ?? true,
  }).select().single();
  if (error) return bad(error.message, 500);
  return NextResponse.json({ data }, { status: 201 });
}
