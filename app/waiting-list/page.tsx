"use client";

import { useState } from "react";

export default function WaitingListPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    ok: boolean;
  } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setMessage(null);

    try {
      const response = await fetch("/api/waiting-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage({
          text: "You're on the waiting list. We'll be in touch.",
          ok: true,
        });
        setName("");
        setEmail("");
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
    <>
      <main className="mx-auto max-w-md px-6 pb-20 pt-40">
        <h1 className="font-heading text-4xl font-extrabold text-ink">
          Join the waiting list
        </h1>
        <p className="mt-3 text-ink/70">
          Be first to know when stock is available.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-ink"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink outline-none focus:border-brand"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-ink"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink outline-none focus:border-brand"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-full bg-brand px-6 py-3 font-semibold text-cream transition hover:bg-brand-dark disabled:opacity-60"
          >
            {sending ? "Sending..." : "Join waiting list"}
          </button>
        </form>

        <div
          role="status"
          className={`mt-6 rounded-xl px-4 py-3 text-center text-sm ${
            message.ok ? "bg-brand/10 text-brand" : "bg-red-50 text-red-600"
          }`}
        >
          {message.text}
        </div>
      </main>
    </>
  );
}
