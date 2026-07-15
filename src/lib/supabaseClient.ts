import { lazySupabaseClient } from "./lazySupabaseClient";

export const supabaseClient = lazySupabaseClient(
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY"
);
