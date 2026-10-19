// Server-side reader for editable site content.
// Rows in the Supabase `site_content` table (key → JSON) override the defaults in site-defaults.ts.
// Reads are cached by Next and tagged, so a save in the dashboard refreshes every page instantly.
import { createClient } from "@supabase/supabase-js";
import { siteDefaults, type SiteContent, type SectionKey } from "@/lib/site-defaults";

export const CONTENT_TAG = "site-content";

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Deep-merge saved data over defaults. Objects merge key by key; arrays and scalars are replaced. */
export function mergeContent<T>(base: T, saved: unknown): T {
  if (saved === undefined || saved === null) return base;
  if (isPlainObject(base) && isPlainObject(saved)) {
    const out: Record<string, unknown> = { ...base };
    for (const k of Object.keys(saved)) {
      out[k] = k in base ? mergeContent((base as Record<string, unknown>)[k], saved[k]) : saved[k];
    }
    return out as T;
  }
  if (Array.isArray(base)) return (Array.isArray(saved) ? saved : base) as T;
  if (typeof base === "number") {
    const n = Number(saved);
    return (Number.isFinite(n) ? n : base) as T;
  }
  if (typeof base === "boolean") return (typeof saved === "boolean" ? saved : base) as T;
  if (typeof base === "string") return (typeof saved === "string" ? saved : base) as T;
  return saved as T;
}

/** Supabase client whose fetches are cached by Next and invalidated by the CONTENT_TAG. */
export function getCachedPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false },
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) =>
        fetch(input, { ...init, next: { tags: [CONTENT_TAG], revalidate: 300 } } as RequestInit),
    },
  });
}

async function loadRows(): Promise<Record<string, unknown>> {
  const sb = getCachedPublicClient();
  if (!sb) return {};
  try {
    const { data, error } = await sb.from("site_content").select("key,data");
    if (error || !data) return {};
    return Object.fromEntries(data.map((r: { key: string; data: unknown }) => [r.key, r.data]));
  } catch {
    return {};
  }
}

/** The whole site's content (defaults + saved overrides). */
export async function getSiteContent(): Promise<SiteContent> {
  const rows = await loadRows();
  const out = { ...siteDefaults } as Record<string, unknown>;
  for (const key of Object.keys(siteDefaults) as SectionKey[]) {
    if (rows[key] !== undefined) out[key] = mergeContent(siteDefaults[key], rows[key]);
  }
  return out as SiteContent;
}

export async function getSection<K extends SectionKey>(key: K): Promise<SiteContent[K]> {
  return (await getSiteContent())[key];
}
