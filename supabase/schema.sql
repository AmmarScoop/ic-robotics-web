-- IC Robotics — Supabase schema
-- Run this in the Supabase SQL editor (or `supabase db execute`) once per project.

-- ---------- Tables ----------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  name text,
  email text,
  phone text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'Parent',      -- Parent | Student | Principal | School
  name text not null,
  role text not null default '',
  quote text not null,
  published boolean not null default true,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  audience text not null default 'Parents', -- Parents | Schools
  category text not null default 'General',
  title text not null,
  excerpt text not null default '',
  body text not null default '',
  read_minutes int not null default 5,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'image',       -- image | video
  url text not null,
  caption text not null default '',
  tags text not null default '',
  created_at timestamptz not null default now()
);

-- ---------- Row Level Security ----------
alter table public.leads        enable row level security;
alter table public.testimonials enable row level security;
alter table public.posts        enable row level security;
alter table public.media        enable row level security;

-- Public (anon) may READ published content only.
create policy "read published testimonials" on public.testimonials
  for select using (published = true);
create policy "read published posts" on public.posts
  for select using (published = true);
create policy "read media" on public.media
  for select using (true);

-- NOTE: leads have NO anon policy on purpose. Inserts and all admin reads/writes
-- go through server route handlers using the SERVICE ROLE key, which bypasses RLS.
-- Never expose the service role key to the browser.
