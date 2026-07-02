import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, MessageCircle, Building2 } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}. Submit a query and our team will respond promptly.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="container-page py-20 lg:py-24">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-5 max-w-3xl font-serif text-4xl font-black text-white sm:text-5xl lg:text-6xl">
          Let&apos;s talk about <span className="text-gold-400">your goals.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-400">
          Message us on WhatsApp, submit a query, or reach us directly. A member
          of our team will respond promptly and in confidence.
        </p>
      </section>

      <section className="container-page pb-24">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Details */}
          <div className="lg:col-span-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 border border-emerald-500/30 bg-emerald-500/5 p-5 transition-colors hover:border-emerald-500/60"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-emerald-500/15 text-emerald-400">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-emerald-400">
                  Fastest response
                </p>
                <p className="mt-0.5 font-semibold text-white">Chat on WhatsApp</p>
              </div>
            </a>

            <ul className="mt-8 space-y-6">
              <ContactItem icon={Mail} label="Email" value={site.email} href={`mailto:${site.email}`} />
              <ContactItem icon={Phone} label="Phone" value={site.phone} href={`tel:${site.phoneHref}`} />
              <ContactItem icon={MapPin} label="Office" value={site.office} href={site.mapsUrl} />
              <ContactItem icon={Building2} label="Registered Office" value={site.registeredOffice} />
              <ContactItem icon={Clock} label="Hours" value="Mon–Fri, 9:00 – 17:00 (PKT)" />
            </ul>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="border border-line bg-card p-8 sm:p-10">
              <h2 className="font-serif text-2xl font-bold text-white">Submit a query</h2>
              <p className="mt-2 text-sm text-gray-500">
                Fields marked <span className="text-gold-400">*</span> are required.
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
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-gold-400/10 text-gold-400">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray-500">{label}</p>
        <p className="mt-0.5 break-all font-medium text-white">{value}</p>
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
