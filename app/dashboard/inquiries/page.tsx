import { redirect } from "next/navigation";
import { Card } from "@tremor/react";
import { Mail, Phone } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { isAdmin } from "@/lib/auth";
import { PortalHeader } from "@/components/portal/portal-header";

export const metadata = { title: "Inquiries" };

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  created_at: string;
};

export default async function InquiriesPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Only admins may view submissions.
  if (!isAdmin(user.email)) redirect("/dashboard");

  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  let inquiries: Inquiry[] = [];
  let loadError = "";

  if (hasServiceKey) {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("inquiries")
      .select("id, name, email, phone, subject, message, created_at")
      .order("created_at", { ascending: false });
    if (error) loadError = error.message;
    inquiries = (data ?? []) as Inquiry[];
  }

  return (
    <div className="min-h-screen bg-cream">
      <PortalHeader
        email={user.email ?? ""}
        isAdmin
        active="inquiries"
      />

      <main className="container-page py-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Inquiries</h1>
            <p className="mt-1 text-sm text-navy-500">
              Contact-form submissions from the website.
            </p>
          </div>
          <span className="rounded-full bg-navy-900 px-3 py-1 text-sm font-semibold text-white">
            {inquiries.length} total
          </span>
        </div>

        {!hasServiceKey && (
          <Card className="bg-amber-50">
            <p className="text-sm font-semibold text-amber-900">
              Service role key not configured
            </p>
            <p className="mt-1 text-sm text-amber-800">
              Add <code className="rounded bg-amber-100 px-1">SUPABASE_SERVICE_ROLE_KEY</code>{" "}
              to your environment (Supabase → Settings → API → service_role key)
              to load submissions here. This key is server-only and must never
              be exposed to the browser.
            </p>
          </Card>
        )}

        {loadError && (
          <Card className="bg-red-50">
            <p className="text-sm text-red-700">
              Error loading inquiries: {loadError}
            </p>
          </Card>
        )}

        {hasServiceKey && !loadError && inquiries.length === 0 && (
          <Card>
            <p className="text-sm text-navy-500">No inquiries yet.</p>
          </Card>
        )}

        <div className="space-y-4">
          {inquiries.map((q) => (
            <Card key={q.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-navy-900">{q.name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-navy-500">
                    <a
                      href={`mailto:${q.email}`}
                      className="inline-flex items-center gap-1.5 hover:text-navy-900"
                    >
                      <Mail className="h-3.5 w-3.5" /> {q.email}
                    </a>
                    {q.phone && (
                      <a
                        href={`tel:${q.phone}`}
                        className="inline-flex items-center gap-1.5 hover:text-navy-900"
                      >
                        <Phone className="h-3.5 w-3.5" /> {q.phone}
                      </a>
                    )}
                  </div>
                </div>
                <time className="text-xs text-navy-400">
                  {new Date(q.created_at).toLocaleString()}
                </time>
              </div>

              {q.subject && (
                <p className="mt-4 text-sm font-medium text-navy-800">
                  {q.subject}
                </p>
              )}
              <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-navy-600">
                {q.message}
              </p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
