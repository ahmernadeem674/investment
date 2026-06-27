"use client";

import { useFormState, useFormStatus } from "react-dom";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import { submitInquiry, type InquiryState } from "./actions";

const initialState: InquiryState = { ok: false, message: "" };

const inputCls =
  "block w-full rounded-sm border border-line bg-ink px-3.5 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-gold w-full disabled:opacity-60">
      {pending ? "Sending…" : "Submit enquiry"}
      <Send className="h-4 w-4" />
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitInquiry, initialState);

  if (state.ok) {
    return (
      <div className="flex flex-col items-center justify-center border border-emerald-500/30 bg-emerald-500/5 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-400" />
        <h3 className="mt-4 font-serif text-xl font-bold text-white">Enquiry received</h3>
        <p className="mt-2 max-w-sm text-sm text-gray-400">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.message && !state.ok && (
        <div className="flex items-start gap-2 rounded-sm border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-400">
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
        <label htmlFor="message" className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.06em] text-gray-400">
          How can we help? <span className="text-gold-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={inputCls}
          placeholder="Tell us a little about your goals…"
        />
      </div>

      <SubmitButton />
      <p className="text-center text-xs text-gray-600">
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
      <label htmlFor={name} className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.06em] text-gray-400">
        {label} {required && <span className="text-gold-400">*</span>}
      </label>
      <input id={name} name={name} type={type} required={required} className={inputCls} />
    </div>
  );
}
