import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  LineChart,
  Landmark,
  Briefcase,
  PiggyBank,
  Scale,
  Globe2,
} from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Services" };

const services = [
  {
    icon: LineChart,
    title: "Portfolio Management",
    desc: "Actively managed, diversified portfolios designed around your risk tolerance, time horizon, and liquidity needs.",
    points: ["Strategic asset allocation", "Risk-managed rebalancing", "Tax-aware investing"],
  },
  {
    icon: Landmark,
    title: "Wealth Planning",
    desc: "A coordinated financial plan spanning retirement, cash flow, education, and intergenerational transfer.",
    points: ["Retirement planning", "Cash-flow modelling", "Estate & succession"],
  },
  {
    icon: Briefcase,
    title: "Private Advisory",
    desc: "Bespoke solutions and a dedicated advisor for high-net-worth individuals and family offices.",
    points: ["Dedicated advisor", "Bespoke mandates", "Family-office support"],
  },
  {
    icon: PiggyBank,
    title: "Retirement Solutions",
    desc: "Strategies to accumulate, protect, and draw down retirement assets with confidence.",
    points: ["Accumulation strategy", "Income planning", "Pension consolidation"],
  },
  {
    icon: Scale,
    title: "Tax & Estate",
    desc: "Structuring to manage tax efficiently and transfer wealth smoothly to the next generation.",
    points: ["Tax efficiency", "Trust structures", "Legacy planning"],
  },
  {
    icon: Globe2,
    title: "Global Markets Access",
    desc: "Diversified exposure across global equities, fixed income, and alternative investments.",
    points: ["Global equities", "Fixed income", "Alternatives"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy-950">
        <div className="container-page py-20 lg:py-28">
          <p className="eyebrow">Our services</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-white sm:text-5xl">
            Solutions for every stage of your financial life
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-200">
            From building a portfolio to preserving a legacy, our integrated
            advisory services are designed to work together — coordinated by a
            team that knows you.
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="flex flex-col rounded-xl border border-navy-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900 text-gold-300">
                <s.icon className="h-6 w-6" />
              </span>
              <h2 className="mt-6 text-xl font-bold">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-navy-600">
                {s.desc}
              </p>
              <ul className="mt-5 space-y-2.5">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2.5 text-sm text-navy-700"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">How we work</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              A clear, four-step process
            </h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {[
              { n: "01", t: "Discover", d: "We learn your goals, circumstances, and attitude to risk." },
              { n: "02", t: "Design", d: "We build a tailored plan and investment strategy." },
              { n: "03", t: "Implement", d: "We put your plan to work with precision and care." },
              { n: "04", t: "Review", d: "We monitor, report, and adjust as life evolves." },
            ].map((step) => (
              <div key={step.n} className="relative">
                <span className="font-serif text-5xl font-bold text-gold-200">
                  {step.n}
                </span>
                <h3 className="mt-3 text-lg font-bold">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 px-8 py-16 text-center shadow-xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl">
            Find the right solution for you
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-200">
            Tell us about your goals and we&apos;ll recommend a tailored
            approach.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-gold">
              Submit an enquiry <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="btn-outline border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              Email us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
