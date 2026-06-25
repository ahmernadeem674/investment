import { createBrowserClient } from "@supabase/ssr";

// Browser-side Supabase client. Safe to use in Client Components.
// Reads the public env vars (NEXT_PUBLIC_*) which are exposed to the browser.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
