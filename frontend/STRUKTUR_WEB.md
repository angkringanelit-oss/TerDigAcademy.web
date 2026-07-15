# 🏗️ STRUKTUR WEB TERDIG ACADEMY

Dokumentasi struktur web TerDig Academy - Platform pendidikan digital dengan dua pilar: Bimbel TerDig dan Sanggar Seni Digital.

**Bahasa**: Indonesia  
**Versi Dokumentasi**: 2.1  
**Tanggal Update**: 3 Januari 2026

### Catatan Struktur:
- File `supabaseClient.ts` ada di dua lokasi: 
  - `frontend/lib/supabaseClient.ts` (DIGUNAKAN)
  - `frontend/src/lib/supabaseClient.ts` (TIDAK DIGUNAKAN)
- Halaman `EducationalGamesPage.tsx` ada di dua lokasi:
  - `frontend/pages/EducationalGamesPage.tsx` (DIGUNAKAN)
  - `frontend/src/pages/EducationalGamesPage.tsx` (TIDAK DIGUNAKAN - versi lama)
- Komponen `ProgramSection.tsx` dan `RegistrationForm.tsx` ada di dua lokasi:
  - `frontend/components/ProgramSection.tsx` (DIGUNAKAN)
  - `frontend/components/RegistrationForm.tsx` (DIGUNAKAN)
  - `frontend/src/components/ProgramSection.tsx` (TIDAK DIGUNAKAN - versi lama)
  - `frontend/src/components/RegistrationForm.tsx` (TIDAK DIGUNAKAN - versi lama)
- Komponen `TestimonialsSection.tsx` yang digunakan adalah yang berada di direktori `components/`:
  - `frontend/components/TestimonialsSection.tsx` (DIGUNAKAN)
  - `frontend/src/components/TestimonialsSection.tsx.bak` (TIDAK DIGUNAKAN - arsip)
- Halaman `PaketLengkapPage.tsx`:
  - `frontend/pages/PaketLengkapPage.tsx` (DIGUNAKAN)
  - `frontend/src/pages/PaketLengkapPage.tsx.archived` (TIDAK DIGUNAKAN - arsip)

---

## 📁 STRUKTUR DIREKTORI UTAMA

```
terdig_academy/
├── frontend/                     # Aplikasi utama React
│   ├── assets/                   # Asset gambar dan media
│   ├── components/               # Komponen UI utama (DIGUNAKAN)
│   │   ├── auth/                 # Komponen autentikasi
│   │   ├── ui/                   # Komponen UI dasar
│   │   └── *.tsx                 # Komponen halaman (DIGUNAKAN)
│   ├── hooks/                    # Custom React hooks (DIGUNAKAN)
│   ├── lib/                      # Library dan utilitas (DIGUNAKAN)
│   ├── pages/                    # Halaman utama aplikasi (DIGUNAKAN)
│   ├── src/                      # Direktori cadangan/arsip
│   │   ├── components/           # Komponen UI arsip (TIDAK DIGUNAKAN)
│   │   ├── lib/                  # Library arsip (TIDAK DIGUNAKAN)
│   │   └── pages/                # Halaman arsip (TIDAK DIGUNAKAN)
│   ├── App.tsx                   # Routing aplikasi
│   └── ...
├── supabase/                     # Konfigurasi dan fungsi backend
│   ├── functions/                # Supabase Edge Functions
│   ├── migrations/               # File migrasi database
│   └── ...
└── package.json                  # Konfigurasi project
```

---

## 🌐 FRONTEND (React + TypeScript + Vite)

### Teknologi Utama:
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Package Manager**: Bun
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Shadcn/ui + Custom Components
- **State Management**: React Hooks
- **Backend Integration**: Supabase JS Client
- **Game Engine**: Kaboom.js, Kaplay.js
- **Deployment**: Vercel

### Integrasi Database:
- **Platform Backend**: Supabase
- **Pengambilan Data**: Real-time melalui Supabase JS Client
- **Tabel Utama**: 
  - `programs` - Data program pendidikan
  - `games` - Data game edukatif
  - `testimonials` - Testimoni pengguna
  - `videos` - Video edukasi
  - `gallery` - Data galeri dan prestasi
  - `consultations` - Permintaan konsultasi gratis
  - `articles` - Artikel edukasi

