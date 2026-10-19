import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/** Reports which parts of the dashboard backend are ready, so the UI can guide one-time setup. */
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const projectRef = url.match(/^https:\/\/([a-z0-9]+)\.supabase\.co/i)?.[1] ?? null;
  const client = getServiceClient();
  if (!client) {
    return NextResponse.json({ supabase: false, content: false, inbox: false, storage: false, projectRef });
  }
  const [content, inbox, storage] = await Promise.all([
    client.from("site_content").select("key").limit(1),
    client.from("leads").select("status,notes").limit(1),
    client.storage.getBucket("site-assets"),
  ]);
  return NextResponse.json({
    supabase: true,
    content: !content.error,
    inbox: !inbox.error,
    storage: !storage.error && !!storage.data,
    projectRef,
  });
}
