import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

async function copy404() {
  const distIndex = resolve(process.cwd(), 'dist', 'index.html');
  const dist404 = resolve(process.cwd(), 'dist', '404.html');
  try {
    const data = await readFile(distIndex, 'utf8');
    await writeFile(dist404, data, 'utf8');
    console.log('Copied dist/index.html to dist/404.html');
  } catch (err) {
    console.error('Failed to copy index.html to 404.html:', err);
    process.exit(1);
  }
}

copy404();
