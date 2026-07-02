import { redirect } from "next/navigation";
import {
  Card,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  BadgeDelta,
} from "@tremor/react";
import {
  Wallet,
  Receipt,
  TrendingUp,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { isAdmin } from "@/lib/auth";
import { PortalHeader } from "@/components/portal/portal-header";
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

  const admin = isAdmin(user.email);

  const kpis = [
    { label: "Total Portfolio Value", value: usd(marketValue), icon: Wallet },
    { label: "Total Cost Basis", value: usd(costBasis), icon: Receipt },
    { label: "Total Gain / Loss", value: usd(gainLoss), icon: TrendingUp, delta: gainLossPct, up: gainLoss >= 0 },
    { label: "Holdings", value: String(holdings.length), icon: Layers },
  ];

  return (
    <div className="dark min-h-screen bg-ink text-gray-200">
      <PortalHeader email={user.email ?? ""} isAdmin={admin} active="dashboard" />

      <main className="container-page py-8">
        {error && (
          <div className="mb-6 rounded-sm border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-400">
            Error loading holdings: {error.message}
          </div>
        )}

        {/* Gold-framed hero */}
        <section className="relative overflow-hidden rounded-2xl border border-gold-600/40 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-8 shadow-2xl sm:p-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(50% 70% at 90% 0%, rgba(205,160,73,0.30) 0%, rgba(8,20,38,0) 60%), radial-gradient(50% 70% at 0% 100%, rgba(205,160,73,0.15) 0%, rgba(8,20,38,0) 60%)",
            }}
          />
          <div className="relative flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-400">
                Total Portfolio Value
              </p>
              <p className="mt-2 font-serif text-4xl font-black text-white sm:text-5xl">
                {usd(marketValue)}
              </p>
              <p
                className={`mt-3 inline-flex items-center gap-1.5 text-sm font-medium ${
                  gainLoss >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {gainLoss >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {usd(gainLoss)} ({pct(gainLossPct)}) all-time
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-gray-500">Welcome back</p>
              <p className="mt-1 text-sm font-medium text-gray-200">{user.email}</p>
            </div>
          </div>

          {/* KPI strip */}
          <div className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-lg border border-gold-700/30 bg-ink/40 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm bg-gold-400/10 text-gold-400">
                    <k.icon className="h-5 w-5" />
                  </span>
                  {typeof k.delta === "number" && (
                    <span className={`font-mono text-xs font-semibold ${k.up ? "text-emerald-400" : "text-red-400"}`}>
                      {pct(k.delta)}
                    </span>
                  )}
                </div>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.08em] text-gray-400">{k.label}</p>
                <p className="mt-0.5 text-xl font-bold text-white">{k.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Performance + allocation */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="border-gold-700/30 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Performance</p>
                <p className="font-mono text-[11px] text-gray-400">Trailing 12 months</p>
              </div>
              <span className="rounded-full border border-gold-700/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-gold-300">
                Illustrative
              </span>
            </div>
            <PerformanceChart endValue={marketValue} />
          </Card>

          <Card className="border-gold-700/30">
            <p className="text-sm font-semibold text-white">Allocation</p>
            <p className="font-mono text-[11px] text-gray-400">By market value</p>
            <AllocationChart data={allocation} />
          </Card>
        </div>

        {/* Holdings */}
        <Card className="mt-6 border-gold-700/30">
          <p className="text-sm font-semibold text-white">Holdings</p>
          {holdings.length === 0 ? (
            <p className="mt-4 text-sm text-gray-400">No holdings found for your account yet.</p>
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
                      <TableCell className="font-semibold text-gold-400">{h.symbol}</TableCell>
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
