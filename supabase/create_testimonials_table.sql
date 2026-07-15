-- Tabel testimonials
create table if not exists public.testimonials (
  id SERIAL primary key,
  name text not null,
  role text,
  child_info text,
  program text,
  rating integer,
  content text,
  avatar_url text,
  achievement text,
  created_at timestamptz default now()
);

-- Policy supaya public bisa SELECT (hanya dibuat jika belum ada)
alter table testimonials enable row level security;
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Allow select testimonials' AND schemaname = 'public' AND tablename = 'testimonials'
  ) THEN
    create policy "Allow select testimonials" on testimonials for select using (true);
  END IF;
END
$$;

-- Index untuk performa (hanya dibuat jika belum ada)
create index if not exists idx_testimonials_program on testimonials(program);
create index if not exists idx_testimonials_rating on testimonials(rating);