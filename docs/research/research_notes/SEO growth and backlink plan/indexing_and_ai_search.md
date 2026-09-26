# Indexing channels, webmaster consoles and AI-answer platforms for thefreetools.eu (as of Sept 2026)

Research date: 2026-09-26. Site context: static Astro on Cloudflare Workers static assets, zone on Cloudflare DNS, AdSense only. Already done: Google Search Console (GSC), Bing Webmaster Tools (BWT), hreflang, JSON-LD, llms.txt, permissive robots.txt.

Note on method: StatCounter numbers and several doc summaries were read through an automated page-summarizer (WebFetch). Figures are reported as returned; spot-check the StatCounter pages by hand before quoting them publicly. Items marked "(not re-verified this session)" come from prior knowledge of official docs and were not fetched during this research.

## Q1. Search engine market share in target markets: is anything besides Google/Bing worth doing?

### Takeaway
No. In every target market Google has 88-97% share and Bing has 2-9%. Yandex peaks at about 1.25% (UAE) and Naver, Seznam and Baidu do not appear in the top results for any target country. The only "extra engine" work worth doing is IndexNow, which reaches Yandex, Naver, Seznam and Yep anyway through one ping. A Yandex Webmaster account is optional and low priority. Skip Naver, Seznam and Baidu.

