# Keyword research method for a multilingual free-tools site (thefreetools.eu: DE/FR/IT/ES/PL) + state of generic tool niches

Research date: 2026-09-25. About 20 tool calls. Several method details (alphabet soup, SERP-weakness signals, the scoring formula) are standard practice with little authoritative sourcing. They are marked as Inferences, not Cited Findings.

## Q1. Which free tools give keyword data, and which cover DE/FR/IT/ES/PL?

### Takeaway
The best free sources of real, market-specific volume for the five markets are Google Keyword Planner (ranges only without ad spend, but location and language can be set per country), Bing Webmaster Tools Keyword Research (country, language and device filters, up to 24 months) and, after launch, Google Search Console. Everything else (Ahrefs free generator, Keyword Surfer, Glimpse, Ubersuggest, autocomplete, People Also Ask) is for finding ideas or for estimates with tight free limits.

### Cited Findings
- **Google Keyword Planner (GKP)**: it is free, but you must finish Google Ads account setup, including entering billing information, before you can use "Get ideas for new keywords" — [Google Ads Help: Use Keyword Planner](https://support.google.com/google-ads/answer/7337243?hl=en)
- GKP without active ad spend shows volume in broad logarithmic buckets (10, 100, 1K–10K, 10K–100K). So 1,300 and 9,400 searches/month land in the same "1K–10K" bucket. Reports say a small campaign (about $5–10/day) unlocks exact numbers. This is secondary-source info, not stated in Google's help page — [Rankdots](https://rankdots.com/blog/google-keyword-planner); [Keywords Everywhere](https://keywordseverywhere.com/google-keyword-planner-volume.html); [w3era](https://www.w3era.com/blog/seo/google-keyword-planner-doesnt-need-active-campaign/)
- GKP "Average monthly searches" depends on the location and Search Network settings you choose. Language is set separately in the targeting panel (Google's own example is French speakers in Switzerland). A location breakdown is available — [Google Ads Help: Refine keywords](https://support.google.com/google-ads/answer/6325025?hl=en)
- **Bing Webmaster Tools Keyword Research**: free. It filters by country, language and device, covers up to 24 months, and defaults to all countries/languages over the last 3 months. The country filter does not apply to the Global breakdown — [Bing Webmaster Help](https://www.bing.com/webmasters/help/keyword-research-628070b6); [Search Engine Land](https://searchengineland.com/bing-webmaster-tools-now-with-24-months-of-data-filters-by-country-and-device-and-keyword-trendlines-460413)
- **Ahrefs Free Keyword Generator**: no login. It returns up to about 100 keyword ideas plus about 50 questions and lets you pick a target country. It also covers Bing, YouTube and Amazon. The free version has no KD, traffic potential or SERP data — [Zapier 2026](https://zapier.com/blog/best-keyword-research-tool/); [Ahrefs free SEO tools](https://ahrefs.com/blog/free-seo-tools/)
- **Ahrefs Webmaster Tools (AWT)**: free Site Explorer and Site Audit for sites you own and verify (for example via GSC). It shows the keywords you rank for and your backlinks, but you cannot research competitors' sites — [Ahrefs free SEO tools](https://ahrefs.com/blog/free-seo-tools/); [buzzcube](https://www.buzzcube.io/use-ahrefs-with-free-tools/)
- **Ubersuggest free tier (2026)**: 3 keyword searches/day, 1 domain analysis/day, 3 content ideas per query — [sproutsagesolutions 2026](https://sproutsagesolutions.com/best-free-keyword-research-tools-2026/); [nealschaffer](https://nealschaffer.com/keyword-research-tool/)
- **Keyword Surfer**: a free Chrome extension from Surfer SEO that shows volume, CPC and ideas inside the Google SERP — [Mailchimp](https://mailchimp.com/resources/best-free-keyword-research-tools/)
- **Glimpse**: adds volume estimates and growth figures to Google Trends. The free tier is limited to about 10 enhanced searches/month — [keyword.com](https://keyword.com/blog/keywords-everywhere-alternative/)

### Inferences
- A practical free stack per market: (1) seed ideas from native autocomplete on google.de/.fr/.it/.es/.pl. Use the "alphabet soup" method: type the seed followed by a–z, then "wie/comment/come/cómo/jak" prefixes. Set the Google interface language and country, or use an incognito window with a local VPN. (2) Put the seeds into GKP with Location = the country and Language = the local language, and record the range. (3) Cross-check with Bing WMT for the same country and language. Bing's numbers are smaller but real, which makes them a useful relative signal. (4) Use Google Trends to compare the same concept across countries. Enter each country's native term, then compare relative interest and seasonality (for example, exam-season spikes for calculators). (5) After launch, GSC queries per country are the ground truth for expanding the list.
- GKP's buckets are too coarse to rank candidates that sit in the same band. Break ties with Bing's numbers, Keyword Surfer, or the Ahrefs free generator, or buy one cheap month of a paid tool (optional).
- AnswerThePublic and People Also Ask are mostly for informational queries, which matter less for tool pages. They help with FAQ blocks and supporting how-to content in each language.

### Gaps
- I found no authoritative source confirming which free tools (Keyword Surfer, Glimpse, AnswerThePublic) support country databases for PL, DE, FR, IT and ES specifically. Check each tool yourself.
- Google's help page does not explicitly document the rule "ranges shown when there is no spend". That comes from secondary sources, though it is widely observed.

## Q2. How do you judge SERP competition by hand for tool keywords? Are KGR and allintitle useful?

### Takeaway
KGR (allintitle results ÷ monthly volume, only for keywords under 250 searches/month; below 0.25 counts as "easy") is a quick filter for long-tail supporting pages. It is weak for tool keywords because it ignores who is ranking. Checking the local SERP by hand is the main method.

### Cited Findings
- KGR = number of Google results with the keyword in the title (allintitle:) ÷ monthly search volume. It applies only when volume is under 250. Below 0.25 = easy, 0.25–1 = moderate, above 1 = competitive — [Mangools](https://mangools.com/blog/keyword-golden-ratio/)
- Limitations: the volume cap of 250 limits how much traffic you can win. It ignores how strong the ranking sites are. It relies too heavily on title tags — [Mangools](https://mangools.com/blog/keyword-golden-ratio/); [Topicfinder](https://www.topicfinder.com/what-golden-ratio-seo/)

### Inferences (practitioner checklist, not from an authoritative source)
- Signs of a weak SERP in a local market (check the top 10 on google.xx in incognito, with the country and language set):
  1. Forum or Q&A results (gutefrage.net, Reddit, commentcamarche, forums) rank for a query where users want a tool.
  2. English-language results rank in a DE/FR/IT/ES/PL SERP. This means no good local-language tool exists.
  3. Machine-translated pages from global tool sites, such as broken grammar or an English UI behind a translated title.
  4. The #1–5 results are articles or tutorials instead of a working tool, or a tool that needs a download, sign-up, paywall or watermark.
  5. Outdated tools: Flash, no HTTPS, not usable on mobile, many pop-ups, slow.
  6. Low-authority or small niche domains in the top 5. Check with free AWT on your own site, or the free Ahrefs Backlink Checker/Website Authority checker on theirs, which is limited.
  7. The SERP layout shows no strong direct answer (Google's own calculator/converter widget is a strong negative signal, because it takes clicks for unit conversion, basic math and currency).
- Negative signals: ilovepdf, smallpdf, adobe.com, pdf24 (strong in DE) or omnicalculator/calculator.net holding a fully localized page in the top 3, or a Google native widget.
- Use allintitle and KGR only for supporting long-tail pages, such as "pdf zusammenfügen ohne Programm mac" or very specific calculators. Don't use them for head tool terms.

### Gaps
- No quantitative study links these manual signals to how fast new tool sites actually rank. The checklist comes from practitioner experience.

## Q3. Spreadsheet template and opportunity scoring formula

### Takeaway
No authoritative standard exists. The template and formula below are a proposed heuristic, built from the constraints found above: GKP ranges, the KGR limits, and the fact that RPM varies by country and language.

### Cited Findings
- AdSense earnings per 1,000 impressions vary a lot by country and language. One older (circa 2022) third-party dataset gave German/French/Italian/Spanish-language RPM below $0.5 and Polish about $0.5. Another anecdote cites about $10 RPM for a German site. The data conflicts and is unreliable. Use your own AdSense country report — [thesrzone (2022 data, relabeled 2025)](https://www.thesrzone.com/2022/03/adsense-cpc-rates-by-country-2022.html); [dicloak](https://dicloak.com/blog-detail/google-adsense-rpm-by-country-2025-how-to-maximize-revenue-across-countries); [AdSense Community](https://support.google.com/adsense/thread/214565287/rpm-by-country-figuer-out?hl=en)

### Inferences (proposed template)
- Columns: `Tool concept (EN)` | `Market (DE/FR/IT/ES/PL)` | `Native keyword (as searched)` | `Variant/synonyms` | `Intent (tool/info)` | `GKP range` | `Bing vol (country)` | `Trends index vs other markets` | `Seasonality` | `Google widget present? (Y/N)` | `# of top-5 results that are working local-language tools` | `Big brand in top 3? (which)` | `Forum/English/outdated results in top 10 (count)` | `allintitle count` | `KGR (if <250)` | `Weakness score 1–5` | `RPM factor (country, relative)` | `Build effort (1–5; reusable engine?)` | `Opportunity score` | `Localized slug` | `Status`.
- Demand score: map the GKP bucket to a midpoint on a log scale (10→1, 100→2, 1K–10K→3, 10K–100K→4, 100K+→5). Alternatively use log10 of a Bing-calibrated estimate.
- Formula: **Opportunity = Demand (1–5) × Weakness (1–5) × RPM factor (0.5–1.5) ÷ Effort (1–5)**. Weakness: 5 = no localized working tool in the top 5; 1 = a Google widget or two or more big localized brands.
- Example (made-up numbers for illustration only): "PDF zusammenfügen" (DE): demand 5, weakness 1 (ilovepdf/smallpdf/pdf24/Adobe all localized), RPM 1.2, effort 2 → 5×1×1.2/2 = **3.0**. "kalkulator odsetek ustawowych" (PL, statutory interest calculator): demand 3, weakness 4 (few local tools, mostly bank/legal articles), RPM 0.7, effort 2 → 3×4×0.7/2 = **4.2**, so it ranks higher even with lower demand.
- Tools that reuse one engine across five languages should get lower effort scores. One build then serves five markets, which argues for scoring the concept across all markets combined too.

### Gaps
- No reliable 2025–2026 per-country AdSense RPM data for DE/FR/IT/ES/PL was found. The RPM factor has to be calibrated from your own AdSense data after launch.

## Q4. Translating and localizing keywords; hreflang and slugs

### Takeaway
Research each market's keywords natively instead of translating. Implement hreflang with self-references and return links, and translate the main content and ideally the slugs. Google finds the page language itself; hreflang only maps the alternates.

### Cited Findings
- Literal translation misses how people actually search. German example: "Mobiltelefon" is a correct translation, but Germans search "Handy" or "Smartphone". Compounds get split in searches ("Spielzeugladen" vs "Spielzeug Laden") — [Phrase](https://phrase.com/blog/posts/multilingual-keyword-research/); [Indigoextra](https://www.indigoextra.com/blog/multilingual-keyword-research)
- Working with native speakers is called the most critical step — [Indigoextra](https://www.indigoextra.com/blog/multilingual-keyword-research); see also [Rise at Seven: research in a language you don't speak](https://riseatseven.com/blog/international-keyword-research/)
- hreflang rules: every version lists itself and all the others. If two pages don't point to each other, the tags are ignored. x-default is the fallback. Codes are ISO 639-1 language plus an optional ISO 3166-1 region; a region alone is invalid — [Google Search Central: Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- "Google doesn't use hreflang or the HTML lang attribute to detect the language of a page". Localized pages count as duplicates only if the main content stays untranslated — [Google Search Central](https://developers.google.com/search/docs/specialty/international/localized-versions)

### Inferences
- Tool queries in DE/FR/IT/ES/PL usually take the verb (infinitive) + object form, not the English noun form: "pdf zusammenfügen", "fusionner pdf", "unire pdf", "unir pdf", "połącz pdf". Check each in local autocomplete and GKP. Also check noun and imperative variants ("PDF zusammenführen", "pdf verbinden"; "łączenie pdf").
- Slugs: use the native winning phrase, e.g. `/de/pdf-zusammenfuegen/`, `/fr/fusionner-pdf/`. Transliterate umlauts and accents consistently (ü→ue or u). Use one URL per language per tool with a full hreflang cluster (de, fr, it, es, pl, x-default). Translate all of it: UI strings, error messages and help text. Pages with a translated title over an English UI risk being treated as duplicate or low value.
- The site targets languages (de, fr…), not regions. Plain language codes also cover Austria/Switzerland and Belgium, etc. Add region codes only if the content really differs, e.g. VAT or salary calculators for de-DE vs de-AT.

### Gaps
- There is no formal source on verb vs noun search patterns per language for tool queries. Confirm it market by market in autocomplete and GKP.

## Q5. How tool sites grow or fail in 2025–2026: spam policies, AI Overviews, case studies

### Takeaway
Tool and transactional queries rarely trigger AI Overviews (about 2% for transactional intent in Ahrefs' Sept 2025 dataset), so tool pages are relatively safe from AIO. The main risk is Google's scaled content abuse and doorway policies if thousands of near-identical tool or language pages are spun up. The winners (Omni Calculator, iLovePDF) combined a focused, useful product, full localization and ad monetization over many years.

### Cited Findings
- **AI Overviews**: Ahrefs study (published Nov 10, 2025; 146M desktop SERPs from Sept 2025) found trigger rates of 0.9% for navigational, 2.1% for transactional and 4.3% for commercial queries. One- and two-word queries trigger at about 9.5–9.9%, non-question queries at 15.5%. AIOs cluster on informational and question queries — [Ahrefs](https://ahrefs.com/blog/ai-overview-triggers/)
- Secondary claim: tool queries like "webp to png converter" rarely trigger AIOs because users need a working tool. Informational queries trigger at 35–65% vs 5–15% for transactional (the figures differ from Ahrefs) — [airlinkdigital](https://airlinkdigital.net/blog/what-percentage-of-searches-trigger-ai-overviews/); [Neil Patel](https://neilpatel.com/marketing-stats/ai-overview-trigger-rates-by-query-length/). The Ahrefs dataset is stronger; the second source's numbers conflict with it.
- **Spam policies**: "Scaled content abuse is when many pages are generated for the primary purpose of manipulating search rankings and not helping users". Examples include using generative AI "to generate many pages without adding value". Doorway abuse covers multiple domain variations targeting regions and pages that funnel users — [Google Spam Policies](https://developers.google.com/search/docs/essentials/spam-policies)
- The scaled content policy was introduced in March 2024, with enforcement starting in May 2024 (alongside site reputation abuse). Google updated the site reputation abuse policy in Nov 2024 — [Google Search Central Blog, Nov 2024](https://developers.google.com/search/blog/2024/11/site-reputation-abuse); [Breakline](https://www.breaklineagency.com/guide-to-googles-scaled-content-abuse/)
- **Omni Calculator** (Kraków, Poland): hobby project from 2011, launched in 2016. It grew from 20K to more than 18M monthly visits and had 200M visits in 2023. Team of about 70. Ad-supported with no paywall, using AdSense plus Playwire and Google Ad Manager. Translations into ES/FR/DE/IT and more were in progress — [Google for Publishers story](https://www.google.com/ads/publisher/stories/omni_calculator/). About 3,489 calculators, about 53% of traffic from Google organic, and about 30.5K referring domains (third-party, June 2026) — [Creative Widgets](https://creativewidgets.io/blog/calculator-websites-seo); [Semrush](https://www.semrush.com/website/omnicalculator.com/overview/)
- **iLovePDF**: started in Barcelona as a single PDF utility and grew to about 150M+ visits/month. Growth is credited to simplicity, SEO and sustainable growth. It runs regional domains such as ilovepdf.es — secondary summary of a Medium case study (the original returned 403) — [Medium (via search snippet)](https://medium.com/the-investors-handbook/the-most-underrated-case-study-the-rise-of-ilovepdf-926e369e355b); [Similarweb](https://www.similarweb.com/website/ilovepdf.com/)
- **TinyWow**: about 2.56M traffic (Semrush, US-rank context, Oct 2025). Backlinks fell about 26% in October to about 94.5K — [Semrush](https://www.semrush.com/website/tinywow.com/overview/). No reliable published analysis of why its traffic moved was found.
- Soda PDF: about 1.5M visits in May 2025 (Ahrefs estimate), which shows the scale of mid-tier PDF players — [Ahrefs](https://ahrefs.com/websites/sodapdf.com)

### Inferences
- Tool pages are relatively resistant to AIO, but not to Google's own widgets (unit, currency, calculator, timer, color picker, translate). Avoid queries where a widget answers the query in the SERP.
- To stay clear of scaled content abuse: every indexed page should be a working tool with unique function, plus useful, non-boilerplate help text in natural local language. Don't create pages for trivial permutations (for example 500 "X to Y unit" pages with the same body) unless each truly serves distinct demand. Five fully translated language versions of a real tool are fine under Google's localization guidance. Machine-translated thin shells are the risk.
- The pattern among successful sites: years of compounding, deep libraries of real tools (Omni has about 3.5K), strong backlink profiles (tens of thousands of referring domains) and a focus on UX and speed. A new site can't match that on head terms, so it should target long-tail and localized gaps first.

### Gaps
- No verified primary case studies for smallpdf, tinywow, calculator.net or 123apps SEO strategy were retrieved. There is no reliable data on tinywow's traffic history after 2024 updates.
- No study specifically measuring AIO rates in DE/FR/IT/ES/PL. AIO rollout and trigger rates in EU languages may differ from the English data.

## Q6. Which generic tool niches are saturated vs still open across languages?

### Takeaway
Evidence is thin. Head terms for PDF tools (merge/compress/convert) are dominated by global brands with full localization, so they are saturated in every target language. Calculators have big players too (Omni is itself Polish and expanding into DE/FR/IT/ES). Openings are more likely in country-specific calculators and long-tail tool variants. This is an inference and needs checking per SERP.

### Cited Findings
- The PDF category has many large, established players: iLovePDF (about 150M visits/month, regional domains), Soda PDF (about 1.5M visits in May 2025) and others — [Similarweb](https://www.similarweb.com/website/ilovepdf.com/); [Ahrefs](https://ahrefs.com/websites/sodapdf.com)
- Omni Calculator (a Polish company) is actively translating into Spanish, French, German and Italian, among others. This raises competition for generic calculators in exactly these markets — [Google for Publishers](https://www.google.com/ads/publisher/stories/omni_calculator/)

### Inferences
- **Saturated (all 5 languages)**: PDF merge, split and compress, PDF to Word, JPG to PDF, image compress and resize, background remover, QR code generator, word counter, basic unit, currency and percentage calculators (Google widgets), BMI.
- **Likely more open (verify)**: calculators tied to national rules, such as PL (ZUS, net salary "wynagrodzenie netto", statutory interest, VAT), DE (Brutto-Netto variants, Kfz-Steuer, Pendlerpauschale), FR (frais kilométriques, salaire brut-net cadre/non-cadre), IT (codice fiscale, IMU, TFR), ES (finiquito, IRPF, paro). Also niche developer and text tools in local language, where local SERPs often show English results. And long-tail modifiers of saturated tools ("ohne Wasserzeichen", "sans inscription", "senza registrazione", "bez rejestracji", "sin marca de agua"), plus file-format or edge-case converters.
- Priority order for a new, low-authority site: (1) country-specific calculators with a weak local SERP, (2) local-language developer and text tools where English results rank, (3) long-tail modifiers of big tool categories. Head PDF and image terms should wait until the domain has authority.

### Gaps
- No systematic, sourced study comparing tool-niche competition across DE/FR/IT/ES/PL was found. The niche lists above are hypotheses to check with the Q2 SERP checklist.
- Reddit r/SEO and r/juststart anecdotes on tool sites in 2025–2026 did not show up in searches (the search tool did not return Reddit threads), so there is no anecdotal evidence to report.
