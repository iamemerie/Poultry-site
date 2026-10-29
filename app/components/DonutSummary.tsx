"use client";

import { useEffect, useState } from "react";
import { animate } from "motion/react";

const R = 56;
const C = 2 * Math.PI * R; // circumference of the ring

// Counts from 0 up to the value, once, when the page loads.
function CountUp({ value }: { value: number }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [value]);

  return <>{n}</>;
}

export default function DonutSummary({
  available,
  low,
  out,
}: {
  available: number;
  low: number;
  out: number;
}) {
  const total = available + low + out;

  // The ring starts empty, then grows to its real size after the first paint.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const segments = [
    {
      label: "Available",
      value: available,
      color: "stroke-brand",
      swatch: "bg-brand",
    },
    { label: "Low", value: low, color: "stroke-accent", swatch: "bg-accent" },
    {
      label: "Out of stock",
      value: out,
      color: "stroke-red-600",
      swatch: "bg-red-600",
    },
  ];

  // Work out where each segment starts and how long it is.
  let offset = 0;
  const arcs = segments.map((seg) => {
    const len = total ? (seg.value / total) * C : 0;
    const arc = { ...seg, len, offset };
    offset += len;
    return arc;
  });

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative h-56 w-56">
        <svg viewBox="0 0 140 140" className="-rotate-90 h-full w-full">
          {/* Track behind the segments */}
          <circle
            cx="70"
            cy="70"
            r={R}
            fill="none"
            strokeWidth="14"
            className="stroke-cream"
          />
          {arcs.map((a) => (
            <circle
              key={a.label}
              cx="70"
              cy="70"
              r={R}
              fill="none"
              strokeWidth="14"
              className={a.color}
              strokeDasharray={`${ready ? a.len : 0} ${C}`}
              strokeDashoffset={-a.offset}
              style={{ transition: "stroke-dasharray 1s ease-out" }}
            />
          ))}
        </svg>

        <div className="absolute inset-0 grid place-items-center">
          <div>
            <p className="font-heading text-4xl font-extrabold text-ink">
              <CountUp value={total} />
            </p>
            <p className="text-xs uppercase tracking-widest text-ink/60">
              Products
            </p>
          </div>
        </div>
      </div>

      <ul className="mt-8 flex flex-wrap justify-center gap-6">
        {segments.map((seg) => (
          <li
            key={seg.label}
            className="flex items-center gap-2 text-sm text-ink/80"
          >
            <span className={`h-3 w-3 rounded-full ${seg.swatch}`} />
            {seg.label}
            <span className="font-semibold text-ink">
              <CountUp value={seg.value} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
