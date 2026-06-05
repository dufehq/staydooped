import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

let anonClient: SupabaseClient<Database> | null = null;
let serviceClient: SupabaseClient<Database> | null = null;

/** Anon client for runtime reads. RLS filters to `status = 'published'`. */
export function getSupabaseAnon(): SupabaseClient<Database> {
  if (anonClient) return anonClient;
  anonClient = createClient<Database>(
    required("NEXT_PUBLIC_SUPABASE_URL"),
    required("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    { auth: { persistSession: false } },
  );
  return anonClient;
}

/** Service client — bypasses RLS. Server-only. Used for paths that need to
 *  resolve drafts (e.g. `/e/<draft-slug>` preview), admin tooling, and the
 *  seed script. */
export function getSupabaseService(): SupabaseClient<Database> {
  if (serviceClient) return serviceClient;
  serviceClient = createClient<Database>(
    required("NEXT_PUBLIC_SUPABASE_URL"),
    required("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false } },
  );
  return serviceClient;
}
