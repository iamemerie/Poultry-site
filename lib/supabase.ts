import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Fail with a clear message that names the missing variable, so the build log says exactly what to fix.
if (!url || !url.startsWith("http")) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL is missing or invalid. It must start with https:// and have no quotes.",
  );
}
if (!key) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is missing. Add it in Vercel's environment variables.",
  );
}

export const supabase = createClient(url, key);
