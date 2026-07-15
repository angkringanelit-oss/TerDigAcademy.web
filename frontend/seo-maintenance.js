#!/usr/bin/env node

// Script to automate SEO maintenance tasks
import { spawn } from 'child_process';

console.log('🚀 Starting SEO Maintenance Process...\n');

// Function to run a command and wait for completion
function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
    
    child.on('error', (error) => {
      reject(error);
    });
  });
}

// Main maintenance process
async function runMaintenance() {
  try {
    // Step 1: Generate updated sitemap
    console.log('📝 Step 1: Generating updated sitemap...');
    await runCommand('node', ['generate-sitemap.js']);
    
    // Step 2: Verify SEO implementation
    console.log('\n🔍 Step 2: Verifying SEO implementation...');
    await runCommand('node', ['verify-seo.js']);
    
    // Step 3: Summary
    console.log('\n✅ SEO Maintenance Completed Successfully!');
    console.log('\n📋 Summary of actions taken:');
    console.log('  • Generated updated sitemap with latest articles');
    console.log('  • Verified all SEO elements are properly implemented');
    console.log('\n💡 Next steps:');
    console.log('  • Commit and deploy the updated sitemap');
    console.log('  • Submit the new sitemap to Google Search Console');
    console.log('  • Monitor indexing status in Google Search Console');
    
  } catch (error) {
    console.error('\n❌ SEO Maintenance Failed:', error.message);
    process.exit(1);
  }
}

// Run the maintenance process
runMaintenance();