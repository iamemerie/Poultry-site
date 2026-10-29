"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AuthCard from "@/app/components/AuthCard";

const fieldClass =
  "mt-1 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Where to send the visitor after logging in. Defaults to the home page.
  const next = searchParams.get("next") ?? "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(
    null,
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    setSending(false);

    if (error) {
      setMessage({ text: "Email or password is incorrect.", ok: false });
    } else {
      router.push(next);
      router.refresh();
    }
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to manage your orders."
      footer={
        <>
          New here?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-brand hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={fieldClass}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-ink"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className={fieldClass}
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-full bg-brand px-6 py-3 font-semibold text-cream transition hover:bg-brand-dark disabled:opacity-60"
        >
          {sending ? "Logging in..." : "Log in"}
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
    </AuthCard>
  );
}

// useSearchParams needs a Suspense boundary, or the build fails.
export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
