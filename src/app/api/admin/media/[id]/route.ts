import { NextResponse } from "next/server";
import { requireService, bad } from "@/lib/api";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const svc = requireService();
  if ("error" in svc) return svc.error;
  const { error } = await svc.client.from("media").delete().eq("id", params.id);
  if (error) return bad(error.message, 500);
  return NextResponse.json({ ok: true });
}
