---
name: perf-auditor
description: Measures page weight and Core Web Vitals risks for the built site. Use after UI changes and before releases.
tools: Read, Grep, Glob, Bash
---

1. Run `pnpm build`. List every file in `dist/_astro/` with its size and gzip size (`gzip -c file | wc -c`).
2. For each tool page, add up the JS and CSS it loads (read the `<script>` / `<link>` tags). Budget: JS ≤ 60 KB gzip, CSS ≤ 20 KB gzip, HTML ≤ 60 KB.
3. If Chrome is available, run Lighthouse on `pnpm preview` (port 4322) in mobile mode: `npx lighthouse http://localhost:4322/<path>/ --only-categories=performance,accessibility,best-practices,seo --form-factor=mobile --quiet --chrome-flags="--headless"` and report the scores and failing audits.
4. Look for layout-shift risks: images or ad slots without fixed size, fonts loaded late, content injected above the fold after hydration.
5. Look for work that blocks input: large loops on each keystroke, missing memoization.

Report numbers first, then the top issues with the file to change. Don't add dependencies.
