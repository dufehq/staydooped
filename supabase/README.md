# Supabase

Phase 2 data layer for StayLooped — see [../PLAN.md](../PLAN.md) "Supabase migration". Will host `listings` + `listing_translations` (and bundle data) once migrated from `content/*.ts`.

## Projects

Two cloud projects, both `ap-southeast-1` (Singapore), free tier. Migrations are authored against **dev** first, then promoted to **prod** after review.

### Dev — `wtjvrbycuiooiuthokjk` (active for local work)

- Dashboard: https://supabase.com/dashboard/project/wtjvrbycuiooiuthokjk
- CLI is linked here locally (`npx supabase link --project-ref wtjvrbycuiooiuthokjk`)
- Creds live in `.env.local` (gitignored) — `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

### Prod — `smavaoullkcwebksspta` (Vercel-only)

- Dashboard: https://supabase.com/dashboard/project/smavaoullkcwebksspta
- Creds live **only in Vercel** Project Settings → Environment Variables (Production)
- Never copied to local `.env.local` — avoids accidental writes from `db push`

## Env vars

Stored in `.env.local` (gitignored). Mirror to Vercel **Project Settings → Environment Variables** (Production + Preview + Development) before any code that reads them ships.

| Var | Used by | Exposure |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | client + server | public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client + server (RLS-protected) | public |
| `SUPABASE_SERVICE_ROLE_KEY` | **server-only** code (e.g. `/api/*`, scripts) | **secret — bypasses RLS** |

**Service-role rules:** never prefix with `NEXT_PUBLIC_`, never log, never paste into chat/PR/Slack. If exposed: Dashboard → Settings → API → "Reset service_role secret" and update `.env.local` + Vercel.

The anon key is designed to be public — Row-Level Security policies on each table protect rows. The pattern: anon key + RLS for browser-facing reads; service_role only for server endpoints that need to bypass policy (admin scripts, cron, write APIs).

## First-time CLI setup (new contributors)

CLI is already a dev dependency — no global install needed.

```bash
# 1. authenticate (opens browser → access token written to ~/.supabase/)
npx supabase login

# 2. link this repo to the cloud project
npx supabase link --project-ref smavaoullkcwebksspta
# prompts for the DB password — get from project owner / 1Password
```

After `link`, the CLI writes machine-local cache to `supabase/.temp/` (gitignored). Shared config will land in `supabase/config.toml` once we run `supabase init` or generate the first migration.

## Common commands

```bash
# pull current cloud schema into supabase/migrations/
npx supabase db pull

# create a new empty migration file
npx supabase migration new <name>

# apply local migrations to the cloud project
npx supabase db push

# regenerate TypeScript types from the live schema (run after every migration)
npx supabase gen types typescript --linked > types/supabase.ts
```

## What's committed vs. ignored under `supabase/`

| Path | Status | Notes |
|---|---|---|
| `supabase/config.toml` | commit | Project config — shared |
| `supabase/migrations/` | commit | SQL migrations — source of truth for schema |
| `supabase/seed.sql` | commit | Seed data (if used) — shared |
| `supabase/.temp/` | ignored | CLI cache (linked ref, version pins) |
| `supabase/.branches/` | ignored | Local state for `supabase branches` |
| `supabase/.env` | ignored | Same reason as root `.env*` |

Rules live in root [.gitignore](../.gitignore).

## Promoting to prod

Run this sequence *before* merging the feature branch — Vercel auto-deploys
main on push, so prod must be schema-ready and seeded by the time the
deploy fires. We deliberately do **not** set `USE_SUPABASE=true` in Vercel
yet; the deploy after merge keeps using the TS-file path until we flip the
flag manually (zero-behavior-change rollout, easy rollback).

### 1. Rotate the prod service_role (one-time)

If the prod service_role key has ever been pasted into chat, version
control, or any non-secrets-manager surface — rotate it now via Dashboard
→ Settings → API Keys → "Reset service_role secret". Use the new value
in step 3.

### 2. Push the schema migration to prod

```bash
# Re-link the CLI from dev to prod
npx supabase link --project-ref smavaoullkcwebksspta
# (prompts for the PROD DB password — not the dev one)

# Push the same migration file we applied to dev
npx supabase db push

# Re-link back to dev so subsequent local work stays on dev
npx supabase link --project-ref wtjvrbycuiooiuthokjk
```

### 3. Create `.env.prod.local` for the seed

Gitignored via the `.env*` rule. Holds prod creds, kept locally only —
never committed, never used by `npm run dev` (which uses `.env.local`).

```
NEXT_PUBLIC_SUPABASE_URL=https://smavaoullkcwebksspta.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<prod anon key from Dashboard → Settings → API Keys>
SUPABASE_SERVICE_ROLE_KEY=<prod service_role key (rotated in step 1)>
```

### 4. Seed prod

```bash
npm run seed:supabase:prod
```

Upserts 14 listings × 3 locales into the prod project. Same script as
dev, just pointed at the other env file. Verify in Supabase Studio:
`listings` should have 14 rows, `listing_translations` should have 42.

### 5. Set Vercel env vars

In Vercel → Project → Settings → Environment Variables, add three vars
to **Production** with prod values and three to **Preview** with dev
values. Skip Vercel's Development environment (that's for `vercel dev`
CLI runs only; we use `npm run dev` with `.env.local`).

| Var | **Production** (real users) | **Preview** (PR previews) |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://smavaoullkcwebksspta.supabase.co` | `https://wtjvrbycuiooiuthokjk.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | prod anon key | dev anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | prod service_role (rotated) | dev service_role |

Rationale: Production needs real data; Preview points at dev so PRs can
show "what's coming" content updates and reviewer mistakes can't touch
prod rows.

**Do not set `USE_SUPABASE` yet** — in either env. Without it, the
runtime stays on the TS-file path and the deploy is a no-op
behaviorally. The flag flip is step 7, independent per environment.

### 6. Merge the PR + verify the deploy is healthy

Vercel auto-deploys main. The site should look identical (still reading
from TS files). If anything breaks, the issue is in the code, not the DB
swap — easier to debug.

### 7. Flip the flag

Once the post-merge deploy is verified, set `USE_SUPABASE=true` in Vercel
**Production**. Vercel redeploys; the runtime now reads from prod
Supabase.

Optionally also set `USE_SUPABASE=true` in **Preview** — useful once
we trust the Supabase path, since it makes PR previews exercise the
real DB code path too. Until then, leaving Preview unset keeps PRs on
the TS-file fallback (lower variance during code review).

To roll back: unset `USE_SUPABASE` in whichever env (or set to anything
other than `"true"`). Next redeploy reverts to TS files. The data in
the Supabase project stays — no destructive rollback.

## Runtime feature flag

`USE_SUPABASE=true` in `.env.local` switches `getListing(slug, locale)` from
the TS-file path ([content/experiences.ts](../content/experiences.ts) + [content/bundles.ts](../content/bundles.ts)) to the
Supabase-backed path ([content/db.ts](../content/db.ts)). All other getters
(`getFeaturedExperience`, `getAllBundles`, etc.) still read from TS files —
they'll be migrated one at a time.

Prod stays on the TS-file path until we (a) seed prod and (b) set `USE_SUPABASE=true`
in Vercel Production. The flag is the rollback lever: unset it and runtime
reverts to TS files immediately.

The DB path uses the **service-role** client internally so drafts still
resolve at `/e/<draft-slug>` for editorial preview (matching current TS-file
behavior). Anon RLS hides drafts from any public path that uses
`getSupabaseAnon()` directly.

## Status (as of 2026-06-05)

**Foundation**
- [x] Prod project provisioned (`smavaoullkcwebksspta`, ap-southeast-1)
- [x] Dev project provisioned (`wtjvrbycuiooiuthokjk`, ap-southeast-1)
- [x] `@supabase/supabase-js` + `supabase` CLI installed (dev dep)
- [x] CLI logged in + linked to dev; dev creds in `.env.local`

**Dev**
- [x] Schema migration applied (`20260528100000_initial_schema.sql`)
- [x] Seeded (`npm run seed:supabase`) — 14 listings × 3 locales
- [x] Generated types (`types/supabase.ts`)

**Runtime**
- [x] Client wrapper `lib/supabase.ts` (anon + service factories, `server-only`)
- [x] DB getters in `content/db.ts` — all 5 (`getListingFromDB`, `getFeaturedExperienceFromDB`, `getNonFeaturedExperiencesFromDB`, `getAllBundlesFromDB`, `getAllListingSlugsFromDB`)
- [x] Async + flag-gated wrappers in `content/{experiences,bundles,index}.ts`
- [x] Smoke test (`USE_SUPABASE=true`) on `/`, `/zh`, `/e/elephant` (EN/ZH/TH), drafts, `/api/go/elephant`

**Prod rollout**
- [x] Prod service_role rotated
- [x] Schema applied to prod
- [x] Prod seeded — 14 listings × 3 locales
- [ ] Vercel env vars set — Production → prod values, Preview → dev values (skip Development env)
- [ ] PR merged + post-merge deploy verified healthy on TS-file path
- [ ] `USE_SUPABASE=true` set in Vercel Production (flag flip)
- [ ] (Optional) `USE_SUPABASE=true` set in Vercel Preview once trusted

See [../PLAN.md](../PLAN.md) Phase 2 for the full migration plan.
