// Track-record data. Edit calls / milestones here; the page renders from this.
// NOTE: figures are provided by the firm. Keep the public X links accurate.

export type CallStatus = "won" | "loss" | "active";

export type Call = {
  ticker: string; // short symbol shown in the icon circle
  asset: string;
  category: "Crypto" | "Metals" | "Equities" | "Commodities" | "FX";
  status: CallStatus;
  quote: string;
  entry: string;
  exit: string; // exit, target hit, or target
  exitKey: string; // label under the exit value
  ret: string; // e.g. "+93%", "−10%", "In Play"
  retKind: "pos" | "neg" | "neutral";
  dates: string;
  link: string;
  featured?: boolean;
};

export const calls: Call[] = [
  {
    ticker: "AG",
    asset: "Silver (XAG/USD)",
    category: "Metals",
    status: "won",
    quote:
      "“The rise of silver isn't coming. It's already decided.” Accumulated at $32 when silver was significantly undervalued; offloaded near $110 as conviction was validated.",
    entry: "$32",
    exit: "$110",
    exitKey: "Offloaded",
    ret: "+260%",
    retKind: "pos",
    dates: "Accumulated: $32 · Offloaded near $110",
    link: "https://x.com/i/status/1980179918622187692",
    featured: true,
  },
  {
    ticker: "₿",
    asset: "Bitcoin (BTC)",
    category: "Crypto",
    status: "won",
    quote:
      "“This is the capitulation. Bitcoin will not revisit these levels. Accumulate with conviction.” — Nov 2022.",
    entry: "$15,800",
    exit: "$110,600",
    exitKey: "Peak",
    ret: "+600%",
    retKind: "pos",
    dates: "Called: Nov 21, 2022",
    link: "https://x.com/UsmanHoldings",
  },
  {
    ticker: "AU",
    asset: "Gold (XAU/USD)",
    category: "Metals",
    status: "won",
    quote:
      "“Gold's breakout above $2,100 is not a ceiling — it's a floor. This is the beginning of the next leg.” — Feb 2024.",
    entry: "$2,080",
    exit: "$3,200",
    exitKey: "Target Hit",
    ret: "+54%",
    retKind: "pos",
    dates: "Called: Feb 14, 2024",
    link: "https://x.com/UsmanHoldings",
  },
  {
    ticker: "Ξ",
    asset: "Ethereum (ETH)",
    category: "Crypto",
    status: "won",
    quote:
      "“ETH at $1,100 is the trade of the cycle. Long-term holders are about to be rewarded disproportionately.” — Dec 2022.",
    entry: "$1,100",
    exit: "$4,000",
    exitKey: "Target Hit",
    ret: "+263%",
    retKind: "pos",
    dates: "Called: Dec 05, 2022",
    link: "https://x.com/UsmanHoldings",
  },
  {
    ticker: "NV",
    asset: "Nvidia (NVDA)",
    category: "Equities",
    status: "won",
    quote:
      "Called the AI supercycle at $40/share after validating the durability of generative-AI demand — well ahead of consensus.",
    entry: "$40",
    exit: "$213",
    exitKey: "Target Hit",
    ret: "+432%",
    retKind: "pos",
    dates: "Called: $40/share",
    link: "https://x.com/UsmanHoldings",
  },
  {
    ticker: "OIL",
    asset: "WTI Crude Oil",
    category: "Commodities",
    status: "won",
    quote:
      "Accumulation around $56 on underpriced supply-side conviction; exited into strength in Spring 2026.",
    entry: "$56",
    exit: "$101",
    exitKey: "Exited",
    ret: "+81%",
    retKind: "pos",
    dates: "Accumulated ~$56 · Exited: Spring 2026",
    link: "https://x.com/UsmanHoldings",
  },
  {
    ticker: "₿",
    asset: "Bitcoin (BTC)",
    category: "Crypto",
    status: "active",
    quote:
      "“The next BTC leg begins at the ETF approval digestion point. $150K before end of cycle. Not a prediction — a calculation.” — Jan 2025.",
    entry: "$92,000",
    exit: "$150,000",
    exitKey: "Target",
    ret: "In Play",
    retKind: "neutral",
    dates: "Called: Jan 12, 2025 · Open",
    link: "https://x.com/UsmanHoldings",
  },
];

export const milestones = [
  { year: "2017", title: "Usman Holdings Founded", desc: "Usman Asif establishes Usman Holdings on a single principle: conviction means nothing unless it's on record. Every major market call is published, publicly and timestamped." },
  { year: "2022", title: "MEXC Partnership & BTC Bottom", desc: "Becomes an Official Partner with MEXC — one of the world's leading crypto exchanges — and calls Bitcoin's bear-market bottom publicly at $15,800 as the market capitulates." },
  { year: "2023", title: "Equities & AI Expansion", desc: "Expands advisory into global equities. Calls the Nvidia AI supercycle at $40/share, well ahead of broader consensus." },
  { year: "2024", title: "Multi-Asset & Real-World Ventures", desc: "Broadens into agriculture, export trade, and real estate advisory alongside metals and commodities positioning." },
  { year: "2025", title: "Silver Call & $47M+ in Advisory", desc: "The silver accumulation call compounds toward +260%. Total assets under advisory surpass $47M; the public record passes 200+ verified, timestamped calls." },
  { year: "2026", title: "Global Reach & Ongoing", desc: "Active advisory across three continents and a growing BPO practice — operating at the intersection of institutional discipline and market conviction." },
];

export const xPosts = [
  { label: "Silver Call · Oct 2025", handle: "@UsmanHoldings · Oct 20, 2025", text: "Months ago, we advised our network to accumulate silver when it was significantly undervalued. Today, with prices approaching the $54 mark, that conviction stands validated. Off-loading. This was never speculation — it was strategy.", meta: "↺ 1   ♡ 6   ↗ 581 impressions", link: "https://x.com/i/status/1980179918622187692" },
  { label: "BTC Bottom · Nov 2022", handle: "@UsmanHoldings · Nov 21, 2022", text: "This is the capitulation. Bitcoin will not revisit these levels. Accumulate with conviction. The macro pain is priced in. The reward cycle begins from here. $BTC $15,800 — buying zone.", meta: "↺ 14   ♡ 47   ↗ 3,200 impressions", link: "https://x.com/UsmanHoldings" },
  { label: "Gold Breakout · Feb 2024", handle: "@UsmanHoldings · Feb 14, 2024", text: "Gold's breakout above $2,100 is not a ceiling. It's a floor. The next leg is beginning. Those who waited for confirmation have already missed the entry. $XAU", meta: "↺ 8   ♡ 31   ↗ 1,850 impressions", link: "https://x.com/UsmanHoldings" },
];
