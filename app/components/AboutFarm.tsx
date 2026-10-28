import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function AboutFarm() {
  return (
    <section className="bg-cream py-20 font-body">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* Text Side */}
          <div>
            <p className="font-body text-sm font-semibold uppercase tracking-widest text-brand">
              About Our Farm
            </p>
            <h2 className="mt-2 font-heading text-3xl font-extrabold text-ink md:text-4xl">
              Raised with care, rooted in sustainable agriculture.
            </h2>
            <p className="mt-4 text-ink/75 leading-relaxed">
              Set across lush green pastures, our farm is dedicated to
              high-welfare livestock rearing. We combine traditional farming
              ethics with modern veterinary science to ensure every bird and
              animal grows healthy, active, and completely natural.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "100% Free-range and spacious grazing environments",
                "Strict veterinary health inspections & biosecurity protocols",
                "Natural, premium organic feed with zero harmful additives",
                "Sustainable practices that protect local soil and biodiversity",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-sm font-medium text-ink"
                >
                  <CheckCircle2 size={18} className="text-brand shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image Side */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/ee.jpg"
              alt="E-Poultry farm green pastures and livestock"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
