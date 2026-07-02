import { createClient } from "@supabase/supabase-js";

// SERVER-SIDE ONLY. Never import this file from a "use client" component:
// it uses the Supabase service role key, which bypasses Row Level Security.
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
  if (!url || !serviceKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
    );
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
