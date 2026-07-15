-- Menambahkan data contoh ke tabel games
INSERT INTO public.games 
(title, description, category, difficulty, age_group, players, duration, rating, plays, thumbnail, mascot, rewards, features, game_url, is_published, created_at) 
VALUES
(
  'Math Pop Quiz',
  'Uji kemampuan matematikamu dengan serangkaian soal yang menantang!',
  'Matematika',
  'Sedang',
  '6-12 tahun',
  '1',
  '10-15 menit',
  4.8,
  1500,
  'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
  'Star Kids',
  '["Lencana Matematika","Poin XP","Sertifikat"]',
  '["Timer Interaktif","Hint Cerdas","Level Adaptif"]',
  'https://wordwall.net/resource/12345/math-quiz',
  true,
  NOW()
),
(
  'Word Detective: Tebak Kata Kosmik',
  'Jelajahi dunia kosmik sambil belajar kosakata baru dalam bahasa Indonesia!',
  'Bahasa',
  'Mudah',
  '5-10 tahun',
  '1-4',
  '15-20 menit',
  4.9,
  2200,
  'https://img.youtube.com/vi/4GuqkCXf2z0/hqdefault.jpg',
  'Quen Child',
  '["Kamus Digital","Gelar Penulis","Badge Bahasa"]',
  '["Kosakata Baru","Hint Visual","Level Adaptif"]',
  'https://wordwall.net/resource/67890/word-detective',
  true,
  NOW()
),
(
  'Colorful Canva Creator',
  'Kreasikan seni digital dengan alat-alat menarik di Canva!',
  'Seni',
  'Mudah',
  '4-10 tahun',
  '1',
  '20-30 menit',
  4.7,
  950,
  'https://img.youtube.com/vi/abc123/hqdefault.jpg',
  'Star Kids',
  '["Galeri Digital","Tools Premium","Badge Seniman"]',
  '["Editor Drag & Drop","Template Kreatif","Export Hasil"]',
  'https://www.canva.com/design/DAE12345/edit',
  true,
  NOW()
);