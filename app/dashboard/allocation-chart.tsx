"use client";

import { DonutChart, Legend } from "@tremor/react";

const usd = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

type Slice = { name: string; value: number };

// Client component: owns the value formatter (a function can't be passed from
// a Server Component to a Client Component, so it lives here).
export function AllocationChart({ data }: { data: Slice[] }) {
  if (data.length === 0) {
    return <p className="mt-6 text-sm text-navy-500">No data to display.</p>;
  }

  return (
    <>
      <DonutChart
        className="mt-6 h-44"
        data={data}
        category="value"
        index="name"
        valueFormatter={usd}
        showAnimation
      />
      <Legend className="mt-6" categories={data.map((d) => d.name)} />
    </>
  );
}
