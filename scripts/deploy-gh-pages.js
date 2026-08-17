import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

try {
  console.log('1. Building Vite production bundle...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('2. Creating temporary git deployment for gh-pages branch...');
  
  // Write a copy of index.html as 404.html in dist for SPA hash routing on GitHub Pages
  fs.copyFileSync(path.resolve('dist/index.html'), path.resolve('dist/404.html'));

  // Initialize a temp repo inside dist
  execSync('git init', { cwd: 'dist', stdio: 'inherit' });
  execSync('git config user.name "KoushikDesu"', { cwd: 'dist', stdio: 'inherit' });
  execSync('git config user.email "kingofstates2239@gmail.com"', { cwd: 'dist', stdio: 'inherit' });
  execSync('git checkout -b gh-pages', { cwd: 'dist', stdio: 'inherit' });
  execSync('git add -A', { cwd: 'dist', stdio: 'inherit' });
  execSync('git commit -m "deploy: Release built SmartPrep SPA to GitHub Pages"', { cwd: 'dist', stdio: 'inherit' });
  
  console.log('3. Pushing pre-built bundle to gh-pages branch...');
  execSync('git push -f https://github.com/KoushikDesu/SmartPrep.git gh-pages', { cwd: 'dist', stdio: 'inherit' });

  console.log('SUCCESS! Pre-built bundle pushed to gh-pages branch! 🎉');
} catch (err) {
  console.error('Deployment error:', err);
}
