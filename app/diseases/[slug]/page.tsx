import { notFound } from "next/navigation";
import InfoPage from "@/app/components/InfoPage";
import { animals } from "@/app/data/animals";
import { diseases } from "@/app/data/diseases";

export function generateStaticParams() {
  return animals.map((animal) => ({ slug: animal.slug }));
}

export default async function DiseaseDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const animal = animals.find((a) => a.slug === slug);
  if (!animal) notFound();

  const list = diseases[slug] ?? [];

  return (
    <InfoPage
      eyebrow="Diseases"
      title={`Common diseases in ${animal.name.toLowerCase()}`}
      intro="The common diseases, the signs to watch for, and how to prevent them. This is general information, not a diagnosis."
    >
      {list.map((disease) => (
        <section
          key={disease.name}
          className="rounded-2xl border border-ink/10 bg-white p-6"
        >
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-heading text-xl font-bold text-ink">
              {disease.name}
            </h2>
            {disease.notifiable && (
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                Notifiable
              </span>
            )}
          </div>
          <p className="mt-3 text-ink/75">
            <span className="font-medium text-ink">Signs: </span>
            {disease.signs}
          </p>
          <p className="mt-2 text-ink/75">
            <span className="font-medium text-ink">Prevention: </span>
            {disease.prevention}
          </p>
        </section>
      ))}

      <section className="rounded-2xl border border-brand/30 bg-brand/5 p-6">
        <p className="text-ink">
          If {animal.name.toLowerCase()} show any of these signs, separate sick
          animals from the rest of the flock. Notifiable diseases must be
          reported to your veterinary authority straight away.
        </p>
      </section>
    </InfoPage>
  );
}
