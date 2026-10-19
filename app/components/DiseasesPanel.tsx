"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { animals } from "@/app/data/animals";

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const column: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const linkClass = "text-base text-ink/70 transition hover:text-brand";

export default function DiseasesPanel() {
  return (
    <motion.div
      className="grid gap-8 p-8 sm:grid-cols-3"
      variants={list}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={column}>
        <p className="text-xs text-ink/50">Diseases</p>
        <Link
          href="/diseases"
          className="mt-2 block text-2xl font-semibold text-ink transition hover:text-brand"
        >
          Explore all diseases
        </Link>
        <p className="mt-3 text-sm text-ink/60">
          Learn the signs, causes and prevention. For any sick animal, contact a
          qualified vet.
        </p>
      </motion.div>

      <motion.div variants={column}>
        <p className="text-xs text-ink/50">Diseases by animal</p>
        <ul className="mt-2 space-y-1.5">
          {animals.map((animal) => (
            <li key={animal.slug}>
              <Link href={`/diseases/${animal.slug}`} className={linkClass}>
                {animal.name}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div variants={column}>
        <p className="text-xs text-ink/50">Feed and nutrition</p>
        <ul className="mt-2 space-y-1.5">
          {animals.map((animal) => (
            <li key={animal.slug}>
              <Link
                href={`/species/${animal.slug}#feeds`}
                className={linkClass}
              >
                {animal.name}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
