-- IC Robotics — Dashboard upgrade (editable site content + form inbox + uploads)
-- Run once in Supabase → SQL Editor. Safe to run more than once.

-- 1) Editable site content: one JSON document per section (home, about, settings, …)
create table if not exists public.site_content (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
drop policy if exists "read site content" on public.site_content;
create policy "read site content" on public.site_content for select using (true);

-- 2) Form inbox: status + internal notes on every submission
alter table public.leads add column if not exists status text not null default 'new';
alter table public.leads add column if not exists notes text not null default '';
alter table public.leads add column if not exists updated_at timestamptz not null default now();
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_kind_idx on public.leads (kind);

-- 3) Public bucket for images uploaded from the dashboard (logos, photos)
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do update set public = true;
