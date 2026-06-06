import { NextResponse } from "next/server";
import {
  createListingsClient,
  purgeArchivedListings,
} from "@/lib/listings-write";

/**
 * Vercel Cron endpoint — hard-deletes `status='archived'` listing rows whose
 * `updated_at` is older than N days, plus their storage objects.
 *
 * Schedule + auth setup:
 *   - vercel.json declares the cron schedule. Vercel injects an
 *     `Authorization: Bearer <CRON_SECRET>` header on each cron invocation;
 *     this route enforces it. Set `CRON_SECRET` in Vercel Production env vars
 *     (any random string — Vercel can auto-generate via the dashboard).
 *   - For manual / local testing: set `CRON_SECRET` in `.env.local` and curl
 *     with `-H "Authorization: Bearer <secret>"`.
 *
 * Query params:
 *   ?days=N       — override the default 90-day retention window
 *   ?dryRun=true  — report what would be purged without modifying anything
 *
 * Response: JSON `{ days, dryRun, purgedCount, slugs[] }`. Vercel logs the
 * response body — that's the audit trail. No notifications wired up yet
 * (low-stakes; the catalog rotates slowly).
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "CRON_SECRET is not configured on this environment" },
      { status: 500 },
    );
  }

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const daysParam = searchParams.get("days");
  const days = daysParam ? Number(daysParam) : 90;
  if (!Number.isFinite(days) || days < 0) {
    return NextResponse.json(
      { error: `Invalid days param: ${daysParam}` },
      { status: 400 },
    );
  }
  const dryRun = searchParams.get("dryRun") === "true";

  try {
    const sb = createListingsClient();
    const { slugs } = await purgeArchivedListings(sb, days, { dryRun });
    return NextResponse.json({
      days,
      dryRun,
      purgedCount: slugs.length,
      slugs,
    });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 },
    );
  }
}
