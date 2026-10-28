"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import NavPill from "./NavPill";

// A nav link that opens a panel under the bar.
// It handles opening and closing; the panel content is passed in as children.
export default function NavDropdown({
  label,
  href,
  linkClassName,
  highlighted,
  onHover,
  children,
}: {
  label: string;
  href: string;
  linkClassName: string;
  highlighted: boolean; // is the sliding pill currently on this link?
  onHover: () => void; // tell the Navbar the pill should move here
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Open immediately, but close after a short delay so the menu forgives a
  // mouse that wobbles across the gap between the link and the panel.
  const openNow = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
    onHover();
  };
  const closeSoon = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    // No "relative" here on purpose: the panel positions itself against the
    // nearest positioned ancestor, which should be the wrapper around the bar.
    <li
      ref={ref}
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <Link
        href={href}
        aria-haspopup="true"
        aria-expanded={open}
        onFocus={openNow}
        onClick={() => setOpen(false)}
        className={`inline-flex items-center gap-1 ${linkClassName}`}
      >
        {highlighted && <NavPill />}
        <span className="relative">{label}</span>
        <ChevronDown
          size={14}
          className={`relative transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </Link>

      {/* AnimatePresence keeps the panel mounted long enough to play its exit */}
      <AnimatePresence>
        {open && (
          // -mt-3 pulls this invisible wrapper up over the empty strip inside
          // the pill, and pt-7 keeps the visible gap. It is a child of the
          // <li>, so the hover area is continuous from link to panel.
          <motion.div
            key="panel"
            className="absolute inset-x-0 top-full z-50 -mt-3 pt-7"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(e) => {
              // close when any link inside the panel is clicked (bubbling)
              if ((e.target as HTMLElement).closest("a")) setOpen(false);
            }}
          >
            <div className="rounded-3xl border border-ink/10 bg-cream text-ink shadow-2xl">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
