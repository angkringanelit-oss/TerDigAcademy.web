# 📚 PANDUAN PENGGUNAAN FITUR ARTIKEL TERDIG ACADEMY

Panduan lengkap untuk menggunakan dan mengelola fitur artikel edukasi di website TerDig Academy.

**Versi Dokumentasi**: 1.0  
**Tanggal Update**: 12 Oktober 2025

## 🎯 TUJUAN FITUR

Fitur artikel edukasi dirancang untuk:
1. Memberikan konten edukatif berkualitas kepada orang tua dan siswa
2. Meningkatkan engagement pengguna melalui konten yang informatif
3. Mendukung SEO website dengan konten fresh dan relevan
4. Menjadi sumber informasi tambahan tentang pendidikan digital

## 🖥️ CARA MENGGUNAKAN FITUR ARTIKEL

### Untuk Pengguna Website

1. **Mengakses Halaman Artikel**
   - Klik menu "Artikel" di navbar untuk membuka halaman daftar artikel
   - Atau kunjungi URL langsung: `/artikel`

2. **Membaca Artikel**
   - Klik pada kartu artikel untuk membuka halaman detail artikel
   - Atau klik tombol "Baca" untuk melihat preview dalam modal

3. **Mencari Artikel**
   - Gunakan kotak pencarian di bagian atas halaman untuk mencari artikel berdasarkan judul atau ringkasan
   - Ketik kata kunci dan tekan Enter atau klik ikon pencarian

4. **Memfilter Artikel Berdasarkan Kategori**
   - Gunakan dropdown filter untuk memilih kategori artikel:
     - Semua (menampilkan semua artikel)
     - Teknologi
     - Pendidikan
     - Kreativitas

5. **Navigasi**
   - Gunakan tombol kembali di halaman detail artikel untuk kembali ke daftar artikel
   - Gunakan navbar untuk navigasi ke halaman lain

### Untuk Administrator/Pengelola Konten

1. **Menambah Artikel Baru**
   - Masuk ke dashboard Supabase
   - Buka tabel `articles`
   - Klik tombol "Insert row" untuk menambah artikel baru
   - Isi kolom-kolom yang diperlukan:
     - `id`: ID unik untuk artikel (bisa menggunakan UUID)
     - `title`: Judul artikel
     - `slug`: Slug untuk URL artikel (harus unik dan menggunakan huruf kecil dengan tanda hubung)
     - `excerpt`: Ringkasan singkat artikel
     - `content`: Konten artikel dalam format HTML
     - `image_url`: URL gambar utama artikel
     - `category`: Kategori artikel (Teknologi, Pendidikan, Kreativitas)
     - `author`: Nama penulis artikel
     - `published_at`: Tanggal dan waktu publikasi
     - `is_published`: Set ke `true` untuk mempublikasikan artikel

2. **Mengedit Artikel**
   - Masuk ke dashboard Supabase
   - Buka tabel `articles`
   - Klik pada baris artikel yang ingin diedit
   - Ubah nilai kolom sesuai kebutuhan
   - Klik "Save" untuk menyimpan perubahan

3. **Menghapus Artikel**
   - Masuk ke dashboard Supabase
   - Buka tabel `articles`
   - Klik pada checkbox di sebelah kiri baris artikel yang ingin dihapus
   - Klik tombol "Delete" di bagian atas tabel

4. **Mengelola Kategori Artikel**
   - Kategori artikel saat ini terdiri dari:
     - Teknologi
     - Pendidikan
     - Kreativitas
   - Untuk menambah kategori baru, tambahkan ke dropdown di file `frontend/lib/articleTypes.ts`
   - Pastikan kategori baru juga ditambahkan di file `frontend/pages/ArticlesPage.tsx`

## 🛠️ STRUKTUR KONTEN ARTIKEL

### Format Konten

Konten artikel disimpan dalam format HTML untuk memungkinkan formatting yang kaya:

```html
<p>Paragraf teks biasa</p>
<h2>Header tingkat 2</h2>
<ul>
  <li>Item daftar tidak berurut</li>
  <li>Item lainnya</li>
</ul>
<ol>
  <li>Item daftar berurut</li>
  <li>Item lainnya</li>
</ol>
```

### Gambar

