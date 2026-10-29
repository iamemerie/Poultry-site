import Link from "next/link";
import { animals } from "@/app/data/animals";

export default function SpeciesIndex() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-40">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand">
        Species
      </p>
      <h1 className="mt-2 font-heading text-5xl font-extrabold text-ink">
        What we raise
      </h1>

      <ul className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
        {animals.map((animal, i) => (
          <li key={animal.slug}>
            <Link
              href={`/species/${animal.slug}`}
              className="group grid gap-4 py-8 md:grid-cols-[4rem_1fr_auto] md:items-baseline md:gap-8"
            >
              <span className="font-heading text-sm text-ink/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-heading text-3xl font-extrabold text-ink transition group-hover:text-brand md:text-4xl">
                  {animal.name}
                </h2>
                <p className="mt-2 line-clamp-2 max-w-2xl text-ink/70">
                  {animal.blurb}
                </p>
              </div>
              <span className="text-sm font-medium text-brand">
                {animal.offers.length} products →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
