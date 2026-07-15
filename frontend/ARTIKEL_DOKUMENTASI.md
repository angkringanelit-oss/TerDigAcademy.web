# 📝 DOKUMENTASI ARTIKEL TERDIG ACADEMY

Dokumentasi untuk fitur artikel edukasi di website TerDig Academy.

**Versi Dokumentasi**: 1.0  
**Tanggal Update**: 12 Oktober 2025

## 📋 DESKRIPSI FITUR

Fitur artikel edukasi merupakan bagian dari website TerDig Academy yang menampilkan konten edukatif berupa artikel dan blog untuk membantu orang tua dalam mendukung perkembangan anak di era digital.

## 🏗️ STRUKTUR IMPLEMENTASI

### File yang Dibuat

1. **`frontend/lib/articleTypes.ts`**
   - Mendefinisikan tipe data TypeScript untuk artikel
   - Mendefinisikan tipe data untuk kategori artikel

2. **`frontend/pages/ArticlesPage.tsx`**
   - Halaman utama untuk menampilkan daftar artikel
   - Menampilkan artikel dalam grid responsif
   - Menyediakan fitur filter berdasarkan kategori
   - Menyediakan fitur pencarian artikel
   - Menampilkan modal preview artikel

3. **`frontend/pages/ArticleDetailPage.tsx`**
   - Halaman detail untuk menampilkan artikel lengkap
   - Menampilkan artikel berdasarkan slug
   - Menampilkan artikel terkait berdasarkan kategori
   - Menyediakan navigasi kembali ke halaman daftar artikel

4. **`frontend/ARTIKEL_DOKUMENTASI.md`**
   - Dokumentasi untuk fitur artikel (file ini)

### File yang Diubah

1. **`frontend/App.tsx`**
   - Menambahkan route untuk halaman artikel
   - Menambahkan route untuk halaman detail artikel

2. **`frontend/components/Navbar.tsx`**
   - Menambahkan link "Artikel" ke navigasi utama

3. **`frontend/STRUKTUR_WEB.md`**
   - Memperbarui dokumentasi struktur website
   - Menambahkan informasi tentang tabel `articles`
   - Memperbarui daftar file yang digunakan

## 🗄️ STRUKTUR DATABASE

### Tabel `articles`

Tabel ini menyimpan semua artikel edukasi yang ditampilkan di website.

#### Kolom Tabel

| Kolom | Tipe Data | Deskripsi |
|-------|-----------|-----------|
| `id` | text | Primary key unik untuk setiap artikel |
| `title` | text | Judul artikel |
| `slug` | text | Slug untuk URL artikel (unik) |
| `excerpt` | text | Ringkasan singkat artikel |
| `content` | text | Konten artikel dalam format HTML |
| `image_url` | text | URL gambar utama artikel |
| `category` | text | Kategori artikel (Teknologi, Pendidikan, Kreativitas) |
| `author` | text | Nama penulis artikel |
| `published_at` | timestamptz | Waktu publikasi artikel |
| `is_published` | boolean | Status publikasi artikel (true/false) |
| `created_at` | timestamptz | Waktu artikel dibuat |
| `updated_at` | timestamptz | Waktu artikel terakhir diperbarui |

#### Contoh Data

```sql
INSERT INTO "public"."articles" ("id", "title", "slug", "excerpt", "content", "image_url", "category", "author", "published_at", "is_published", "created_at", "updated_at") VALUES 
('1', 'Mengenal Dunia Digital untuk Anak-anak', 'mengenal-dunia-digital-untuk-anak-anak', 'Panduan lengkap untuk membantu anak memahami teknologi digital dengan aman dan menyenangkan.', '<p>Di era digital saat ini, anak-anak mulai mengenal teknologi sejak dini. Penting bagi orang tua untuk memahami bagaimana cara terbaik memperkenalkan dunia digital kepada anak dengan aman dan menyenangkan.</p><p>Artikel ini akan membahas berbagai aspek teknologi digital yang relevan untuk anak-anak, termasuk:</p><ul><li>Pengenalan konsep dasar komputer dan internet</li><li>Cara menggunakan perangkat digital dengan aman</li><li>Manfaat teknologi digital dalam pembelajaran</li><li>Potensi risiko dan cara menghindarinya</li></ul><p>Dengan pendekatan yang tepat, teknologi digital dapat menjadi alat yang sangat bermanfaat dalam mendukung perkembangan anak.</p>', 'https://images.unsplash.com/photo-1519589160466-96a0e9a5a1e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', 'Teknologi', 'Tim TerDig Academy', '2025-10-11 10:39:05.871167+00', 'true', '2025-10-11 10:39:05.871167+00', '2025-10-11 10:39:05.871167+00');
```

## 🎨 DESAIN ANTARMUKA

### Halaman Daftar Artikel (`/artikel`)

1. **Hero Section**
   - Judul halaman "Artikel & Blog Edukasi"
   - Deskripsi singkat tentang tujuan halaman
   - Mascot TerDig Academy (Star Kids dan Quen Chlid)
   - Fitur utama dalam bentuk card (Artikel Edukatif, Berbagai Kategori, Update Terbaru)

