import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Card,
  Grid,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  BadgeDelta,
} from "@tremor/react";
import {
  LogOut,
  Wallet,
  Receipt,
  TrendingUp,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { site } from "@/lib/site";
import { createClient } from "@/utils/supabase/server";
import { AllocationChart } from "./allocation-chart";
import { PerformanceChart } from "./performance-chart";

export const metadata = { title: "Dashboard" };

const usd = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

const pct = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

type HoldingRow = {
  id: string;
  symbol: string;
  quantity: number;
  cost_basis: number;
  current_price: number;
  accounts: { name: string } | null;
};

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // RLS guarantees this only returns THIS investor's holdings.
  const { data, error } = await supabase
    .from("holdings")
    .select("id, symbol, quantity, cost_basis, current_price, accounts(name)")
    .order("symbol", { ascending: true });

  const holdings = (data ?? []) as unknown as HoldingRow[];

  const marketValue = holdings.reduce((s, h) => s + h.quantity * h.current_price, 0);
  const costBasis = holdings.reduce((s, h) => s + h.quantity * h.cost_basis, 0);
  const gainLoss = marketValue - costBasis;
  const gainLossPct = costBasis > 0 ? gainLoss / costBasis : 0;

  const allocation = holdings
    .map((h) => ({ name: h.symbol, value: h.quantity * h.current_price }))
    .sort((a, b) => b.value - a.value);

  const kpis = [
    { label: "Total Portfolio Value", value: usd(marketValue), icon: Wallet, color: "text-gold-300", bg: "bg-gold-400/10" },
    { label: "Total Cost Basis", value: usd(costBasis), icon: Receipt, color: "text-navy-200", bg: "bg-white/5" },
    { label: "Total Gain / Loss", value: usd(gainLoss), icon: TrendingUp, color: "text-emerald-300", bg: "bg-emerald-400/10", delta: gainLossPct, up: gainLoss >= 0 },
    { label: "Holdings", value: String(holdings.length), icon: Layers, color: "text-navy-200", bg: "bg-white/5" },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/90 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-navy-900 font-serif text-base font-bold text-gold-300">
              U
            </span>
            <span className="font-serif text-lg font-bold text-navy-900">
              {site.name}
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-navy-500 sm:inline">
              {user.email}
            </span>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-md border border-navy-200 bg-white px-3 py-1.5 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container-page py-8">
        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-3 text-sm text-red-700">
            Error loading holdings: {error.message}
          </div>
        )}

        {/* Hero panel */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-8 shadow-xl sm:p-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(50% 70% at 90% 0%, rgba(205,160,73,0.30) 0%, rgba(11,31,58,0) 60%), radial-gradient(50% 70% at 0% 100%, rgba(53,102,153,0.40) 0%, rgba(11,31,58,0) 60%)",
            }}
          />
          <div className="relative flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-navy-300">
                Total portfolio value
              </p>
              <p className="mt-2 font-serif text-4xl font-bold text-white sm:text-5xl">
                {usd(marketValue)}
              </p>
              <p
                className={`mt-3 inline-flex items-center gap-1.5 text-sm font-medium ${
                  gainLoss >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {gainLoss >= 0 ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                {usd(gainLoss)} ({pct(gainLossPct)}) all-time
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wider text-navy-400">
                Welcome back
              </p>
              <p className="mt-1 text-sm font-medium text-navy-100">
                {user.email}
              </p>
            </div>
          </div>

          {/* KPI strip */}
          <div className="relative mt-8 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((k) => (
              <div key={k.label} className="bg-navy-950/40 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${k.bg} ${k.color}`}
                  >
                    <k.icon className="h-5 w-5" />
                  </span>
                  {typeof k.delta === "number" && (
                    <span
                      className={`text-xs font-semibold ${
                        k.up ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {pct(k.delta)}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-xs text-navy-300">{k.label}</p>
                <p className="mt-0.5 text-xl font-bold text-white">{k.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Performance + allocation */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-navy-900">Performance</p>
                <p className="text-xs text-navy-500">Trailing 12 months</p>
              </div>
              <span className="rounded-full bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-500">
                Illustrative
              </span>
            </div>
            <PerformanceChart endValue={marketValue} />
          </Card>

          <Card>
            <p className="text-sm font-semibold text-navy-900">Allocation</p>
            <p className="text-xs text-navy-500">By market value</p>
            <AllocationChart data={allocation} />
          </Card>
        </div>

        {/* Holdings table */}
        <Card className="mt-6">
          <p className="text-sm font-semibold text-navy-900">Holdings</p>
          {holdings.length === 0 ? (
            <p className="mt-4 text-sm text-navy-500">
              No holdings found for your account yet.
            </p>
          ) : (
            <Table className="mt-4">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Symbol</TableHeaderCell>
                  <TableHeaderCell>Account</TableHeaderCell>
                  <TableHeaderCell className="text-right">Qty</TableHeaderCell>
                  <TableHeaderCell className="text-right">Cost</TableHeaderCell>
                  <TableHeaderCell className="text-right">Price</TableHeaderCell>
                  <TableHeaderCell className="text-right">Market Value</TableHeaderCell>
                  <TableHeaderCell className="text-right">Gain / Loss</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {holdings.map((h) => {
                  const mv = h.quantity * h.current_price;
                  const cv = h.quantity * h.cost_basis;
                  const gl = mv - cv;
                  const glp = cv > 0 ? gl / cv : 0;
                  return (
                    <TableRow key={h.id}>
                      <TableCell className="font-semibold text-navy-900">
                        {h.symbol}
                      </TableCell>
                      <TableCell>{h.accounts?.name ?? "—"}</TableCell>
                      <TableCell className="text-right">{h.quantity}</TableCell>
                      <TableCell className="text-right">{usd(h.cost_basis)}</TableCell>
                      <TableCell className="text-right">{usd(h.current_price)}</TableCell>
                      <TableCell className="text-right font-medium">{usd(mv)}</TableCell>
                      <TableCell className="text-right">
                        <BadgeDelta deltaType={gl >= 0 ? "increase" : "decrease"} size="xs">
                          {pct(glp)}
                        </BadgeDelta>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </Card>
      </main>
    </div>
  );
}
