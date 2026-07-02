import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calculator,
  Code2,
  Headphones,
  Workflow,
  Users,
  HeartPulse,
  Globe,
  Clock,
  ShieldCheck,
  TrendingDown,
} from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { images, img } from "@/lib/images";
import { bpoCategories } from "@/lib/bpo";

export const metadata: Metadata = {
  title: "BPO Services",
  description:
    "Financial, Tech, Customer Experience, Business Operations, HR, and Healthcare outsourcing for businesses worldwide.",
};

const icons = [Calculator, Code2, Headphones, Workflow, Users, HeartPulse];

const why = [
  { icon: TrendingDown, t: "Lower costs", d: "Reduce operating costs without compromising on quality." },
  { icon: Globe, t: "Global delivery", d: "Serving businesses across multiple time zones and markets." },
  { icon: Clock, t: "24/7 coverage", d: "Round-the-clock teams that keep your operations running." },
  { icon: ShieldCheck, t: "Reliable & secure", d: "Process discipline and confidentiality built in from day one." },
];

export default function BpoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <Image src={img(images.laptopAnalytics, 2000)} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/70" />
        <div className="container-page relative py-24 lg:py-32">
          <p className="eyebrow">Business Process Outsourcing</p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-black text-white sm:text-5xl lg:text-6xl">
            Outsourcing solutions for <span className="text-gold-400">businesses worldwide.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300">
            Six full-service practices — delivered by dedicated teams that operate
            as a seamless extension of your business.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-gold">
              Request a quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={whatsappLink("Hello, I'm interested in your BPO services.")} target="_blank" rel="noopener noreferrer" className="btn-line">
              WhatsApp us
            </a>
          </div>

          {/* Quick category nav */}
          <div className="mt-10 flex flex-wrap gap-2">
            {bpoCategories.map((c, i) => {
              const Icon = icons[i % icons.length];
              return (
                <a
                  key={c.name}
                  href={`#${slug(c.name)}`}
                  className="inline-flex items-center gap-2 border border-line bg-card/60 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.06em] text-gray-300 transition-colors hover:border-gold-700 hover:text-gold-400"
                >
                  <Icon className="h-3.5 w-3.5 text-gold-400" /> {c.name.replace(" Outsourcing", "")}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      {bpoCategories.map((cat, i) => {
        const Icon = icons[i % icons.length];
        return (
          <section key={cat.name} id={slug(cat.name)} className="container-page scroll-mt-24 py-16">
            <div className="border-b border-line pb-6">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-gold-400/10 text-gold-400">
                  <Icon className="h-6 w-6" />
                </span>
                <h2 className="section-title">{cat.name}</h2>
              </div>
              <p className="mt-4 max-w-3xl text-gray-300">{cat.desc}</p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {cat.groups.map((g) => (
                <div key={g.title} className="border border-line bg-card p-6">
                  <h3 className="font-serif text-base font-bold text-gold-300">{g.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {g.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-400" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        );
      })}

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
                <p className="mt-1.5 text-sm text-gray-300">{w.d}</p>
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
          <p className="mx-auto mt-4 max-w-xl text-gray-300">
            Tell us what you need to outsource and we&apos;ll design a team around it.
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

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