#### Tabel `articles`:
- **Fungsi**: Menyimpan artikel edukasi dan blog untuk pengguna platform
- **Kolom**:
  - `id` (text) - Primary key
  - `title` (text) - Judul artikel
  - `slug` (text) - Slug untuk URL artikel
  - `excerpt` (text) - Ringkasan artikel
  - `content` (text) - Konten artikel dalam format HTML
  - `image_url` (text) - URL gambar utama artikel
  - `category` (text) - Kategori artikel
  - `author` (text) - Nama penulis artikel
  - `published_at` (timestamptz) - Waktu publikasi artikel
  - `is_published` (boolean) - Status publikasi artikel
  - `created_at` (timestamptz) - Waktu dibuat
  - `updated_at` (timestamptz) - Waktu diperbarui

#### Integrasi Artikel:
- Artikel diambil dari database Supabase menggunakan halaman `ArticlesPage.tsx` dan `ArticleDetailPage.tsx`
- Halaman menggunakan hook `useEffect` untuk mengambil data saat komponen dimuat
- Data ditampilkan dalam grid responsif dengan informasi lengkap
- Setiap artikel memiliki halaman detail yang dapat diakses melalui slug
- Tabel menggunakan RLS (Row Level Security) dengan policy yang memungkinkan akses SELECT untuk publik
- Artikel hanya ditampilkan jika `is_published` bernilai `true`

#### Tabel `testimonials`:
- **Fungsi**: Menyimpan testimonial dari pengguna platform
- **Kolom**:
  - `id` (SERIAL) - Primary key
  - `name` (text) - Nama orang tua
  - `role` (text) - Pekerjaan orang tua
  - `child_info` (text) - Informasi anak
  - `program` (text) - Program yang diikuti
  - `rating` (integer) - Rating (1-5)
  - `content` (text) - Isi testimoni
  - `avatar_url` (text) - URL avatar (opsional)
  - `achievement` (text) - Prestasi anak
  - `created_at` (timestamptz) - Waktu dibuat

#### Integrasi Testimonial:
- Testimonial diambil dari database Supabase menggunakan komponen `TestimonialsSection.tsx`
- Komponen menggunakan hook `useEffect` untuk mengambil data saat komponen dimuat
- Data ditampilkan dalam grid responsif dengan informasi lengkap
- File `TestimonialsSection.tsx` yang diarsipkan (`src/components/TestimonialsSection.tsx.bak`) tidak digunakan lagi
- Tabel menggunakan RLS (Row Level Security) dengan policy yang memungkinkan akses SELECT untuk publik
- Data seed diisi dengan 6 testimonial sample yang mencakup berbagai program dan rating

#### Tabel `consultations`:
- **Fungsi**: Menyimpan permintaan konsultasi gratis dari pengguna
- **Kolom**:
  - `id` (uuid) - Primary key
  - `parent_name` (text) - Nama orang tua
  - `parent_phone` (text) - Nomor telepon orang tua
  - `child_name` (text) - Nama anak
  - `child_age` (integer) - Usia anak (opsional)
  - `child_grade` (text) - Kelas anak (opsional)
  - `preferred_time` (timestamptz) - Waktu konsultasi yang diinginkan (opsional)
  - `consultation_type` (text) - Tipe konsultasi
  - `program_interest` (text) - Program yang diminati (opsional)
  - `additional_info` (text) - Informasi tambahan (opsional)
  - `status` (text) - Status konsultasi (default: 'pending')
  - `created_at` (timestamptz) - Waktu dibuat
  - `updated_at` (timestamptz) - Waktu diperbarui

#### Integrasi Konsultasi:
- Halaman KonsultasiGratis sekarang terintegrasi dengan database Supabase untuk menyimpan permintaan konsultasi
- Data konsultasi disimpan dalam tabel `consultations` dengan struktur yang sesuai
- Hook `useRegistration` digunakan untuk mengelola proses pendaftaran konsultasi
- Tabel menggunakan RLS (Row Level Security) dengan policy yang memungkinkan INSERT publik

