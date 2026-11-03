// Runs edge/worker.mjs against the built site, served the way GitHub Pages serves it.
// Run after `node tools/build.js`: node --test tests/*.test.js
const { test, before } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE_URL = /<link rel="canonical" href="([^"]+?)\/?">/.exec(fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8'))[1];
const TYPES = { '.html': 'text/html; charset=utf-8', '.md': 'text/markdown; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml', '.json': 'application/json; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.png': 'image/png' };

// edge/wrangler.toml: the Worker's routes and the canonical origin it serves Markdown for.
const WRANGLER = fs.readFileSync(path.join(ROOT, 'edge/wrangler.toml'), 'utf8');
const ENV = { CANONICAL_ORIGIN: /^CANONICAL_ORIGIN = "([^"]+)"$/m.exec(WRANGLER)[1] };
const ROUTES = [...WRANGLER.matchAll(/\{ pattern = "([^"]+)", zone_name = "([^"]+)" \}/g)].map(m => ({ pattern: m[1], zone: m[2] }));
const HOST = new URL(SITE_URL).hostname;
const APEX = HOST.replace(/^www\./, '');
const APEX_URL = `https://${APEX}`;

// GitHub Pages stand-in: the bare domain redirects to the custom domain in CNAME (www); directories
// redirect to a trailing slash and serve index.html; anything else missing is a 404 with 404.html.
const originCalls = [];
async function pages(request) {
  originCalls.push(new URL(request.url).pathname);
  const url = new URL(request.url);
  if (url.hostname !== HOST) {
    return new Response(request.method === 'HEAD' ? null : '<html><body>301 Moved Permanently</body></html>', {
      status: 301, headers: { Location: SITE_URL + url.pathname + url.search, 'Content-Type': 'text/html', 'Vary': 'Accept-Encoding' },
    });
  }
  const file = path.join(ROOT, decodeURIComponent(url.pathname));
  let target = null;
  if (file.startsWith(ROOT) && fs.existsSync(file)) {
    if (fs.statSync(file).isDirectory()) {
      if (!url.pathname.endsWith('/')) return new Response(null, { status: 301, headers: { Location: url.pathname + '/', 'Vary': 'Accept-Encoding' } });
      if (fs.existsSync(path.join(file, 'index.html'))) target = path.join(file, 'index.html');
    } else target = file;
  }
  const status = target ? 200 : 404;
  target = target || path.join(ROOT, '404.html');
  return new Response(request.method === 'HEAD' ? null : fs.readFileSync(target), {
    status, headers: { 'Content-Type': TYPES[path.extname(target)] || 'application/octet-stream', 'Vary': 'Accept-Encoding' },
  });
}

let worker;
before(async () => { worker = await import('../edge/worker.mjs'); });
const request = (u, accept, method = 'GET') => new Request(u, { method, headers: accept === undefined ? {} : { accept } });
const get = (p, accept, method) => worker.handle(request(SITE_URL + p, accept, method), pages, ENV);
const apex = (p, accept, method) => worker.handle(request(APEX_URL + p, accept, method), pages, ENV);
// curl -sS -L: follows redirects. Today's DNS: the bare domain is proxied through Cloudflare (the Worker
// runs), www is a DNS-only CNAME straight to GitHub Pages. proxied lists the hosts the Worker runs on.
async function curlL(u, accept, { method = 'GET', proxied = [APEX] } = {}) {
  for (let hops = 0; hops < 5; hops++) {
    const req = request(u, accept, method);
    const res = proxied.includes(new URL(u).hostname) ? await worker.handle(req, pages, ENV) : await pages(req);
    if (res.status < 300 || res.status > 399) return Object.assign(res, { finalUrl: u, hops });
    u = new URL(res.headers.get('location'), u).href;
  }
  throw new Error('redirect loop');
}
const varyAccept = res => (res.headers.get('vary') || '').split(',').map(s => s.trim().toLowerCase()).includes('accept');

