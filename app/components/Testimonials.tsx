"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Aliyu Ibrahim",
    role: "Commercial Poultry Farmer",
    content:
      "E-Poultry's vaccination schedules and reliable livestock delivery completely transformed our farm's mortality rate. Exceptional quality!",
    rating: 5,
  },
  {
    name: "Grace Okafor",
    role: "Organic Egg Producer",
    content:
      "The layer species and feed formulations we source here have noticeably boosted our daily egg yields. Truly professional service.",
    rating: 5,
  },
  {
    name: "Marcus Vance",
    role: "Regular Customer",
    content:
      "The freshest free-range turkey and chicken meat we've ever ordered. The ordering process and prompt delivery are top-notch.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-cream py-20 font-body">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-brand">
            Trusted by Farmers & Families
          </p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-ink md:text-4xl">
            What our clients say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col justify-between rounded-3xl border border-ink/10 bg-white p-8 shadow-sm transition hover:shadow-md"
            >
              <div>
                <div className="flex gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-ink/75 leading-relaxed">
                  "{t.content}"
                </p>
              </div>

              <div className="mt-6 border-t border-ink/10 pt-4">
                <p className="font-heading text-sm font-bold text-ink">
                  {t.name}
                </p>
                <p className="text-xs text-ink/60">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
