-- Wearcast database schema
-- Run this once in Supabase: Project -> SQL Editor -> New query -> paste -> Run

create extension if not exists "pgcrypto";

-- Closet items -----------------------------------------------------------

create table if not exists closet_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category text not null,
  subcategory text,
  colors text[] not null default '{}',
  pattern text not null,
  formality text not null,
  warmth smallint not null,
  rain_ok boolean not null default false,
  seasons text[] not null default '{}',
  occasion_tags text[] not null default '{}',
  fit text,
  photo_url text,
  favorite boolean not null default false,
  last_worn_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table closet_items enable row level security;

create policy "closet_items: users manage their own rows"
  on closet_items
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists closet_items_user_id_idx on closet_items(user_id);

-- Day context (one row per user per date) --------------------------------

create table if not exists day_context (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  city text,
  latitude double precision,
  longitude double precision,
  weather jsonb,
  plans jsonb not null default '[]',
  mood_chips text[] not null default '{}',
  mood_note text,
  unique (user_id, date)
);

alter table day_context enable row level security;

create policy "day_context: users manage their own rows"
  on day_context
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists day_context_user_id_idx on day_context(user_id);

-- Settings (one row per user) ---------------------------------------------

create table if not exists settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  city text,
  latitude double precision,
  longitude double precision
);

alter table settings enable row level security;

create policy "settings: users manage their own row"
  on settings
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Storage: closet photos ---------------------------------------------------
-- Run this after creating a "closet-photos" bucket in Storage (see setup guide).
-- Photos are stored under a path like <user_id>/<filename>, so a user can only
-- write inside their own folder, while anyone can read (bucket is public so
-- <img> tags can load photos directly).

insert into storage.buckets (id, name, public)
values ('closet-photos', 'closet-photos', true)
on conflict (id) do nothing;

create policy "closet-photos: public read"
  on storage.objects for select
  using (bucket_id = 'closet-photos');

create policy "closet-photos: users write to their own folder"
  on storage.objects for insert
  with check (
    bucket_id = 'closet-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "closet-photos: users delete their own files"
  on storage.objects for delete
  using (
    bucket_id = 'closet-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
