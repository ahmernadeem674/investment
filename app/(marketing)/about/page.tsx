import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Target, Compass, Handshake, ShieldCheck } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { images, img } from "@/lib/images";

export const metadata: Metadata = { title: "About" };

const values = [
  { icon: Target, title: "Conviction", desc: "We take positions on our research and stand behind them publicly — on record." },
  { icon: Compass, title: "Discipline", desc: "A repeatable, evidence-led process keeps emotion out of long-term decisions." },
  { icon: Handshake, title: "Alignment", desc: "Independent advice, transparent terms, and interests aligned with yours." },
  { icon: ShieldCheck, title: "Discretion", desc: "Confidentiality and integrity in everything we handle on your behalf." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <Image src={img(images.cityDusk, 2000)} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/70" />
        <div className="container-page relative py-24 lg:py-32">
          <p className="eyebrow">About {site.name}</p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-black text-white sm:text-5xl lg:text-6xl">
            Institutional discipline. <span className="text-gold-400">Founder conviction.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-400">
            Founded in {site.founded}, {site.name} operates across global markets,
            real-world ventures, and business outsourcing — combining the rigour
            of an institution with the agility of a boutique partnership.
          </p>
        </div>
      </section>

      {/* Founder story */}
      <section className="container-page py-20">
        <div className="grid gap-14 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="overflow-hidden border border-line">
              <Image
                src={img(images.advisor, 1100)}
                alt="Usman Holdings advisory"
                width={1100}
                height={1300}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-5 border border-line bg-card p-6">
              <p className="font-serif text-2xl font-bold text-gold-400">{site.founder}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-gray-500">
                Founder · Usman Holdings
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.06em] text-gray-500">
                Official Partner — MEXC
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow">The founder&apos;s story</p>
            <h2 className="section-title mt-3">
              Built on calls that were <span>made in public</span>
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-gray-400">
              <p>
                {site.name} was founded by {site.founder} in {site.founded} on a
                simple, uncompromising principle: conviction means nothing unless
                it&apos;s on record. From the outset, every major market call was
                published openly and timestamped on X — visible to anyone, for
                scrutiny at any time.
              </p>
              <p>
                In 2022, {site.founder} became an Official Partner with MEXC, one
                of the world&apos;s leading crypto exchanges, and called
                Bitcoin&apos;s bear-market bottom publicly as the market
                capitulated. What followed was a multi-year track record across
                crypto, equities, metals, and commodities — built not on
                hindsight, but on positions taken in real time.
              </p>
              <p>
                Today the firm advises individuals, families, and institutions
                across three continents, with more than $47M in assets under
                advisory. The mandate has broadened — into wealth management, real
                estate, agriculture, export trade, and business outsourcing — but
                the discipline has never changed: research deeply, act with
                conviction, and stay accountable.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/track-record" className="btn-gold">
                See the track record <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-line">
                Talk to us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-line bg-surface">
        <div className="container-page py-20">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="eyebrow-center">What we stand for</p>
            <h2 className="section-title mt-3">
              The principles behind every <span>decision</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="border border-line bg-card p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-gold-400/10 text-gold-400">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-serif text-lg font-bold text-white">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20">
        <div className="flex flex-col items-center justify-between gap-6 border border-line bg-card p-10 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="font-serif text-2xl font-bold text-white">Let&apos;s start a conversation</h2>
            <p className="mt-2 text-gray-400">Reach our team at {site.email}.</p>
          </div>
          <Link href="/contact" className="btn-gold shrink-0">
            Contact us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
