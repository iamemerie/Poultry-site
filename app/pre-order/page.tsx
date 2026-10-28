"use client";

import { useState } from "react";

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
  "mt-1 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink outline-none focus:border-brand";

export default function PreOrderPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    deliveryArea: "",
    quantity: "1",
    animal: "CHICKEN",
    product: "EGGS",
  });
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(
    null,
  );

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

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
    <main className="mx-auto max-w-md px-6 pb-20 pt-40">
      <h1 className="font-heading text-4xl font-extrabold text-ink">
        Pre-order
      </h1>
      <p className="mt-3 text-ink/70">
        Reserve your order. We'll call or message you to confirm.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink">
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
          <label htmlFor="email" className="block text-sm font-medium text-ink">
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
          <label htmlFor="phone" className="block text-sm font-medium text-ink">
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

        <div>
          <label
            htmlFor="deliveryArea"
            className="block text-sm font-medium text-ink"
          >
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

        <div>
          <label
            htmlFor="animal"
            className="block text-sm font-medium text-ink"
          >
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
          <label
            htmlFor="product"
            className="block text-sm font-medium text-ink"
          >
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
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-ink"
          >
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

        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-full bg-brand px-6 py-3 font-semibold text-cream transition hover:bg-brand-dark disabled:opacity-60"
        >
          {sending ? "Sending..." : "Place pre-order"}
        </button>
      </form>

      {message && (
        <p
          role="status"
          className={`mt-6 text-center text-sm ${
            message.ok ? "text-brand" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </main>
  );
}
