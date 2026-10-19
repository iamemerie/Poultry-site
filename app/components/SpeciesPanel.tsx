"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { animals } from "@/app/data/animals";

// The parent only staggers; each card animates itself.
const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export default function SpeciesPanel() {
  return (
    <div className="p-6">
      <p className="text-xs text-ink/50">Explore species</p>
      <motion.div
        className="mt-3 grid grid-cols-5 gap-4"
        variants={list}
        initial="hidden"
        animate="show"
      >
        {animals.map((animal) => (
          <motion.div key={animal.slug} variants={card}>
            <Link
              href={`/species/${animal.slug}`}
              className="group block rounded-2xl p-2 transition hover:bg-brand/10"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={animal.image}
                  alt=""
                  fill
                  sizes="200px"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <p className="mt-2 text-center text-sm font-medium text-ink">
                {animal.name}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
