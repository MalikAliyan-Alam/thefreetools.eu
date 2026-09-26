# Build plan

## Decisions (2026-09-26)
- **Framework:** Astro static site + Preact islands. Chosen for minimal JavaScript (Core Web Vitals) and full control over per-language URLs.
- **Hosting:** Cloudflare Pages (free, global CDN). Connect the GitHub repo; build command `pnpm build`, output `dist`.
- **URLs:** English at the root (`/gpa-calculator/`), other languages prefixed with localized slugs (`/es/calcular-promedio/`, `/ar/gpa-calculator/`). hreflang + x-default on every page.
- **Design:** warm cream background, dark brown ink, terracotta accent (see tokens in `src/styles/global.css`). Gear-and-wrench logo with an "ft" monogram (ink/terracotta) + "the**free**tools" wordmark. Fonts: Bricolage Grotesque (headings), Instrument Sans (body), Readex Pro (Arabic), all self-hosted. Tight 6–12px corners. Light and dark mode follow the device.
- **Quality bar (2026-09-26, GPA tool):** Lighthouse mobile 100/100/100/100 (EN), 99/100/100/100 (AR); results cross-checked against calculator.net, laamea.com and mipromedio.cl (see tests/gpa.test.ts).
- **Privacy:** all tools run in the browser; only per-tool localStorage.

## Top 10 tools (build order)
From `docs/research/keyword-research-master.csv`:

| # | Tool | Launch languages | Status |
|---|---|---|---|
| 1 | GPA / grade calculator | en, ar, es | **Built** |
| 2 | Hijri converter | ar, en | |
| 3 | Age calculator (Gregorian + Hijri) | ar, es, en | |
| 4 | Numbers to words | es, fr, ar, pl, it, en | |
| 5 | VAT calculator | ar, es, en | |
| 6 | Passport / ID photo maker | es, ar, en | |
| 7 | Working days | es, en | |
| 8 | DNI / NIE letter | es | |
| 9 | Invoice generator (ZATCA QR) | ar, en | |
| 10 | End of service / gratuity (UAE, SA) | en, ar | |

## Before launch
- [ ] Set up the contact mailbox in `src/site.ts` (Cloudflare Email Routing).
- [ ] Native-speaker review of Arabic and Spanish text.
- [ ] Google Search Console for each language, submit `sitemap-index.xml`.
- [ ] At least 5–6 tools live before applying for AdSense.
- [ ] Before AdSense: Google-certified CMP (Privacy & messaging) for EEA/UK/CH, update Privacy page, add `ads.txt`, reserve ad slots with fixed heights (no layout shift), keep ads away from tool buttons.