### Cited Findings (StatCounter, all platforms, August 2026)
- Saudi Arabia: Google 95.76%, Bing 2.82%, Yandex 0.82%, Yahoo 0.29%, DuckDuckGo 0.17%, Petal 0.09% — [StatCounter KSA](https://gs.statcounter.com/search-engine-market-share/all/saudi-arabia)
- UAE: Google 95.8%, Bing 2.37%, Yandex 1.25%, Yahoo 0.24%, DuckDuckGo 0.2%, Mail.ru 0.05% — [StatCounter UAE](https://gs.statcounter.com/search-engine-market-share/all/united-arab-emirates)
- Jordan: Google 96.56%, Bing 2.36%, Yahoo 0.42%, Yandex 0.39%, DuckDuckGo 0.14% — [StatCounter Jordan](https://gs.statcounter.com/search-engine-market-share/all/jordan)
- Egypt: Google 95.37%, Bing 3.29%, Yandex 0.6%, Yahoo 0.45%, DuckDuckGo 0.17% — [StatCounter Egypt](https://gs.statcounter.com/search-engine-market-share/all/egypt)
- Morocco: Google 95.02%, Bing 3.22%, Yahoo 0.66%, Yandex 0.62%, DuckDuckGo 0.3% — [StatCounter Morocco](https://gs.statcounter.com/search-engine-market-share/all/morocco)
- Mexico: Google 88.42%, Bing 9.23%, Yahoo 1.76%, DuckDuckGo 0.28%, Yandex 0.17% — [StatCounter Mexico](https://gs.statcounter.com/search-engine-market-share/all/mexico)
- Chile: Google 89.86%, Bing 7.49%, Yahoo 1.89%, DuckDuckGo 0.38%, Yandex 0.23% — [StatCounter Chile](https://gs.statcounter.com/search-engine-market-share/all/chile)
- Colombia: Google 93.29%, Bing 4.74%, Yahoo 1.57%, DuckDuckGo 0.19%, Yandex 0.12% — [StatCounter Colombia](https://gs.statcounter.com/search-engine-market-share/all/colombia)
- IndexNow participants in 2026: Bing, Yandex, Naver, Seznam and Yep. Google is not a participant — [Pressonify, 2026](https://pressonify.ai/blog/indexnow-instant-indexing-press-releases-2026); [IndexNow Tool](https://indexnowtool.com/indexnow/supported-search-engines)
- A URL submitted to one IndexNow engine is shared with all participating engines — [indexnow.org documentation](https://www.indexnow.org/documentation)

### Inferences
- Bing matters most in LATAM, at 7.5-9% in Mexico and Chile. That is roughly 3x its share in the Gulf. It is also the retrieval layer for Copilot and a large input to ChatGPT search (see Q3), so BWT is priority #2 after GSC.
- Yahoo (1.6-1.9% in LATAM) is served largely from Bing results. DuckDuckGo also relies heavily on Bing. Both are therefore reached through Bing and IndexNow. (The Yahoo/DDG-Bing relationship is general industry knowledge and was not re-verified this session.)
- Yandex Webmaster adds little because IndexNow already reaches Yandex. Set it up only if you want Yandex-specific crawl diagnostics. Naver (Korea), Seznam (Czechia) and Baidu (China) have no presence in these markets. Do not set them up.
- For the later markets (France/Morocco/Algeria, Poland, Italy), the same pattern is expected, but those countries were not checked except Morocco.

### Gaps
- Peru, Algeria, Poland, Italy and Gulf states other than KSA/UAE were not fetched.
- StatCounter measures pageviews from its tracker network, not queries. Treat the numbers as directional.

## Q2. IndexNow: who uses it, Google's position, static-site implementation, and Cloudflare Crawler Hints

### Takeaway
IndexNow feeds Bing, Yandex, Naver, Seznam and Yep, but not Google. On a static site, implement it with a key file in `/public` plus a small post-deploy script that POSTs the changed or all sitemap URLs to `api.indexnow.org`. Cloudflare Crawler Hints can send IndexNow pings automatically on cache MISS. Whether that fires for Workers static assets is not documented. Do not rely on it; use the explicit ping, and turning Crawler Hints on as well does no harm.

### Cited Findings
- Google does not support IndexNow as of 2026, despite testing it since Oct 2021 — [Pressonify 2026](https://pressonify.ai/blog/indexnow-instant-indexing-press-releases-2026); [IndexerNow](https://www.indexernow.com/google-indexnow)
- Key file options:
  - Host `{key}.txt` (UTF-8, containing the key) at the site root.
  - Or place it elsewhere and pass `keyLocation`. A key at a subpath can only cover URLs under that path.
  - The key is 8-128 characters from a-z, A-Z, 0-9 and dashes.
  - Source: [indexnow.org documentation](https://www.indexnow.org/documentation)
- Endpoints:
  - Single URL: `GET https://<engine>/indexnow?url=...&key=...`.
  - Bulk: `POST /indexnow` with JSON `{"host","key","keyLocation"(optional),"urlList":[...]}`, up to 10,000 URLs per POST.
  - Source: [indexnow.org documentation](https://www.indexnow.org/documentation)
- Response codes: 200 OK, 202 Accepted (key validation pending), 400 bad request, 403 invalid key, 422 URLs don't match host/key, 429 too many requests — [indexnow.org documentation](https://www.indexnow.org/documentation)
- Crawler Hints: "Cloudflare can proactively tell a crawler about the best time to index or when content changes". It "uses cache-status MISS to determine when content has likely been updated and sends it to IndexNow". Responses with status >= 4xx are not reported. The setting is site-wide, and pages can be excluded with `X-Robots-Tag: noindex` or a meta tag — [Cloudflare Crawler Hints docs](https://developers.cloudflare.com/cache/advanced-configuration/crawler-hints/)
- Dashboard location per the docs: zone > Caching > Configuration > toggle **Crawler Hints**. Deep link: `https://dash.cloudflare.com/?to=/:account/:zone/caching/configuration` — [Cloudflare Crawler Hints docs](https://developers.cloudflare.com/cache/advanced-configuration/crawler-hints/)
- The Workers static-assets docs only say "Cloudflare provides automatic caching for static assets across its network". They say nothing about whether zone cache status or Crawler Hints apply — [Cloudflare Workers static assets](https://developers.cloudflare.com/workers/static-assets/)
- A third-party guide shows pinging IndexNow from a Cloudflare Worker on publish — [Asteroad](https://asteroad.com/manuals/indexnow-cloudflare-worker) (not reviewed in depth)

### Inferences (recommended implementation for this repo)
1. Generate a random 32-character hex key and commit `public/<key>.txt` containing only the key. It is then served at `https://thefreetools.eu/<key>.txt`.
2. Add a post-deploy script (for example `scripts/indexnow.mjs`, run after `wrangler deploy` in CI or by hand):
   - Read `dist/sitemap*.xml`.
   - Collect URLs. Optionally keep only those whose `lastmod` equals today.
   - POST `{"host":"thefreetools.eu","key":"<key>","keyLocation":"https://thefreetools.eu/<key>.txt","urlList":[...]}` to `https://api.indexnow.org/indexnow` with `Content-Type: application/json; charset=utf-8`.
   - Treat 200 or 202 as success.
3. Ping only on real content changes. Re-pinging unchanged URLs on every deploy wastes goodwill; 429s are possible.
4. Enable Crawler Hints anyway: it is free and harmless. Workers static assets may not go through the zone cache path that produces cache-status MISS events, so it may send nothing. That is unverified.
5. Google does not use IndexNow. For Google, rely on the GSC sitemap, which is already done, plus URL Inspection > "Request indexing" for key new pages. Google's Indexing API is officially limited to JobPosting/BroadcastEvent pages and should not be used here (not re-verified this session).

### Gaps
- No official Cloudflare statement was found on whether Crawler Hints fires for Workers static-assets responses. Testing is possible: after enabling it, the BWT IndexNow report may show submissions from Cloudflare.
- No official IndexNow daily cap was found. One secondary source says there is "no published per-day cap" but that server-side rate limiting exists — [search summary of Bing/IndexNow guides](https://www.indexernow.com/blog/indexnow-bing-explained).

## Q3. AI search and answer engines: discovery, citation, robots.txt, and llms.txt

### Takeaway
To be citable you need to be in the Google index and the Bing index, and you must allow the search bots (OAI-SearchBot, PerplexityBot, Claude-SearchBot, Googlebot, Bingbot) plus the user-fetch agents. Training can be blocked separately with GPTBot, ClaudeBot and Google-Extended, and blocking training does not remove you from those companies' search products. llms.txt is not used by Google Search. Google says it ignores the file, and there is no public evidence that any major engine reads it in production. It is harmless to keep, but it is not a channel.

### Cited Findings
- **Google AI Overviews / AI Mode**
  - "There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary". Both use normal Googlebot/Search indexing. Controls are nosnippet, data-nosnippet, max-snippet and noindex — [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
  - The Google AI optimization guide (published May 15, 2026; last updated 2026-07-10) says: "You don't need to create new machine readable files, AI text files, markup, or Markdown to appear in Google Search". Such files "neither harm nor help … as Google Search ignores them". Also: "Structured data isn't required for generative AI search" — [Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide); [Search Central blog, May 2026](https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing)
  - SEJ reports that Google's updated wording says using llms.txt is "fine" but not used — [Search Engine Journal](https://www.searchenginejournal.com/googles-says-its-fine-to-use-llms-txt-for-ai-seo/579608/)
- **Google-Extended**: "a standalone product token … to manage whether content Google crawls … may be used for training future generations of Gemini models". It "does not impact a site's inclusion in Google Search nor is it used as a ranking signal" — [Google common crawlers](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers)
- **Gemini app grounding**: covered by Google-Extended per the AI features page ("manages AI training/grounding in other Google systems"), as summarized — [Google AI features](https://developers.google.com/search/docs/appearance/ai-features)
- **OpenAI / ChatGPT search**
  - OAI-SearchBot surfaces sites in ChatGPT search; OpenAI recommends allowing it.
  - GPTBot is for training; disallowing it opts out of training.
  - ChatGPT-User fetches pages on user actions, and robots.txt "may not apply".
  - OAI-AdsBot is not configurable.
  - The settings are independent, and robots.txt changes take about 24h to reflect.
  - Source: [OpenAI bots docs](https://developers.openai.com/api/docs/bots)
- **ChatGPT and Bing**: ChatGPT search uses Bing as a third-party provider while also building its own index. One analysis found about 87% of 500+ ChatGPT citations matched Bing's top organic results — [Peec AI](https://peec.ai/blog/chatgpt-built-its-own-search-index); [Subscribe PR](https://subscribepr.com/blog/how-to-get-indexed-on-bing/) (secondary sources; treat the 87% figure as indicative)
- **Perplexity**
  - PerplexityBot surfaces and links sites in Perplexity results, is not used for training, and should be allowed. IPs: perplexity.com/perplexitybot.json.
  - Perplexity-User handles user-initiated fetches and generally ignores robots.txt.
  - If using a WAF, allowlist by user agent plus IP.
  - Source: [Perplexity crawlers docs](https://docs.perplexity.ai/guides/bots)
- **Anthropic / Claude**
  - ClaudeBot is for training; Claude-SearchBot indexes for Claude's search results; Claude-User fetches on user request.
  - All three honor robots.txt, including Claude-User and Crawl-delay.
  - Blocking ClaudeBot does not block the other two.
  - Sources: [Search Engine Journal](https://www.searchenginejournal.com/anthropics-claude-bots-make-robots-txt-decisions-more-granular/568253/); [Anthropic help center](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- **Microsoft Copilot / Bing**
  - Microsoft said on May 6, 2026 that Bing's index is shifting toward "grounding" for AI. Bing's index is the retrieval layer for Copilot and (partly) ChatGPT search — [Rankeo](https://rankeo.io/news/bing-index-serves-ai-not-humans) (secondary)
  - BWT "AI Performance" report launched Feb 11, 2026 (public preview). It shows citations across Copilot, Bing AI summaries and select partners, grounding queries, and page-level citations, for all verified sites — [Bing Webmaster blog](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview); [BWT help: AI Performance](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c)
- **llms.txt evidence**
  - John Mueller (June 2025): "no AI system currently uses llms.txt" — [SE Roundtable](https://www.seroundtable.com/google-ai-llms-txt-39607.html)
  - An Ahrefs study reported via a secondary source found that 97% of llms.txt files among 137k sites got zero traffic in May 2026, and that AI crawlers do not request the file — [1ClickReport](https://www.1clickreport.com/blog/llms-txt-evidence-2026) (secondary; the Ahrefs original was not fetched)

### Inferences: recommended robots.txt
The current file allows all, which is fine. If the owner wants to block training while staying citable, add:
```
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

# Explicitly allowed (already covered by "User-agent: * Allow: /"):
# Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User,
# Claude-SearchBot, Claude-User, Applebot
```

Trade-offs:
- For a free-tools site monetized by AdSense, training use has little downside, and being in the models may modestly help brand mentions. Allowing everything is a defensible default.
- Blocking Google-Extended may also affect Gemini-app grounding. Keep it allowed if Gemini citations are wanted.

**Cloudflare interaction (important):** Cloudflare offers AI-crawler blocking settings (AI Crawl Control, formerly "AI Audit"; "Block AI bots"; managed robots.txt). These can override a permissive robots.txt or block the bots at the edge.
- Check the zone's Security / AI Crawl Control settings.
- Make sure OAI-SearchBot, PerplexityBot and Claude-SearchBot are not blocked.
- Exact 2026 menu names were not verified this session. Confirm them against developers.cloudflare.com.

### Gaps
- No official doc was found describing exactly which index Gemini-app answers use beyond Google Search.
- Apple (Applebot / Applebot-Extended) was not researched this session.
- No evidence was found in either direction on whether JSON-LD helps citations in ChatGPT, Perplexity or Claude.

## Q4. Other free Google properties and GSC features

### Takeaway
Google Business Profile does not fit an online-only site with no physical location or service area, so skip it. The useful free Google channels are GSC features (International Targeting is gone; use the Page indexing, Performance-by-country, Core Web Vitals and Enhancements reports), Google Trends for Arabic and Spanish keyword checks, and optionally a YouTube channel with short tool demos, since YouTube results appear in Google and AI answers.

### Cited Findings
- Google-Extended and Googlebot scopes as above — [Google common crawlers](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers)

### Inferences (not re-verified this session; from prior knowledge of official docs)
- **Google Business Profile**: the guidelines require in-person contact with customers at a location or within a service area. Online-only businesses are ineligible (support.google.com/business/answer/3038177). Do not create one.
- **GSC tasks to do now**:
  - Add a Domain property via DNS TXT if not already done, so it covers every subdomain and protocol.
  - Add owners/users.
  - Enable email alerts.
  - Watch Page indexing for "Discovered – currently not indexed" on AR/ES pages.
  - Use URL Inspection > Request indexing for the top ~10 tool pages per language.
  - Check the Enhancements reports for the JSON-LD types used.
  - Filter Performance by country (SA, EG, AE, JO, MX, CL, CO, PE) and by page path (`/ar/`, `/es/`).
  - Link GSC to Google Analytics/AdSense if used.
- **GSC Insights / Search Console Insights**: free content-performance view (inside GSC as of 2025).
- **Google Trends**: free; compare Arabic vs English query forms per country.
- **YouTube**: free. Short screen-recorded tool demos in Arabic and Spanish can rank in video results and earn links. Optional, medium effort.

### Gaps
- The current (2026) GSC report names were not fetched.

## Q5. Bing Webmaster Tools specifics

### Takeaway
In BWT: import from GSC (already done or doable in one click), submit the sitemap, confirm IndexNow is receiving submissions (IndexNow report), use Submit URLs for priority pages, and watch the new AI Performance report for Copilot citations.

### Cited Findings
- Bing's manual/API URL-submission quota is "based on multiple parameters and may be revised over time". Secondary sources cite up to 10,000 URLs/day/domain, which grows with site age and resets at midnight UTC. IndexNow submissions sit outside this quota and are the method Microsoft recommends — [BWT help: URL Submission](https://www.bing.com/webmasters/help/url-submission-62f2860b) (page body did not render for the fetcher; quota figures from secondary summaries such as [IndexerNow](https://www.indexernow.com/blog/indexnow-bing-explained) and [Jetfuel 2026 guide](https://jetfuel.agency/how-to-set-up-bing-webmaster-tools-for-your-site-step-by-step-guide/))
- Bing's IndexNow getting-started page — [bing.com/indexnow/getstarted](https://www.bing.com/indexnow/getstarted)
- AI Performance report: citations, grounding queries, page-level citation data; available to all verified sites since Feb 11, 2026 (public preview) — [Bing Webmaster blog](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)

### Inferences
- New sites typically see a small daily Submit-URL quota (often around 10/day early on, per secondary sources). Use IndexNow for bulk submissions and the manual Submit URL tool only for top pages.
- Keep the IndexNow key file permanently live. Removing it invalidates future pings.

### Gaps
- The official quota text could not be read (the help page is JS-rendered). The exact current quota for a new site is unverified.

## Q6. Validation tools worth running

### Takeaway
Run each once at launch, then again after template changes: Rich Results Test, Schema Markup Validator, GSC URL Inspection (live test), PageSpeed Insights (lab data plus CrUX field data once traffic exists), and an hreflang checker. For AI bots, check Cloudflare's bot/AI analytics to confirm OAI-SearchBot, PerplexityBot and Claude-SearchBot are fetching pages successfully.

### Cited Findings
- Structured data remains recommended for rich-result eligibility, though it is not required for AI features — [Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

### Inferences (tool URLs from prior knowledge, not re-verified this session)
- Google Rich Results Test: search.google.com/test/rich-results. Test one tool page per language, including AR and ES.
- Schema.org Markup Validator: validator.schema.org. Catches non-Google schema errors.
- PageSpeed Insights: pagespeed.web.dev. It shows CrUX field data only after enough Chrome traffic, so a new site will show lab data only for weeks or months. The GSC Core Web Vitals report is the long-term source.
- Hreflang checks:
  - Merkle/TechnicalSEO.com hreflang tester (technicalseo.com/tools/hreflang/).
  - The Ahrefs/Semrush site audit, since a Semrush trial is planned.
  - Verify reciprocal return tags, `x-default`, and correct codes (`ar`, or `ar-SA` only if content really differs per region; `es` or `es-MX`).
- Bing: BWT Site Scan (free site audit) and URL Inspection.
- IndexNow: after the first ping, check BWT > IndexNow for received URLs.

### Gaps
- The current tool URLs and their 2026 status were not fetched in this session.

---

## Priority order (synthesis for the report writer)
1. Implement IndexNow (key file plus post-deploy ping). This reaches Bing/Copilot/ChatGPT-grounding, Yandex, Naver, Seznam and Yep in one step. Also enable Cloudflare Crawler Hints (Caching > Configuration), with the caveat above.
2. Finish BWT setup: sitemap, IndexNow report, manual Submit URLs for top pages, AI Performance report monitoring.
3. Audit Cloudflare AI-bot blocking settings so search and answer bots are not blocked at the edge. Decide on the training-bot policy (GPTBot, ClaudeBot, Google-Extended).
4. Complete GSC: Domain property, Request indexing for top pages per language, Enhancements, per-country monitoring.
5. Run the validation pass: Rich Results Test, Schema validator, hreflang tester, PSI.
6. Optional: Yandex Webmaster (at most about 1% share in the Gulf; IndexNow already covers it), YouTube demos, Google Trends for keywords.
7. Skip: Google Business Profile (ineligible), Naver, Seznam and Baidu webmaster tools (no audience), the Google Indexing API (not permitted for this content type).
8. llms.txt: keep it, since it costs nothing, but expect no measurable effect. Google explicitly ignores it, and there is no evidence any major engine uses it.
