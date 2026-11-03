#!/usr/bin/env node
// Checks the live site the way the Is Agentic audit and AI agents see it: Markdown content negotiation on
// the homepage (https://acceptmarkdown.com), a Markdown 404 body, and every machine-readable file.
// Requests follow redirects like `curl -L`, starting from the bare domain the audit scans.
// Usage: node tools/check-live.js [https://hazwoperosha.us]
// Behind an HTTP proxy, run it with NODE_USE_ENV_PROXY=1 (Node 22+). Exits 1 if any check fails.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = require('../site.config.js');
const SITE_URL = SITE.url.replace(/\/$/, '');
const START = (process.argv[2] || SITE_URL.replace('://www.', '://')).replace(/\/$/, '');
const UA = 'site-agent-readiness-check (+https://github.com/LJ-Web-Management/hazwoperosha.us)';

const results = [];
const check = (name, ok, detail, warnOnly = false) => results.push({ name, ok: !!ok, detail, warnOnly });
const varyAccept = res => (res.headers.get('vary') || '').split(',').map(s => s.trim().toLowerCase()).includes('accept');
const type = res => res.headers.get('content-type') || '';
async function get(p, accept) {
  const res = await fetch(START + p, { headers: { 'User-Agent': UA, ...(accept ? { Accept: accept } : {}) }, redirect: 'follow' });
  return { res, body: await res.text() };
}

async function main() {
  // 1. Markdown content negotiation on the homepage.
  {
    const { res, body } = await get('/', 'text/markdown');
    check('Accept: text/markdown on / returns 200', res.status === 200, `${res.status} ${res.url}`);
    check('... with Content-Type: text/markdown', type(res).startsWith('text/markdown'), type(res));
    check('... with Vary: Accept', varyAccept(res), `Vary: ${res.headers.get('vary')}`);
    check('... and a nonempty Markdown body', body.trim().length > 0 && /^# \S/.test(body) && !/<html/i.test(body), JSON.stringify(body.slice(0, 60)));
  }
  {
    const { res, body } = await get('/', 'text/html');
    check('Accept: text/html on / returns the HTML homepage', res.status === 200 && type(res).startsWith('text/html') && /<html/i.test(body), `${res.status} ${type(res)} ${res.url}`);
  }
  // 2. Agent-friendly 404.
  {
    const { res, body } = await get(`/__agent-404-probe-${Date.now().toString(36)}`, 'text/markdown');
    check('Unknown path returns 404', res.status === 404, `${res.status} ${res.url}`);
    check('... with a Markdown body (Content-Type: text/markdown)', type(res).startsWith('text/markdown'), type(res));
    check('... of at least 20 characters linking llms.txt or the sitemap', body.length >= 20 && /\/(llms\.txt|sitemap\.xml)\b/.test(body), `${body.length} characters`);
  }
  // 3. Machine-readable files: each matches the committed build and has the right type.
  const files = [
    ['/llms.txt', 'text/plain'], ['/llms-full.txt', 'text/plain'], ['/robots.txt', 'text/plain'],
    ['/sitemap.xml', 'xml'], ['/courses.json', 'application/json'], ['/index.md', 'text/markdown'], ['/404.md', 'text/markdown'],
  ];
  if (SITE.indexNowKey) files.push([`/${SITE.indexNowKey}.txt`, 'text/plain']);
  for (const [p, want] of files) {
    const { res, body } = await get(p);
    const local = fs.existsSync(path.join(ROOT, p)) ? fs.readFileSync(path.join(ROOT, p), 'utf8') : null;
    let valid = true;
    if (p.endsWith('.json')) try { JSON.parse(body); } catch { valid = false; }
    if (p.endsWith('.xml')) valid = /^<\?xml[^>]*\?>\s*<urlset /.test(body);
    check(`${p} is served (${want})`, res.status === 200 && type(res).includes(want) && valid, `${res.status} ${type(res)}`);
    // Generated files carry the build date, so only the deployed copy can be compared, not every build.
    if (local !== null && res.status === 200 && !/sitemap|\.md$/.test(p)) check(`${p} matches the committed file`, body === local, body === local ? '' : 'differs: not deployed yet (warning only)', true);
  }
  const sitemap = (await get('/sitemap.xml')).body;
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const bad = [];
  for (const u of urls) {
    const res = await fetch(u, { method: 'HEAD', headers: { 'User-Agent': UA } });
    if (res.status !== 200) bad.push(`${res.status} ${u}`);
  }
  check(`All ${urls.length} sitemap URLs return 200`, urls.length > 0 && !bad.length, bad.slice(0, 5).join(', '));

  const width = Math.max(...results.map(r => r.name.length));
  for (const r of results) console.log(`${r.ok ? 'PASS' : r.warnOnly ? 'WARN' : 'FAIL'}  ${r.name.padEnd(width)}  ${r.detail || ''}`);
  const failed = results.filter(r => !r.ok && !r.warnOnly).length;
  const warned = results.filter(r => !r.ok && r.warnOnly).length;
  console.log(`\n${results.length - failed - warned}/${results.length} checks passed, ${failed} failed, ${warned} warnings for ${START}`);
  process.exitCode = failed ? 1 : 0;
}

main().catch(err => { console.error(err); process.exitCode = 1; });
