# 📋 RINGKASAN STRUKTUR WEB TERDIG ACADEMY

**Versi**: 1.4  
**Tanggal**: 12 Oktober 2025

---

## 🎯 VISI PLATFORM
TerDig Academy adalah platform pendidikan digital terdepan dengan dua pilar utama:
1. **Bimbel TerDig** - Fokus pada prestasi akademik
2. **Sanggar Seni Digital** - Fokus pada kreativitas dan seni digital

---

## 🏗️ ARSITEKTUR TEKNOLOGI

### Frontend
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **State Management**: React Hooks
- **Package Manager**: Bun
- **Game Engine**: Kaboom.js, Kaplay.js

### Backend
- **Platform**: Supabase (Backend-as-a-Service)
- **Database**: PostgreSQL
- **Authentication**: Supabase Auth
- **Edge Functions**: Deno (TypeScript)

---

## 📁 STRUKTUR DIREKTORI UTAMA

```
terdig_academy/
├── frontend/           # Aplikasi utama React
│   ├── components/     # Komponen UI utama (TestimonialsSection.tsx aktif)
│   ├── src/components/ # Komponen UI arsip (TestimonialsSection.tsx.bak)
│   └── ...
├── supabase/           # Konfigurasi dan fungsi backend
└── package.json        # Konfigurasi project
```

---

## 🌐 FITUR UTAMA PLATFORM

### 1. Dua Pilar Pendidikan
- **Akademik**: Program bimbingan belajar terstruktur
- **Kreatif**: Sanggar seni digital dengan berbagai media

### 2. Konten Edukatif
- **Video Edukasi**: Konten interaktif berbagai mata pelajaran
- **Game Edukatif**: Game dengan berbagai kategori (Matematika, Bahasa, Seni, Logika, Karakter) yang terintegrasi dengan database Supabase
- **Artikel Edukasi**: Artikel dan blog edukatif terkini
- **Program Terstruktur**: Program untuk berbagai kelompok usia

### 3. Interaksi Pengguna
- **Testimoni**: Ulasan dan prestasi pengguna
- **Konsultasi**: Gratis dengan tim ahli dan AI
- **Demo**: Pengalaman langsung platform
- **Trial**: Akses gratis selama 7 hari

### 4. Mascot Branding
- **Star Kids**: Mascot untuk Bimbel TerDig (akademik)
- **Quen Child**: Mascot untuk Sanggar Seni Digital (kreatif)

### 5. AI Integration
- **Konsultasi AI**: Chatbot Quen Child yang terintegrasi dengan Hugging Face melalui proxy aman di Supabase Edge Functions

---

## 📊 METRIK PLATFORM

- **Siswa Aktif**: 1000+
- **Rating Pengguna**: 4.9/5
- **Game Dimainkan**: 100K+
- **Pemain Aktif Game**: 10K+

## 🚀 DEPLOYMENT

- **Frontend**: Vercel (diasumsikan)
- **Backend**: Supabase
- **Database**: PostgreSQL
- **CI/CD**: Auto-deploy melalui Vercel

---

📝 *Dokumentasi ini memberikan gambaran tingkat tinggi tentang arsitektur dan fitur platform TerDig Academy.*