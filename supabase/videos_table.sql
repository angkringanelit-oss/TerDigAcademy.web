-- Pastikan extension UUID ada
create extension if not exists "pgcrypto";

-- Tabel videos
create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  duration text,
  level text,
  category text,
  thumbnail text,
  views int default 0,
  rating numeric default 0,
  interactive boolean default false,
  mascot text,
  video_url text not null,
  created_at timestamp with time zone default now()
);

-- Set permissions
alter table public.videos enable row level security;

create policy "Public read access to videos"
on public.videos for select
to anon, authenticated
using (true);