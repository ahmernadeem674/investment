import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  LineChart,
  Landmark,
  Users,
  Lock,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { site } from "@/lib/site";
import { images, img } from "@/lib/images";

const stats = [
  { value: "$1.2B+", label: "Assets under advisory" },
  { value: "350+", label: "Families & institutions" },
  { value: "25 yrs", label: "Average partner experience" },
  { value: "98%", label: "Client retention" },
];

const services = [
  {
    icon: LineChart,
    title: "Portfolio Management",
    desc: "Disciplined, research-driven strategies tailored to your risk profile and long-term objectives.",
  },
  {
    icon: Landmark,
    title: "Wealth Planning",
    desc: "Holistic planning across retirement, tax, and estate to protect and transfer wealth across generations.",
  },
  {
    icon: Briefcase,
    title: "Private Advisory",
    desc: "Dedicated advisors and bespoke solutions for high-net-worth individuals and family offices.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero with photographic background */}
      <section className="relative overflow-hidden">
        <Image
          src={img(images.heroTowers, 2000)}
          alt="Modern financial district"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-950/85 to-navy-900/70" />
        <div className="container-page relative grid items-center gap-16 py-24 lg:grid-cols-2 lg:py-36">
          <div>
            <p className="eyebrow">{site.tagline}</p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              Wealth managed with{" "}
              <span className="text-gold-300">discipline</span> and discretion.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100">
              {site.name} partners with individuals, families, and institutions
              to build resilient portfolios and preserve capital across market
              cycles — guided by independent research and a fiduciary mindset.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-gold">
                Speak with an advisor
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="btn-outline border-white/25 bg-white/5 text-white hover:bg-white/10"
              >
                Explore our services
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-navy-200">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-gold-400" /> Fiduciary
                standard
              </span>
              <span className="inline-flex items-center gap-2">
                <Lock className="h-4 w-4 text-gold-400" /> Bank-grade security
              </span>
            </div>
          </div>

          {/* Floating dashboard preview card */}
          <div className="relative">
            <div className="rounded-2xl border border-white/15 bg-navy-950/60 p-8 shadow-2xl backdrop-blur-md">
              <p className="text-sm font-medium text-navy-200">
                Total portfolio value
              </p>
              <p className="mt-2 font-serif text-4xl font-bold text-white">
                $4,287,540
              </p>
              <p className="mt-1 text-sm text-emerald-400">
                +12.4% year to date
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { name: "Global Equities", pct: 46, color: "bg-gold-400" },
                  { name: "Fixed Income", pct: 28, color: "bg-navy-300" },
                  { name: "Alternatives", pct: 16, color: "bg-emerald-400" },
                  { name: "Cash", pct: 10, color: "bg-white/40" },
                ].map((row) => (
                  <div key={row.name}>
                    <div className="flex justify-between text-sm text-navy-100">
                      <span>{row.name}</span>
                      <span className="font-medium text-white">{row.pct}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full ${row.color}`}
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-navy-400">
                Illustrative client dashboard
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-navy-100 bg-white">
        <div className="container-page grid grid-cols-2 gap-8 py-14 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center lg:text-left">
              <p className="font-serif text-3xl font-bold text-navy-900 lg:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-navy-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section className="container-page py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">What we do</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Comprehensive advisory, built around you
          </h2>
          <p className="mt-4 text-navy-600">
            Every mandate begins with understanding your goals — then aligning
            capital, structure, and strategy to achieve them.
          </p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group rounded-xl border border-navy-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900 text-gold-300">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-600">
                {s.desc}
              </p>
              <Link
                href="/services"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gold-700 transition-colors group-hover:gap-2"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Image + text feature */}
      <section className="bg-white py-24">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={img(images.advisor, 1200)}
                alt="An advisor meeting with clients"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Floating stat badge */}
            <div className="absolute -bottom-6 -right-4 hidden rounded-xl border border-navy-100 bg-white p-5 shadow-lg sm:block">
              <p className="font-serif text-3xl font-bold text-navy-900">98%</p>
              <p className="text-xs text-navy-500">client retention</p>
            </div>
          </div>
          <div>
            <p className="eyebrow">Why {site.name}</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              A partnership built on trust
            </h2>
            <p className="mt-4 leading-relaxed text-navy-600">
              We take the time to understand your full financial picture, then
              build a plan that adapts as your life evolves. No products to push
              — just independent advice and a team that puts you first.
            </p>
            <ul className="mt-7 space-y-3.5">
              {[
                "Independent, conflict-free recommendations",
                "A dedicated senior advisor for every client",
                "Transparent, straightforward fees",
                "Secure portal with real-time portfolio visibility",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                  <span className="text-navy-700">{point}</span>
                </li>
              ))}
            </ul>
            <Link href="/about" className="btn-primary mt-9">
              About our firm <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Approach band */}
      <section className="bg-navy-900">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Our approach</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Independent, aligned, and transparent
            </h2>
            <p className="mt-4 leading-relaxed text-navy-200">
              We are not tied to proprietary products. Our advice is independent
              and our interests are aligned with yours — so every recommendation
              is made on its merits, with full transparency on cost and risk.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { icon: ShieldCheck, t: "Fiduciary first", d: "Your interests, always ahead of ours." },
              { icon: Users, t: "Dedicated team", d: "A senior advisor who knows your name." },
              { icon: LineChart, t: "Evidence-led", d: "Decisions grounded in research, not noise." },
              { icon: Lock, t: "Confidential", d: "Your data and affairs, rigorously protected." },
            ].map((f) => (
              <div
                key={f.t}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <f.icon className="h-6 w-6 text-gold-400" />
                <h3 className="mt-4 text-base font-bold text-white">{f.t}</h3>
                <p className="mt-1.5 text-sm text-navy-300">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with image */}
      <section className="relative overflow-hidden">
        <Image
          src={img(images.handshake, 2000)}
          alt="A professional handshake"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-950/90" />
        <div className="container-page relative py-24 text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl">
            Ready to put your capital to work?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-200">
            Schedule a confidential, no-obligation conversation with one of our
            advisors.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-gold">
              Submit an enquiry
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${site.phoneHref}`}
              className="btn-outline border-white/25 bg-white/5 text-white hover:bg-white/10"
            >
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
