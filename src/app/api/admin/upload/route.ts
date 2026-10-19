import { NextResponse } from "next/server";
import { requireService, bad } from "@/lib/api";

export const dynamic = "force-dynamic";

const BUCKET = "site-assets";
const MAX_BYTES = 4 * 1024 * 1024; // keep under the hosting request-size limit
const ALLOWED = /^(image\/(png|jpe?g|webp|gif|svg\+xml|avif)|video\/(mp4|webm)|application\/pdf)$/;

/** Upload a file from the dashboard to Supabase Storage and return its public URL. */
export async function POST(req: Request) {
  const svc = requireService();
  if ("error" in svc) return svc.error;

  let form: FormData;
  try { form = await req.formData(); } catch { return bad("Expected multipart form data"); }
  const file = form.get("file");
  if (!(file instanceof Blob)) return bad("No file received");
  if (file.size > MAX_BYTES) return bad("File is larger than 4 MB. Please compress it and try again.", 413);
  const type = file.type || "application/octet-stream";
  if (!ALLOWED.test(type)) return bad(`Unsupported file type: ${type}`, 415);

  const original = (file as File).name || "upload";
  const dot = original.lastIndexOf(".");
  const base = (dot > 0 ? original.slice(0, dot) : original).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "file";
  const ext = dot > 0 ? original.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, "") : "bin";
  const path = `uploads/${new Date().toISOString().slice(0, 10)}/${Date.now().toString(36)}-${base}.${ext}`;

  const storage = svc.client.storage;
  // Create the public bucket on first use (no-op if it already exists).
  const { data: bucket } = await storage.getBucket(BUCKET);
  if (!bucket) await storage.createBucket(BUCKET, { public: true });

  const bytes = new Uint8Array(await file.arrayBuffer());
  const { error } = await storage.from(BUCKET).upload(path, bytes, { contentType: type, upsert: false, cacheControl: "31536000" });
  if (error) return bad(error.message, 500);

  const { data } = storage.from(BUCKET).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl, path }, { status: 201 });
}
