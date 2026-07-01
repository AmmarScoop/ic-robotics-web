import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** True when the public (anon) read credentials are present. */
export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey);
}

/** True when the server-side service-role key is present (needed for admin writes + lead inserts). */
export function isServiceConfigured(): boolean {
  return Boolean(url && serviceKey);
}

/** Anon client for public reads. Returns null if not configured. */
export function getPublicClient(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, { auth: { persistSession: false } });
}

/**
 * Service-role client for server-only writes (API routes only).
 * NEVER import this into a client component — the service key must stay on the server.
 */
export function getServiceClient(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}
