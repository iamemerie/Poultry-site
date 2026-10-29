import type { ReactNode } from "react";
import AnimatedLogo from "./AnimatedLogo";

export default function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-brand/20 via-cream to-cream px-6 pb-16 pt-40">
      {/* Background layers: they sit behind the card because they come first */}
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1f2a22 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* The card sits above the background layers */}
      <div className="relative w-full max-w-md rounded-3xl border border-ink/10 bg-white p-8 shadow-xl shadow-black/5 md:p-10">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <AnimatedLogo />
            <span className="font-logo text-base font-bold tracking-tight text-ink">
              E<span className="text-accent">-</span>Poultry
            </span>
          </div>
          <h1 className="mt-4 font-heading text-3xl font-extrabold text-ink">
            {title}
          </h1>
          <p className="mt-2 text-sm text-ink/60">{subtitle}</p>
        </div>

        {children}

        <div className="mt-8 border-t border-ink/10 pt-6 text-center text-sm text-ink/70">
          {footer}
        </div>
      </div>
    </main>
  );
}
