"use client";

import { useFormState, useFormStatus } from "react-dom";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import { submitInquiry, type InquiryState } from "./actions";

const initialState: InquiryState = { ok: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60">
      {pending ? "Sending…" : "Submit enquiry"}
      <Send className="h-4 w-4" />
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitInquiry, initialState);

  if (state.ok) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-600" />
        <h3 className="mt-4 text-xl font-bold text-navy-900">Enquiry received</h3>
        <p className="mt-2 max-w-sm text-sm text-navy-600">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.message && !state.ok && (
        <div className="flex items-start gap-2 rounded-md bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" />
        <Field label="Subject" name="subject" />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy-800">
          How can we help? <span className="text-gold-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="block w-full rounded-md border border-navy-200 px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-300 focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
          placeholder="Tell us a little about your goals…"
        />
      </div>

      <SubmitButton />
      <p className="text-center text-xs text-navy-400">
        Your details are kept strictly confidential.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy-800">
        {label} {required && <span className="text-gold-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="block w-full rounded-md border border-navy-200 px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-300 focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
      />
    </div>
  );
}
