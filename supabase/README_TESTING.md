# 🧪 TESTING INSTRUCTIONS FOR TERDIG ACADEMY

Dokumentasi untuk menjalankan berbagai test dalam project TerDig Academy.

**Versi Dokumentasi**: 1.0  
**Tanggal Update**: 12 Oktober 2025

## 📋 DAFTAR TEST YANG TERSEDIA

### 1. Test Artikel (Frontend)

#### Menjalankan Test Artikel Data
Test ini memverifikasi bahwa data artikel dapat diambil dengan benar dari database Supabase.

```bash
# Di direktori frontend
bun run dev
# Kemudian buka http://localhost:5173/test-articles di browser
```

#### Menjalankan Test Artikel Script
Test ini memverifikasi fungsi dasar pengambilan data artikel melalui script Node.js.

```bash
# Di direktori frontend
node test-articles.js
```

### 2. Test Artikel (Database)

#### Menjalankan Test SQL untuk Artikel
Test ini memverifikasi struktur tabel dan integritas data artikel di database.

```bash
# Di direktori root project
psql -h your-supabase-db-host -d your-database-name -U your-username -f supabase/test-articles-function.sql
```

Atau melalui CLI Supabase:

```bash
# Di direktori root project
supabase db reset
supabase db seed
```

### 3. Test Halaman Artikel (Manual)

#### Test Halaman Daftar Artikel
1. Buka browser dan kunjungi `http://localhost:5173/artikel`
2. Verifikasi bahwa:
   - Halaman dimuat tanpa error
   - Semua artikel yang dipublikasikan ditampilkan
   - Filter kategori berfungsi dengan benar
   - Pencarian berfungsi dengan benar
   - Tampilan responsif di berbagai ukuran layar

#### Test Halaman Detail Artikel
1. Klik pada salah satu artikel di halaman daftar
2. Verifikasi bahwa:
   - Halaman detail artikel dimuat dengan benar
   - Konten artikel ditampilkan dengan format yang benar
   - Artikel terkait ditampilkan
   - Navigasi kembali berfungsi

#### Test Modal Preview Artikel
1. Klik tombol "Baca" pada salah satu kartu artikel
2. Verifikasi bahwa:
   - Modal preview muncul dengan konten yang benar
   - Modal bisa ditutup dengan tombol X
   - Modal bisa ditutup dengan klik di luar modal

### 4. Test Integrasi Artikel dengan Fitur Lain

#### Test Navigasi
1. Pastikan link "Artikel" muncul di navbar
2. Pastikan klik link "Artikel" membawa ke halaman `/artikel`
3. Pastikan navigasi antar halaman artikel bekerja dengan benar

#### Test SEO
1. Periksa bahwa setiap halaman artikel memiliki:
   - Judul yang unik
   - Meta description yang sesuai
   - Structured data yang benar (jika diimplementasikan)

## 🛠️ ALAT TESTING TAMBAHAN

### 1. Browser Developer Tools
Gunakan Developer Tools di browser untuk:
- Memeriksa console log untuk error
- Memeriksa network requests untuk memastikan API calls berhasil
- Memeriksa elemen untuk memastikan tampilan benar
- Memeriksa performance untuk memastikan kecepatan loading

### 2. Supabase Dashboard
Gunakan dashboard Supabase untuk:
- Memeriksa struktur tabel articles
- Memeriksa data dalam tabel articles
- Memeriksa RLS policies
- Memeriksa logs untuk error

## 🧾 HASIL YANG DIHARAPKAN

### Test Berhasil
- Semua artikel yang dipublikasikan dapat diakses
- Tidak ada error dalam console browser
- Semua fungsi filter dan pencarian bekerja dengan benar
- Tampilan responsif di semua ukuran layar
- Navigasi antar halaman bekerja dengan benar

### Test Gagal
- Error dalam console browser
- Artikel tidak muncul atau tidak lengkap
- Fungsi filter atau pencarian tidak bekerja
- Tampilan tidak responsif
- Navigasi error

## 🆘 TROUBLESHOOTING

### Error Koneksi Database
1. Periksa kredensial Supabase di file `.env`
2. Pastikan URL dan API key benar
3. Periksa koneksi internet
4. Pastikan project Supabase aktif

### Error Tampilan
1. Periksa console browser untuk error CSS/JS
2. Pastikan semua file CSS dimuat dengan benar
3. Periksa struktur HTML untuk error

### Error Data
1. Periksa struktur tabel articles di database
2. Pastikan data artikel tersedia dan benar
3. Periksa RLS policies untuk memastikan akses publik

## 📞 DUKUNGAN

Untuk pertanyaan atau masalah teknis, hubungi tim pengembang atau buat issue di repository project.