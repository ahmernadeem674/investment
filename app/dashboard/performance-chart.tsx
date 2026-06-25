"use client";

import { AreaChart } from "@tremor/react";

const usd = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

const MONTHS = [
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
];

// Illustrative 12-month performance curve that ends at the real current value.
// (Historical performance data isn't stored yet — this is a sample trend.)
const FACTORS = [0.78, 0.8, 0.83, 0.81, 0.86, 0.89, 0.88, 0.92, 0.95, 0.93, 0.97, 1.0];

export function PerformanceChart({ endValue }: { endValue: number }) {
  const data = MONTHS.map((month, i) => ({
    month,
    "Portfolio Value": Math.round(endValue * FACTORS[i]),
  }));

  return (
    <AreaChart
      className="mt-6 h-64"
      data={data}
      index="month"
      categories={["Portfolio Value"]}
      colors={["blue"]}
      valueFormatter={usd}
      showAnimation
      showLegend={false}
      curveType="monotone"
      yAxisWidth={64}
    />
  );
}
