import { execSync } from 'child_process';

console.log('🚀 Memulai deployment sederhana...\n');

try {
  // Build project
  console.log('🏗️  Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build selesai\n');
  
  // Deploy ke Vercel
  console.log('🚀 Deploying ke Vercel...');
  execSync('vercel --prod --yes --token $VERCEL_TOKEN', { stdio: 'inherit' });
  console.log('✅ Deployment selesai\n');
  
} catch (error) {
  console.error('❌ Error:', error.message);
}