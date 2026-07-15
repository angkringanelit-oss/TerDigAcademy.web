#!/usr/bin/env node

// Script to verify deployment environment for TerDig Academy
import { existsSync, readFileSync } from 'fs';
import { execSync } from 'child_process';

console.log('🔍 Verifying TerDig Academy Deployment Environment...\n');

// Check Node.js version
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  console.log(`✅ Node.js version: ${nodeVersion}`);
} catch (error) {
  console.log('❌ Node.js is not installed');
  process.exit(1);
}

// Check if we're in the frontend directory
if (!existsSync('package.json')) {
  console.log('❌ Please run this script from the frontend directory');
  process.exit(1);
}

// Read package.json
const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));

// Check for required dependencies
const requiredDependencies = [
  'react',
  'react-dom',
  'react-router-dom',
  '@supabase/supabase-js',
  'vite'
];

console.log('\n📦 Checking dependencies...');
const missingDeps = [];

for (const dep of requiredDependencies) {
  if (!packageJson.dependencies[dep] && !packageJson.devDependencies[dep]) {
    missingDeps.push(dep);
  }
}

if (missingDeps.length > 0) {
  console.log('❌ Missing dependencies:');
  missingDeps.forEach(dep => console.log(`   - ${dep}`));
} else {
  console.log('✅ All required dependencies are present');
}

// Check for build script
if (packageJson.scripts && packageJson.scripts.build) {
  console.log('✅ Build script found:', packageJson.scripts.build);
} else {
  console.log('❌ No build script found in package.json');
}

// Check for required files
const requiredFiles = [
  'vite.config.ts',
  'index.html',
  'vercel.json'
];

console.log('\n📁 Checking required files...');
const missingFiles = [];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    missingFiles.push(file);
  }
}

if (missingFiles.length > 0) {
  console.log('❌ Missing required files:');
  missingFiles.forEach(file => console.log(`   - ${file}`));
} else {
  console.log('✅ All required files are present');
}

// Check vercel.json configuration
if (existsSync('vercel.json')) {
  try {
    const vercelConfig = JSON.parse(readFileSync('vercel.json', 'utf8'));
    console.log('\n⚙️  Checking vercel.json configuration...');
    
    if (vercelConfig.builds && vercelConfig.builds.length > 0) {
      console.log('✅ Build configuration found');
    } else {
      console.log('⚠️  No build configuration found');
    }
    
    if (vercelConfig.rewrites) {
      console.log('✅ Rewrite rules found');
    }
    
    if (vercelConfig.headers) {
      console.log('✅ Security headers found');
    } else {
      console.log('⚠️  No security headers found (recommended for production)');
    }
  } catch (error) {
    console.log('❌ Error parsing vercel.json:', error.message);
  }
}

// Check for environment variables
console.log('\n🔐 Checking environment variables...');
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_GROQ_PROXY_URL'
];

const missingEnvVars = [];

// Check if .env file exists
if (existsSync('.env')) {
  console.log('✅ .env file found');
  const envContent = readFileSync('.env', 'utf8');
  
  for (const envVar of requiredEnvVars) {
    if (!envContent.includes(envVar) && !process.env[envVar]) {
      missingEnvVars.push(envVar);
    }
  }
} else if (existsSync('.env.example')) {
  console.log('✅ .env.example file found (create .env file from this template)');
} else {
  console.log('⚠️  No environment file found');
  
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missingEnvVars.push(envVar);
    }
  }
}

if (missingEnvVars.length > 0) {
  console.log('❌ Missing required environment variables:');
  missingEnvVars.forEach(envVar => console.log(`   - ${envVar}`));
  console.log('\nPlease set these environment variables in your deployment environment.');
} else {
  console.log('✅ All required environment variables are set');
}

console.log('\n📋 Deployment Environment Verification Complete!');
if (missingDeps.length === 0 && missingFiles.length === 0 && missingEnvVars.length === 0) {
  console.log('🎉 Your environment is ready for deployment to Vercel!');
} else {
  console.log('⚠️  Please fix the issues above before deploying.');
}