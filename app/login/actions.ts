"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// Server Action: signs the user in with email + password.
// On success the session cookie is set and we redirect to /dashboard.
// On failure we redirect back to /login with an error message in the query.
export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/dashboard");
}
