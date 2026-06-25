"use server";

import { Resend } from "resend";
import { createClient } from "@/utils/supabase/server";
import { site } from "@/lib/site";

export type InquiryState = {
  ok: boolean;
  message: string;
};

// Server Action: stores a contact/query submission in the `inquiries` table,
// then emails a notification (best-effort) to the firm's inbox.
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

  // 1. Persist to the database (source of truth, protected by RLS).
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

  // 2. Send an email notification (best-effort; never blocks the submission).
  await sendNotification({ name, email, phone, subject, message });

  return {
    ok: true,
    message:
      "Thank you. Your enquiry has been received — we'll be in touch shortly.",
  };
}

async function sendNotification(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // email not configured yet — submission is still saved

  try {
    const resend = new Resend(apiKey);
    // Default sender works without domain verification but can only deliver to
    // your Resend account email. Set RESEND_FROM to a verified-domain address
    // (e.g. "Usman Holdings <enquiries@usmanholdings.com>") once your domain
    // is verified in Resend.
    const from = process.env.RESEND_FROM || "Usman Holdings <onboarding@resend.dev>";

    await resend.emails.send({
      from,
      to: site.notifyEmail,
      replyTo: data.email,
      subject: `New website enquiry${data.subject ? `: ${data.subject}` : ""}`,
      text: [
        `New enquiry from the ${site.name} website:`,
        ``,
        `Name:    ${data.name}`,
        `Email:   ${data.email}`,
        `Phone:   ${data.phone || "—"}`,
        `Subject: ${data.subject || "—"}`,
        ``,
        `Message:`,
        data.message,
      ].join("\n"),
    });
  } catch {
    // Swallow — the enquiry is already saved in the database.
  }
}
