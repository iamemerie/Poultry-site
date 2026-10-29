import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import DonutSummary from "./DonutSummary";

export default async function StockSummary() {
  await connection();

  const stock = await prisma.productStock.findMany({
    select: { available: true },
  });

  const counts = { available: 0, low: 0, out: 0 };
  for (const s of stock) {
    if (s.available === 0) counts.out++;
    else if (s.available < 10) counts.low++;
    else counts.available++;
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <DonutSummary
        available={counts.available}
        low={counts.low}
        out={counts.out}
      />

      <div className="mt-10 flex justify-center">
        <Link
          href="/products"
          className="rounded-full bg-brand px-6 py-3 font-semibold text-cream transition hover:bg-brand-dark"
        >
          See what&apos;s in stock
        </Link>
      </div>
    </section>
  );
}
