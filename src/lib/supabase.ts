import { lazySupabaseClient } from "./lazySupabaseClient";

export const supabase = lazySupabaseClient(
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY"
);
