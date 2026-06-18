import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { INDEXABLE_PATHS } from './routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const PORT = 4173;
const HOST = '127.0.0.1';
const BASE = `http://${HOST}:${PORT}`;

function waitForServer(ms = 60000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = async () => {
      try {
        const res = await fetch(`${BASE}/`);
        if (res.ok) return resolve();
      } catch {
        /* retry */
      }
      if (Date.now() - start > ms) return reject(new Error('Preview server timeout'));
      setTimeout(tick, 400);
    };
    tick();
  });
}

function startPreview() {
  return spawn('npm', ['run', 'preview', '--', '--port', String(PORT), '--host', HOST], {
    cwd: join(__dirname, '..'),
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

function outputPath(route) {
  if (route === '/') return join(distDir, 'index.html');
  return join(distDir, route.slice(1), 'index.html');
}

async function prerenderRoute(context, route) {
  const page = await context.newPage();
  await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector('#root', { state: 'attached', timeout: 15000 });
  await page.waitForFunction(
    () => document.querySelector('#root')?.innerHTML.trim().length > 100,
    { timeout: 30000 },
  );
  const html = await page.content();
  const out = outputPath(route);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html, 'utf8');
  console.log(`[prerender] ${route}`);
  await page.close();
}

async function main() {
  if (process.env.SKIP_PRERENDER === '1') {
    console.log('[prerender] SKIP_PRERENDER=1 — ignorado');
    return;
  }

  if (process.env.VERCEL === '1' && process.env.ENABLE_PRERENDER !== '1') {
    console.log('[prerender] ignorado na Vercel (defina ENABLE_PRERENDER=1 + playwright install chromium para ativar)');
    return;
  }

  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    console.warn('[prerender] Playwright não instalado — execute: npx playwright install chromium');
    return;
  }

  const server = startPreview();
  server.stdout?.on('data', () => {});
  server.stderr?.on('data', () => {});

  try {
    await waitForServer();
    let browser;
    try {
      browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      });
    } catch (err) {
      console.warn('[prerender] Chromium indisponível — build continua sem pré-render:', err.message);
      return;
    }
    const context = await browser.newContext();

    for (const route of INDEXABLE_PATHS) {
      await prerenderRoute(context, route);
    }

    await prerenderRoute(context, '/404');
    const notFoundHtml = readFileSync(outputPath('/404'), 'utf8');
    writeFileSync(join(distDir, '404.html'), notFoundHtml, 'utf8');
    console.log('[prerender] /404 → 404.html');

    await browser.close();
    console.log(`[prerender] ${INDEXABLE_PATHS.length + 1} páginas geradas`);
  } finally {
    server.kill('SIGTERM');
    setTimeout(() => {
      try {
        server.kill('SIGKILL');
      } catch {
        /* already stopped */
      }
    }, 3000).unref?.();
  }
}

main().catch((err) => {
  console.warn('[prerender] falhou — build continua sem pré-render:', err.message);
});
