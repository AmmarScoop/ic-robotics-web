import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";

/** Returns the service client or a JSON 503 if Supabase isn't configured. */
export function requireService(): { client: SupabaseClient } | { error: NextResponse } {
  const client = getServiceClient();
  if (!client) {
    return {
      error: NextResponse.json(
        { error: "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." },
        { status: 503 }
      ),
    };
  }
  return { client };
}

export function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}
