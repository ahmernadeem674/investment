"use server";

import { createClient } from "@/utils/supabase/server";

export type InquiryState = {
  ok: boolean;
  message: string;
};

// Server Action: stores a contact/query submission in the `inquiries` table.
// The table has an RLS policy allowing anonymous INSERT (see migration 0002).
export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, message: "Please complete all required fields." };
  }

  const supabase = createClient();
  const { error } = await supabase.from("inquiries").insert({
    name,
    email,
    phone: phone || null,
    subject: subject || null,
    message,
  });

  if (error) {
    return {
      ok: false,
      message:
        "Sorry — we couldn't submit your enquiry. Please try again or email us directly.",
    };
  }

  return {
    ok: true,
    message: "Thank you. Your enquiry has been received — we'll be in touch shortly.",
  };
}
