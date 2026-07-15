import { createClient, SupabaseClient } from "@supabase/supabase-js";

export function lazySupabaseClient(
  urlEnv: string,
  keyEnv: string
): SupabaseClient {
  let client: SupabaseClient | null = null;

  return new Proxy({} as SupabaseClient, {
    get(_target, prop) {
      if (!client) {
        const url = process.env[urlEnv];
        const key = process.env[keyEnv];

        if (!url || !key) {
          throw new Error(`${urlEnv} and ${keyEnv} are required`);
        }

        client = createClient(url, key);
      }

      const value = Reflect.get(client, prop);
      return typeof value === "function" ? value.bind(client) : value;
    },
  });
}
