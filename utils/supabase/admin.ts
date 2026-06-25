import { createClient } from "@supabase/supabase-js";

// Service-role client. SERVER-ONLY — it bypasses Row-Level Security, so the
// SUPABASE_SERVICE_ROLE_KEY must never be exposed to the browser (note: it is
// NOT prefixed with NEXT_PUBLIC_). Used to read the inquiries table, which has
// no public SELECT policy.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