test('Accept parsing follows the acceptmarkdown.com test vectors', () => {
  const both = ['text/html', 'text/markdown'];
  const cases = [
    ['text/markdown', both, 'text/markdown'],
    ['text/markdown, text/html;q=0.8', both, 'text/markdown'],
    ['text/html', both, 'text/html'],
    ['text/markdown;q=0, text/html', both, 'text/html'],
    ['text/markdown;q=0', ['text/markdown'], null],
    [null, both, 'text/html'],
    ['', both, 'text/html'],
    ['*/*', both, 'text/html'],
    ['text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8', both, 'text/html'],
    ['text/markdown, text/html, */*', both, 'text/markdown'],
    ['text/html;q=0, */*', both, 'text/markdown'],
    ['text/markdown;q=0.5, text/html;q=0.9', both, 'text/html'],
    ['TEXT/Markdown; Q=0.9, text/html;q=0.1', both, 'text/markdown'],
    ['text/*', both, 'text/html'],
    ['application/pdf', both, null],
  ];
  for (const [accept, produces, want] of cases) assert.equal(worker.preferredType(accept, produces), want, `Accept: ${accept}`);
});

test('markdownPath maps page URLs to their index.md', () => {
  assert.equal(worker.markdownPath('/'), '/index.md');
  assert.equal(worker.markdownPath('/about'), '/about/index.md');
  assert.equal(worker.markdownPath('/about/'), '/about/index.md');
  assert.equal(worker.markdownPath('/index.html'), '/index.md');
  assert.equal(worker.markdownPath('/checkout.html'), '/checkout.md');
});

test('homepage: Accept text/markdown gets Markdown with Vary: Accept', async () => {
  const res = await get('/', 'text/markdown');
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('content-type'), 'text/markdown; charset=utf-8');
  assert.ok(varyAccept(res));
  assert.match(res.headers.get('vary'), /accept-encoding/i, 'keeps the origin Vary values');
  const body = await res.text();
  assert.match(body, /^# \S/);
  assert.equal(body, fs.readFileSync(path.join(ROOT, 'index.md'), 'utf8'));
});

