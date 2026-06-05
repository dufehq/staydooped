-- ============================================================================
-- StayLooped — initial schema (Phase 2 data layer)
-- Mirrors content/types.ts: ListingBase + Experience | Bundle, with ZH/TH/EN
-- locale overlays moving out of content/i18n/*.ts into listing_translations.
-- See supabase/README.md for context.
-- ============================================================================

-- ─── Enums ───────────────────────────────────────────────────────────────────

create type listing_kind     as enum ('experience', 'bundle');
create type listing_status   as enum ('draft', 'published');
create type listing_category as enum (
  'food', 'culture', 'nature', 'wellness', 'adventure', 'nimman'
);
create type booking_type     as enum ('klook', 'viator', 'gyg', 'whatsapp');
create type locale           as enum ('en', 'th', 'zh');

-- ─── updated_at trigger function ─────────────────────────────────────────────

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ─── listings (language-neutral) ─────────────────────────────────────────────

create table listings (
  id                       uuid primary key default gen_random_uuid(),
  slug                     text not null unique,
  kind                     listing_kind not null,
  category                 listing_category not null,

  -- Iconography
  emoji                    text not null,
  emojis                   text[],                 -- bundle-only multi-emoji set

  -- Pricing (THB integers)
  price                    integer not null check (price >= 0),
  price_max                integer,                -- highest tier; null = single-price
  price_original           integer,                -- bundle strikethrough

  -- Display
  background               text not null,

  -- Booking (TS discriminated union flattened)
  booking_type             booking_type not null,
  booking_product_id       text,                   -- klook/viator/gyg
  booking_message_template text,                   -- whatsapp

  -- Experience-only
  is_featured              boolean not null default false,
  loops                    integer,

  -- Editorial
  contributor_slug         text,                   -- FK target arrives with contributors table (Phase 2)
  status                   listing_status not null default 'draft',

  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now(),

  -- Booking payload must match its type
  constraint booking_payload_matches_type check (
    (booking_type in ('klook', 'viator', 'gyg')
       and booking_product_id is not null
       and booking_message_template is null)
    or
    (booking_type = 'whatsapp'
       and booking_message_template is not null
       and booking_product_id is null)
  ),

  -- Bundle-only fields stay null on experiences
  constraint bundle_fields_only_on_bundles check (
    kind = 'bundle'
    or (emojis is null and price_original is null)
  ),

  -- Experience-only fields stay null/false on bundles
  constraint experience_fields_only_on_experiences check (
    kind = 'experience'
    or (is_featured = false and loops is null)
  ),

  -- Price range integrity
  constraint price_max_gte_price check (
    price_max is null or price_max >= price
  ),
  constraint price_original_nonneg check (
    price_original is null or price_original >= 0
  )
);

-- Home-page query: experiences/bundles by status
create index listings_kind_status_idx
  on listings (kind, status);

-- Category filter (revisit if/when CategoryTabs returns — PLAN.md)
create index listings_category_published_idx
  on listings (category)
  where status = 'published';

-- At most one featured published experience at a time.
-- The index key is `kind` (always 'experience' inside the predicate),
-- so any second row would collide.
create unique index listings_one_featured_experience_idx
  on listings (kind)
  where kind = 'experience'
    and is_featured = true
    and status = 'published';

create trigger listings_set_updated_at
  before update on listings
  for each row execute function set_updated_at();

-- ─── listing_translations (locale overlay) ───────────────────────────────────

create table listing_translations (
  listing_id        uuid not null references listings(id) on delete cascade,
  locale            locale not null,

  title             text not null,
  hook              text not null,
  description       text not null,
  price_label       text not null,
  inclusions        text[] not null default '{}',
  duration          text not null,
  distance          text not null,

  -- Optional / kind-specific
  rating            text,
  contributor_quote text,
  badge             text,
  save_badge        text,

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),

  primary key (listing_id, locale)
);

create trigger listing_translations_set_updated_at
  before update on listing_translations
  for each row execute function set_updated_at();

-- ─── Row-Level Security ──────────────────────────────────────────────────────

alter table listings              enable row level security;
alter table listing_translations  enable row level security;

-- Public read of published listings (anon = browser, authenticated = future).
create policy "Public read published listings"
  on listings
  for select
  to anon, authenticated
  using (status = 'published');

-- Public read of translations whose parent listing is published.
create policy "Public read translations of published listings"
  on listing_translations
  for select
  to anon, authenticated
  using (
    exists (
      select 1 from listings
      where listings.id = listing_translations.listing_id
        and listings.status = 'published'
    )
  );

-- No INSERT/UPDATE/DELETE policies are defined for anon/authenticated.
-- Only service_role (which bypasses RLS) can write. Admin tooling and
-- the experience-pipeline skill writer (Phase 2) go through service_role.
