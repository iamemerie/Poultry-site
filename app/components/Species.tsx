import Image from "next/image";
import Link from "next/link";
import { animals } from "@/app/data/animals";
import Reveal from "./Reveal";

export default function Species() {
  return (
    <section id="animals" className="bg-cream">
      {/* Section heading */}
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-20">
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-brand">
          Our animals
        </p>
        <h2 className="mt-2 font-heading text-4xl font-extrabold text-ink md:text-5xl">
          Meet what we raise
        </h2>
      </div>

      {animals.map((animal, i) => {
        const dark = false; // the rooster opens the section on a dark band
        const flip = i % 2 === 1; // every second row puts the image on the right

        return (
          <article
            key={animal.slug}
            className={dark ? "bg-black text-white" : "text-ink"}
          >
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
              {/* Image */}
              <Reveal className={flip ? "md:order-2" : ""}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                  <Image
                    src={animal.image}
                    alt={animal.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>

              {/* Text */}
              <Reveal>
                <h3 className="font-heading text-3xl font-extrabold md:text-4xl">
                  {animal.name}
                </h3>
                <p
                  className={`mt-4 text-base leading-relaxed ${
                    dark ? "text-white/80" : "text-ink/75"
                  }`}
                >
                  {animal.blurb}
                </p>

                <ul
                  className={`mt-6 divide-y ${
                    dark ? "divide-white/15" : "divide-ink/10"
                  }`}
                >
                  {animal.offers.map((offer) => (
                    <li
                      key={offer.name}
                      className="flex items-baseline justify-between gap-4 py-3"
                    >
                      <span className="font-medium">{offer.name}</span>
                      <span className={dark ? "text-white/70" : "text-ink/70"}>
                        {offer.price}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/species/${animal.slug}`}
                  className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
                >
                  Learn more about {animal.name.toLowerCase()}
                </Link>
              </Reveal>
            </div>
          </article>
        );
      })}
    </section>
  );
}
