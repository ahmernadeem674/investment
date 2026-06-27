import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calculator,
  Code2,
  Headphones,
  Globe,
  Clock,
  ShieldCheck,
  TrendingDown,
} from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { images, img } from "@/lib/images";

export const metadata: Metadata = {
  title: "BPO Services",
  description:
    "Financial, Tech, and Customer Service outsourcing for businesses worldwide.",
};

const pillars = [
  {
    icon: Calculator,
    title: "Financial Outsourcing",
    desc: "End-to-end finance and accounting support, run by experienced professionals.",
    points: ["Bookkeeping & accounting", "Accounts payable / receivable", "Payroll processing", "Financial reporting & analysis", "Tax preparation support"],
  },
  {
    icon: Code2,
    title: "Tech Outsourcing",
    desc: "Dedicated engineering and IT talent to build and maintain your products.",
    points: ["Software & web development", "Mobile app development", "QA & testing", "IT support & maintenance", "Data, cloud & DevOps"],
  },
  {
    icon: Headphones,
    title: "Customer Service",
    desc: "Multichannel support teams that protect and grow your customer relationships.",
    points: ["Inbound & outbound call center", "Live chat & email support", "Virtual assistants", "Help-desk & ticketing", "Back-office support"],
  },
];

const why = [
  { icon: TrendingDown, t: "Lower costs", d: "Reduce operating costs without compromising on quality." },
  { icon: Globe, t: "Global delivery", d: "Serving businesses across multiple time zones and markets." },
  { icon: Clock, t: "24/7 coverage", d: "Round-the-clock teams that keep your operations running." },
  { icon: ShieldCheck, t: "Reliable & secure", d: "Process discipline and confidentiality built in from day one." },
];

export default function BpoPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <Image src={img(images.laptopAnalytics, 2000)} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/70" />
        <div className="container-page relative py-24 lg:py-32">
          <p className="eyebrow">Business Process Outsourcing</p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-black text-white sm:text-5xl lg:text-6xl">
            Outsourcing solutions for <span className="text-gold-400">businesses worldwide.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-400">
            Financial, Tech, and Customer Service outsourcing — delivered by
            dedicated teams that operate as a seamless extension of your business.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-gold">
              Request a quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={whatsappLink("Hello, I'm interested in your BPO services.")} target="_blank" rel="noopener noreferrer" className="btn-line">
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="container-page py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="relative flex flex-col border border-line bg-card p-8 transition-colors hover:border-gold-700">
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-gold-400 to-transparent" />
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-gold-400/10 text-gold-400">
                <p.icon className="h-6 w-6" />
              </span>
              <h2 className="mt-6 font-serif text-xl font-bold text-white">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">{p.desc}</p>
              <ul className="mt-5 space-y-2.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-gray-400">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-400" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="border-y border-line bg-surface">
        <div className="container-page py-20">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="eyebrow-center">Why outsource with us</p>
            <h2 className="section-title mt-3">
              A partner, not just a <span>vendor</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w) => (
              <div key={w.t} className="border border-line bg-card p-6">
                <w.icon className="h-6 w-6 text-gold-400" />
                <h3 className="mt-4 font-serif text-base font-bold text-white">{w.t}</h3>
                <p className="mt-1.5 text-sm text-gray-500">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20">
        <div className="border border-line bg-card px-8 py-14 text-center">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl font-black text-white">
            Scale your operations with confidence
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Tell us what you need to outsource and we&apos;ll design a team around
            it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-gold">
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services" className="btn-line">
              See investment services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
