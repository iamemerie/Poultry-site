"use client";

import { useState } from "react";

const SUBJECTS = [
  "Pre-order help",
  "Vaccination question",
  "Feed and nutrition",
  "Visit the farm",
  "Other",
];

const fieldClass =
  "mt-1 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink outline-none focus:border-brand";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: SUBJECTS[0],
    message: "",
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage({ text: "Thanks. We'll reply soon.", ok: true });
        setForm({ name: "", email: "", subject: SUBJECTS[0], message: "" });
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
        Contact us
      </h1>
      <p className="mt-3 text-ink/70">
        Questions about orders, animals or feed? Send us a message.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink">
            Name
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
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-ink"
          >
            Subject
          </label>
          <select
            id="subject"
            value={form.subject}
            onChange={(e) => update("subject", e.target.value)}
            className={fieldClass}
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-ink"
          >
            Message <span className="text-ink/50">(optional)</span>
          </label>
          <textarea
            id="message"
            rows={5}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className={fieldClass}
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-full bg-brand px-6 py-3 font-semibold text-cream transition hover:bg-brand-dark disabled:opacity-60"
        >
          {sending ? "Sending..." : "Send message"}
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
