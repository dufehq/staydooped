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
- [ ] Smoke test `USE_SUPABASE=true` against `/e/elephant` (EN/ZH/TH) + `/api/go/elephant`
- [ ] Migrate `getFeaturedExperience`, `getNonFeaturedExperiences`, `getAllBundles`, `getAllListingSlugs`
- [ ] Prod env vars mirrored to Vercel (Production environment)
- [ ] Seed prod + flip `USE_SUPABASE=true` in Vercel Production
- [ ] Schema design — `listings` (single table, `kind: 'experience' | 'bundle'` TBD) + `listing_translations`
- [ ] First migration written + pushed
- [ ] `lib/supabase.ts` client wrapper
- [ ] Runtime migration: `content/*.ts` reads → Supabase reads in `getListing`, `getFeaturedExperience`, `getAllBundles`, etc.
- [ ] `experience-pipeline` skill writer switched from "edit TS file" to "insert Supabase row"

See [../PLAN.md](../PLAN.md) Phase 2 for the full migration plan.
