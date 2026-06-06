/**
 * One-shot backfill: uploads every WebP under public/images/listings/ into
 * the Supabase Storage `listings` bucket. Idempotent (upsert: true) — safe
 * to re-run; reruns just overwrite with the same bytes.
 *
 * Usage:
 *   npm run backfill:images        # dev project (uses .env.local)
 *   npm run backfill:images:prod   # prod project (uses .env.prod.local)
 *
 * Reads NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY via Node's
 * --env-file flag in the npm script. Service-role bypasses RLS so writes
 * land in the bucket without policies.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
      "Use `npm run backfill:images` (or :prod) so the --env-file is loaded.",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { persistSession: false },
});

const DIR = "public/images/listings";

async function backfill() {
  const files = readdirSync(DIR).filter((f) => f.endsWith(".webp"));
  console.log(
    `[backfill] ${files.length} WebPs → bucket "listings" @ ${new URL(SUPABASE_URL!).hostname}`,
  );

  let okCount = 0;
  for (const f of files) {
    const path = join(DIR, f);
    const buf = readFileSync(path);
    const size = statSync(path).size;

    const { error } = await supabase.storage.from("listings").upload(f, buf, {
      contentType: "image/webp",
      upsert: true,
      cacheControl: "31536000",
    });

    if (error) {
      console.error(`[FAIL] ${f}: ${error.message}`);
      process.exit(1);
    }
    okCount++;
    console.log(`[ OK ] ${f} (${(size / 1024).toFixed(0)} KB)`);
  }

  console.log(`\n[backfill] done — ${okCount}/${files.length} uploaded`);
}

backfill().catch((e) => {
  console.error("[backfill] crashed:", e);
  process.exit(1);
});
