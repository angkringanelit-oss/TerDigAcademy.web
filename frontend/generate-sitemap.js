#!/usr/bin/env node

// Script to generate dynamic sitemap with articles from Supabase
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
const envPaths = ['.env.local', '.env'];
envPaths.forEach(envFile => {
  const envPath = path.resolve(process.cwd(), envFile);
  if (fs.existsSync(envPath)) {
    const env = fs.readFileSync(envPath, 'utf8');
    env.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key.trim()] = value.trim().replace(/["']/g, '');
      }
    });
  }
});

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Static pages
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/program', priority: '0.8', changefreq: 'monthly' },
  { path: '/tentang', priority: '0.7', changefreq: 'monthly' },
  { path: '/galeri', priority: '0.7', changefreq: 'weekly' },
  { path: '/testimoni', priority: '0.6', changefreq: 'monthly' },
  { path: '/artikel', priority: '0.9', changefreq: 'weekly' },
  { path: '/konsultasi-ai', priority: '0.8', changefreq: 'monthly' },
  { path: '/daftar', priority: '0.9', changefreq: 'monthly' }
];

// Generate sitemap
async function generateSitemap() {
  try {
    // Fetch published articles
    const { data: articles, error } = await supabase
      .from('articles')
      .select('slug, published_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
      process.exit(1);
    }

    // Get today's date for lastmod
    const today = new Date().toISOString().split('T')[0];

    // Build sitemap XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static pages
    staticPages.forEach(page => {
      xml += `  <url>\n`;
      xml += `    <loc>https://terdigacademy.com${page.path}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Add article pages
    articles.forEach(article => {
      xml += `  <url>\n`;
      xml += `    <loc>https://terdigacademy.com/artikel/${article.slug}</loc>\n`;
      xml += `    <lastmod>${article.published_at.split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += '</urlset>';

    // Write sitemap to public directory
    const publicDir = path.resolve(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, xml);
    console.log(`Sitemap generated successfully with ${staticPages.length + articles.length} URLs`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();