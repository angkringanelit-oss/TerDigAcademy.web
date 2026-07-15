import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pnorvxmagvucopoxcshn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBub3J2eG1hZ3Z1Y29wb3hjc2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNzQ5MTYsImV4cCI6MjA3MjY1MDkxNn0.kDexMlW5XEQ9B9Xo619HtfUEEmOMEy9wRCxFen5EgA0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedGames() {
  console.log('Seeding games data...');
  
  const gamesData = [
    {
      title: 'Math Pop Quiz',
      description: 'Uji kemampuan matematikamu dengan serangkaian soal yang menantang!',
      category: 'Matematika',
      difficulty: 'Sedang',
      age_group: '6-12 tahun',
      players: '1',
      duration: '10-15 menit',
      rating: 4.8,
      plays: 1500,
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      mascot: 'Star Kids',
      rewards: ["Lencana Matematika","Poin XP","Sertifikat"],
      features: ["Timer Interaktif","Hint Cerdas","Level Adaptif"],
      game_url: 'https://wordwall.net/resource/12345/math-quiz',
      is_published: true
    },
    {
      title: 'Word Detective: Tebak Kata Kosmik',
      description: 'Jelajahi dunia kosmik sambil belajar kosakata baru dalam bahasa Indonesia!',
      category: 'Bahasa',
      difficulty: 'Mudah',
      age_group: '5-10 tahun',
      players: '1-4',
      duration: '15-20 menit',
      rating: 4.9,
      plays: 2200,
      thumbnail: 'https://img.youtube.com/vi/4GuqkCXf2z0/hqdefault.jpg',
      mascot: 'Quen Child',
      rewards: ["Kamus Digital","Gelar Penulis","Badge Bahasa"],
      features: ["Kosakata Baru","Hint Visual","Level Adaptif"],
      game_url: 'https://wordwall.net/resource/67890/word-detective',
      is_published: true
    },
    {
      title: 'Colorful Canva Creator',
      description: 'Kreasikan seni digital dengan alat-alat menarik di Canva!',
      category: 'Seni',
      difficulty: 'Mudah',
      age_group: '4-10 tahun',
      players: '1',
      duration: '20-30 menit',
      rating: 4.7,
      plays: 950,
      thumbnail: 'https://img.youtube.com/vi/abc123/hqdefault.jpg',
      mascot: 'Star Kids',
      rewards: ["Galeri Digital","Tools Premium","Badge Seniman"],
      features: ["Editor Drag & Drop","Template Kreatif","Export Hasil"],
      game_url: 'https://www.canva.com/design/DAE12345/edit',
      is_published: true
    }
  ];

  try {
    // Hapus data yang ada dulu
    const { error: deleteError } = await supabase
      .from('games')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Hapus semua data
    
    if (deleteError) {
      console.error('Error deleting existing data:', deleteError);
    } else {
      console.log('Existing data deleted');
    }
    
    // Masukkan data baru
    const { data, error } = await supabase
      .from('games')
      .insert(gamesData);
    
    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data seeded successfully:', data);
    }
  } catch (err) {
    console.error('Exception:', err);
  }
}

seedGames();