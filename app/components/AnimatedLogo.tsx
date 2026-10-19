"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// One palette for all three animals: change a colour here and it changes everywhere.
const c = {
  brown: "#a8602a",
  brownDark: "#7d4520",
  red: "#dc2626",
  orange: "#f28c1b",
  eye: "#1f2a22",
  tan: "#b08968",
  tanDark: "#8a6648",
  hoof: "#3b2a1e",
  cream: "#efe4d0",
  horn: "#6b7280",
  pink: "#f4a7b9",
  pinkDark: "#ec8aa3",
};

// Every animal is a <g> in a 64 x 48 box, facing right, standing on y = 44.
// "leg" / "leg-alt" swing in opposite directions, "bob" lifts the body a little.
// The keyframes for these classes live in globals.css.

function Chicken() {
  return (
    <g>
      {/* back leg */}
      <g className="leg">
        <rect x="27" y="35" width="2.4" height="9" rx="1.2" fill={c.orange} />
        <rect x="27" y="41.8" width="6" height="2.2" rx="1.1" fill={c.orange} />
      </g>

      <g className="bob">
        {/* tail */}
        <path d="M18 26 Q4 22 6 9 Q16 13 22 22 Z" fill={c.brownDark} />
        {/* body and wing */}
        <ellipse cx="32" cy="28" rx="15" ry="10.5" fill={c.brown} />
        <ellipse cx="30" cy="29" rx="9" ry="5.5" fill={c.brownDark} />
        {/* neck and head */}
        <polygon points="39,25 43,13 50,17 47,28" fill={c.brown} />
        <circle cx="47" cy="14" r="6" fill={c.brown} />
        {/* comb */}
        <circle cx="44.5" cy="8.5" r="2.3" fill={c.red} />
        <circle cx="47.5" cy="7.5" r="2.3" fill={c.red} />
        <circle cx="50.3" cy="9" r="2.1" fill={c.red} />
        {/* beak, wattle, eye */}
        <polygon points="52,12.5 58,14.8 52,17" fill={c.orange} />
        <ellipse cx="51" cy="19.5" rx="1.6" ry="2.4" fill={c.red} />
        <circle cx="49" cy="13" r="1" fill={c.eye} />
      </g>

      {/* front leg */}
      <g className="leg leg-alt">
        <rect x="36" y="35" width="2.4" height="9" rx="1.2" fill={c.orange} />
        <rect x="36" y="41.8" width="6" height="2.2" rx="1.1" fill={c.orange} />
      </g>
    </g>
  );
}

function Goat() {
  const leg = (x: number) => (
    <>
      <rect x={x} y="32" width="2.4" height="12" rx="1.2" fill={c.tanDark} />
      <rect x={x} y="42" width="2.4" height="2" rx="0.6" fill={c.hoof} />
    </>
  );

  return (
    <g>
      {/* legs, in two diagonal pairs */}
      <g className="leg">{leg(19)}</g>
      <g className="leg">{leg(40)}</g>
      <g className="leg leg-alt">{leg(24)}</g>
      <g className="leg leg-alt">{leg(35)}</g>

      <g className="bob">
        {/* tail */}
        <polygon points="15,22 9,16 18,25" fill={c.tanDark} />
        {/* body */}
        <ellipse cx="30" cy="26" rx="16" ry="8.5" fill={c.tan} />
        {/* neck and head */}
        <polygon points="40,23 45,10 51,12 49,27" fill={c.tan} />
        <ellipse cx="52" cy="14" rx="6.5" ry="4.2" fill={c.tan} />
        {/* horn, ear */}
        <path
          d="M47 9 Q45 2 51 3"
          stroke={c.horn}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse
          cx="47"
          cy="13"
          rx="3.6"
          ry="1.5"
          transform="rotate(-30 47 13)"
          fill={c.tanDark}
        />
        {/* eye, nose, beard */}
        <circle cx="53" cy="13" r="0.9" fill={c.eye} />
        <circle cx="58" cy="14.5" r="1" fill={c.hoof} />
        <polygon points="53,18 55,24 51,19" fill={c.cream} />
      </g>
    </g>
  );
}

function Pig() {
  const leg = (x: number) => (
    <rect x={x} y="37" width="3" height="7" rx="1.2" fill={c.pinkDark} />
  );

  return (
    <g>
      <g className="leg">{leg(20)}</g>
      <g className="leg">{leg(41)}</g>
      <g className="leg leg-alt">{leg(25)}</g>
      <g className="leg leg-alt">{leg(36)}</g>

      <g className="bob">
        {/* curly tail */}
        <path
          d="M15 27 q-5 -2 -3 -6 q2 -3 4 0"
          stroke={c.pinkDark}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* body and head */}
        <ellipse cx="32" cy="29" rx="17" ry="11" fill={c.pink} />
        <circle cx="50" cy="26" r="8.5" fill={c.pink} />
        {/* ear, snout, nostrils, eye */}
        <polygon points="45,19 47,11 52,19" fill={c.pinkDark} />
        <ellipse cx="57" cy="28" rx="4.5" ry="3.5" fill={c.pinkDark} />
        <circle cx="56" cy="28" r="0.8" fill={c.eye} />
        <circle cx="58.3" cy="28" r="0.8" fill={c.eye} />
        <circle cx="51.5" cy="24" r="1.1" fill={c.eye} />
      </g>
    </g>
  );
}

const animals = [Chicken, Goat, Pig];

export default function AnimatedLogo() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // visitors who ask for less motion get the first animal and no swapping
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % animals.length),
      4500,
    );
    return () => clearInterval(id);
  }, []);

  const Animal = animals[index];

  return (
    // decorative: the visible "Green Ranch" text next to it names the link
    <span className="relative block h-10 w-14" aria-hidden="true">
      {/* mode="wait": the old animal leaves before the next one walks in */}
      <AnimatePresence mode="wait">
        <motion.svg
          key={index}
          viewBox="0 0 64 48"
          className="absolute inset-0 h-full w-full"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 8 }}
          transition={{ duration: 0.25 }}
        >
          {/* ground line: its dashes slide left so the animal seems to walk */}
          <line
            x1="6"
            y1="45.5"
            x2="58"
            y2="45.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            className="ground text-ink/30"
          />
          <Animal />
        </motion.svg>
      </AnimatePresence>
    </span>
  );
}