### Struktur Direktori Frontend (File yang DIGUNAKAN):

```
frontend/
├── assets/
│   ├── Star Kids.png
│   ├── Quen Child.png
│   └── logo terdig desain.png
├── components/
│   ├── auth/
│   │   └── AuthModals.tsx
│   ├── ui/
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── input.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   └── toaster.tsx
│   ├── EducationalFeaturesSection.tsx
│   ├── FinalCTASection.tsx
│   ├── Footer.tsx
│   ├── GameFormModal.tsx
│   ├── GameModal.tsx
│   ├── HeroSection.tsx
│   ├── Logo.tsx
│   ├── Mascot.tsx
│   ├── Navbar.tsx
│   ├── ProductsSection.tsx
│   ├── ProgramSection.tsx         (DIGUNAKAN)
│   ├── RegistrationForm.tsx       (DIGUNAKAN)
│   ├── SuccessModal.tsx
│   └── TestimonialsSection.tsx    (DIGUNAKAN)
├── hooks/
│   ├── use-toast.ts
│   └── useRegistration.ts
├── lib/
│   ├── articleTypes.ts            (DIGUNAKAN)
│   ├── featureFlags.ts
│   ├── logger.ts
│   ├── supabaseClient.ts          (DIGUNAKAN)
│   └── utils.ts
├── pages/
│   ├── game/
│   │   └── play/
│   │       └── [id].tsx
│   ├── AIConsultationPage.tsx
│   ├── AboutPage.tsx
│   ├── ArticlesPage.tsx           (DIGUNAKAN)
│   ├── ArticleDetailPage.tsx      (DIGUNAKAN)
│   ├── CobaGratisPage.tsx
│   ├── DemoPage.tsx
│   ├── EducationalGamesPage.tsx   (DIGUNAKAN)
│   ├── GalleryPage.tsx
│   ├── HomePage.tsx
│   ├── KonsultasiGratisPage.tsx
│   ├── PaketLengkapPage.tsx       (DIGUNAKAN)
│   ├── ProgramPage.tsx
│   ├── TestimonialsPage.tsx
│   └── VideoEducationPage.tsx
├── public/
│   ├── google3da1516c779eaea0.html
│   ├── robots.txt
│   └── sitemap.xml
├── App.tsx
├── config.ts
├── global.d.ts
├── index.css
├── index.html
├── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### File yang TIDAK DIGUNAKAN (Arsip):

```
frontend/src/
├── components/
│   ├── ProgramSection.tsx         (TIDAK DIGUNAKAN - versi lama)
│   ├── RegistrationForm.tsx       (TIDAK DIGUNAKAN - versi lama)
│   └── TestimonialsSection.tsx.bak (TIDAK DIGUNAKAN - arsip)
├── lib/
│   └── supabaseClient.ts          (TIDAK DIGUNAKAN - duplikat)
└── pages/
    ├── EducationalGamesPage.tsx    (TIDAK DIGUNAKAN - versi lama)
    └── PaketLengkapPage.tsx.archived (TIDAK DIGUNAKAN - arsip)
