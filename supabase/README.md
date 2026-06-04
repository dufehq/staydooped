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
for **Production + Preview + Development**:

| Var | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://smavaoullkcwebksspta.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | prod anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | prod service_role (rotated) |

**Do not set `USE_SUPABASE` yet.** Without it, the runtime stays on the
TS-file path and the deploy is a no-op behaviorally.

### 6. Merge the PR + verify the deploy is healthy

Vercel auto-deploys main. The site should look identical (still reading
from TS files). If anything breaks, the issue is in the code, not the DB
swap — easier to debug.

### 7. Flip the flag

Once the post-merge deploy is verified, set `USE_SUPABASE=true` in Vercel
Production. Vercel redeploys; the runtime now reads from prod Supabase.

To roll back: unset `USE_SUPABASE` (or set to anything other than
`"true"`). Next redeploy reverts to TS files. The data in prod Supabase
stays — no destructive rollback.

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

## Status (as of 2026-05-28)

- [x] Prod project provisioned (`smavaoullkcwebksspta`, ap-southeast-1)
- [x] Dev project provisioned (`wtjvrbycuiooiuthokjk`, ap-southeast-1)
- [x] `@supabase/supabase-js` + `supabase` CLI installed (dev dep)
- [x] CLI logged in + linked to dev
- [x] Dev creds in `.env.local`
- [x] Schema migration applied to dev (`20260528100000_initial_schema.sql`)
- [x] Dev seeded (`npm run seed:supabase`) — 14 listings × 3 locales
- [x] Generated types (`types/supabase.ts`)
- [x] Runtime client wrapper (`lib/supabase.ts`) + DB-backed `getListing` (`content/db.ts`)
- [x] Smoke test `USE_SUPABASE=true` against `/e/elephant` (EN/ZH/TH) + `/api/go/elephant`
- [x] Migrate `getFeaturedExperience`, `getNonFeaturedExperiences`, `getAllBundles`, `getAllListingSlugs` (all 5 content getters now async + flag-gated)
- [ ] Prod service_role rotated (if originally exposed)
- [ ] Schema migration applied to prod (`npx supabase db push` against prod)
- [ ] Prod seeded (`npm run seed:supabase:prod`)
- [ ] 3 Supabase env vars mirrored to Vercel (Production + Preview + Development)
- [ ] PR merged + post-merge deploy verified healthy on TS-file path
- [ ] `USE_SUPABASE=true` set in Vercel Production (flag flip)
- [ ] Schema design — `listings` (single table, `kind: 'experience' | 'bundle'` TBD) + `listing_translations`
- [ ] First migration written + pushed
- [ ] `lib/supabase.ts` client wrapper
- [ ] Runtime migration: `content/*.ts` reads → Supabase reads in `getListing`, `getFeaturedExperience`, `getAllBundles`, etc.
- [ ] `experience-pipeline` skill writer switched from "edit TS file" to "insert Supabase row"

See [../PLAN.md](../PLAN.md) Phase 2 for the full migration plan.
