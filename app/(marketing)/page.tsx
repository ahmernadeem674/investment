import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Globe2,
  Landmark,
  Sprout,
  UserCog,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { images, img } from "@/lib/images";

const categories = [
  { icon: Globe2, title: "Global Markets", desc: "Crypto, equities, fixed income, commodities & FX.", href: "/services" },
  { icon: Landmark, title: "Wealth & Assets", desc: "Portfolio management, real estate & succession.", href: "/services" },
  { icon: Sprout, title: "Ventures", desc: "Agriculture, export trade & business investment.", href: "/services" },
  { icon: UserCog, title: "Advisory", desc: "Private advisory, consultancy, tax & estate planning.", href: "/services" },
];

const highlightCalls = [
  { asset: "Silver (XAG)", note: "Accumulated at $32, offloaded near $110.", ret: "+260%" },
  { asset: "Bitcoin (BTC)", note: "Called the 2022 capitulation bottom at $15,800.", ret: "+600%" },
  { asset: "WTI Crude Oil", note: "Accumulation around $56, exited in Spring 2026.", ret: "+81%" },
  { asset: "Nvidia (NVDA)", note: "Called the AI supercycle at $40/share.", ret: "+432%" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src={img(images.heroTowers, 2000)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/95 to-ink/70" />
        <div className="container-page relative py-28 lg:py-40">
          <p className="eyebrow">Private Investment &amp; Advisory · Est. {site.founded}</p>
          <h1 className="mt-6 max-w-4xl font-serif text-4xl font-black leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Disciplined conviction across <em className="not-italic text-gold-400">global markets.</em>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-gray-300">
            {site.name} advises individuals, families, and institutions across
            digital assets, financial markets, and real-world ventures — with a
            track record that&apos;s publicly on record.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-gold">
              Speak with us
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/track-record" className="btn-line">
              View track record
            </Link>
          </div>
          <div className="mt-10 inline-flex items-center gap-2 border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.05em] text-gray-300">
            <span className="text-emerald-400">●</span> Every market call verified via public, timestamped X posts
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-200">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gold-400" /> Fiduciary first
            </span>
            <span className="inline-flex items-center gap-2">
              <Lock className="h-4 w-4 text-gold-400" /> Bank-grade Security
            </span>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-line bg-card">
        <div className="container-page grid grid-cols-2 gap-y-8 py-12 sm:grid-cols-4">
          {site.stats.map((s) => (
            <div key={s.label} className="text-center lg:text-left">
              <p className="font-serif text-4xl font-black text-gold-400">{s.value}</p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-gray-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Service categories */}
      <section className="container-page py-24">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
          <h2 className="section-title">
            What we <span>do</span>
          </h2>
          <Link href="/services" className="font-mono text-[11px] uppercase tracking-[0.08em] text-gold-400 hover:text-gold-300">
            All 13 services ↗
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group relative overflow-hidden border border-line bg-card p-7 transition-colors hover:border-gold-700"
            >
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-gold-400 to-transparent" />
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-gold-400/10 text-gold-400">
                <c.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-serif text-lg font-bold text-white">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{c.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.08em] text-gold-400 transition-all group-hover:gap-2">
                Explore <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Track record teaser */}
      <section className="border-y border-line bg-surface">
        <div className="container-page py-24">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
            <div>
              <p className="eyebrow">Verified performance</p>
              <h2 className="section-title mt-3">
                Every call is <span>on record</span>
              </h2>
            </div>
            <Link href="/track-record" className="font-mono text-[11px] uppercase tracking-[0.08em] text-gold-400 hover:text-gold-300">
              Full track record ↗
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {highlightCalls.map((c) => (
              <div key={c.asset} className="border border-line bg-card p-7">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{c.asset}</span>
                  <span className="inline-flex items-center gap-1 font-mono text-sm font-bold text-emerald-400">
                    <TrendingUp className="h-4 w-4" /> {c.ret}
                  </span>
                </div>
                <p className="mt-4 text-sm italic leading-relaxed text-gray-300">{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BPO band */}
      <section className="container-page py-20">
        <div className="flex flex-col items-start justify-between gap-6 border border-gold-700/40 bg-card p-10 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow">Looking for outsourcing solutions?</p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-white">
              Explore our BPO services
            </h2>
            <p className="mt-2 max-w-xl text-sm text-gray-400">
              Financial, Tech &amp; Customer Service outsourcing for businesses
              worldwide.
            </p>
          </div>
          <Link href="/bpo" className="btn-line shrink-0">
            View BPO services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-y border-line">
        <Image src={img(images.handshake, 2000)} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-ink/92" />
        <div className="container-page relative py-24 text-center">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl font-black text-white sm:text-4xl">
            Ready to work with <span className="text-gold-400">the right team?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-200">
            Disciplined, research-driven advisory across digital assets,
            financial markets, and real-world ventures. Let&apos;s talk.
          </p>
          <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-200">
            {["Independent & conflict-free", "Strictly confidential", "Fiduciary mindset"].map((p) => (
              <li key={p} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-gold-400" /> {p}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-gold">
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-line">
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
