import fs from 'node:fs/promises';
import { chromium } from 'playwright';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

const base = process.argv[2] || 'http://localhost:3000';
const chromePath = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const dir = 'audit/baseline';
await fs.mkdir(dir, { recursive: true });
const browser = await chromium.launch({ executablePath: chromePath, headless: true });
const page = await browser.newPage();
const requests = new Map();
page.on('request', r => {
  const url = new URL(r.url());
  if (url.origin !== new URL(base).origin && /^https?:/.test(url.protocol)) {
    const key = `${url.origin} ${r.resourceType()}`;
    requests.set(key, { origin: url.origin, type: r.resourceType(), example: `${url.origin}${url.pathname}` });
  }
});
const xml = await (await fetch(new URL('/sitemap.xml', base))).text();
const paths = [...new Set([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname).concat('/privacy/', '/terms/'))];
const headings = {};
for (const path of paths) {
  await page.goto(new URL(path, base).href, { waitUntil: 'networkidle' });
  headings[path] = await page.locator('main h2').allTextContents();
  if (await page.locator('#comments').count()) {
    await page.locator('#comments').scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
  }
  console.log('Baseline', path);
}
await fs.writeFile(`${dir}/headings.json`, JSON.stringify(headings, null, 2) + '\n');
await fs.writeFile(`${dir}/origins.json`, JSON.stringify([...requests.values()], null, 2) + '\n');
await browser.close();
const chrome = await launch({ chromePath, chromeFlags: ['--headless', '--no-sandbox'] });
try {
  for (const [path, name] of [['/', 'home'], ['/2-dollar-bill-value/', 'two-dollar-value']]) {
    const { lhr } = await lighthouse(new URL(path, base).href, { port: chrome.port, output: 'json', logLevel: 'error' });
    await fs.writeFile(`${dir}/${name}.json`, JSON.stringify(lhr, null, 2));
    console.log(name, Object.fromEntries(Object.entries(lhr.categories).map(([k,v]) => [k,v.score * 100])), 'LCP', lhr.audits['largest-contentful-paint'].numericValue);
  }
} finally { await chrome.kill(); }
