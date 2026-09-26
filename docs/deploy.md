# Deploying to Cloudflare

## Workers flow (current Cloudflare default)
Settings when connecting the repo under Workers & Pages → Create → Import a repository:
- Build command: `pnpm build`
- Deploy command: `npx wrangler deploy`
- Non-production branch deploy command: `npx wrangler versions upload`
- Worker name is `thefreetools-eu` and must match `name` in `wrangler.jsonc`.

`wrangler.jsonc` serves `dist/` as static assets with trailing-slash handling and `404.html`.

## Pages flow (older)

## One-time setup
1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick `MalikAliyan-Alam/thefreetools.eu`.
2. Build settings:
   - Framework preset: **Astro**
   - Build command: `pnpm build`
   - Build output directory: `dist`
   - Production branch: `main`
   Node (24) and pnpm (11.8) versions come from `.node-version` and `packageManager` in `package.json`. If the build ever picks the wrong Node, add the environment variable `NODE_VERSION=24`.
3. After the first deploy, check the `*.pages.dev` URL.
4. **Custom domains → Set up a domain** → `thefreetools.eu`. If the domain isn't on Cloudflare DNS yet, Cloudflare shows two nameservers; set them at the .eu registrar and wait for activation.
5. Add `www.thefreetools.eu` too, then create a **Redirect Rule** (Rules → Redirect Rules) sending `www.thefreetools.eu/*` to `https://thefreetools.eu/${1}` with 301, so there is one canonical host.
6. SSL/TLS → Edge Certificates → turn on **Always Use HTTPS**.

## After it's live
- Google Search Console → add a **Domain** property for `thefreetools.eu` (verify via the DNS TXT record in Cloudflare) → submit `https://thefreetools.eu/sitemap-index.xml`.
- Bing Webmaster Tools → import from Search Console.

## Every change
Push to `main`; Cloudflare builds and publishes automatically. Other branches get their own preview URLs.

`public/_headers` sets long caching for hashed assets in `/_astro/` and a few security headers.
