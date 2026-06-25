import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { site } from "@/lib/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}. Submit a query and our team will respond promptly.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy-950">
        <div className="container-page py-20 lg:py-24">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-white sm:text-5xl">
            Let&apos;s talk about your goals
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-200">
            Submit a query using the form below, or reach us directly. A member
            of our team will respond promptly and in confidence.
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact details */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold">Get in touch</h2>
            <p className="mt-3 text-navy-600">
              Prefer to reach out directly? Use the details below.
            </p>

            <ul className="mt-8 space-y-6">
              <ContactItem
                icon={Mail}
                label="Email"
                value={site.email}
                href={`mailto:${site.email}`}
              />
              <ContactItem
                icon={Phone}
                label="Phone"
                value={site.phone}
                href={`tel:${site.phoneHref}`}
              />
              <ContactItem icon={MapPin} label="Office" value={site.address} />
              <ContactItem
                icon={Clock}
                label="Hours"
                value="Mon–Fri, 9:00 – 18:00 (PKT)"
              />
            </ul>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-sm sm:p-10">
              <h2 className="text-2xl font-bold">Submit a query</h2>
              <p className="mt-2 text-sm text-navy-500">
                Fields marked <span className="text-gold-600">*</span> are
                required.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-gold-300">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
          {label}
        </p>
        <p className="mt-0.5 break-all font-medium text-navy-900">{value}</p>
      </div>
    </div>
  );

  return (
    <li>
      {href ? (
        <a href={href} className="block transition-opacity hover:opacity-80">
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
}
