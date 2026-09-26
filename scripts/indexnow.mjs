// Tells IndexNow engines (Bing, Yandex, Seznam, Naver, Yep) which pages changed.
// Runs after deploy (see docs/deploy.md). Submits URLs whose sitemap lastmod is
// within the last few days, so unchanged pages aren't re-sent on every deploy.
// Never fails the deploy: problems are logged and the script exits 0.
import { readFileSync } from 'node:fs';

const HOST = 'thefreetools.eu';
const KEY = 'ca512e5321bab68c790de85b45bbf3b2';
const RECENT_DAYS = 3;

try {
  const xml = readFileSync(new URL('../dist/sitemap-0.xml', import.meta.url), 'utf8');
  const cutoff = new Date(Date.now() - RECENT_DAYS * 864e5).toISOString().slice(0, 10);
  const urls = [...xml.matchAll(/<url><loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g)]
    .filter(([, , lastmod]) => lastmod >= cutoff)
    .map(([, loc]) => loc);

  if (process.argv.includes('--dry-run')) {
    console.log(`IndexNow (dry run): would submit ${urls.length} URL(s)`, urls);
  } else if (!urls.length) {
    console.log('IndexNow: no recently changed pages, nothing to submit.');
  } else {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
    });
    console.log(`IndexNow: submitted ${urls.length} URL(s), status ${res.status}`);
  }
} catch (err) {
  console.log('IndexNow: skipped:', err instanceof Error ? err.message : err);
}
