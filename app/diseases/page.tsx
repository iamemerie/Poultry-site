import Link from "next/link";
import InfoPage from "@/app/components/InfoPage";
import { animals } from "@/app/data/animals";

export default function DiseasesIndex() {
  return (
    <InfoPage
      eyebrow="Diseases"
      title="Animal health"
      intro="Learn the common signs, causes and prevention for each animal. For any sick animal, contact a qualified vet."
    >
      <section>
        <h2 className="font-heading text-2xl font-bold text-ink">
          Choose an animal
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {animals.map((animal) => (
            <li key={animal.slug}>
              <Link
                href={`/diseases/${animal.slug}`}
                className="block rounded-2xl border border-ink/10 bg-white p-5 font-medium text-ink transition hover:border-brand hover:text-brand"
              >
                {animal.name} →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-brand/30 bg-brand/5 p-6">
        <p className="text-ink">
          This information is for general awareness. It does not replace a
          diagnosis or treatment from a qualified vet.
        </p>
      </section>
    </InfoPage>
  );
}
