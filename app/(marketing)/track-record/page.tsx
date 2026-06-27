import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, PlayCircle } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { calls, milestones, xPosts } from "@/lib/trackrecord";
import { CallsGrid } from "@/components/marketing/calls-grid";

export const metadata: Metadata = {
  title: "Track Record",
  description:
    "Every market call on record — publicly timestamped on X. Verified performance from Usman Holdings.",
};

const retClass = (kind: string) =>
  kind === "pos" ? "text-emerald-400" : kind === "neg" ? "text-red-400" : "text-gold-400";

export default function TrackRecordPage() {
  return (
    <>
      {/* Hero */}
      <section className="container-page py-24 lg:py-28">
        <p className="eyebrow">Verified Performance</p>
        <h1 className="mt-6 max-w-3xl font-serif text-5xl font-black leading-[1.05] text-white sm:text-6xl">
          Every call is <span className="text-gold-400">on record.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-400">
          No hypotheticals. No selective memory. Every market call we&apos;ve made
          is publicly timestamped on X — visible to anyone, at any time.
        </p>
        <div className="mt-8 inline-flex items-center gap-2 border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.05em] text-gray-500">
          <span className="text-emerald-400">●</span> All calls verified via public X posts with original timestamps
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-line bg-card">
        <div className="container-page grid grid-cols-2 gap-y-8 py-12 sm:grid-cols-3 lg:grid-cols-5">
          {site.stats.map((s) => (
            <div key={s.label} className="text-center lg:text-left">
              <p className="font-serif text-4xl font-black text-gold-400">{s.value}</p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Calls */}
      <section className="container-page py-20">
        <div className="mb-9 flex items-end justify-between border-b border-line pb-5">
          <h2 className="section-title">
            Market <span>Calls</span>
          </h2>
          <span className="font-mono text-[11px] text-gray-600">All timestamps publicly verifiable ↗</span>
        </div>
        <CallsGrid calls={calls} />
      </section>

      {/* Direct from X */}
      <section className="border-y border-line bg-surface">
        <div className="container-page py-20">
          <div className="mb-6 flex items-end justify-between border-b border-line pb-5">
            <h2 className="section-title">
              Direct from <span>X</span>
            </h2>
            <span className="font-mono text-[11px] text-gray-600">Original posts · timestamped · public</span>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-gray-500">
            The posts below are reproduced from our public X account. Every post is
            an original, undeletable record of our conviction at the time it was
            made.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {xPosts.map((t) => (
              <div key={t.label} className="flex flex-col gap-3 border border-line bg-card p-6">
                <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-gold-400">{t.label}</div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-400 font-serif font-bold text-ink">U</span>
                  <div>
                    <div className="text-sm font-bold text-white">Usman Holdings (P.) ✓</div>
                    <div className="text-xs text-gray-500">{t.handle}</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-gray-300">{t.text}</p>
                <div className="mt-1 border-t border-line pt-3 text-xs text-gray-500">{t.meta}</div>
                <a
                  href={t.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-end gap-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-gold-400 hover:text-gold-300"
                >
                  Open original post <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full summary table */}
      <section className="container-page py-20">
        <div className="mb-9 flex items-end justify-between border-b border-line pb-5">
          <h2 className="section-title">
            Full <span>Summary</span>
          </h2>
          <span className="font-mono text-[11px] text-gray-600">Last updated: Jun 2026</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-line text-left font-mono text-[10px] uppercase tracking-[0.1em] text-gray-500">
                <th className="px-4 py-3">Asset</th>
                <th className="px-4 py-3">Called</th>
                <th className="px-4 py-3">Entry</th>
                <th className="px-4 py-3">Exit / Target</th>
                <th className="px-4 py-3">Return</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {calls.map((c, i) => (
                <tr key={`${c.asset}-${i}`} className="border-b border-line/60 text-sm hover:bg-white/[0.02]">
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-2.5 text-white">
                      <span className="bg-gold-400/10 px-2 py-1 font-mono text-[11px] text-gold-400">{c.ticker}</span>
                      {c.asset}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-400">{c.dates.replace("Called: ", "").split(" · ")[0]}</td>
                  <td className="px-4 py-4 text-gray-400">{c.entry}</td>
                  <td className="px-4 py-4 text-gray-400">{c.exit}</td>
                  <td className={`px-4 py-4 font-mono font-bold ${retClass(c.retKind)}`}>{c.ret}</td>
                  <td className="px-4 py-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-gray-400">{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Testimonials (Vimeo profile link) */}
      <section className="border-y border-line bg-surface">
        <div className="container-page py-20 text-center">
          <p className="eyebrow-center">In their words</p>
          <h2 className="section-title mt-3">
            Client <span>testimonials</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Hear directly from the people we work with. Watch our testimonial
            videos on Vimeo.
          </p>
          <a
            href={site.socials.vimeo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-8"
          >
            <PlayCircle className="h-4 w-4" /> Watch on Vimeo
          </a>
        </div>
      </section>

      {/* Milestones */}
      <section className="container-page py-20">
        <div className="mb-12 flex items-end justify-between border-b border-line pb-5">
          <h2 className="section-title">
            Key <span>Milestones</span>
          </h2>
          <span className="font-mono text-[11px] text-gray-600">Est. {site.founded}</span>
        </div>
        <div className="relative border-l border-gold-700/50 pl-8">
          {milestones.map((m) => (
            <div key={m.year} className="relative mb-10 last:mb-0">
              <span className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-ink bg-gold-400" />
              <div className="font-mono text-[11px] tracking-[0.1em] text-gold-400">{m.year}</div>
              <h3 className="mt-1.5 font-serif text-lg font-bold text-white">{m.title}</h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-gray-400">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-card">
        <div className="container-page py-20 text-center">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl font-black text-white sm:text-4xl">
            Ready to work with <span className="text-gold-400">the right team?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Our track record speaks clearly. If you want disciplined,
            research-driven advisory — let&apos;s talk.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
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
