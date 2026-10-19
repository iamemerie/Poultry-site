"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Egg, Menu, Search, User, X } from "lucide-react";
import NavDropdown from "./NavDropdown";
import NavPill from "./NavPill";
import SpeciesPanel from "./SpeciesPanel";
import DiseasesPanel from "./DiseasesPanel";
import AnimatedLogo from "./AnimatedLogo";

// Items listed here get a dropdown panel; every other item is a plain link.
const panels: Record<string, React.ReactNode> = {
  "/species": <SpeciesPanel />,
  "/diseases": <DiseasesPanel />,
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "Species", href: "/species" },
  { label: "Diseases", href: "/diseases" },
  { label: "Vaccination", href: "/vaccination" },
  { label: "Nutrition & Feed", href: "/nutrition-and-feed" },
];

const iconBtn =
  "grid h-10 w-10 place-items-center rounded-full text-ink/70 transition hover:bg-brand/10 hover:text-brand";

// One source of truth for desktop link styling. The highlight itself is the
// sliding NavPill, so a link only needs to change its text colour.
const linkClass = (on: boolean) =>
  `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
    on ? "text-brand" : "text-ink/70"
  }`;

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [hovered, setHovered] = React.useState<string | null>(null);
  const pathname = usePathname();

  // The pill sits on the hovered link, and returns to the current page's link
  // when the mouse leaves the list.
  const highlighted = hovered ?? pathname;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 font-body">
      {/* "relative" matters: the dropdown panels size themselves against this box */}
      <div className="relative mx-auto max-w-6xl">
        <nav
          className={`flex items-center justify-between rounded-full border px-3 py-2 backdrop-blur-xl transition-all duration-300 ${
            scrolled
              ? "border-ink/10 bg-cream/90 shadow-lg shadow-black/10"
              : "border-white/30 bg-cream/60 shadow-md shadow-black/5"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 pl-1">
            <AnimatedLogo />
            <span className="font-logo text-base font-bold tracking-tight text-ink">
              E<span className="text-accent">-</span>Poultry
            </span>
          </Link>

          {/* Desktop links */}
          <ul
            className="hidden items-center gap-1 md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {navItems.map((item) => {
              const on = highlighted === item.href;
              const panel = panels[item.href];

              if (panel) {
                return (
                  <NavDropdown
                    key={item.href}
                    label={item.label}
                    href={item.href}
                    linkClassName={linkClass(on)}
                    highlighted={on}
                    onHover={() => setHovered(item.href)}
                  >
                    {panel}
                  </NavDropdown>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onMouseEnter={() => setHovered(item.href)}
                    onFocus={() => setHovered(item.href)}
                    className={linkClass(on)}
                  >
                    {on && <NavPill />}
                    <span className="relative">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-1">
            <button type="button" aria-label="Search" className={iconBtn}>
              <Search size={19} />
            </button>
            <Link href="/account" aria-label="Account" className={iconBtn}>
              <User size={19} />
            </Link>
            <Link
              href="/order-now"
              className="ml-2 hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-brand-dark md:inline-block"
            >
              Order now
            </Link>

            {/* Hamburger (phones only) */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`${iconBtn} md:hidden`}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div
            id="mobile-menu"
            className="mt-2 rounded-3xl border border-ink/10 bg-cream/95 p-3 shadow-lg backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-2xl px-4 py-3 text-base font-medium ${
                        active ? "bg-brand/10 text-brand" : "text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/order-now"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-full bg-brand px-5 py-3 text-center font-semibold text-cream"
            >
              Order now
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
