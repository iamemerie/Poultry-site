"use client";

import { useState } from "react";
import { Clock, CheckCircle2 } from "lucide-react";
import { joinWaitingList } from "@/app/actions/preorder";

export default function PreorderSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      species: formData.get("species") as string,
      quantity: Number(formData.get("quantity")),
    };

    const res = await joinWaitingList(data);
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setError(res.error || "Something went wrong.");
    }
  }

  return (
    <section className="bg-cream py-20 font-body">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-3xl border border-ink/10 bg-white p-8 shadow-xl md:p-12">
          <div className="text-center max-w-xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-semibold text-brand">
              <Clock size={14} /> Batch Preorders Open
            </span>
            <h2 className="mt-4 font-heading text-3xl font-extrabold text-ink md:text-4xl">
              Join the Next Hatch & Livestock Waiting List
            </h2>
            <p className="mt-2 text-sm text-ink/70">
              Secure your allocation for upcoming batches of healthy day-old
              chicks, turkeys, layers, and meat livestock before they sell out.
            </p>
          </div>

          {submitted ? (
            <div className="mt-8 rounded-2xl bg-brand/10 p-8 text-center text-brand">
              <CheckCircle2 size={36} className="mx-auto mb-3" />
              <h3 className="font-heading text-lg font-bold">
                You're on the waiting list!
              </h3>
              <p className="mt-1 text-sm text-ink/75">
                We’ve received your preorder request. Our team will contact you
                via email or phone with batch delivery timelines.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2"
            >
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-1.5">
                  Full Name
                </label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Dr. Aliyu Ibrahim"
                  className="w-full rounded-full border border-ink/15 bg-cream/50 px-4 py-3 text-sm text-ink outline-none transition focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-1.5">
                  Email Address
                </label>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="aliyu@example.com"
                  className="w-full rounded-full border border-ink/15 bg-cream/50 px-4 py-3 text-sm text-ink outline-none transition focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-1.5">
                  Phone Number
                </label>
                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  className="w-full rounded-full border border-ink/15 bg-cream/50 px-4 py-3 text-sm text-ink outline-none transition focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-1.5">
                  Select Species / Batch
                </label>
                <select
                  required
                  name="species"
                  className="w-full rounded-full border border-ink/15 bg-cream/50 px-4 py-3 text-sm text-ink outline-none transition focus:border-brand"
                >
                  <option value="">Select livestock type...</option>
                  <option value="Broilers">Broilers</option>
                  <option value="Layers">Layers</option>
                  <option value="Cockerels">Cockerels</option>
                  <option value="Turkeys">Turkeys</option>
                  <option value="Sheep">Sheep</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink/70 mb-1.5">
                  Estimated Quantity / Heads
                </label>
                <input
                  required
                  name="quantity"
                  type="number"
                  min={1}
                  placeholder="e.g. 50"
                  className="w-full rounded-full border border-ink/15 bg-cream/50 px-4 py-3 text-sm text-ink outline-none transition focus:border-brand"
                />
              </div>

              {error && (
                <div className="md:col-span-2 text-red-600 text-xs text-center font-medium">
                  {error}
                </div>
              )}

              <div className="md:col-span-2 mt-2">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full rounded-full bg-brand py-4 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Secure My Spot on Waiting List"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
