import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { createClient } from "@/utils/supabase/server";

// Marketing layout: public pages wrapped with the site header + footer.
export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader isAuthed={!!user} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
