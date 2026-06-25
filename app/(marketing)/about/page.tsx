import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Target, Compass, Handshake } from "lucide-react";
import { site } from "@/lib/site";
import { images, img } from "@/lib/images";

export const metadata: Metadata = { title: "About" };

const values = [
  {
    icon: Target,
    title: "Purpose-driven",
    desc: "We start with your goals and work backwards — capital is a means, not the end.",
  },
  {
    icon: Compass,
    title: "Disciplined",
    desc: "A repeatable, research-based process keeps emotion out of long-term decisions.",
  },
  {
    icon: Handshake,
    title: "Aligned",
    desc: "Independent advice with transparent fees and no proprietary product agenda.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <Image
          src={img(images.cityDusk, 2000)}
          alt="City skyline at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 to-navy-900/75" />
        <div className="container-page relative py-24 lg:py-32">
          <p className="eyebrow">About {site.name}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-white sm:text-5xl">
            A private advisory firm built on trust and discretion
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">
            For over two decades, {site.name} has helped clients navigate
            markets with clarity and conviction. We combine institutional rigour
            with the personal attention of a boutique partnership.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container-page py-20">
        <div className="mb-16 overflow-hidden rounded-2xl shadow-xl">
          <Image
            src={img(images.teamMeeting, 2000)}
            alt="Our advisory team in a client meeting"
            width={2000}
            height={800}
            className="h-72 w-full object-cover md:h-96"
          />
        </div>
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-3 text-3xl font-bold">
              Independent thinking, enduring relationships
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-navy-600">
              <p>
                {site.name} was founded on a simple belief: that clients deserve
                advice free from conflict, delivered by people who genuinely
                understand their circumstances.
              </p>
              <p>
                We act as fiduciaries. That means we are legally and ethically
                bound to put your interests first — in every portfolio decision,
                every plan, and every fee we charge.
              </p>
              <p>
                Today we advise individuals, families, and institutions, but our
                approach has never changed: listen carefully, think
                independently, and stay the course.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-navy-100 bg-white p-10 shadow-sm">
            <h3 className="text-xl font-bold">Why clients choose us</h3>
            <ul className="mt-6 space-y-5">
              {[
                "Senior advisors with decades of market experience",
                "Independent, conflict-free recommendations",
                "Transparent, straightforward fee structure",
                "Secure online portal with real-time portfolio visibility",
                "A long-term partnership, not a transaction",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-400" />
                  <span className="text-navy-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Our values</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              The principles behind every decision
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-navy-100 bg-cream p-8"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900 text-gold-300">
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl font-bold">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-600">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-navy-100 bg-white p-10 text-center shadow-sm sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl font-bold">Let&apos;s start a conversation</h2>
            <p className="mt-2 text-navy-600">
              Reach our team directly at {site.email}.
            </p>
          </div>
          <Link href="/contact" className="btn-primary shrink-0">
            Contact us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