- Gunakan URL gambar dari penyedia layanan gambar seperti Unsplash, Pexels, atau hosting sendiri
- Pastikan gambar memiliki resolusi yang cukup tinggi (minimal 1200px lebar)
- Gunakan format gambar yang dioptimalkan untuk web (JPG, PNG, atau WebP)

### Praktik Terbaik

1. **SEO**
   - Gunakan judul yang deskriptif dan mengandung kata kunci
   - Buat ringkasan yang menarik dan informatif
   - Gunakan heading yang terstruktur (h2, h3, dst.)
   - Tambahkan alt text untuk gambar

2. **Usability**
   - Buat paragraf pendek untuk kemudahan pembacaan
   - Gunakan daftar untuk informasi yang terstruktur
   - Tambahkan gambar untuk memecah teks yang panjang
   - Pastikan konten mudah dipahami oleh target audience (orang tua)

3. **Performa**
   - Optimalkan ukuran gambar
   - Hindari terlalu banyak gambar dalam satu artikel
   - Gunakan lazy loading untuk gambar

## 🧪 TESTING FITUR ARTIKEL

### Menjalankan Test Script

Untuk memastikan fitur artikel bekerja dengan benar, jalankan test script:

```bash
# Di direktori frontend
node test-articles.js
```

Script ini akan menguji:
1. Pengambilan semua artikel yang dipublikasikan
2. Pengambilan artikel berdasarkan slug
3. Pengambilan artikel berdasarkan kategori
4. Pencarian artikel berdasarkan kata kunci

### Manual Testing

1. **Halaman Daftar Artikel**
   - Pastikan semua artikel yang dipublikasikan ditampilkan
   - Pastikan filter kategori bekerja dengan benar
   - Pastikan pencarian bekerja dengan benar
   - Pastikan tampilan responsif di berbagai ukuran layar

2. **Halaman Detail Artikel**
   - Pastikan artikel ditampilkan dengan benar
   - Pastikan artikel terkait ditampilkan
   - Pastikan navigasi kembali bekerja
   - Pastikan tampilan responsif di berbagai ukuran layar

3. **Modal Preview**
   - Pastikan konten artikel ditampilkan dengan benar dalam modal
   - Pastikan modal bisa ditutup dengan tombol X atau klik di luar modal

## 🚀 DEPLOYMENT

### Migration Database

Untuk menerapkan struktur tabel artikel ke database:

```bash
# Di direktori root project
supabase migration up
```

### Seeding Data

Untuk mengisi tabel artikel dengan data awal:

```bash
# Di direktori root project
supabase db seed
```

Atau jalankan file seed secara manual:

```bash
# Di direktori root project
psql -h your-supabase-db-host -d your-database-name -U your-username -f supabase/seed_articles_data.sql
```

## 🆘 TROUBLESHOOTING

### Artikel Tidak Muncul

1. **Periksa Status Publikasi**
   - Pastikan kolom `is_published` bernilai `true`
   - Periksa tanggal publikasi di kolom `published_at`

2. **Periksa RLS (Row Level Security)**
   - Pastikan policy memungkinkan akses publik ke artikel yang dipublikasikan

3. **Periksa Koneksi Database**
   - Pastikan kredensial Supabase di file `.env` benar
   - Periksa koneksi internet

### Error pada Halaman Artikel

1. **Periksa Console Browser**
   - Buka Developer Tools > Console untuk melihat error
   - Perhatikan pesan error dan stack trace

2. **Periksa Network Requests**
   - Buka Developer Tools > Network untuk melihat request ke API
   - Perhatikan status code dan response

3. **Periksa File Konfigurasi**
   - Pastikan file `supabaseClient.ts` dikonfigurasi dengan benar
   - Periksa environment variables

### Masalah dengan Gambar

1. **Gambar Tidak Muncul**
   - Periksa URL gambar di kolom `image_url`
   - Pastikan URL gambar dapat diakses
   - Periksa koneksi internet

2. **Gambar Tidak Responsif**
   - Pastikan class CSS untuk gambar sudah benar
   - Periksa ukuran gambar asli

## 📞 DUKUNGAN

Untuk pertanyaan atau masalah teknis, hubungi tim pengembang atau buat issue di repository project.