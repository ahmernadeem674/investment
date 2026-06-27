"use client";

import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import type { Call } from "@/lib/trackrecord";

const badge: Record<Call["status"], { label: string; cls: string }> = {
  won: { label: "✓ Won", cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
  loss: { label: "✗ Missed", cls: "bg-red-500/10 text-red-400 border-red-500/30" },
  active: { label: "● Active", cls: "bg-gold-400/10 text-gold-400 border-gold-500/30" },
};

const retCls: Record<Call["retKind"], string> = {
  pos: "text-emerald-400",
  neg: "text-red-400",
  neutral: "text-gold-400",
};

export function CallsGrid({ calls }: { calls: Call[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(calls.map((c) => c.category)))],
    [calls],
  );
  const [filter, setFilter] = useState("All");

  const visible = filter === "All" ? calls : calls.filter((c) => c.category === filter);

  return (
    <>
      <div className="mb-9 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={`border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors ${
              filter === c
                ? "border-gold-400 text-gold-400"
                : "border-line text-gray-500 hover:border-gold-700 hover:text-gold-400"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((c, i) => (
          <article
            key={`${c.asset}-${i}`}
            className={`relative overflow-hidden border border-line bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-gold-700 ${
              c.featured ? "md:col-span-2 border-gold-700" : ""
            }`}
          >
            <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-gold-400 to-transparent" />
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-line font-mono text-sm font-bold text-gold-400">
                  {c.ticker}
                </span>
                <div>
                  <div className="font-semibold text-white">{c.asset}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-gray-500">
                    {c.category}
                  </div>
                </div>
              </div>
              <span className={`border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.05em] ${badge[c.status].cls}`}>
                {badge[c.status].label}
              </span>
            </div>

            <p className="mt-4 border-l-2 border-gold-700 pl-3.5 text-sm italic leading-relaxed text-gray-400">
              {c.quote}
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3 bg-white/[0.03] p-3.5">
              <Datum value={c.entry} k="Entry Zone" />
              <Datum value={c.exit} k={c.exitKey} cls={retCls[c.retKind]} />
              <Datum value={c.ret} k="Return" cls={retCls[c.retKind]} />
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="font-mono text-[10px] text-gray-500">{c.dates}</span>
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-gold-400 transition-colors hover:text-gold-300"
              >
                View on X <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function Datum({ value, k, cls = "text-white" }: { value: string; k: string; cls?: string }) {
  return (
    <div className="text-center">
      <div className={`font-mono text-sm font-bold ${cls}`}>{value}</div>
      <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.06em] text-gray-500">{k}</div>
    </div>
  );
}
