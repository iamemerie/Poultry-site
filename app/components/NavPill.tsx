"use client";

import { motion } from "motion/react";

// The single highlight pill. Every nav link renders this when it is the
// highlighted one; because they all share the same layoutId, Motion animates
// the pill gliding from one link to the next instead of re-drawing it.
export default function NavPill() {
  return (
    <motion.span
      layoutId="nav-pill"
      className="absolute inset-0 rounded-full bg-brand/10"
      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
    />
  );
}
