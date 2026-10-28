import InfoPage from "@/app/components/InfoPage";
import { animals } from "@/app/data/animals";

export default function NutritionPage() {
  return (
    <InfoPage
      eyebrow="Nutrition & Feed"
      title="Feeding your animals"
      intro="Good feed supports growth, health and production. Here is what each animal needs at a general level."
    >
      {animals.map((animal) => (
        <section key={animal.slug} id={animal.slug}>
          <h2 className="font-heading text-2xl font-bold text-ink">
            {animal.name}
          </h2>
          <ul className="mt-4 space-y-3">
            {animal.feeds.map((feed) => (
              <li
                key={feed.name}
                className="rounded-xl border border-ink/10 p-4"
              >
                <p className="font-medium text-ink">{feed.name}</p>
                {feed.stage && (
                  <p className="text-sm text-ink/50">{feed.stage}</p>
                )}
                <p className="mt-1 text-ink/75">{feed.description}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </InfoPage>
  );
}
