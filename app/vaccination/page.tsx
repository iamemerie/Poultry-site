import InfoPage from "@/app/components/InfoPage";

export default function VaccinationPage() {
  return (
    <InfoPage
      eyebrow="Vaccination"
      title="Protecting your animals"
      intro="Vaccines help protect animals from serious diseases. Which vaccines your animals need, and when, depends on the species, its age and the diseases common where you are. Your vet or national veterinary service sets the schedule."
    >
      <section>
        <h2 className="font-heading text-2xl font-bold text-ink">
          Why vaccinate
        </h2>
        <p className="mt-3 text-ink/75">
          A healthy animal is less likely to fall ill, and a healthy flock grows
          faster and produces more. Vaccination also protects the rest of the
          flock, because fewer animals carry the disease.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-2xl font-bold text-ink">
          Good practice
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink/75">
          <li>Buy vaccines only from licensed suppliers.</li>
          <li>
            Store them at the temperature the label states, and keep them out of
            sunlight.
          </li>
          <li>Vaccinate only animals that look healthy on the day.</li>
          <li>
            Keep a written record of each vaccine: the date, the product, the
            batch number and who gave it.
          </li>
          <li>
            Ask a vet to set the schedule for your flock, and review it each
            year.
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-brand/30 bg-brand/5 p-6">
        <p className="text-ink">
          Some diseases are covered by government vaccination rules. Check with
          your veterinary authority which apply to you. If an animal looks
          unwell, contact a qualified vet straight away.
        </p>
      </section>
    </InfoPage>
  );
}
