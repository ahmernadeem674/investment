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
} from "@tremor/react";
import { createClient } from "@/utils/supabase/server";

// Currency formatter for USD.
const usd = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);

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

  // Belt-and-suspenders: middleware already protects this route, but we
  // re-check here so the page never renders for a logged-out user.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  // RLS guarantees this only returns THIS investor's holdings.
  const { data, error } = await supabase
    .from("holdings")
    .select("id, symbol, quantity, cost_basis, current_price, accounts(name)")
    .order("symbol", { ascending: true });

  const holdings = (data ?? []) as unknown as HoldingRow[];

  // KPI calculations.
  const marketValue = holdings.reduce(
    (sum, h) => sum + h.quantity * h.current_price,
    0,
  );
  const costBasis = holdings.reduce(
    (sum, h) => sum + h.quantity * h.cost_basis,
    0,
  );
  const gainLoss = marketValue - costBasis;
  const gainLossPct = costBasis > 0 ? gainLoss / costBasis : 0;

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Title>Portfolio Dashboard</Title>
            <Text>Signed in as {user.email}</Text>
          </div>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </button>
          </form>
        </div>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-3 text-sm text-red-700">
            Error loading holdings: {error.message}
          </div>
        )}

        {/* KPI cards */}
        <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
          <Card>
            <Text>Total Portfolio Value</Text>
            <Metric>{usd(marketValue)}</Metric>
          </Card>
          <Card>
            <Text>Total Cost Basis</Text>
            <Metric>{usd(costBasis)}</Metric>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <Text>Total Gain / Loss</Text>
              <BadgeDelta
                deltaType={gainLoss >= 0 ? "increase" : "decrease"}
              >
                {pct(gainLossPct)}
              </BadgeDelta>
            </div>
            <Metric>{usd(gainLoss)}</Metric>
          </Card>
        </Grid>

        {/* Holdings table */}
        <Card className="mt-8">
          <Title>Holdings</Title>
          {holdings.length === 0 ? (
            <Text className="mt-4">
              No holdings found for your account yet.
            </Text>
          ) : (
            <Table className="mt-4">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Symbol</TableHeaderCell>
                  <TableHeaderCell>Account</TableHeaderCell>
                  <TableHeaderCell className="text-right">
                    Quantity
                  </TableHeaderCell>
                  <TableHeaderCell className="text-right">
                    Cost Basis
                  </TableHeaderCell>
                  <TableHeaderCell className="text-right">
                    Price
                  </TableHeaderCell>
                  <TableHeaderCell className="text-right">
                    Market Value
                  </TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {holdings.map((h) => (
                  <TableRow key={h.id}>
                    <TableCell className="font-medium">{h.symbol}</TableCell>
                    <TableCell>{h.accounts?.name ?? "—"}</TableCell>
                    <TableCell className="text-right">
                      {h.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {usd(h.cost_basis)}
                    </TableCell>
                    <TableCell className="text-right">
                      {usd(h.current_price)}
                    </TableCell>
                    <TableCell className="text-right">
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
  );
}