test('homepage: Accept text/html (and browsers, and no Accept) get HTML with Vary: Accept and a Markdown Link', async () => {
  for (const accept of ['text/html', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', undefined, '*/*']) {
    const res = await get('/', accept);
    assert.equal(res.status, 200, String(accept));
    assert.match(res.headers.get('content-type'), /^text\/html/);
    assert.ok(varyAccept(res));
    assert.equal(res.headers.get('link'), '</index.md>; rel="alternate"; type="text/markdown"');
    assert.match(await res.text(), /^<!doctype html>/);
  }
});

test('q-values decide between Markdown and HTML', async () => {
  assert.match((await get('/', 'text/markdown, text/html;q=0.8')).headers.get('content-type'), /^text\/markdown/);
  assert.match((await get('/', 'text/markdown;q=0.5, text/html')).headers.get('content-type'), /^text\/html/);
});

test('an Accept header that excludes HTML and Markdown gets 406', async () => {
  const res = await get('/', 'application/pdf');
  assert.equal(res.status, 406);
  assert.ok(varyAccept(res));
  assert.match(await res.text(), /text\/markdown/);
});

test('every page with a Markdown version negotiates, with or without the trailing slash', async () => {
  for (const p of ['/about/', '/about', '/contact/', '/privacy/', '/guides/', '/courses/osha-40-hour-hazwoper-training/']) {
    const res = await get(p, 'text/markdown');
    assert.equal(res.status, 200, p);
    assert.equal(res.headers.get('content-type'), 'text/markdown; charset=utf-8', p);
    assert.ok(varyAccept(res), p);
    assert.match(await res.text(), /^# /, p);
  }
});

test('unknown paths: Markdown 404 body for agents, HTML 404 for browsers', async () => {
  const md = await get('/__probe-does-not-exist', 'text/markdown');
  assert.equal(md.status, 404);
  assert.equal(md.headers.get('content-type'), 'text/markdown; charset=utf-8');
  assert.ok(varyAccept(md));
  const body = await md.text();
  assert.ok(body.length >= 20);
  assert.ok(body.includes(`${SITE_URL}/llms.txt`) && body.includes(`${SITE_URL}/sitemap.xml`));

  const html = await get('/__probe-does-not-exist', 'text/html');
  assert.equal(html.status, 404);
  assert.match(html.headers.get('content-type'), /^text\/html/);
  assert.ok(varyAccept(html));
});

test('a page without a Markdown version falls back to HTML only when HTML is acceptable', async () => {
  const ok = await get('/checkout.html', 'text/markdown, text/html;q=0.5');
  assert.equal(ok.status, 200);
  assert.match(ok.headers.get('content-type'), /^text\/html/);
  assert.equal((await get('/checkout.html', 'text/markdown')).status, 406);
});

test('HEAD requests negotiate without a body', async () => {
  const res = await get('/', 'text/markdown', 'HEAD');
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('content-type'), 'text/markdown; charset=utf-8');
  assert.equal(await res.text(), '');
});

test('static files and non-GET requests pass through untouched', async () => {
  for (const p of ['/llms.txt', '/sitemap.xml', '/robots.txt', '/assets/style.css', '/index.md']) {
    originCalls.length = 0;
    const res = await get(p, 'text/markdown');
    assert.equal(res.status, 200, p);
    assert.deepEqual(originCalls, [p], `${p} is fetched once, as is`);
    assert.equal(res.headers.get('vary'), 'Accept-Encoding', p);
  }
  const post = await worker.handle(new Request(SITE_URL + '/', { method: 'POST', body: 'x', headers: { accept: 'text/markdown' } }), pages, ENV);
  assert.match(post.headers.get('content-type'), /^text\/html/);
});

test('wrangler.toml routes the bare domain (proxied today) and www to the Worker, with www as the canonical origin', () => {
  assert.equal(ENV.CANONICAL_ORIGIN, SITE_URL);
  assert.deepEqual(ROUTES.map(r => r.pattern).sort(), [`${APEX}/*`, `${HOST}/*`].sort());
  for (const r of ROUTES) assert.equal(r.zone, APEX);
  assert.match(WRANGLER, /^main = "worker\.mjs"$/m);
  assert.equal(worker.pagePath('/about'), '/about/');
  assert.equal(worker.pagePath('/'), '/');
  assert.equal(worker.pagePath('/checkout.html'), '/checkout.html');
});

// The three checks from the Is Agentic audit, run the way it runs them: curl -L against the bare domain.
test('audit: curl -L -H "Accept: text/markdown" on the bare domain ends in Markdown with Vary: Accept', async () => {
  const res = await curlL(APEX_URL + '/', 'text/markdown');
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('content-type'), 'text/markdown; charset=utf-8');
  assert.ok(varyAccept(res), `Vary: ${res.headers.get('vary')}`);
  assert.equal(res.headers.get('link'), `<${SITE_URL}/>; rel="canonical"`);
  assert.equal(await res.text(), fs.readFileSync(path.join(ROOT, 'index.md'), 'utf8'));
});

test('audit: curl -L -H "Accept: text/html" on the bare domain still redirects to the www HTML homepage', async () => {
  for (const accept of ['text/html', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', undefined, '*/*']) {
    const first = await apex('/', accept);
    assert.equal(first.status, 301, String(accept));
    assert.equal(first.headers.get('location'), SITE_URL + '/');
    assert.ok(varyAccept(first), 'the redirect varies on Accept too, so caches keep it apart from the Markdown response');
    const res = await curlL(APEX_URL + '/', accept);
    assert.equal(res.status, 200);
    assert.equal(res.finalUrl, SITE_URL + '/');
    assert.match(res.headers.get('content-type'), /^text\/html/);
    assert.match(await res.text(), /^<!doctype html>/);
  }
});

test('audit: curl -L -H "Accept: text/markdown" for a missing path on the bare domain is a Markdown 404', async () => {
  const res = await curlL(APEX_URL + '/__ora-404-probe-4ha8j1c2', 'text/markdown');
  assert.equal(res.status, 404);
  assert.equal(res.headers.get('content-type'), 'text/markdown; charset=utf-8');
  assert.ok(varyAccept(res));
  const body = await res.text();
  assert.equal(body, fs.readFileSync(path.join(ROOT, '404.md'), 'utf8'));
  assert.ok(body.length >= 20);
  assert.ok(body.includes(`${SITE_URL}/llms.txt`) && body.includes(`${SITE_URL}/sitemap.xml`));

  const html = await curlL(APEX_URL + '/__ora-404-probe-4ha8j1c2', 'text/html');
  assert.equal(html.status, 404);
  assert.equal(html.finalUrl, SITE_URL + '/__ora-404-probe-4ha8j1c2');
  assert.match(html.headers.get('content-type'), /^text\/html/);
});

test('bare domain: Markdown for every page, with a canonical Link to the www page', async () => {
  for (const [p, canonical] of [['/about', '/about/'], ['/about/', '/about/'], ['/guides/', '/guides/'], ['/courses/osha-40-hour-hazwoper-training/', '/courses/osha-40-hour-hazwoper-training/']]) {
    const res = await apex(p, 'text/markdown, text/html;q=0.8');
    assert.equal(res.status, 200, p);
    assert.equal(res.headers.get('content-type'), 'text/markdown; charset=utf-8', p);
    assert.ok(varyAccept(res), p);
    assert.equal(res.headers.get('link'), `<${SITE_URL}${canonical}>; rel="canonical"`, p);
    assert.equal(await res.text(), fs.readFileSync(path.join(ROOT, canonical.slice(1), 'index.md'), 'utf8'), p);
  }
  const head = await apex('/', 'text/markdown', 'HEAD');
  assert.equal(head.status, 200);
  assert.equal(head.headers.get('content-type'), 'text/markdown; charset=utf-8');
  assert.equal(await head.text(), '');
});

test('bare domain: pages without Markdown, unsupported types, static files and POSTs keep the redirect', async () => {
  const checkout = await apex('/checkout.html?item=x', 'text/markdown, text/html;q=0.5');
  assert.equal(checkout.status, 301);
  assert.equal(checkout.headers.get('location'), `${SITE_URL}/checkout.html?item=x`);
  assert.ok(varyAccept(checkout));
  assert.equal((await apex('/checkout.html', 'text/markdown')).status, 406);

  const pdf = await apex('/', 'application/pdf');
  assert.equal(pdf.status, 301, 'clients that want neither HTML nor Markdown are redirected as before');
  assert.ok(varyAccept(pdf));

  for (const p of ['/llms.txt', '/sitemap.xml', '/robots.txt', '/index.md']) {
    originCalls.length = 0;
    const res = await apex(p, 'text/markdown');
    assert.equal(res.status, 301, p);
    assert.equal(res.headers.get('location'), SITE_URL + p);
    assert.deepEqual(originCalls, [p], `${p} is fetched once, as is`);
    assert.equal(res.headers.get('vary'), 'Accept-Encoding', p);
  }
  const post = await worker.handle(new Request(APEX_URL + '/', { method: 'POST', body: 'x', headers: { accept: 'text/markdown' } }), pages, ENV);
  assert.equal(post.status, 301);
});

test('if www is later proxied through the Worker too, the same requests still work', async () => {
  const proxied = [APEX, HOST];
  const md = await curlL(APEX_URL + '/', 'text/markdown', { proxied });
  assert.equal(md.headers.get('content-type'), 'text/markdown; charset=utf-8');
  assert.ok(varyAccept(md));
  const html = await curlL(APEX_URL + '/', 'text/html', { proxied });
  assert.equal(html.finalUrl, SITE_URL + '/');
  assert.match(html.headers.get('content-type'), /^text\/html/);
  assert.ok(varyAccept(html));
  assert.equal(html.headers.get('link'), '</index.md>; rel="alternate"; type="text/markdown"');
  const missing = await curlL(APEX_URL + '/__probe', 'text/markdown', { proxied });
  assert.equal(missing.status, 404);
  assert.equal(missing.headers.get('content-type'), 'text/markdown; charset=utf-8');
});

test('Markdown goes out decoded: the origin\'s Content-Encoding and Content-Length are not passed on', async () => {
  // fetch() hands the Worker a decoded body but keeps GitHub's "Content-Encoding: gzip" header.
  const gzipped = async req => {
    const res = await pages(req);
    if (!new URL(req.url).pathname.endsWith('.md') || res.status !== 200) return res;
    const headers = new Headers(res.headers);
    headers.set('Content-Encoding', 'gzip');
    headers.set('Content-Length', '123');
    return new Response(res.body, { status: 200, headers });
  };
  for (const u of [SITE_URL + '/', APEX_URL + '/']) {
    const res = await worker.handle(request(u, 'text/markdown'), gzipped, ENV);
    assert.equal(res.status, 200, u);
    assert.equal(res.headers.get('content-encoding'), null, u);
    assert.equal(res.headers.get('content-length'), null, u);
    assert.equal(await res.text(), fs.readFileSync(path.join(ROOT, 'index.md'), 'utf8'), u);
  }
});
