import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Bitcoin,
  CandlestickChart,
  Landmark,
  Gem,
  ArrowLeftRight,
  PieChart,
  Building2,
  Sprout,
  Ship,
  Rocket,
  UserCog,
  ClipboardCheck,
  Scale,
} from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { images, img } from "@/lib/images";

export const metadata: Metadata = { title: "Services" };

const groups = [
  {
    group: "Global Markets",
    range: "01 — 05",
    items: [
      { icon: Bitcoin, title: "Digital Assets & Crypto", points: ["Bitcoin & Ethereum institutional strategies", "Research-driven entry & exit points", "Disciplined allocation models", "MEXC Official Partnership"] },
      { icon: CandlestickChart, title: "Equities & Indices", points: ["Global & Pakistan equities", "Index-based strategies", "Long & short term positioning"] },
      { icon: Landmark, title: "Fixed Income", points: ["Government & corporate bonds", "Capital preservation strategies", "Yield optimization"] },
      { icon: Gem, title: "Commodities & Metals", points: ["Gold, silver & precious metals", "Energy & agricultural commodities", "Inflation hedge strategies"] },
      { icon: ArrowLeftRight, title: "Foreign Exchange (FX)", points: ["Major & emerging market pairs", "PKR/USD exposure management", "Currency risk advisory"] },
    ],
  },
  {
    group: "Wealth & Assets",
    range: "06 — 07",
    items: [
      { icon: PieChart, title: "Wealth & Portfolio Management", points: ["Strategic asset allocation", "Risk-managed rebalancing", "Intergenerational wealth transfer", "Family office support", "Estate & succession planning"] },
      { icon: Building2, title: "Property & Real Estate", points: ["Residential & commercial property", "Property development", "Pakistan & international markets", "Real estate investment strategy"] },
    ],
  },
  {
    group: "Ventures",
    range: "08 — 10",
    items: [
      { icon: Sprout, title: "Agriculture", points: ["Agricultural investment opportunities", "Pakistan & regional markets", "Tangible asset growth"] },
      { icon: Ship, title: "Export Trade", points: ["Trade finance advisory", "International market entry", "Export business investment"] },
      { icon: Rocket, title: "Business Investment", points: ["Direct business stakes", "Growth capital deployment", "Venture partnerships"] },
    ],
  },
  {
    group: "Advisory",
    range: "11 — 13",
    items: [
      { icon: UserCog, title: "Private Advisory", points: ["Dedicated one-on-one advisor", "Bespoke investment mandates", "HNW & family office clients", "Strictly confidential"] },
      { icon: ClipboardCheck, title: "Investment Consultancy", points: ["Portfolio review & analysis", "Market entry strategy", "Risk assessment"] },
      { icon: Scale, title: "Tax & Estate Planning", points: ["Tax efficiency structuring", "Trust & legacy planning", "Wealth succession"] },
    ],
  },
];

export default function ServicesPage() {
  let counter = 0;
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <Image src={img(images.analyticsDesk, 2000)} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/70" />
        <div className="container-page relative py-24 lg:py-32">
          <p className="eyebrow">Our services</p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-black text-white sm:text-5xl lg:text-6xl">
            Thirteen disciplines. <span className="text-gold-400">One standard.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-400">
            From digital assets to real-world ventures, every mandate is run with
            the same research-driven discipline — coordinated by a team that knows
            you.
          </p>
        </div>
      </section>

      {groups.map((g) => (
        <section key={g.group} className="container-page py-16">
          <div className="mb-10 flex items-end justify-between border-b border-line pb-5">
            <h2 className="section-title">
              {g.group.split(" ")[0]}{" "}
              <span>{g.group.split(" ").slice(1).join(" ")}</span>
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-gray-600">
              {g.range}
            </span>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {g.items.map((s) => {
              counter += 1;
              const n = String(counter).padStart(2, "0");
              return (
                <div
                  key={s.title}
                  className="relative flex flex-col border border-line bg-card p-7 transition-colors hover:border-gold-700"
                >
                  <span className="absolute right-6 top-6 font-mono text-xs text-gray-700">
                    {n}
                  </span>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-gold-400/10 text-gold-400">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-serif text-lg font-bold text-white">
                    {s.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-gray-400">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-400" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* BPO cross-link */}
      <section className="container-page pb-8 pt-4">
        <div className="flex flex-col items-start justify-between gap-6 border border-gold-700/40 bg-surface p-10 sm:flex-row sm:items-center">
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
      <section className="container-page py-16">
        <div className="border border-line bg-card px-8 py-14 text-center">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl font-black text-white">
            Find the right mandate for you
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Tell us about your goals and we&apos;ll recommend a tailored approach.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-gold">
              Submit an enquiry <ArrowRight className="h-4 w-4" />
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
