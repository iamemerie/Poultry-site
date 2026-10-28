import InfoPage from "@/app/components/InfoPage";

export default function VaccinationPage() {
  return (
    <InfoPage
      eyebrow="Vaccination"
      title="Vaccination schedules"
      intro="Vaccines protect your flock from common diseases. Always follow the schedule set by your national veterinary service or a licensed vet."
    >
      <section>
        <h2 className="font-heading text-2xl font-bold text-ink">
          Why vaccinate
        </h2>
        {/* PLACEHOLDER: write the reasons, from a veterinary source */}
        <p className="mt-3 text-ink/75">[Content to be added]</p>
      </section>

      <section>
        <h2 className="font-heading text-2xl font-bold text-ink">
          Typical schedule
        </h2>
        {/* PLACEHOLDER: the schedule must come from a vet or your national service */}
        <p className="mt-3 text-ink/75">[Schedule to be added by a vet]</p>
      </section>

      <section className="rounded-2xl border border-brand/30 bg-brand/5 p-6">
        <p className="text-ink">
          Not sure what your animals need? Contact a qualified vet before giving
          any treatment.
        </p>
      </section>
    </InfoPage>
  );
}
