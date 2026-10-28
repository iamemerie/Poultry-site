"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" border-t border-cream/10 bg-ink text-cream font-body">
      <div className="mx-auto max-x-6xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/*Brand Column*/}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-logo text-xl font-bold tracking-tight text-cream">
                E<span className="text-accent">-</span>Poultry
              </span>
            </Link>
            <p className="mt-4 text-sm text-cream/70 leading-relaxed">
              Your trusted platform for healthy livestock, fresh organic meats,
              eggs, and professional farm management resources.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-base font-bold text-cream">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-cream/70">
              <li>
                <Link href="/" className="transition hover:text-brand">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/species" className="transition hover:text-brand">
                  Species & Prices
                </Link>
              </li>
              <li>
                <Link href="/diseases" className="transition hover:text-brand">
                  Disease Management
                </Link>
              </li>
              <li>
                <Link
                  href="/vaccination"
                  className="transition hover:text-brand"
                >
                  Vaccination Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/nutrition-and-feed"
                  className="transition hover:text-brand"
                >
                  Nutrition & Feed
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-base font-bold text-cream">
              Get in Touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-cream/70">
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-brand shrink-0" />
                <span>Abuja, Nigeria</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-brand shrink-0" />
                <span>+234 800 000 0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-brand shrink-0" />
                <span>support@epoultry.com</span>
              </li>
            </ul>
          </div>
          {/* Newsletter / Updates */}
          <div>
            <h4 className="font-heading text-base font-bold text-cream">
              Stay Updated
            </h4>
            <p className="mt-4 text-sm text-cream/70">
              Subscribe to get expert farming tips, price updates, and
              vaccination reminders.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-full border border-cream bg-white/90 px-4 py-2.5 text-sm text-brand outline-none transition focus:border-brand"
              />
              <button
                type="submit"
                className="rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-cream/10 pt-8 text-xs text-cream/60 md:flex-row">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} E-Poultry. All rights reserved.
          </p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <Link href="/privacy" className="transition hover:text-brand">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-brand">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
