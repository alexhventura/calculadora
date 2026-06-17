import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { INDEXABLE_PATHS, SITE_URL } from './routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const publicDir = join(__dirname, '..', 'public');

function priorityFor(path) {
  if (path === '/') return '1.0';
  if (path.startsWith('/calculadora-cdi') || path.startsWith('/calculadora-ipca')) return '0.95';
  if (path === '/clt-pj' || path === '/aposentadoria' || path === '/rescisao-trabalhista') return '0.9';
  if (path === '/conversor-de-moedas') return '0.85';
  if (path.startsWith('/blog/')) return '0.8';
  if (path.startsWith('/categoria/')) return '0.75';
  if (path.includes('politica') || path.includes('termos') || path.includes('isencao')) return '0.5';
  return '0.8';
}

function changefreqFor(path) {
  if (path === '/' || path.startsWith('/clt-pj') || path.startsWith('/aposentadoria') || path.startsWith('/rescisao')) return 'weekly';
  if (path.startsWith('/blog') || path.startsWith('/categoria')) return 'monthly';
  if (path.includes('politica') || path.includes('termos') || path.includes('isencao')) return 'yearly';
  return 'monthly';
}

const urls = INDEXABLE_PATHS.map(
  (path) =>
    `  <url><loc>${SITE_URL}${path}</loc><changefreq>${changefreqFor(path)}</changefreq><priority>${priorityFor(path)}</priority></url>`,
).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync(join(distDir, 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(join(distDir, 'robots.txt'), robots, 'utf8');
writeFileSync(join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
console.log(`[sitemap] ${INDEXABLE_PATHS.length} URLs → dist/sitemap.xml + public/sitemap.xml`);
