import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

console.log('🔍 Memverifikasi isi folder dist...\n');

// Cek folder dist
const distPath = join(process.cwd(), 'dist');
if (existsSync(distPath)) {
  console.log('✅ Folder dist: Ditemukan');
  
  // Cek index.html
  const indexPath = join(distPath, 'index.html');
  if (existsSync(indexPath)) {
    console.log('✅ index.html: Ditemukan');
  } else {
    console.log('❌ index.html: Tidak ditemukan');
  }
  
  // Cek sitemap.xml
  const sitemapPath = join(distPath, 'sitemap.xml');
  if (existsSync(sitemapPath)) {
    console.log('✅ sitemap.xml: Ditemukan');
    const sitemapContent = readFileSync(sitemapPath, 'utf8');
    
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
  
  // Cek robots.txt
  const robotsPath = join(distPath, 'robots.txt');
  if (existsSync(robotsPath)) {
    console.log('✅ robots.txt: Ditemukan');
    const robotsContent = readFileSync(robotsPath, 'utf8');
    
    // Cek apakah mereferensikan sitemap yang benar
    if (robotsContent.includes('https://terdig-academy.vercel.app/sitemap.xml')) {
      console.log('   📍 Sitemap reference: Benar');
    } else {
      console.log('   ⚠️  Sitemap reference: Salah atau tidak ditemukan');
    }
  } else {
    console.log('❌ robots.txt: Tidak ditemukan');
  }
  
  // Cek google verification file
  const googleVerifyPath = join(distPath, 'google3da1516c779eaea0.html');
  if (existsSync(googleVerifyPath)) {
    console.log('✅ google3da1516c779eaea0.html: Ditemukan');
  } else {
    console.log('❌ google3da1516c779eaea0.html: Tidak ditemukan');
  }
  
} else {
  console.log('❌ Folder dist: Tidak ditemukan');
}

console.log('\n✅ Verifikasi selesai!');