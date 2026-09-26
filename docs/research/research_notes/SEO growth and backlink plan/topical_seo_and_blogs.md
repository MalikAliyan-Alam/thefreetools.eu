# Topical and on-page SEO and blog strategy for free tool/calculator sites (as of 2026-09-26)

Scope: thefreetools.eu. A new multilingual static tool site with no backlinks, launched 2026-09-26.
Method: web search and fetch, about 17 tool calls. Primary Google Search Central docs were preferred where they exist. Vendor and agency statistics are labelled as such. Anything not verified goes in the Gaps sections.

## 1. How successful tool/calculator sites structure pages and win keyword clusters; one page vs separate pages (SERP overlap)

### Takeaway
Large calculator sites win clusters in two ways:
- They build many single-purpose pages, one per distinct task or variant, all in the same template.
- They build programmatic variants only where the inputs or rules really differ (for example, a paycheck calculator per US state).

Whether variants get one page or separate pages is decided from the SERP. If Google already ranks the same URLs for two queries, one page serves both. If the results differ, each query needs its own page.

### Cited Findings
- Omni Calculator has 3,700+ calculators and started in 2016. It reports 7M+ organic traffic and nearly 29,000 linking sites, including large sites like Healthline that cite its calculators. Its calculator pages follow one pattern: introduce the problem, explain the formula, then show how to calculate it. — [Creative Widgets / aggregated](https://creativewidgets.io/blog/calculator-websites-seo); [Semrush omnicalculator overview](https://www.semrush.com/website/omnicalculator.com/overview/) (third-party estimates, not verified).
- Ahrefs (published 2024-12-30) shows how concentrated calculator traffic is:
  - Groww.in has 216 pages under /calculator/ with 8.6M total traffic, ranking for 77.2k calculator keywords.
  - SmartAsset built paycheck calculators for every US state, and this programmatic set drives significant organic traffic.
  - In one subfolder, the pregnancy calculator alone drives 85.4% of the subfolder's traffic.
  - Source: [Ahrefs, 8 Websites Driving Insane Traffic Using Calculators](https://ahrefs.com/blog/website-calculators/).
- Ahrefs, "The Free Tools SEO Strategy" (2026-07-16):
  - Tools answer "do" searches that a blog post cannot answer. Its example list starts with "A grade calculator".
  - It recommends winnable niche variants over head terms. Low-difficulty examples: "etsy fee calculator" KD 7, "amazon fba calculator" KD 20. A head term like "mortgage calculator" is KD 81.
  - It says Omni pulls about 2.3M monthly US visits mainly through single-purpose pages, each targeting specific variants.
  - Converter pages rank for literal value queries. Example: Clockify's military-time converter ranks for "2200 military time" (31.2k US visits).
  - Source: [Ahrefs](https://ahrefs.com/blog/the-free-tools-seo-strategy/).
- SERP-overlap clustering rule of thumb: if two keywords share 3 or more of the same top-10 URLs, they belong on one page. An overlap of 0–1 URLs suggests separate pages. — [HubSpot keyword clustering 2026](https://blog.hubspot.com/marketing/keyword-clustering); [Oncrawl SERP clustering](https://www.oncrawl.com/on-page-seo/keyword-clustering-using-python-serp-api/). This is practitioner heuristic, not a Google rule.
- Ahrefs "Parent Topic" is a lightweight version of the same idea. It groups keywords whose top-ranking page is the same, but it looks only at the #1 URL and the strictness cannot be configured. — [SEOcluster comparison](https://seocluster.ai/compare/seo-cluster-ai-vs-ahrefs) (vendor comparison).
- Google's query fan-out: AI Mode and AI Overviews issue "concurrent, related queries". Google says this means expanding information access, "rather than requiring separate pages" for every sub-question. — [Google AI optimization guide, updated 2026-07-10](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

### Inferences
- Apply this per tool:
  - Run the SERP-overlap check with Semrush or manual top-10 comparisons. Example groups: "gpa calculator" / "college gpa calculator" / "cumulative gpa calculator" / "weighted gpa calculator".
  - Overlap of 3 or more URLs: keep one page and cover the variant with an H2, a toggle and FAQ entries.
  - Overlap of 0–1: build a separate page. It must have a separate function or rule set (for example, weighted vs unweighted, or a 4.0 vs 5.0 scale if the SERPs differ).
- Converter tools are good candidates for "literal value" long tails, following the military-time pattern. Examples: "1500 en letras", "تفقيط 1000", "kwota słownie 1000 zł", "1445 هجري ميلادي". This only makes sense if each value page adds real value; see section 4 on the risks.
- Traffic is likely to concentrate in one or two winners per language, as in the Ahrefs data. Spend effort on the tools where the SERP shows weak competitors rather than spreading evenly.

### Gaps
- I did not fetch or analyse the page structure of mipromedio.cl, hijri-calendar.com, rapidtables, smallpdf, ilovepdf or calculator.net. The findings above rely on Ahrefs and aggregated summaries. A manual review is recommended; the seo-auditor agent or a browser pass could do this.
- There is no public, official Omni methodology write-up. The "2.3M US" and "7M organic" figures come from third-party estimates, differ from each other, and are not verified.

## 2. Topic clusters, hub-and-spoke, internal linking, anchor text, breadcrumbs, related-tools blocks

### Takeaway
Google's own guidance is simple:
- Every important page should get at least one internal link.
- Anchor text should be descriptive and natural.
- Links should sit inside relevant context. There is no magic number.

Correlational data (Zyppy) links more internal links, and more varied anchor text, with more traffic, up to about 40–45 links per URL.

### Cited Findings
- Google on links and anchors (updated 2025-12-10):
  - "Every page you care about should have a link from at least one other page on your site."
  - Use descriptive anchors, not "click here".
  - "Write as naturally as possible, and resist the urge to cram every keyword."
  - Space links out and give them surrounding context. There is no ideal link count.
  - Source: [Google link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).
- Zyppy study (updated 2026-02-23; 23 million internal links, 1,800 sites, about 520k URLs, compared against GSC data):
  - URLs with 0–4 internal links averaged 2 clicks. URLs with 40–44 links got about 4x that.
  - Traffic declined after 45–50 links per URL.
  - More anchor-text variations correlated with more traffic, strongly enough that the researchers re-ran the data three times.
  - Pages with at least one exact-match anchor got "at least five times more traffic".
  - Source: [Zyppy](https://zyppy.com/seo/internal-links/seo-study/).
  - Note: an aggregator describes this as "23 billion internal links by Zyppy and Ahrefs" ([Exploding Topics](https://explodingtopics.com/blog/internal-linking)), which conflicts with the primary source (23 million). Use the primary source.
- Other aggregator claims are not verified against primary sources and should be treated as unreliable:
  - "Ahrefs 2026 case study: 73% increase in visibility within 60 days" from hub-and-spoke linking.
  - "Bi-directional linking increases AI citation probability 2.7x".
  - Source for both: [search summary / various agency blogs](https://www.digitalapplied.com/blog/internal-linking-strategy-topical-authority-playbook-2026).
- Anchor text pointing to a page is one of the sources Google uses to generate that page's title link. — [Google title links doc](https://developers.google.com/search/docs/appearance/title-link).

### Inferences
- Recommended linking pattern for thefreetools.eu:
  - Per language, have a category hub, for example /ar/education/ for GPA, grade and percentage tools.
  - Tool pages are the "money" spokes. Guides link up to their tool with varied, natural anchors: one exact match ("GPA calculator"), plus partial and descriptive ones ("calculate your cumulative GPA").
  - Each tool page links down to 2–5 guides, placed in a "Guides" block under the FAQ and inline where relevant.
  - Add a related-tools block of 3–6 contextually related tools. Examples: GPA links to percentage and grade tools; VAT links to invoice generator and numbers-to-words (which goes on invoices); Hijri converter links to age calculator and working days.
  - Keep BreadcrumbList as it is (Home > Category > Tool).
- Avoid sitewide footer link dumps with identical exact-match anchors. The Zyppy data suggests variety matters and Google warns against cramming keywords.
- Link across languages only through hreflang and a language switcher, not in-body. Each language cluster should be self-contained.

### Gaps
- There is no controlled public study isolating the effect of a "related tools" block on tool sites.

## 3. Semantic coverage (PAA, autocomplete, related searches, entities) and how much content a tool page should carry

### Takeaway
Google says it has no preferred word count, that AI systems understand synonyms, and that content should not be split into tiny "chunks" for AI. The winning pattern is tool-first, with content below that answers the real sub-questions: formula, worked example, local rules and edge cases. Word-count padding and keyword-variant stuffing do not help.

### Cited Findings
- Google's helpful-content guidance (updated 2025-12-10):
  - It lists "targeting specific word counts" as a search-engine-first warning sign, because Google has no preferred length.
  - It asks whether content has original information and substantial value compared with others.
  - Source: [Google, Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).
- Google's gen-AI optimization guide (updated 2026-07-10):
  - "AI systems can understand synonyms and general meanings". There is no need for AI-specific rewrites or for chunking content, because systems comprehend "the nuance of multiple topics on a page".
  - "Don't just recycle what others on the internet have already said, or could easily be produced by a generative AI model."
  - Source: [Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).
- Practitioner report (anecdotal, via Reddit, quoted in Wisp's summary): a tool page with no text struggled, because "You need some content on the page to help Google understand what it is about." — [Wisp CMS summary](https://www.wisp.blog/blog/the-ultimate-guide-to-ranking-calculator-tools-seo-strategies-that-actually-work).
- The Omni pattern (problem, then formula, then how to calculate) — [Creative Widgets](https://creativewidgets.io/blog/calculator-websites-seo).

### Inferences
- The current template (intro, how it's calculated, worked example, rules table, 4 FAQs) already matches the proven pattern.
- Content growth should come from real local sub-intents found in PAA, autocomplete and related searches. Examples:
  - Spanish (Chile) GPA: "nota mínima para aprobar", "cómo se calcula el NEM", "promedio ponderado con porcentajes".
  - Arabic GPA: "حساب المعدل التراكمي من 4 / من 5", "الفرق بين المعدل الفصلي والتراكمي", "تحويل المعدل إلى نسبة مئوية".
- Add each such intent as an H2 or FAQ only if it can be answered specifically. Anything needing more than about 300 words should become a guide instead.
- Entities to cover explicitly, because they are specific rather than generic:
  - Grading scales (4.0, 5.0, 1–7 Chilean scale).
  - Institutions and national systems (NEM/PAES in Chile; Saudi and Jordanian university scales).
  - Calendar authorities for Hijri (Umm al-Qura).
- Keep the tool above the fold on mobile and all content below it.

### Gaps
- I found no reliable quantitative study, from 2025–2026, of the optimal on-page word count for tool pages. Google explicitly rejects word-count targets.

## 4. Google policies 2024–2026: scaled content abuse, site reputation abuse, helpful content in core, AI-assisted content, safe vs risky programmatic pages

### Takeaway
Google judges purpose and value, not how content was produced. Mass-generated pages "without adding value" are scaled content abuse whether written by humans or AI. Near-duplicate variant pages aimed at similar queries are doorway abuse.

A programmatic page is safe when each page has a distinct intent plus unique data or function. It is risky when only a word or number is swapped into boilerplate.

### Cited Findings
- Spam policies (page last updated 2026-08-28):
  - Scaled content abuse is "many pages are generated for the primary purpose of manipulating search rankings and not helping users". Examples include "Using generative AI tools or other similar tools to generate many pages without adding value", and pages stuffed with keywords but little coherent meaning.
  - Doorway abuse is pages created "to rank for specific, similar search queries". An example is "substantially similar pages closer to search results".
  - Site reputation abuse is third-party content hosted to exploit the host's ranking signals.
  - Expired domain abuse is also listed.
  - Source: [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies).
- The site reputation abuse policy was tightened in November 2024: first-party oversight does not exempt third-party content. — [Google Search Central blog 2024-11](https://developers.google.com/search/blog/2024/11/site-reputation-abuse). This is not relevant to thefreetools.eu unless it hosts third-party or sponsored content.
- March 2024: the helpful content system was folded into the core ranking systems, alongside new spam policies (scaled content, site reputation, expired domain). Google reported a 45% reduction in low-quality, unoriginal content, against a 40% target. — [Google blog, March 2024](https://developers.google.com/search/blog/2024/03/core-update-spam-policies); [coverage](https://coalitiontechnologies.com/blog/google-march-2024-core-update-bad-news-for-low-quality-content).
- August 2025 spam update: started 2025-08-26 and completed 2025-09-22. — [seo-kreativ](https://www.seo-kreativ.de/en/blog/google-august-2025-spam-update-officially-complete/).
- Google on gen-AI content (updated 2025-12-10):
  - Allowed for "researching a topic, and to add structure to original content".
  - "generate many pages without adding value for users may violate" the scaled content abuse policy.
  - Quality raters rate "little to no effort, little to no originality, and little to no added value".
  - Google recommends disclosing how content was created where readers would expect it.
  - Source: [Google, using gen AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content).
- Helpful-content guidance lists "changing the date of pages to make them seem fresh when the content has not substantially changed" as a warning sign. — [Google](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).
- Practitioner consensus (not Google):
  - Programmatic SEO is safe when each page has "a distinct intent, enough unique information".
  - "If you can swap a location word and keep the page meaning unchanged, you have a risk cluster."
  - Source: [metaflow / eastondev summaries](https://eastondev.com/blog/en/posts/media/20260326-programmatic-seo-guide-2025/).
- Ahrefs cites SmartAsset's per-state paycheck calculators, where each state has different tax rules, as a successful programmatic set. — [Ahrefs](https://ahrefs.com/blog/website-calculators/).

### Inferences
Risk ratings for the proposed programmatic ideas:
- **Lower risk:**
  - Per-country or per-scale pages where the rules or math really differ. Examples: GPA on a 4.0 vs 5.0 scale; Chile 1–7 vs other Latin American scales.
  - Per-year Hijri calendar pages (e.g., 1447/1448) with the actual day-by-day month table, holidays and the Umm al-Qura source.
  - Per-currency numbers-to-words pages where the grammar or currency naming really differs. Examples: "pesos chilenos" vs "euros"; Arabic تفقيط with ريال vs دينار gender and number agreement; Polish złoty declension.
- **Medium risk:** per-university GPA pages. These are safe only if each page carries that university's real, sourced grading table and rules, and ideally the calculator preconfigured to it. If the table isn't verified, don't publish the page.
- **High risk:**
  - Thousands of "N in words" value pages (e.g., "1234 en letras") with templated text. This is closest to doorway and scaled-content territory.
  - Per-city pages with no city-specific rules.
  - AI-rewritten intros across languages without localisation.
- If value pages are used at all, cap them at the most-searched values that show real demand, add genuinely useful content (the cheque/invoice format, rounding rules), and noindex the long tail.
- Codebase note: recent commit 96d2bc1, "Use today's date for content lastmod". If lastmod or visible "updated" dates move without substantive changes, this conflicts with Google's warning against faking freshness.
  - Recommendation: tie lastmod and visible dates to real content edits.
  - Inference: this may be harmless if the site only rebuilt at launch, but it should not become the ongoing behaviour.

### Gaps
- Google publishes no numeric threshold for how many programmatic pages are "too many". No official statement addresses per-value converter pages specifically.

## 5. AI Overviews / AI Mode impact on calculator and tool queries (2025–2026) and how to still win clicks

### Takeaway
AI Overviews reduce organic CTR on queries where they appear; the Seer study measured a 61% drop, reported September 2025. I found no rigorous study specific to calculator or tool queries.

Vendor and practitioner analyses argue that tasks needing interaction and user input resist zero-click. This is plausible but not proven.

Google's official line (May 2026) is that optimizing for AI features "is still SEO". llms.txt and special markup are not used, and structured data is not required for AI features.

### Cited Findings
- Seer Interactive (September 2025):
  - Organic CTR on queries with an AI Overview fell from 1.76% to 0.61%, a 61% drop.
  - Paid CTR fell from 19.7% to 6.34%.
  - Brands cited in AI Overviews earned 35% more organic clicks.
  - Source: [Seer Interactive](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-september-2025-update).
- Semrush (10M+ keywords): informational queries were 91.3% of AIO triggers in January 2025 and 57.1% by October 2025, while the commercial and transactional share rose. — [Semrush AI Overviews study](https://www.semrush.com/blog/semrush-ai-overviews-study/).
- AI Mode: one report says 1B monthly users by May 2026, and another says about 100M+ MAU. These conflict and neither is primary. — [honeyb.ai](https://www.honeyb.ai/blog/google-ai-mode-may-2026) vs [searchcounselco](https://searchcounselco.com/google-ai-mode-seo-2026-traffic-impact/). Treat both as unreliable; the primary source is [Google I/O 2026 blog](https://blog.google/products-and-platforms/products/search/search-io-2026/), which I did not fetch.
- Google launched Search Console "Search Generative AI performance reports" on 2026-06-03 and rolled them out worldwide by 2026-08-31.
  - They show impressions, pages, countries, devices and dates.
  - At launch they showed no clicks, CTR or queries.
  - Source: [Google blog](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports); [SEJ](https://www.searchenginejournal.com/google-search-console-ai-reports-rolled-out-worldwide/587836/).
  - One secondary source mentions a new opt-out toggle for AI features; this is not verified in a primary source. [search summary](https://seo-hacker.com/search-generative-ai-performance-report-search-console/).
- Google's AI optimization guide (2026-05-15, updated 2026-07-10):
  - "optimizing for generative AI search is optimizing for the search experience, and thus still SEO".
  - llms.txt: "Google Search itself doesn't use them". They neither help nor harm.
  - "Structured data isn't required for generative AI search".
  - Recommends unique, non-commodity content.
  - Sources: [Google guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide); [SEJ](https://www.searchenginejournal.com/googles-new-ai-search-guide-calls-aeo-and-geo-still-seo/575026/).
- Opinion (vendor blogs): interactive tools "naturally resist zero-click summarization because users must visit the site to use them". They also earn AI citations for the formula and methodology around them. — [MaxAEO](https://maxaeo.ai/blog/interactive-tools-ai-citations/) (vendor, speculative).

### Inferences
- The tool queries most exposed to zero-click are simple conversions, which Google or an AI can answer inline: "1445 hijri to gregorian", "1234 in words", VAT on one amount.
- Tasks that need several inputs, files or output are more defensible: GPA across many courses, invoice generation, passport photo, working days with holidays. Prioritise these.
- To still win clicks:
  - Make title and description promise the interactive or downloadable outcome (see section 7).
  - Keep the formula, worked example and rules tables quotable, since AIOs cite methodology.
  - Track the GSC generative AI report.
- The site's existing llms.txt and llms-full.txt (commit 220f3af) are harmless but not used by Google Search. Do not invest more there for Google.

### Gaps
- I found no 2025–2026 dataset isolating AIO trigger rates or CTR for "calculator/converter/generator" queries. Also not measured: whether Google's own native widgets (calculator, unit and currency converters) expanded in 2026.

## 6. E-E-A-T for tool sites: author/about pages, sources, update dates, methodology

### Takeaway
Google's "Who, How, Why" framework applies directly:
- **Who:** show who is responsible, with a byline or about page.
- **How:** explain how the results are produced (methodology and sources) and disclose automation where readers would expect it.
- **Why:** content exists to help, not to rank.

Trust is the most important part of E-E-A-T. For calculators, correctness and transparent sources are the trust signals.

### Cited Findings
- "Is it self-evident to your visitors who authored your content?" Google recommends bylines linking to author or background pages, and transparency about how content was produced, including AI use. It also asks whether content has clear sourcing and whether research into the site would show it is trusted. — [Google, Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).
- Share "information about how a piece of content was created" where relevant. — [Google, gen AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content).

### Inferences
- Add an About page, covering who builds the site, contact details and an editorial/correction policy.
- Add a Methodology and sources page per tool, or a section on the tool page. Cite the official sources behind the rules:
  - The university or ministry grading scale.
  - The Umm al-Qura calendar.
  - The national VAT rate law.
  - For UAE gratuity, the UAE Labour Law.
- Show "Last reviewed" dates only when content is actually reviewed.
- Cross-verify outputs with the tool-tester agent, and publish test cases as worked examples.
- Put a named reviewer on guides, preferably someone with relevant background (an educator for GPA, an accountant for VAT or invoices), but only if real.

### Gaps
- There is no official Google statement specific to calculator sites. Quality Rater Guideline specifics for "tools" pages were not fetched.

## 7. Blog/guide strategy per tool; titles/meta/H1 for CTR; FAQ rich results in 2026

### Takeaway
Supporting guides help when they:
- answer real sub-intents the tool page can't hold (country rules, conversions between scales, how-to with examples, printable tables)
- link to the tool
- are written with specific, sourced local detail.

For a new domain, a few high-quality guides per tool beat volume.

For CTR: Google recommends concise, descriptive, non-boilerplate titles in the page's language, and it rewrites titles that are stale, inaccurate or boilerplate. FAQ rich results no longer appear in Google Search as of 2026-05-07. FAQPage markup is harmless but gives no SERP feature.

### Cited Findings
- FAQ rich results deprecated:
  - Stopped appearing 2026-05-07.
  - Search Console report and Rich Results Test support dropped June 2026.
  - API support ended August 2026.
  - Google's wording: "FAQ rich results are no longer appearing in Google Search."
  - The markup can stay "without causing problems" but "won't produce visible results".
  - Sources: [SEJ, 2026-05-10](https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/); [Google documentation updates](https://developers.google.com/search/updates).
  - Background: since August 2023, FAQ results had already been limited to authoritative government and health sites ([Red Shark Digital](https://www.redsharkdigital.com/news/google-how-to-faq-rich-results-update)).
- Google title links (updated 2025-12-10):
  - Titles should be descriptive and concise, with no keyword stuffing and no repeated boilerplate across pages.
  - Brand goes at the beginning or end, after a delimiter.
  - Match the page's language and script.
  - Make the main title prominent, e.g. as the H1.
  - Google rewrites half-empty, outdated, inaccurate or boilerplate titles and language mismatches. It draws on the H1, og:title, anchor text and WebSite structured data.
  - Source: [Google title links](https://developers.google.com/search/docs/appearance/title-link).
- Helpful-content warning signs to avoid in a blog programme:
  - Content made primarily to attract search traffic.
  - Mass-producing on trending topics without expertise.
  - Word-count targets.
  - Faked freshness.
  - Source: [Google](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

### Inferences (recommendations, not sourced facts)
- **Location of guides:** put them under the same language folder, for example /en/guides/gpa/..., /es/guias/promedio/... and /ar/مقالات/... (or /ar/guides/ if you want ASCII slugs).
  - A guides section tied to tool categories keeps the topical cluster inside one language subtree and avoids a generic, mixed /blog/.
  - This is based on the Google linking and structure guidance above; no study compared /blog/ with /guides/.
- **Article types, ordered by expected usefulness to the tool:**
  1. Country or system-specific rules and conversion guides (a scale conversion table).
  2. How-to with worked examples for tricky cases (weighted, retakes, pass/fail).
  3. Printable tables and templates (Hijri year calendars, number-to-words cheque examples, invoice templates).
  4. Comparison or explainer (semester vs cumulative).
  5. Only then broader "tips" content.
- **How many per tool:** 3–6 strong guides per tool per language to start. This is inference; no source gives a number. Add more only where a SERP check shows a distinct intent that the tool page can't satisfy.
- **Cadence for a new domain:** a steady, sustainable pace (e.g., 1–3 guides per week across the site) matters less than quality and sourcing. There is no evidence that cadence alone is a ranking factor. Avoid a large one-time dump of AI-drafted guides, because of the scaled-content risk.
- **Guide structure:**
  - The answer in the first 2–3 sentences.
  - An embedded mini-CTA or link to the tool near the top.
  - A sourced rules table.
  - A worked example.
  - "Use the calculator" at the end.
  - Link back from the tool's "Guides" block.
- **Title patterns for tool pages (inference):** "[Primary keyword]: [outcome/qualifier] – [Brand]". Examples:
  - "GPA Calculator – Semester & Cumulative GPA (4.0 Scale) | TheFreeTools"
  - "حساب المعدل التراكمي من 4 و 5 – حاسبة فورية | TheFreeTools"
  - "Calcular promedio de notas (escala 1 a 7, Chile) | TheFreeTools"
  - The H1 should state the task plainly. The meta description should promise free, instant use with no sign-up, plus the distinctive feature (weighted credits, local scale).
  - Put the year in titles only when the content really is year-specific (Hijri calendar 1448, VAT rates). Google replaces outdated dates.

**Example guide titles for the GPA tool.** These are hypotheses to validate against Semrush volume and SERP overlap; no search volumes were verified in this research.

English:
1. How to Calculate Cumulative GPA (With Worked Examples for Retakes and Pass/Fail)
2. Weighted vs Unweighted GPA: What Colleges Actually Look At
3. GPA to Percentage Conversion Chart (4.0 Scale)
4. What GPA Do I Need Next Semester to Reach a 3.0? (Target GPA Math Explained)
5. Semester GPA vs Cumulative GPA: The Difference and How Each Is Calculated

Arabic (Saudi/Jordan):
1. طريقة حساب المعدل التراكمي من 5 في الجامعات السعودية بالخطوات
2. كيف أحسب المعدل التراكمي من 4 في الجامعات الأردنية؟ مع مثال محلول
3. تحويل المعدل التراكمي إلى نسبة مئوية: جدول من 4 ومن 5
4. الفرق بين المعدل الفصلي والمعدل التراكمي وكيف يؤثر إعادة المادة
5. كم أحتاج في الفصل القادم لرفع معدلي التراكمي؟ شرح المعادلة

Spanish (Chile):
1. Cómo calcular el promedio de notas en Chile (escala 1 a 7) paso a paso
2. Cómo calcular el promedio ponderado con porcentajes: ejemplos resueltos
3. ¿Qué nota necesito para aprobar? Cómo calcular la nota mínima del examen
4. Cómo se calcula el NEM y su relación con el promedio de enseñanza media
5. Tabla de conversión de notas chilenas (1 a 7) a porcentaje y GPA

### Gaps
- There is no controlled evidence on /blog/ vs /guides/, on the number of articles per tool, or on publishing cadence for new domains. Recommendations above are inference.
- I found no 2025–2026 CTR study specific to tool-page title patterns.
- The Arabic and Spanish long-tail intents are inferred from domain knowledge, not from autocomplete or PAA pulls. Validate them with Semrush, Google autocomplete and PAA in the target countries (SA, JO, CL) before writing.
- Arabic-specific note: Jordanian universities mostly use a 4-point scale, and some Saudi universities use a 5-point scale. Verify each university before claiming this.
