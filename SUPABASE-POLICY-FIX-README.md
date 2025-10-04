# Perbaikan Error Policy pada Supabase

Dokumen ini menjelaskan perbaikan yang dilakukan untuk mengatasi error pada Supabase:

```
ERROR: 42710: policy "Allow select games" for table "games" already exists
```

## Penyebab Error

Error ini terjadi karena mencoba membuat policy dengan nama yang sama dua kali. Ketika script SQL dijalankan lebih dari sekali, perintah `create policy` akan gagal jika policy dengan nama yang sama sudah ada.

## Solusi yang Diimplementasikan

### 1. Pengecekan Kebijakan Sebelum Membuat

Menggunakan blok `DO` untuk memeriksa apakah policy sudah ada sebelum membuatnya:

```sql
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE polname = 'Allow select games' AND polrelid = 'games'::regclass
  ) THEN
    create policy "Allow select games" on games for select using (is_published = true);
  END IF;
END
$$;
```

### 2. Penggunaan IF NOT EXISTS untuk Index

Menggunakan `create index if not exists` untuk mencegah error jika index sudah ada:

```sql
create index if not exists idx_games_category on games(category);
create index if not exists idx_games_difficulty on games(difficulty);
```

### 3. Pengecekan Data Sebelum Insert

Menggunakan klausa `WHERE NOT EXISTS` untuk mencegah duplikasi data:

```sql
INSERT INTO games (title, description, category, difficulty, age_group, players, duration, rating, plays, thumbnail, mascot, rewards, features, game_url, is_published)
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
  true
WHERE NOT EXISTS (
  SELECT 1 FROM games WHERE title = 'Petualangan Angka Ajaib'
);
```

## Cara Menggunakan

1. Jalankan script SQL ini di Supabase SQL Editor
2. Script akan membuat tabel, policy, index, dan data hanya jika belum ada
3. Tidak akan ada error meskipun script dijalankan berkali-kali

## Manfaat

1. **Idempotent**: Script dapat dijalankan berkali-kali tanpa menyebabkan error
2. **Aman**: Tidak akan menghapus atau mengganti data yang sudah ada
3. **Efisien**: Hanya membuat komponen yang belum ada

## Troubleshooting

Jika masih mengalami masalah:
1. Periksa apakah tabel `games` sudah ada dengan struktur yang benar
2. Verifikasi bahwa policy dan index belum ada jika perlu membuat ulang
3. Pastikan pengguna memiliki hak akses yang cukup untuk membuat policy dan index