2. **Filter dan Pencarian**
   - Input pencarian untuk mencari artikel berdasarkan judul atau ringkasan
   - Dropdown filter berdasarkan kategori artikel

3. **Grid Artikel**
   - Menampilkan artikel dalam grid responsif (1 kolom di mobile, 2 di tablet, 3 di desktop)
   - Setiap artikel menampilkan:
     - Gambar utama
     - Judul
     - Ringkasan
     - Kategori
     - Tanggal publikasi
     - Penulis
     - Tombol "Baca"

4. **Modal Preview**
   - Menampilkan preview artikel ketika tombol "Baca" diklik
   - Menampilkan konten lengkap artikel dalam modal

5. **Call to Action**
   - Section ajakan untuk mendaftar program TerDig Academy

### Halaman Detail Artikel (`/artikel/:slug`)

1. **Header**
   - Tombol kembali ke halaman daftar artikel
   - Judul artikel
   - Mascot TerDig Academy

2. **Konten Artikel**
   - Gambar utama artikel
   - Kategori artikel
   - Informasi penulis dan tanggal publikasi
   - Konten artikel lengkap dalam format HTML

3. **Artikel Terkait**
   - Menampilkan 3 artikel terkait berdasarkan kategori yang sama
   - Setiap artikel terkait menampilkan gambar, judul, kategori, dan tanggal

4. **Call to Action**
   - Section ajakan untuk mendaftar program atau melihat artikel lainnya

## 🔧 INTEGRASI DENGAN SUPABASE

### Pengambilan Data

1. **Daftar Artikel**
   ```typescript
   const { data, error } = await supabase
     .from("articles")
     .select("*")
     .eq("is_published", true)
     .order("published_at", { ascending: false });
   ```

2. **Artikel Berdasarkan Kategori**
   ```typescript
   const { data, error } = await supabase
     .from("articles")
     .select("*")
     .eq("is_published", true)
     .eq("category", selectedCategory)
     .order("published_at", { ascending: false });
   ```

3. **Artikel Berdasarkan Slug**
   ```typescript
   const { data, error } = await supabase
     .from("articles")
     .select("*")
     .eq("slug", slug)
     .eq("is_published", true)
     .single();
   ```

4. **Artikel Terkait**
   ```typescript
   const { data, error } = await supabase
     .from("articles")
     .select("*")
     .eq("is_published", true)
     .eq("category", article.category)
     .neq("id", article.id)
     .limit(3)
     .order("published_at", { ascending: false });
   ```

### Keamanan

- Tabel `articles` menggunakan Row Level Security (RLS)
- Policy memungkinkan akses SELECT untuk publik
- Hanya artikel dengan `is_published = true` yang ditampilkan
- Tidak ada operasi INSERT, UPDATE, atau DELETE yang diizinkan untuk publik

## 📱 RESPONSIVE DESIGN

Implementasi artikel menggunakan pendekatan mobile-first dengan:

1. **Mobile (0-768px)**
   - Grid 1 kolom untuk daftar artikel
   - Filter dan pencarian dalam layout vertikal
   - Ukuran font yang disesuaikan untuk layar kecil
   - Tombol CTA dalam layout vertikal

2. **Tablet (769-1024px)**
   - Grid 2 kolom untuk daftar artikel
   - Filter dan pencarian dalam layout horizontal
   - Ukuran font yang disesuaikan untuk layar sedang

3. **Desktop (1025px+)**
   - Grid 3 kolom untuk daftar artikel
   - Layout penuh dengan spacing yang optimal
   - Ukuran font standar

## 🚀 CARA MENGGUNAKAN

1. **Mengakses Halaman Artikel**
   - Kunjungi `/artikel` untuk melihat daftar artikel
   - Gunakan filter kategori untuk menyaring artikel
   - Gunakan pencarian untuk mencari artikel spesifik

2. **Membaca Artikel**
   - Klik pada artikel untuk melihat detail
   - Atau klik tombol "Baca" untuk melihat preview dalam modal

3. **Navigasi**
   - Gunakan tombol kembali untuk kembali ke halaman daftar artikel
   - Gunakan link di navbar untuk mengakses halaman artikel dari halaman lain

## 🛠️ PENGEMBANGAN LANJUTAN

Fitur yang dapat ditambahkan di masa depan:

1. **Komentar Artikel**
   - Sistem komentar untuk interaksi pengguna
   - Moderasi komentar

2. **Bookmark Artikel**
   - Fitur menyimpan artikel favorit
   - Sinkronisasi dengan akun pengguna

3. **Bagikan Artikel**
   - Fitur berbagi ke media sosial
   - Copy link artikel

4. **Arsip Artikel**
   - Halaman arsip berdasarkan bulan/tahun
   - Filter berdasarkan penulis

5. **RSS Feed**
   - Generate RSS feed untuk artikel
   - Integrasi dengan pembaca RSS

6. **Notifikasi Artikel Baru**
   - Sistem notifikasi untuk artikel baru
   - Langganan email untuk artikel terbaru