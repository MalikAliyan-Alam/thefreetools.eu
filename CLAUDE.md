# thefreetools.eu

Free, multilingual browser tools monetized only by Google AdSense. Speed, accuracy and a clean, human-made feel matter more than feature count.

## Stack
- Astro 7 (static output) + Preact islands for the interactive part of each tool. Hosting target: Cloudflare Pages.
- pnpm. Commands: `pnpm dev`, `pnpm build`, `pnpm test` (node:test on engines), `npx astro check`.
- TypeScript is pinned to 6.x because `astro check` does not support 7 yet.

## Layout
- `src/tools/<id>/engine.ts`: pure calculation logic, no DOM. Every engine gets tests in `tests/<id>.test.ts`.
- `src/tools/<id>/<Name>Tool.tsx` + `<id>.css`: the interactive island. Don't import the CSS in the component (every page comes from one route, so it would ship everywhere); add it to the `?inline` `CSS` map in `src/components/ToolIsland.astro`, which inlines it only on that tool's pages.
- `src/tools/<id>/content/<locale>.ts`: slug, meta, H1, intro, long-form sections, FAQ and UI labels for one language.
- `src/tools/registry.ts`: lists tools and which locales exist. `src/components/ToolIsland.astro` maps a tool id to its component.
- `src/lib/routes.ts`: single list of every page (path, alternates, lastmod). `src/pages/[...path].astro` renders them; `src/pages/sitemap-*.xml.ts` build the sitemap (lastmod + hreflang) from the same list.
- `src/pages-content/pages.ts`: About, Privacy, Contact per locale.
- `src/pages/llms.txt.ts`, `llms-full.txt.ts` (via `src/lib/llms.ts`): clean Markdown summaries for AI crawlers, generated from the registry. JSON-LD (Organization, WebSite, ItemList, WebApplication, BreadcrumbList, FAQPage) is built in `[...path].astro`.
- `src/guides/`: blog-style guides per language (`GUIDES` in `registry.ts`; folders `/guides/`, `/ar/guides/`, `/es/guias/`). Guides with the same `key` are language versions of each other (hreflang). Every number in a guide must be covered by `tests/guides.test.ts`.
- `scripts/indexnow.mjs`: run after deploy; pings IndexNow for recently changed URLs. Key file lives in `public/`.
- `src/i18n/`: locales (`en` at the root, others under `/ar/`, `/es/`) and site-wide UI strings.
- `docs/`: research and plans. `docs/research/keyword-research-master.csv` is the source of truth for which tools and keywords we target.

## Adding a tool
See `docs/adding-a-tool.md`. Short version: engine + tests, component, one content file per locale, register it, add it to ToolIsland, add an icon.

## Rules
- Per-language slugs use the phrase people actually search (e.g. `calcular-promedio`), not a translation of the English slug.
- Only list a locale in the registry when its content is written and reviewed; hreflang is generated from it.
- Content must be specific and checkable: explain the formula, show a worked example with correct numbers, link or name the official rule. No filler, no emoji, no "unlock/seamless/powerful".
- Keep JS small: no UI libraries, no icon fonts.
- Fonts are self-hosted via Fontsource (no Google Fonts requests): Bricolage Grotesque for headings, Instrument Sans for body, Readex Pro for Arabic pages. Base.astro preloads only the files the first screen needs. Don't add more families.
- Corners stay tight (6–12px, no pill shapes); rounded-everything looks template-made.
- Every color comes from the tokens in `src/styles/global.css`; check contrast (4.5:1 for text) when adding one.
- Mobile first: 16px inputs, 44px touch targets, test at 375px wide and in RTL.
- Arabic pages show Latin digits (`ar-u-nu-latn`); Spanish shows a decimal comma.
- Dates (`updated`, `published`) are real edit dates: never future-dated and never bumped without a real content change.
- Don't commit or push unless asked; batch small changes, push finished features.
