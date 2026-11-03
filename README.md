# HazwoperOSHA.us

Online OSHA HAZWOPER training site: every HAZWOPER course with a page each, free guides,
practice quizzes, a glossary, sitewide search and a multi-course cart checkout.

Live: https://www.hazwoperosha.us/ (custom domain in `CNAME`; `site.config.js` sets the same URL)

Sister sites share the same courses, content and checkout with different styling:
`website-staging` and `hazwoperosha.org`. `tools/build.js`, the course catalog (`data/source.json`, `data/lms-ids.json`) and the cart/checkout
scripts are shared. Each site has its own content and purpose so search engines see three
distinct sites: `data/copy.js`, `data/guides.js`, `data/quizzes.js`, `site.config.js`,
`assets/style.css` and the images in `assets/` belong to this site only. Don't copy articles
between the sites.

## Build

```
node tools/build.js
```

Generated pages (`index.html`, `courses/`, `guides/`, `quizzes/`, `search/`, `checkout.html`,
`sitemap.xml`, `llms.txt`, `llms-full.txt`, `404.html`, `404.md`, `courses.json`, `about/`,
`contact/`, `privacy/`, every page's `index.md`, the IndexNow key file `<indexNowKey>.txt`,
`assets/config.js`, `assets/search-index.js`) are committed. `.github/workflows/pages.yml` rebuilds
and deploys to GitHub Pages on every push to `main`, then submits the sitemap to IndexNow.

## Files

```
site.config.js       brand, URL, theme colour, fonts, logo, order source, IndexNow key for this site
data/copy.js         this site's own wording: home page (title, keywords), FAQ, course-page copy, section names (and tool pages)
data/source.json     course catalog          data/lms-ids.json  LMS course id per course
data/guides.js       guide articles          data/glossary.js   glossary terms
data/quizzes.js      practice quizzes
tools/build.js       generator
tools/check-live.js  checks the live site like the Is Agentic audit: node tools/check-live.js
tools/indexnow.js    submits the sitemap to IndexNow (run by the deploy workflow)
assets/style.css     this site's design
assets/cart.js       cart (localStorage) + header badge
assets/checkout.js   checkout: Stripe card, then one add_order call with every course id in the cart
assets/quiz.js, assets/site-search.js, assets/search.js
edge/                Cloudflare Worker for Markdown content negotiation (see AI agents),
                     deployed by .github/workflows/edge.yml
tests/               build checks: node --test tests/*.test.js
```

## AI agents

`tools/build.js` also writes what AI agents and the Is Agentic (is-agentic.com) checks look for:

- `about/`, `contact/`, `privacy/`: trust pages linked from every footer. Company address and the
  pages' "last updated" date (`ADDRESS`, `TRUST_UPDATED`) are at the top of `tools/build.js`;
  `about` (opening paragraph) can be set per site in `data/copy.js`. The privacy page lists the
  analytics found in `site.config.js`, so update it if tracking changes.
- An `Organization` JSON-LD block (address, contactPoint) first on every page; the `@graph`
  refers to it by `@id`.
- `index.md` next to every content page, converted from the page's `<main>` and linked with
  `<link rel="alternate" type="text/markdown">`; `404.md`; `courses.json` (catalog with
  page, Markdown and checkout links).
- `llms.txt` sections "When to use" (`whenToUse` in `data/copy.js`) and "How agents can use
  this site".
- The main product terms, so searches for the brand plus its product find this site: `home.keywords`
  in `data/copy.js` becomes the homepage `<meta name="keywords">` and the WebSite JSON-LD `keywords`,
  and `knowsAbout` goes on the Organization block. The first keyword ("HAZWOPER training") leads the
  homepage title after the brand and is in the H1; the tests check that every term is worded exactly
  as it appears on the homepage.
- IndexNow (https://www.indexnow.org): `indexNowKey` in `site.config.js` is published as
  `/<key>.txt`, and `tools/indexnow.js` sends every sitemap URL to the participating search engines
  after each deploy. To change the key, set a new one (8-128 characters of a-z, A-Z, 0-9, -) and rebuild.

`node --test tests/*.test.js` checks all of this after a build, and the deploy workflow runs it
before publishing.

### Markdown content negotiation (`edge/`)

GitHub Pages can't vary a response on the `Accept` header, so `Accept: text/markdown` requests
for `/` and Markdown 404 bodies need a layer in front of it. `edge/worker.mjs` is a Cloudflare
Worker that does this the way https://acceptmarkdown.com describes: q-value parsing,
`Content-Type: text/markdown; charset=utf-8`, `Vary: Accept`, 406 for unsupported types, a
`404.md` body for unknown paths, and a `Link` header from each HTML page to its Markdown version.

DNS for `hazwoperosha.us` is on Cloudflare. The bare domain is proxied (orange cloud) and GitHub Pages
redirects it to www; `www` is a DNS-only CNAME to `lj-web-management.github.io`. The Worker runs on
the bare domain, which is the address the audit and most agents start from. There it answers
Markdown-preferring requests itself, with content fetched from `CANONICAL_ORIGIN`
(https://www.hazwoperosha.us, set in `edge/wrangler.toml`) and a `Link: <...>; rel="canonical"` header.
Every other request keeps the usual 301 to www, with `Vary: Accept` added. Nothing needs to change in
DNS. If `www` is ever switched to proxied, the second route in `wrangler.toml` makes the Worker
negotiate there too.

To deploy:

1. Create a Cloudflare API token with the "Edit Cloudflare Workers" template (Account: Workers
   Scripts Edit; Zone `hazwoperosha.us`: Workers Routes Edit).
2. Add it to this repository's Actions secrets as `CLOUDFLARE_API_TOKEN`, along with the account ID
   (Cloudflare dashboard, Workers & Pages overview) as `CLOUDFLARE_ACCOUNT_ID`.
3. Run the "Deploy edge worker" workflow (Actions tab, or any push to `main` that touches `edge/`).
   It tests the Worker, deploys it with wrangler, then runs `node tools/check-live.js`.

Or from a computer: `cd edge && npx wrangler login && npx wrangler deploy`.

Check: `node tools/check-live.js` (add `NODE_USE_ENV_PROXY=1` behind a proxy), or by hand:
`curl -sS -L -i -H 'Accept: text/markdown' https://hazwoperosha.us/` ends in Markdown with
`Vary: Accept`; `curl -sS -L -i -H 'Accept: text/html' https://hazwoperosha.us/` ends in the HTML page
at www; `curl -sS -L -i -H 'Accept: text/markdown' https://hazwoperosha.us/no-such-page` is a 404 with
a Markdown body.

## Checkout

Every seat is full list price. The cart sends a single `add_order` request to the
hazwoper-osha.com LMS API with all course ids and seat counts. Orders are tagged
`order_from: hazwoperosha-us`.

## Custom domain

The site is served at https://www.hazwoperosha.us. `CNAME` holds `www.hazwoperosha.us` and `url`
in `site.config.js` matches it. If the domain ever changes, update both, rebuild and push.
