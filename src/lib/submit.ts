// Sends captured leads to the server route, which persists them in Supabase.
// Falls back to localStorage if the network call fails, so nothing is lost in dev.

export type LeadPayload = { kind: string; payload: unknown };

function tryExtract(payload: any) {
  return {
    name: payload?.name ?? payload?.parentName ?? payload?.studentName ?? null,
    email: payload?.email ?? null,
    phone: payload?.phone ?? null,
  };
}

export async function submitLead(kind: string, payload: unknown): Promise<void> {
  const body = { kind, ...tryExtract(payload), payload };
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Lead API returned ${res.status}`);
  } catch (err) {
    // Fallback: keep a local copy so a misconfigured backend never drops a lead.
    try {
      const key = "icr_submissions";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.push({ ...body, at: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(existing));
    } catch {}
    // eslint-disable-next-line no-console
    console.warn("[IC Robotics] lead saved locally (backend unavailable):", err);
  }
}
