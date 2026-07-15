-- Tabel consultations
create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  parent_name text not null,
  parent_phone text not null,
  child_name text,
  child_age integer,
  child_grade text,
  preferred_time timestamptz,
  consultation_type text,
  program_interest text,
  additional_info text,
  status text default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Policy supaya public bisa INSERT (hanya dibuat jika belum ada)
alter table consultations enable row level security;
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Allow insert consultations' AND schemaname = 'public' AND tablename = 'consultations'
  ) THEN
    create policy "Allow insert consultations" on consultations for insert with check (true);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Allow select consultations' AND schemaname = 'public' AND tablename = 'consultations'
  ) THEN
    create policy "Allow select consultations" on consultations for select using (true);
  END IF;
END
$$;

-- Index untuk performa (hanya dibuat jika belum ada)
create index if not exists idx_consultations_status on consultations(status);
create index if not exists idx_consultations_created_at on consultations(created_at);
create index if not exists idx_consultations_program_interest on consultations(program_interest);