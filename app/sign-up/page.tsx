"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import AuthCard from "@/app/components/AuthCard";
import { useRouter } from "next/navigation";

const fieldClass =
  "mt-1 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink outline-none focus:border-brand";

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(
    null,
  );

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.password.length < 8) {
      setMessage({
        text: "Password must be at least 8 characters.",
        ok: false,
      });
      return;
    }
    if (form.password !== form.confirm) {
      setMessage({ text: "Passwords do not match.", ok: false });
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { full_name: form.name } },
    });

    if (error) {
      setMessage({ text: error.message, ok: false });
    } else {
      setMessage({
        text: "Account created! Please check your email to confirm.",
        ok: true,
      });
      router.push("/login");
    }
  }

  return (
    <AuthCard
      title="Create an account"
      subtitle="Save your details for faster pre-orders."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-brand hover:underline"
          >
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label
            htmlFor="password"
            className="block text-sm font-medium text-ink"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label
            htmlFor="confirm"
            className="block text-sm font-medium text-ink"
          >
            Confirm password
          </label>
          <input
            id="confirm"
            type="password"
            required
            value={form.confirm}
            onChange={(e) => update("confirm", e.target.value)}
            className={fieldClass}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-brand px-6 py-3 font-semibold text-cream transition hover:bg-brand-dark"
        >
          Create account
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
