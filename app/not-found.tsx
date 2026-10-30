"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 pt-40 text-center">
      <div>
        <p className="text-ink/70">
          That page isn&apos;t here yet. Taking you back home.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block font-medium text-brand hover:underline"
        >
          Go to home
        </Link>
      </div>
    </main>
  );
}
