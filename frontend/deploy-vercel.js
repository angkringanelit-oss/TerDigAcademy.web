#!/usr/bin/env node

// Deployment script for TerDig Academy to Vercel
import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';

console.log('🚀 Starting TerDig Academy Vercel Deployment Process...\n');

// Check if Vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'pipe' });
  console.log('✅ Vercel CLI is installed');
} catch (error) {
  console.log('❌ Vercel CLI is not installed. Installing...');
  try {
    execSync('npm install -g vercel', { stdio: 'inherit' });
    console.log('✅ Vercel CLI installed successfully');
  } catch (installError) {
    console.error('❌ Failed to install Vercel CLI');
    process.exit(1);
  }
}

// Check if we're in the frontend directory
if (!existsSync('package.json')) {
  console.log('❌ Please run this script from the frontend directory');
  process.exit(1);
}

// Check for required environment variables
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_GROQ_PROXY_URL'
];

console.log('\n🔍 Checking environment variables...');
const missingEnvVars = [];

// Check if .env file exists
if (!existsSync('.env')) {
  console.log('⚠️  .env file not found. Checking environment variables...');
  
  // Check if environment variables are set
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missingEnvVars.push(envVar);
    }
  }
} else {
  console.log('✅ .env file found');
  
  // Read .env file to check for required variables
  const envContent = readFileSync('.env', 'utf8');
  for (const envVar of requiredEnvVars) {
    if (!envContent.includes(envVar) && !process.env[envVar]) {
      missingEnvVars.push(envVar);
    }
  }
}

if (missingEnvVars.length > 0) {
  console.log('❌ Missing required environment variables:');
  missingEnvVars.forEach(envVar => console.log(`   - ${envVar}`));
  console.log('\nPlease set these environment variables in Vercel project settings or in your .env file.');
  process.exit(1);
} else {
  console.log('✅ All required environment variables are set');
}

// Login to Vercel (if needed)
console.log('\n🔐 Logging in to Vercel...');
try {
  execSync('vercel login', { stdio: 'inherit' });
  console.log('✅ Logged in to Vercel successfully');
} catch (error) {
  console.log('ℹ️  Already logged in or login not required');
}

// Build the project
console.log('\n🏗️  Building the project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
}

// Deploy to Vercel
console.log('\n🚀 Deploying to Vercel...');
try {
  // Use --yes instead of deprecated --confirm
  execSync('vercel --prod --yes', { stdio: 'inherit' });
  console.log('✅ Deployment completed successfully');
} catch (error) {
  console.error('❌ Deployment failed');
  process.exit(1);
}

console.log('\n🎉 TerDig Academy has been successfully deployed to Vercel!');
console.log('You can now access your application at the provided URL.');