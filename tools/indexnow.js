#!/usr/bin/env node
// Submits every URL in sitemap.xml to IndexNow (https://www.indexnow.org/documentation), which passes it
// on to the participating search engines (Bing, Yandex, Seznam, Naver and others). The deploy workflow
// runs it after each GitHub Pages deploy. The key is indexNowKey in site.config.js; tools/build.js
// publishes it as /<key>.txt, where the search engines check it.
// Usage: node tools/indexnow.js   (node tools/indexnow.js --dry-run prints the request instead)
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const STATUS = {
  200: 'OK, URLs submitted', 202: 'Accepted, key validation pending', 400: 'Bad request',
  403: 'Key not valid (key file not found or does not match)', 422: 'URLs do not belong to the host, or the key does not match',
  429: 'Too many requests',
};

// The JSON body of the IndexNow POST: host, key, keyLocation and urlList (every sitemap URL).
function payload(site = require('../site.config.js'), sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8')) {
  const origin = new URL(site.url);
  const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].replace(/&amp;/g, '&'));
  return { host: origin.host, key: site.indexNowKey, keyLocation: `${origin.origin}/${site.indexNowKey}.txt`, urlList };
}

async function submit() {
  const site = require('../site.config.js');
  if (!site.indexNowKey) { console.log('IndexNow: no indexNowKey in site.config.js, nothing submitted.'); return; }
  const body = payload(site);
  if (process.argv.includes('--dry-run')) { console.log(`POST ${ENDPOINT}\n${JSON.stringify(body, null, 2)}`); return; }
  const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(body) });
  console.log(`IndexNow: ${res.status} ${STATUS[res.status] || res.statusText} (${body.urlList.length} URLs for ${body.host})`);
  if (res.status !== 200 && res.status !== 202) process.exitCode = 1;
}

module.exports = { payload, ENDPOINT };
if (require.main === module) submit().catch(err => { console.error(err); process.exitCode = 1; });
