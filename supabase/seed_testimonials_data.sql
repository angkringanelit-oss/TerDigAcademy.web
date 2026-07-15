-- Delete existing data to avoid conflicts
DELETE FROM testimonials;

-- Insert sample testimonials data
INSERT INTO testimonials (id, name, role, child_info, program, rating, content, avatar_url, achievement) VALUES
(1, 'Siti Nurhaliza', 'Ibu Rumah Tangga', 'Andi (Kelas 3 SD)', 'Bimbel TerDig Matematika', 5, 'Setelah mengikuti program Bimbel TerDig, nilai matematika anak saya meningkat drastis. Penjelasan yang disampaikan sangat mudah dipahami dan interaktif.', NULL, 'Juara 1 Olimpiade Matematika SD Kota'),
(2, 'Budi Santoso', 'Pegawai Swasta', 'Rina (Kelas 5 SD)', 'Sanggar Seni Digital - AI Art', 5, 'Anak saya yang awalnya tidak tertarik dengan seni menjadi sangat antusias setelah mengikuti program ini. Karya digital yang dihasilkan sangat luar biasa!', NULL, 'Juara Harapan 1 Lomba Digital Art Nasional'),
(3, 'Dewi Kartika', 'Guru SD', 'Tono (Kelas 2 SD)', 'Bimbel TerDig Bahasa Inggris', 4, 'Metode pembelajaran yang digunakan sangat menyenangkan untuk anak-anak. Anak saya menjadi lebih percaya diri dalam berbahasa Inggris sehari-hari.', NULL, 'Lulus Ujian Cambridge Young Learners English'),
(4, 'Ahmad Fauzi', 'Wiraswasta', 'Sari (Kelas 4 SD)', 'Sanggar Seni Digital - Desain Grafis', 5, 'Program ini benar-benar membuka dunia kreativitas anak saya. Dia sekarang bisa membuat desain sendiri untuk proyek sekolahnya.', NULL, 'Pameran Karya Digital di Sekolah'),
(5, 'Rina Permata', 'Dokter', 'Dedi (Kelas 6 SD)', 'Bimbel TerDig IPA', 5, 'Penjelasan konsep IPA menjadi mudah dimengerti melalui eksperimen virtual. Anak saya jadi lebih tertarik dengan sains dan teknologi.', NULL, 'Juara 2 Lomba Sains SD Provinsi'),
(6, 'Joko Widodo', 'Pengacara', 'Lina (Kelas 1 SD)', 'Sanggar Seni Digital - Animasi', 4, 'Anak saya belajar membuat animasi sederhana yang sangat menggemaskan. Program ini berhasil mengembangkan imajinasi dan kreativitasnya.', NULL, 'Video Animasi Terpilih Festival Anak Kreatif')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  child_info = EXCLUDED.child_info,
  program = EXCLUDED.program,
  rating = EXCLUDED.rating,
  content = EXCLUDED.content,
  avatar_url = EXCLUDED.avatar_url,
  achievement = EXCLUDED.achievement;