import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

function label(value: string) {
  const text = value.toLowerCase().replace(/_/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function status(available: number) {
  if (available === 0)
    return { text: "Out of stock", style: "bg-red-100 text-red-700" };
  if (available < 10)
    return { text: "Low", style: "bg-accent/20 text-accent-dark" };
  return { text: "Available", style: "bg-brand/10 text-brand" };
}

// The part that needs fresh data. It loads inside Suspense,
// so the page heading can prerender without waiting for the database.
async function ProductList() {
  await connection();

  const [stock, demand] = await Promise.all([
    prisma.productStock.findMany({
      orderBy: [{ animal: "asc" }, { product: "asc" }],
    }),
    prisma.preOrder.groupBy({
      by: ["animal", "product"],
      _sum: { quantity: true },
    }),
  ]);

  const ordered = new Map(
    demand.map((d) => [`${d.animal}-${d.product}`, d._sum.quantity ?? 0]),
  );

  const rows = stock.map((s) => {
    const key = `${s.animal}-${s.product}`;
    return {
      key,
      animal: s.animal,
      product: s.product,
      name: `${label(s.animal)}, ${label(s.product)}`,
      available: s.available,
      ordered: ordered.get(key) ?? 0,
    };
  });

  const maxOrdered = Math.max(1, ...rows.map((r) => r.ordered));

  if (rows.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-ink/20 p-8 text-center text-ink/60">
        No products are listed yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {rows.map((row) => {
        const s = status(row.available);
        const isTop = row.ordered > 0 && row.ordered === maxOrdered;
        const width = `${(row.ordered / maxOrdered) * 100}%`;

        return (
          <div
            key={row.key}
            className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <h2 className="font-heading text-lg font-bold text-ink">
                  {row.name}
                </h2>
                {isTop && (
                  <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-dark">
                    Most requested
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${s.style}`}
                >
                  {s.text}
                </span>
                {row.available === 0 ? (
                  <Link
                    href="/waiting-list"
                    className="rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand hover:text-cream"
                  >
                    Join the waiting list
                  </Link>
                ) : (
                  <Link
                    href={`/pre-order?animal=${row.animal}&product=${row.product}`}
                    className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-cream transition hover:bg-brand-dark"
                  >
                    Order
                  </Link>
                )}
              </div>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="flex justify-between text-xs text-ink/60">
                  <span>Requested</span>
                  <span>{row.ordered}</span>
                </div>
                <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-cream">
                  <div
                    className="h-full rounded-full bg-brand transition-all duration-700"
                    style={{ width }}
                  />
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-ink/60">Available</p>
                <p className="font-heading text-2xl font-extrabold text-ink">
                  {row.available}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-32 animate-pulse rounded-2xl border border-ink/10 bg-white"
        />
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-40">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand">
        Products
      </p>
      <h1 className="mt-2 font-heading text-4xl font-extrabold text-ink md:text-5xl">
        What is in stock
      </h1>
      <p className="mt-3 text-ink/70">
        Demand is the total quantity pre-ordered. Stock is what we have ready.
      </p>

      <div className="mt-10">
        <Suspense fallback={<ListSkeleton />}>
          <ProductList />
        </Suspense>
      </div>
    </main>
  );
}