```

### Catatan Struktur:
- File `supabaseClient.ts` ada di dua lokasi: root direktori frontend dan dalam `src/lib/`
- Halaman `EducationalGamesPage.tsx` ada di dua lokasi: dalam `pages/` dan dalam `src/pages/`
- Komponen `ProgramSection.tsx` dan `RegistrationForm.tsx` ada di dua lokasi: dalam `components/` dan dalam `src/components/`
- Komponen `TestimonialsSection.tsx` yang digunakan adalah yang berada di direktori `components/`, sedangkan yang di `src/components/` telah diarsipkan sebagai `TestimonialsSection.tsx.bak`
- Halaman `PaketLengkapPage.tsx` telah diarsipkan dan dipindahkan ke `src/pages/PaketLengkapPage.tsx.archived`, namun routing untuk halaman ini masih aktif di App.tsx
- File `PaketLengkapPage.tsx` dalam direktori `pages/` merupakan file aktif yang digunakan untuk routing, sedangkan file dalam `src/pages/` adalah arsip

---

## 🗂️ KOMPONEN UTAMA (DIGUNAKAN)

### 1. Komponen Navigasi
- **Navbar.tsx**: Navigasi utama dengan menu desktop dan mobile, termasuk logo dan CTA buttons
- **Footer.tsx**: Footer komprehensif dengan informasi kontak, tautan cepat, layanan, newsletter, dan media sosial

### 2. Komponen Halaman Utama (HomePage)
- **HeroSection.tsx**: Bagian hero dengan mascot Star Kids dan Quen Child, CTA buttons untuk program akademik dan kreatif, serta statistik platform
- **ProgramSection.tsx**: Tampilan program akademik dan kreatif dengan tab, mengambil data dari database Supabase
- **EducationalFeaturesSection.tsx**: Fitur-fitur edukatif platform dengan ikon dan deskripsi
- **TestimonialsSection.tsx**: **Testimoni pengguna dengan rating dan pencapaian, mengambil data dari database Supabase secara real-time**
- **FinalCTASection.tsx**: Call-to-action akhir dengan countdown timer dan form pendaftaran email
- **ProductsSection.tsx**: Produk-produk TerDig Academy (dikondisikan dengan feature flag)

### 3. Komponen Formulir
- **RegistrationForm.tsx**: Formulir pendaftaran program dengan validasi dan integrasi Supabase
- **useRegistration.ts**: Hook kustom untuk mengelola pendaftaran konsultasi dan program
- **GameFormModal.tsx**: Formulir untuk game edukatif
- **SuccessModal.tsx**: Modal sukses setelah pendaftaran dengan konfirmasi dan detail

### 4. Komponen UI Kustom
- **Logo.tsx**: Komponen logo dengan berbagai ukuran dan opsi tampilan teks
- **Mascot.tsx**: Komponen mascot dengan animasi float/bounce dan berbagai ukuran
- **AuthModals.tsx**: Modal autentikasi (login/register)
- **GameModal.tsx**: Modal detail game edukatif dengan informasi lengkap dan tombol play

### 5. Komponen Game Edukatif
- **EducationalGamesPage.tsx**: Halaman utama game edukatif dengan filter kategori dan tingkat kesulitan
- **GameModal.tsx**: Modal detail game dengan informasi lengkap dan tombol play

### 6. Komponen Testimonial
- **TestimonialsSection.tsx**: **Komponen testimonial ringkas yang mengambil data dari database Supabase dan menampilkannya dalam grid responsif dengan informasi lengkap termasuk rating, program, dan prestasi**
- **TestimonialsPage.tsx**: **Halaman testimonial penuh yang juga terintegrasi dengan database Supabase untuk menampilkan data dinamis**

### 7. Komponen AI Consultation
- **AIConsultationPage.tsx**: **Halaman konsultasi AI dengan Quen Child yang terintegrasi dengan Hugging Face melalui proxy aman di Supabase Edge Functions. Menggunakan mascot Quen Child yang diimpor dengan benar dan menampilkan antarmuka chat yang interaktif.**

### 8. Komponen Tambahan
- **FinalCTASection.tsx**: Bagian call-to-action akhir dengan countdown dan form pendaftaran workshop gratis. Telah diperbarui dengan:
  - Pilihan mode workshop (Offline/Online)
  - Inline notification untuk status submit (success/error)
  - Validasi form yang lengkap
  - Reset state form setelah submit sukses
  - Tidak menggunakan toast notification
- **EducationalFeaturesSection.tsx**: Menampilkan fitur-fitur edukatif platform
- **ProductsSection.tsx**: Menampilkan produk-produk TerDig Academy dengan kondisional berdasarkan feature flags

---

## 📄 HALAMAN UTAMA (DIGUNAKAN)

1. **HomePage.tsx** (`/`) - Halaman beranda dengan hero section, program, fitur, testimoni, dan CTA
2. **ProgramPage.tsx** (`/program`) - Halaman program dengan tab akademik/kreatif, menampilkan daftar program dari database
3. **AboutPage.tsx** (`/tentang`) - Tentang TerDig Academy dengan informasi visi, misi, dan tim
4. **GalleryPage.tsx** (`/galeri`) - Galeri dan event dengan foto-foto kegiatan
5. **TestimonialsPage.tsx** (`/testimoni`) - Halaman testimoni lengkap dengan semua ulasan pengguna. **Sekarang terintegrasi dengan database Supabase untuk menampilkan data dinamis.**
6. **KonsultasiGratisPage.tsx** (`/konsultasi-gratis`) - **Konsultasi gratis dengan tim ahli pendidikan. Sekarang terintegrasi dengan database Supabase untuk menyimpan dan mengelola permintaan konsultasi. Sudah dilengkapi dengan informasi tambahan setelah tombol submit.**
7. **VideoEducationPage.tsx** (`/video-edukasi`) - Video edukasi interaktif dengan berbagai mata pelajaran
8. **EducationalGamesPage.tsx** (`/game-edukatif`) - Game edukatif dengan filter kategori dan tingkat kesulitan. Mengambil data dari database Supabase dan menggunakan link eksternal ke platform seperti Wordwall atau Canva.
9. **PaketLengkapPage.tsx** (`/paket-lengkap`) - Paket lengkap program dengan penawaran khusus. **File halaman ini telah diarsipkan ke `src/pages/PaketLengkapPage.tsx.archived` namun routing tetap aktif. File aktif yang digunakan untuk routing ada di `pages/PaketLengkapPage.tsx`.**
10. **CobaGratisPage.tsx** (`/coba-gratis`) - Trial gratis 7 hari untuk merasakan platform
11. **DemoPage.tsx** (`/demo`) - Demo platform dengan fitur-fitur utama
12. **AIConsultationPage.tsx** (`/konsultasi-ai`) - Konsultasi dengan AI untuk rekomendasi program. **Sekarang menggunakan asset Quen Child yang diimpor dengan benar.**
13. **ArticlesPage.tsx** (`/artikel`) - Halaman daftar artikel edukasi dari database Supabase
14. **ArticleDetailPage.tsx** (`/artikel/:slug`) - Halaman detail artikel berdasarkan slug
15. **[id].tsx** (`/game/play/:id`) - Halaman permainan berdasarkan ID game dari database

---

## 🎮 GAME EDUKATIF (DIGUNAKAN)

### Fitur Game:
- **Kategori**: Matematika, Bahasa, Seni & Kreativitas, Logika & Puzzle, Karakter
- **Tingkat Kesulitan**: Mudah, Sedang, Sulit
- **Platform**: Web-based (menggunakan layanan eksternal seperti Wordwall, Canva)
- **Engine**: Kaboom.js dan Kaplay.js untuk game interaktif

### Game yang Tersedia:
Game edukatif diambil dari database Supabase dan dapat berupa link eksternal ke platform seperti Wordwall atau Canva. Game memiliki berbagai kategori:
1. **Matematika** - Game yang membantu anak mengumpulkan angka untuk menyelesaikan misi matematika
2. **Seni & Kreativitas** - Membuat karya seni digital dalam studio kreatif
3. **Bahasa** - Game puzzle kata untuk melatih kosakata
4. **Logika & Puzzle** - Asah kemampuan berpikir logis dengan puzzle 3D
5. **Karakter** - Menanam dan merawat nilai-nilai karakter positif

Fitur tambahan:
- **Tracking Plays**: Setiap game memiliki penghitung jumlah dimainkan
- **Filtering**: Pengguna dapat memfilter game berdasarkan kategori dan tingkat kesulitan
- **Rewards System**: Setiap game menampilkan sistem penghargaan
- **Modal Detail**: Informasi lengkap tentang game ditampilkan dalam modal
- **Game URL**: Link ke game eksternal atau implementasi langsung dalam platform

---

## 🗄️ BACKEND & DATABASE (Supabase) (DIGUNAKAN)

### Teknologi:
- **Backend-as-a-Service**: Supabase
- **Database**: PostgreSQL
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Realtime**: Supabase Realtime
- **Edge Functions**: Deno (TypeScript)

### Struktur Database:

#### Tabel `videos`:
- **Fungsi**: Menyimpan video edukasi interaktif
- **Kolom**: 
  - `id` (uuid) - Primary key
  - `title` (text) - Judul video
  - `description` (text) - Deskripsi video
  - `duration` (text) - Durasi video
  - `level` (text) - Tingkat kesulitan
  - `category` (text) - Kategori video
  - `thumbnail` (text) - URL thumbnail
  - `views` (int) - Jumlah penayangan
  - `rating` (numeric) - Rating video
  - `interactive` (boolean) - Status interaktivitas
  - `mascot` (text) - Mascot terkait
  - `video_url` (text) - URL video
  - `created_at` (timestamp) - Waktu dibuat

#### Tabel `games`:
- **Fungsi**: Menyimpan informasi game edukatif
- **Kolom**:
  - `id` (uuid) - Primary key
  - `title` (text) - Judul game
  - `description` (text) - Deskripsi game
  - `category` (text) - Kategori game (matematika, bahasa, seni, logika, karakter)
  - `difficulty` (text) - Tingkat kesulitan (Mudah, Sedang, Sulit)
  - `age_group` (text) - Kelompok usia
  - `players` (text) - Jumlah pemain
  - `duration` (text) - Durasi permainan
  - `rating` (numeric) - Rating game
  - `plays` (integer) - Jumlah dimainkan
  - `thumbnail` (text) - URL thumbnail
  - `mascot` (text) - Mascot terkait
  - `rewards` (jsonb) - Hadiah dalam bentuk JSON
  - `features` (jsonb) - Fitur dalam bentuk JSON
  - `game_url` (text) - URL game eksternal (Wordwall, Canva, dll)
  - `is_published` (boolean) - Status publikasi
  - `created_at` (timestamptz) - Waktu dibuat

#### Integrasi Game:
- Game edukatif menggunakan layanan eksternal seperti Wordwall dan Canva
- Link game disimpan dalam kolom `game_url`
- Setiap kali pengguna memainkan game, counter `plays` akan bertambah
- Game dapat difilter berdasarkan `category` dan `difficulty`

#### Tabel `programs`:
- **Fungsi**: Menyimpan program-program TerDig Academy
- **Kolom**:
  - `id` (uuid) - Primary key
  - `title` (text) - Judul program
  - `description` (text) - Deskripsi program
  - `price` (text) - Harga program
  - `period` (text) - Periode pembayaran
  - `features` (jsonb) - Fitur program dalam bentuk JSON
  - `icon` (text) - Nama ikon
  - `gradient` (text) - Kelas gradient warna
  - `age_group` (text) - Kelompok usia
  - `popular` (boolean) - Status popularitas
  - `is_new` (boolean) - Status baru
  - `is_published` (boolean) - Status publikasi
  - `type` (text) - Tipe program (academic/creative)

#### Tabel `testimonials`:
- **Fungsi**: Menyimpan testimonial dari pengguna platform
- **Kolom**:
  - `id` (SERIAL) - Primary key
  - `name` (text) - Nama orang tua
  - `role` (text) - Pekerjaan orang tua
  - `child_info` (text) - Informasi anak
  - `program` (text) - Program yang diikuti
  - `rating` (integer) - Rating (1-5)
  - `content` (text) - Isi testimoni
  - `avatar_url` (text) - URL avatar (opsional)
  - `achievement` (text) - Prestasi anak
  - `created_at` (timestamptz) - Waktu dibuat

#### Integrasi Testimonial:
- Testimonial diambil dari database Supabase menggunakan komponen `TestimonialsSection.tsx`
- Komponen menggunakan hook `useEffect` untuk mengambil data saat komponen dimuat
- Data ditampilkan dalam grid responsif dengan informasi lengkap
- File `TestimonialsSection.tsx` yang diarsipkan (`src/components/TestimonialsSection.tsx.bak`) tidak digunakan lagi

#### Tabel `consultations`:
- **Fungsi**: Menyimpan permintaan konsultasi gratis dari pengguna
- **Kolom**:
  - `id` (uuid) - Primary key
  - `parent_name` (text) - Nama orang tua
  - `parent_phone` (text) - Nomor telepon orang tua
  - `child_name` (text) - Nama anak
  - `child_age` (integer) - Usia anak (opsional)
  - `child_grade` (text) - Kelas anak (opsional)
  - `preferred_time` (timestamptz) - Waktu konsultasi yang diinginkan (opsional)
  - `consultation_type` (text) - Tipe konsultasi
  - `program_interest` (text) - Program yang diminati (opsional)
  - `additional_info` (text) - Informasi tambahan (opsional)
  - `status` (text) - Status konsultasi (default: 'pending')
  - `created_at` (timestamptz) - Waktu dibuat
  - `updated_at` (timestamptz) - Waktu diperbarui

#### Integrasi Konsultasi:
- Halaman KonsultasiGratis sekarang terintegrasi dengan database Supabase untuk menyimpan permintaan konsultasi
- Data konsultasi disimpan dalam tabel `consultations` dengan struktur yang sesuai
- Hook `useRegistration` digunakan untuk mengelola proses pendaftaran konsultasi
- Tabel menggunakan RLS (Row Level Security) dengan policy yang memungkinkan INSERT publik

#### Tabel `gallery`:
- **Fungsi**: Menyimpan informasi galeri dan kegiatan
- **Kolom**:
  - `id` (uuid) - Primary key
  - `title` (text) - Judul gambar
  - `description` (text) - Deskripsi gambar
  - `image_url` (text) - URL gambar
  - `category` (text) - Kategori (event, achievement, activity, dll)
  - `created_at` (timestamptz) - Waktu dibuat

#### Integrasi Gallery:
- Galeri diambil dari database Supabase menggunakan komponen `GalleryPage.tsx`
- Komponen menggunakan hook `useEffect` untuk mengambil data saat komponen dimuat
- Data ditampilkan dalam tab berdasarkan kategori

---

## 🤖 EDGE FUNCTIONS (DIGUNAKAN)

### Fungsi yang Tersedia:
- **groq-proxy**: Proxy aman untuk akses API Groq dari client-side, digunakan untuk AI consultation
- **notify-telegram**: Mengirim notifikasi pendaftaran baru ke Telegram ketika ada pendaftaran melalui formulir
- **send-workshop-to-telegram**: Mengirim data pendaftaran workshop ke Telegram dan menyimpan ke tabel workshop_registrations di database Supabase. Telah diperbarui dengan:
  - Penggunaan environment variable yang benar (service_role_key)
  - Validasi environment variables
  - Support untuk workshop_mode (offline/online)
  - Penanganan error yang lebih baik

### Detail Fungsi:
- **groq-proxy**: 
  - Menggunakan API key Groq dari environment variables
  - Menyediakan endpoint aman untuk client-side tanpa mengungkapkan API key
  - Digunakan oleh `AIConsultationPage.tsx` untuk konsultasi dengan AI

---

## ⚙️ KONFIGURASI & ENVIRONMENT (DIGUNAKAN)

### File Konfigurasi:
- **config.ts**: Konfigurasi aplikasi (kontak, sosial media, feature flags)
- **supabaseClient.ts**: Koneksi ke Supabase
- **featureFlags.ts**: Pengaturan fitur berdasarkan kondisi
- **vite.config.ts**: Konfigurasi build Vite

### Environment Variables (.env):
- `VITE_SUPABASE_URL` - URL Supabase
- `VITE_SUPABASE_ANON_KEY` - Anonymous key Supabase
- `VITE_GROQ_API_KEY` - API key untuk Groq (jika digunakan langsung dari client, tapi sebaiknya dihindari)

### Environment Variables (Supabase Edge Functions):
- `GROQ_API_KEY` - API key untuk Groq (digunakan di server-side di edge functions)
- `TELEGRAM_BOT_TOKEN` - Token bot Telegram untuk notifikasi
- `TELEGRAM_CHAT_ID` - ID chat Telegram untuk pengiriman notifikasi

---

## 🎨 MASCOT & BRAND (DIGUNAKAN)

### Mascot TerDig Academy:
1. **Star Kids** - Mascot untuk Bimbel TerDig (akademik)
2. **Quen Child** - Mascot untuk Sanggar Seni Digital (kreatif)

### Brand Identity:
- **Warna Utama**: Biru, Ungu, Kuning, Hijau
- **Tagline**: "Belajar & Berkarya untuk Masa Depan Digital"
- **Konsep**: Dua pilar pendidikan - Akademik dan Kreatif

### Penggunaan Mascot:
- **Star Kids**: Digunakan di halaman-halaman terkait pendidikan akademik
- **Quen Child**: Digunakan di halaman-halaman terkait seni dan kreativitas
- **Keduanya**: Digunakan bersama di halaman beranda dan halaman game edukatif

### Animasi Mascot:
- **Float**: Efek mengapung untuk tampilan dinamis
- **Breathing**: Efek pernapasan halus
- **Bounce**: Efek melompat
- **Pulse**: Efek berdenyut

---

## 📊 STATISTIK PLATFORM (DIGUNAKAN)

### Metrik Utama:
- **Siswa Aktif**: 1000+
- **Rating Orang Tua**: 4.9/5
- **Game Dimainkan**: 100K+
- **Pemain Aktif Game**: 10K+

### Fitur Analitik:
- **Tracking Plays**: Pemantauan jumlah permainan
- **Rating System**: Sistem penilaian untuk konten
- **User Engagement**: Metrik keterlibatan pengguna

---

## 🚀 DEPLOYMENT (DIGUNAKAN)

### Platform:
- **Frontend**: Vercel
- **Backend**: Supabase
- **Database**: Supabase PostgreSQL
- **Edge Functions**: Supabase Edge Functions

### CI/CD:
- **Development**: `bun run dev`
- **Build**: `bun run build`
- **Deployment**: Vercel auto-deploy dari GitHub

### Deployment Scripts:
- **deploy-vercel.js**: Script untuk deployment ke Vercel
- **deploy-simple.js**: Script deployment sederhana
- **verify-deployment.js**: Verifikasi hasil deployment
- **verify-seo.js**: Verifikasi SEO setelah deployment
- **verify-dist.js**: Verifikasi hasil build
- **verify-files.js**: Verifikasi file-file penting

### SEO & Maintenance:
- **generate-sitemap.js**: Pembuatan sitemap otomatis
- **seo-maintenance.js**: Pemeliharaan SEO
- **validate-xml.js**: Validasi file XML

---

## 📞 KONTAK & SOSIAL MEDIA (DIGUNAKAN)

### Informasi Kontak:
- **WhatsApp**: +62 895339329650
- **Email**: terdig_official@gmail.com
- **Alamat**: Jl. Ambokulon Gang I No. 14, Dusun II RT 04 RW 02, Comal-Pemalang

### Media Sosial:
- **Facebook**: facebook.com/terdig
- **Instagram**: instagram.com/terdig.official
- **Twitter**: twitter.com/terdig
- **YouTube**: youtube.com/terdig
- **LinkedIn**: linkedin.com/company/terdig

---

## 🧩 KOMPONEN TAMBAHAN & INTEGRASI

### Sistem Notifikasi:
- **Telegram Integration**: Notifikasi otomatis ke Telegram saat ada pendaftaran baru
- **Edge Function**: Fungsi `notify-telegram` di Supabase

### AI Integration:
- **Groq API**: Digunakan untuk konsultasi AI
- **Hugging Face**: Alternatif untuk model AI
- **Edge Function Proxy**: Untuk keamanan API key

### SEO & Performansi:
- **Sitemap**: Generator otomatis untuk SEO
- **Meta Tags**: Manajemen meta tags untuk setiap halaman
- **Structured Data**: Schema.org markup

### Analytics:
- **Google Analytics**: Integrasi untuk pelacakan pengguna
- **Custom Events**: Pelacakan khusus untuk fitur penting

---

📝 *Dokumentasi ini dibuat untuk memberikan gambaran menyeluruh tentang struktur dan komponen web TerDig Academy. Dokumentasi ini akan diperbarui seiring dengan pengembangan platform.*

**Catatan Tambahan**:
- Versi 2.0 (1 Januari 2026): Pembaruan dokumentasi menyeluruh dengan informasi terbaru dari hasil analisis struktur web TerDig Academy termasuk detail komponen, integrasi, dan teknologi yang digunakan.
- Versi 2.1 (3 Januari 2026): Penambahan informasi tentang perubahan terbaru pada FinalCTASection.tsx (pilihan mode workshop, inline notification) dan perbaikan pada Supabase Edge Function send-workshop-to-telegram (environment variable, workshop_mode support).