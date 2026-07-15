-- Tabel games
create table if not exists public.games (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,
  difficulty text,
  age_group text,
  players text,
  duration text,
  rating numeric(2,1),
  plays integer default 0,
  thumbnail text,
  mascot text,
  rewards jsonb,
  features jsonb,
  game_url text,  -- Tambahkan kolom game_url
  embed_url text,  -- Tambahkan kolom embed_url untuk Wordwall
  embed_height integer,  -- Tambahkan kolom embed_height untuk Wordwall
  is_published boolean default true,
  created_at timestamptz default now()
);

-- Policy supaya public bisa SELECT (hanya dibuat jika belum ada)
alter table games enable row level security;
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE polname = 'Allow select games' AND polrelid = 'games'::regclass
  ) THEN
    create policy "Allow select games" on games for select using (is_published = true);
  END IF;
END
$$;

-- Index untuk performa (hanya dibuat jika belum ada)
create index if not exists idx_games_category on games(category);
create index if not exists idx_games_difficulty on games(difficulty);
create index if not exists idx_games_embed_url on games(embed_url);

-- Seed data sample (3 game) dengan game_url
-- Hanya insert jika belum ada data
INSERT INTO games (title, description, category, difficulty, age_group, players, duration, rating, plays, thumbnail, mascot, rewards, features, game_url, embed_url, embed_height, is_published)
SELECT 
  'Petualangan Angka Ajaib', 
  'Bantu Star Kids mengumpulkan angka-angka untuk menyelesaikan misi matematika', 
  'matematika', 
  'Mudah', 
  '6-9 tahun', 
  '1', 
  '15-20 menit', 
  4.8, 
  15420, 
  '/api/placeholder/300/200', 
  'Star Kids', 
  '["Lencana Matematika","Poin XP","Sertifikat"]', 
  '["Suara Narasi","Animasi Interaktif","Progress Tracking"]', 
  'https://wordwall.net/play/12345/petualangan-angka-ajaib', 
  'https://wordwall.net/id/embed/9abaf685315d4eaeaeb52dcc4bd51190?themeId=66&templateId=3&fontStackId=0',
  400,
  true
WHERE NOT EXISTS (
  SELECT 1 FROM games WHERE title = 'Petualangan Angka Ajaib'
);

INSERT INTO games (title, description, category, difficulty, age_group, players, duration, rating, plays, thumbnail, mascot, rewards, features, game_url, embed_url, embed_height, is_published)
SELECT 
  'Studio Desain Quen Chlid', 
  'Buat karya seni digital bersama Quen Chlid dalam studio kreatif yang penuh warna', 
  'seni', 
  'Mudah', 
  '5-12 tahun', 
  '1', 
  '30-45 menit', 
  4.9, 
  12890, 
  '/api/placeholder/300/200', 
  'Quen Chlid', 
  '["Galeri Digital","Tools Premium","Badge Seniman"]', 
  '["Editor Drag & Drop","Template Kreatif","Export Hasil"]', 
  'https://www.canva.com/design/DAF123456789/view', 
  null,
  null,
  true
WHERE NOT EXISTS (
  SELECT 1 FROM games WHERE title = 'Studio Desain Quen Chlid'
);

INSERT INTO games (title, description, category, difficulty, age_group, players, duration, rating, plays, thumbnail, mascot, rewards, features, game_url, embed_url, embed_height, is_published)
SELECT 
  'Kata-kata Berkekuatan', 
  'Game puzzle kata yang melatih kosakata dan kemampuan berbahasa Indonesia', 
  'bahasa', 
  'Sedang', 
  '7-12 tahun', 
  '1', 
  '10-15 menit', 
  4.7, 
  18750, 
  '/api/placeholder/300/200', 
  'Star Kids', 
  '["Kamus Digital","Poin Bahasa","Gelar Penulis"]', 
  '["Kosakata Baru","Hint Cerdas","Level Adaptif"]', 
  'https://wordwall.net/play/67890/kata-berkekuatan', 
  'https://wordwall.net/id/embed/xyz123abc456?themeId=44&templateId=7&fontStackId=1',
  500,
  true
WHERE NOT EXISTS (
  SELECT 1 FROM games WHERE title = 'Kata-kata Berkekuatan'
);