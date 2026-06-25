import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// Root route: bounce to /dashboard if logged in, otherwise /login.
export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }
  redirect("/login");
}
