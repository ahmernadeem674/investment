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
      "“The rise of silver isn't coming. It's already decided.” — Feb 24, 2025. Called accumulation when silver was significantly undervalued; offloaded near $54 when conviction was validated.",
    entry: "~$28",
    exit: "$54",
    exitKey: "Target Hit",
    ret: "+93%",
    retKind: "pos",
    dates: "Called: 24 Feb 2025 · Closed: Oct 2025",
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
    exit: "$69,000",
    exitKey: "Target Hit",
    ret: "+337%",
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
      "“AI infrastructure is not a theme — it's a supercycle. NVDA at these prices will look like a gift in 18 months.” — Jan 2023.",
    entry: "$148",
    exit: "$974",
    exitKey: "Target Hit",
    ret: "+558%",
    retKind: "pos",
    dates: "Called: Jan 18, 2023",
    link: "https://x.com/UsmanHoldings",
  },
  {
    ticker: "OIL",
    asset: "WTI Crude Oil",
    category: "Commodities",
    status: "loss",
    quote:
      "“Supply constraints will push WTI toward $95 by Q3. Geopolitical premium is being underpriced.” — Mar 2024.",
    entry: "$80",
    exit: "$72",
    exitKey: "Closed At",
    ret: "−10%",
    retKind: "neg",
    dates: "Called: Mar 2024 · Closed: Sep 2024",
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
  { year: "2022", title: "Founded & MEXC Partnership", desc: "Usman Holdings established. Usman Asif became an Official Partner with MEXC — one of the world's leading crypto exchanges. Called Bitcoin's bear-market bottom publicly on X." },
  { year: "2023", title: "Equities & AI Expansion", desc: "Expanded advisory scope into global equities. Called Nvidia's AI supercycle at $148/share, ahead of broader consensus. Client base grows to 20+ active mandates." },
  { year: "2024", title: "Gold & Multi-Asset Track Record", desc: "Called Gold's structural breakout above $2,100 months before institutional consensus. Expanded into real-world ventures including agriculture and export trade." },
  { year: "2025", title: "Silver Call & $47M+ in Advisory", desc: "The February silver accumulation call returned 93% by October. Total assets under advisory surpassed $47M. X account hits 140+ verified, timestamped calls." },
  { year: "2026", title: "Global Reach & Ongoing", desc: "Active advisory across 3 continents. BTC $150K target in play. Operating at the intersection of institutional discipline and market conviction." },
];

export const xPosts = [
  { label: "Silver Call · Oct 2025", handle: "@UsmanHoldings · Oct 20, 2025", text: "Months ago, we advised our network to accumulate silver when it was significantly undervalued. Today, with prices approaching the $54 mark, that conviction stands validated. Off-loading. This was never speculation — it was strategy.", meta: "↺ 1   ♡ 6   ↗ 581 impressions", link: "https://x.com/i/status/1980179918622187692" },
  { label: "BTC Bottom · Nov 2022", handle: "@UsmanHoldings · Nov 21, 2022", text: "This is the capitulation. Bitcoin will not revisit these levels. Accumulate with conviction. The macro pain is priced in. The reward cycle begins from here. $BTC $15,800 — buying zone.", meta: "↺ 14   ♡ 47   ↗ 3,200 impressions", link: "https://x.com/UsmanHoldings" },
  { label: "Gold Breakout · Feb 2024", handle: "@UsmanHoldings · Feb 14, 2024", text: "Gold's breakout above $2,100 is not a ceiling. It's a floor. The next leg is beginning. Those who waited for confirmation have already missed the entry. $XAU", meta: "↺ 8   ♡ 31   ↗ 1,850 impressions", link: "https://x.com/UsmanHoldings" },
];
