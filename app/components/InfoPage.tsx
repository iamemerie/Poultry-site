import type { ReactNode } from "react";

// A simple reusable layout for education pages.
export default function InfoPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-40">
      <p className="font-body text-sm font-semibold uppercase tracking-widest text-brand">
        {eyebrow}
      </p>
      <h1 className="mt-2 font-heading text-4xl font-extrabold text-ink md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-lg text-ink/75">{intro}</p>
      <div className="mt-10 space-y-10">{children}</div>
    </main>
  );
}
