// Minimal password-based admin auth. No external dependencies.
// A session cookie holds a token = SHA-256(`${ADMIN_PASSWORD}:${ADMIN_SESSION_SECRET}`).
// The login route sets it (Node runtime); middleware verifies it (Edge runtime).

export const ADMIN_COOKIE = "icr_admin";

/** SHA-256 hex using the Web Crypto API (works in both Edge and Node 18+). */
export async function sessionToken(): Promise<string> {
  const password = process.env.ADMIN_PASSWORD || "";
  const secret = process.env.ADMIN_SESSION_SECRET || "change-me";
  const data = new TextEncoder().encode(`${password}:${secret}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Constant-time-ish comparison of a candidate cookie value against the expected token. */
export async function isValidSession(cookieValue: string | undefined): Promise<boolean> {
  if (!cookieValue || !process.env.ADMIN_PASSWORD) return false;
  const expected = await sessionToken();
  if (cookieValue.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) mismatch |= cookieValue.charCodeAt(i) ^ expected.charCodeAt(i);
  return mismatch === 0;
}
