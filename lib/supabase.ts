// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabaseUrl =
  rawUrl && rawUrl.trim() !== "" ? rawUrl : "https://placeholder.supabase.co";
const supabaseKey = rawKey && rawKey.trim() !== "" ? rawKey : "placeholder-key";

export const supabase = createClient(supabaseUrl, supabaseKey);
