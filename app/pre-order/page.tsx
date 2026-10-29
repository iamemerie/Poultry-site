"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const ANIMALS = [
  { value: "CHICKEN", label: "Chicken" },
  { value: "TURKEY", label: "Turkey" },
  { value: "GOAT", label: "Goat" },
  { value: "SHEEP", label: "Sheep" },
  { value: "SWINE", label: "Swine" },
  { value: "CATTLE", label: "Cattle" },
];

const PRODUCTS = [
  { value: "EGGS", label: "Eggs" },
  { value: "MEAT", label: "Meat" },
  { value: "LIVE_ANIMAL", label: "Live animal" },
  { value: "BREEDING_STOCK", label: "Breeding stock" },
  { value: "MILK", label: "Milk" },
];

const fieldClass =
  "mt-2 w-full rounded-xl border border-ink/15 bg-cream/40 px-4 py-3 text-ink outline-none transition placeholder:text-ink/35 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10";

const labelClass = "block text-sm font-medium text-ink";

function PreOrderForm() {
  // Read the animal and product from the link, e.g. /pre-order?animal=CHICKEN&product=EGGS.
  // Anything not in the lists falls back to the defaults.
  const params = useSearchParams();
  const animalParam = params.get("animal") ?? "";
  const productParam = params.get("product") ?? "";
  const initialAnimal = ANIMALS.some((a) => a.value === animalParam)
    ? animalParam
    : "CHICKEN";
  const initialProduct = PRODUCTS.some((p) => p.value === productParam)
    ? productParam
    : "EGGS";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    deliveryArea: "",
    quantity: "1",
    animal: initialAnimal,
    product: initialProduct,
  });
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(
    null,
  );

  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        const query = window.location.search;
        router.replace(`/login?next=${encodeURIComponent(pathname + query)}`);
      } else {
        setChecking(false);
      }
    });
  }, [router, pathname]);

  if (checking) return null;

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const animalLabel = ANIMALS.find((a) => a.value === form.animal)?.label;
  const productLabel = PRODUCTS.find((p) => p.value === form.product)?.label;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setMessage(null);

    try {
      const response = await fetch("/api/pre-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity),
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage({
          text: "Pre-order received. We'll contact you to confirm.",
          ok: true,
        });
        setForm((prev) => ({ ...prev, quantity: "1" }));
      } else {
        setMessage({ text: data.error ?? "Something went wrong.", ok: false });
      }
    } catch {
      setMessage({ text: "Network error. Please try again.", ok: false });
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-40">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">
          Pre-order
        </p>
        <h1 className="mt-2 font-heading text-4xl font-extrabold text-ink md:text-5xl">
          Reserve your order
        </h1>
        <p className="mt-3 max-w-xl text-ink/70">
          Tell us what you need. We&apos;ll call or message you to confirm.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_340px]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-ink/10 bg-white p-6 shadow-xl shadow-black/5 md:p-10"
        >
          <fieldset className="space-y-5">
            <legend className="mb-2 font-heading text-lg font-bold text-ink">
              Your details
            </legend>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full name
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone or WhatsApp
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="deliveryArea" className={labelClass}>
                  Delivery area
                </label>
                <input
                  id="deliveryArea"
                  required
                  value={form.deliveryArea}
                  onChange={(e) => update("deliveryArea", e.target.value)}
                  className={fieldClass}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="mt-10 space-y-5 border-t border-ink/10 pt-8">
            <legend className="mb-2 font-heading text-lg font-bold text-ink">
              Your order
            </legend>

            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <label htmlFor="animal" className={labelClass}>
                  Animal
                </label>
                <select
                  id="animal"
                  value={form.animal}
                  onChange={(e) => update("animal", e.target.value)}
                  className={fieldClass}
                >
                  {ANIMALS.map((a) => (
                    <option key={a.value} value={a.value}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="product" className={labelClass}>
                  Product
                </label>
                <select
                  id="product"
                  value={form.product}
                  onChange={(e) => update("product", e.target.value)}
                  className={fieldClass}
                >
                  {PRODUCTS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="quantity" className={labelClass}>
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  min={1}
                  max={500}
                  required
                  value={form.quantity}
                  onChange={(e) => update("quantity", e.target.value)}
                  className={fieldClass}
                />
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={sending}
            className="mt-10 w-full rounded-full bg-brand px-6 py-4 font-semibold text-cream transition hover:bg-brand-dark disabled:opacity-60"
          >
            {sending ? "Sending..." : "Place pre-order"}
          </button>

          {message && (
            <p
              role="status"
              className={`mt-6 rounded-xl px-4 py-3 text-center text-sm ${
                message.ok ? "bg-brand/10 text-brand" : "bg-red-50 text-red-600"
              }`}
            >
              {message.text}
            </p>
          )}
        </form>

        <aside className="h-fit rounded-3xl bg-brand p-6 text-cream shadow-xl shadow-brand/20 md:sticky md:top-32 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-cream/60">
            Your reservation
          </p>
          <h2 className="mt-3 font-heading text-2xl font-extrabold">
            {form.quantity || "0"} × {productLabel}
          </h2>
          <p className="mt-1 text-cream/80">from {animalLabel}</p>

          <dl className="mt-8 space-y-4 border-t border-cream/20 pt-6 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-cream/70">Animal</dt>
              <dd className="font-medium">{animalLabel}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-cream/70">Product</dt>
              <dd className="font-medium">{productLabel}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-cream/70">Quantity</dt>
              <dd className="font-medium">{form.quantity || "0"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-cream/70">Status</dt>
              <dd className="font-medium">Pending confirmation</dd>
            </div>
          </dl>

          <p className="mt-8 text-xs leading-relaxed text-cream/70">
            Pricing is confirmed by phone or WhatsApp before any payment.
          </p>
        </aside>
      </div>
    </main>
  );
}

// useSearchParams needs a Suspense boundary, or the build fails.
export default function PreOrderPage() {
  return (
    <Suspense fallback={null}>
      <PreOrderForm />
    </Suspense>
  );
}
