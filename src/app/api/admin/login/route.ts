import { NextResponse } from "next/server";
import { ADMIN_COOKIE, sessionToken } from "@/lib/auth";
import { bad } from "@/lib/api";

export async function POST(req: Request) {
  if (!process.env.ADMIN_PASSWORD) return bad("ADMIN_PASSWORD is not set on the server.", 503);
  let body: any;
  try { body = await req.json(); } catch { return bad("Invalid JSON body"); }
  if (body?.password !== process.env.ADMIN_PASSWORD) return bad("Incorrect password", 401);

  const token = await sessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production",
    path: "/", maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
