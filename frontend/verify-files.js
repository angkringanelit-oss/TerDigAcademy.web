import { existsSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

console.log('🔍 Memverifikasi file SEO...\n');

// Cek sitemap.xml
const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml');
if (existsSync(sitemapPath)) {
  console.log('✅ sitemap.xml: Ditemukan');
  const sitemapContent = readFileSync(sitemapPath, 'utf8');
  console.log('   Lokasi: ', sitemapPath);
  console.log('   Ukuran: ', statSync(sitemapPath).size, 'bytes');
  
  // Cek apakah menggunakan domain yang benar
  if (sitemapContent.includes('https://terdig-academy.vercel.app/')) {
    console.log('   📍 Domain: Benar (https://terdig-academy.vercel.app/)');
  } else {
    console.log('   ⚠️  Domain: Salah (tidak menggunakan https://terdig-academy.vercel.app/)');
  }
  
  // Hitung jumlah URL
  const urlCount = (sitemapContent.match(/<loc>/g) || []).length;
  console.log('   📍 Jumlah URL:', urlCount);
} else {
  console.log('❌ sitemap.xml: Tidak ditemukan');
}

console.log('');

// Cek robots.txt
const robotsPath = join(process.cwd(), 'public', 'robots.txt');
if (existsSync(robotsPath)) {
  console.log('✅ robots.txt: Ditemukan');
  const robotsContent = readFileSync(robotsPath, 'utf8');
  console.log('   Lokasi: ', robotsPath);
  console.log('   Ukuran: ', statSync(robotsPath).size, 'bytes');
  
  // Cek apakah mereferensikan sitemap yang benar
  if (robotsContent.includes('https://terdig-academy.vercel.app/sitemap.xml')) {
    console.log('   📍 Sitemap reference: Benar');
  } else {
    console.log('   ⚠️  Sitemap reference: Salah atau tidak ditemukan');
  }
} else {
  console.log('❌ robots.txt: Tidak ditemukan');
}

console.log('\n✅ Verifikasi selesai!');