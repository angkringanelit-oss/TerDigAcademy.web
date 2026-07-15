#!/usr/bin/env node

// Script to verify SEO implementation
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve(process.cwd(), 'public');
const indexPath = path.resolve(process.cwd(), 'index.html');

console.log('🔍 Verifying SEO Implementation...\n');

// Check if robots.txt exists
const robotsPath = path.join(publicDir, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  console.log('✅ robots.txt: Found');
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  if (robotsContent.includes('Sitemap:')) {
    console.log('  📍 Sitemap reference: Present');
  } else {
    console.log('  ⚠️  Sitemap reference: Missing');
  }
} else {
  console.log('❌ robots.txt: Not found');
}

// Check if sitemap.xml exists
const sitemapPath = path.join(publicDir, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  console.log('✅ sitemap.xml: Found');
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const urlCount = (sitemapContent.match(/<url>/g) || []).length;
  console.log(`  📍 URLs listed: ${urlCount}`);
} else {
  console.log('❌ sitemap.xml: Not found');
}

// Check index.html for SEO elements
if (fs.existsSync(indexPath)) {
  console.log('✅ index.html: Found');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Check for title
  if (indexContent.includes('<title>') && !indexContent.includes('<title>TerDig Academy</title>')) {
    console.log('  📍 Title tag: Optimized');
  } else {
    console.log('  ⚠️  Title tag: Missing or generic');
  }
  
  // Check for meta description
  if (indexContent.includes('name="description"')) {
    console.log('  📍 Meta description: Present');
  } else {
    console.log('  ⚠️  Meta description: Missing');
  }
  
  // Check for Open Graph tags
  if (indexContent.includes('property="og:title"')) {
    console.log('  📍 Open Graph tags: Present');
  } else {
    console.log('  ⚠️  Open Graph tags: Missing');
  }
  
  // Check for canonical tag
  if (indexContent.includes('rel="canonical"')) {
    console.log('  📍 Canonical tag: Present');
  } else {
    console.log('  ⚠️  Canonical tag: Missing');
  }
} else {
  console.log('❌ index.html: Not found');
}

// Check for SEO packages
const packageJsonPath = path.resolve(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  if (packageJson.dependencies && packageJson.dependencies['react-helmet-async']) {
    console.log('✅ react-helmet-async: Installed');
  } else {
    console.log('❌ react-helmet-async: Not installed');
  }
}

console.log('\n📋 Verification Complete!');
console.log('\nNext steps:');
console.log('1. Run "npm run sitemap" to generate dynamic sitemap with articles');
console.log('2. Deploy your site and verify with Google Search Console');
console.log('3. Test rich results with Google Rich Results Test');