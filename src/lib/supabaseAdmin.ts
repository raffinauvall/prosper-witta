import { lazySupabaseClient } from "./lazySupabaseClient";

export const supabaseAdmin = lazySupabaseClient(
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY"
);
