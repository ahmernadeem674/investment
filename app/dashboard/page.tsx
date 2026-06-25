import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Card,
  Grid,
  Metric,
  Text,
  Title,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  BadgeDelta,
  DonutChart,
  Legend,
} from "@tremor/react";
import { LogOut } from "lucide-react";
import { site } from "@/lib/site";
import { createClient } from "@/utils/supabase/server";

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

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <header className="border-b border-navy-100 bg-white">
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

      <main className="container-page py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-navy-900">
            Portfolio Dashboard
          </h1>
          <p className="mt-1 text-sm text-navy-500">
            A real-time view of your holdings and performance.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-3 text-sm text-red-700">
            Error loading holdings: {error.message}
          </div>
        )}

        {/* KPI cards */}
        <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
          <Card decoration="top" decorationColor="blue">
            <Text>Total Portfolio Value</Text>
            <Metric className="mt-2">{usd(marketValue)}</Metric>
          </Card>
          <Card decoration="top" decorationColor="slate">
            <Text>Total Cost Basis</Text>
            <Metric className="mt-2">{usd(costBasis)}</Metric>
          </Card>
          <Card decoration="top" decorationColor={gainLoss >= 0 ? "emerald" : "red"}>
            <div className="flex items-center justify-between">
              <Text>Total Gain / Loss</Text>
              <BadgeDelta deltaType={gainLoss >= 0 ? "increase" : "decrease"}>
                {pct(gainLossPct)}
              </BadgeDelta>
            </div>
            <Metric className="mt-2">{usd(gainLoss)}</Metric>
          </Card>
          <Card decoration="top" decorationColor="amber">
            <Text>Holdings</Text>
            <Metric className="mt-2">{holdings.length}</Metric>
          </Card>
        </Grid>

        {/* Allocation + table */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card>
            <Title>Allocation</Title>
            <Text className="mt-1">By market value</Text>
            {allocation.length === 0 ? (
              <Text className="mt-6">No data to display.</Text>
            ) : (
              <>
                <DonutChart
                  className="mt-6 h-44"
                  data={allocation}
                  category="value"
                  index="name"
                  valueFormatter={usd}
                  showAnimation
                />
                <Legend
                  className="mt-6"
                  categories={allocation.map((a) => a.name)}
                />
              </>
            )}
          </Card>

          <Card className="lg:col-span-2">
            <Title>Holdings</Title>
            {holdings.length === 0 ? (
              <Text className="mt-4">No holdings found for your account yet.</Text>
            ) : (
              <Table className="mt-4">
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Symbol</TableHeaderCell>
                    <TableHeaderCell>Account</TableHeaderCell>
                    <TableHeaderCell className="text-right">Qty</TableHeaderCell>
                    <TableHeaderCell className="text-right">Cost</TableHeaderCell>
                    <TableHeaderCell className="text-right">Price</TableHeaderCell>
                    <TableHeaderCell className="text-right">
                      Market Value
                    </TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {holdings.map((h) => (
                    <TableRow key={h.id}>
                      <TableCell className="font-medium text-navy-900">
                        {h.symbol}
                      </TableCell>
                      <TableCell>{h.accounts?.name ?? "—"}</TableCell>
                      <TableCell className="text-right">{h.quantity}</TableCell>
                      <TableCell className="text-right">
                        {usd(h.cost_basis)}
                      </TableCell>
                      <TableCell className="text-right">
                        {usd(h.current_price)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {usd(h.quantity * h.current_price)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
