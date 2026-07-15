-- Delete existing data to avoid conflicts
DELETE FROM gallery;

-- Insert sample gallery data
INSERT INTO gallery (id, title, description, category, image_url, event_date, location, author_name, author_age, participants, year, icon, tags, is_featured, is_published, created_at, updated_at) VALUES 
(1, 'Lukisan Digital Alam', 'Karya seni digital oleh siswa Kelas 4 SD', 'karya', 'https://pnorvxmagvucopoxcshn.supabase.co/storage/v1/object/public/gallery/karya-1.jpeg', NULL, NULL, 'Budi', 10, NULL, NULL, 'Palette', ARRAY['digital', 'alam'], true, true, '2025-10-05 09:42:37.588277+00', '2025-10-05 09:42:37.588277+00'),
(2, 'Pameran Karya Seni Digital Anak', 'Showcase karya terbaik siswa Sanggar Seni Digital', 'event', 'https://pnorvxmagvucopoxcshn.supabase.co/storage/v1/object/public/gallery/event-1.jpg', '2025-06-20', 'TerDig Academy Hall', NULL, NULL, '50+ Siswa', NULL, 'Palette', ARRAY['pameran', 'seni'], true, true, '2025-10-05 09:42:37.588277+00', '2025-10-05 09:42:37.588277+00'),
(3, 'Juara 1 Lomba Seni Digital Nasional', 'Prestasi juara 1 tingkat nasional oleh siswa Kelas 6', 'prestasi', 'https://pnorvxmagvucopoxcshn.supabase.co/storage/v1/object/public/gallery/prestasi-1.jpg', NULL, NULL, 'Ani', 12, NULL, '2025', 'Trophy', ARRAY['juara', 'nasional'], true, true, '2025-10-05 09:42:37.588277+00', '2025-10-05 09:42:37.588277+00')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  event_date = EXCLUDED.event_date,
  location = EXCLUDED.location,
  author_name = EXCLUDED.author_name,
  author_age = EXCLUDED.author_age,
  participants = EXCLUDED.participants,
  year = EXCLUDED.year,
  icon = EXCLUDED.icon,
  tags = EXCLUDED.tags,
  is_featured = EXCLUDED.is_featured,
  is_published = EXCLUDED.is_published,
  updated_at = NOW();