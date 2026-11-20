import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distIndex = path.join(__dirname, 'dist', 'index.html');
const dist404 = path.join(__dirname, 'dist', '404.html');

try {
  if (fs.existsSync(distIndex)) {
    fs.copyFileSync(distIndex, dist404);
    console.log('Successfully generated dist/404.html for SPA static fallback.');
  }
} catch (err) {
  console.error('Failed to copy 404.html:', err);
}
