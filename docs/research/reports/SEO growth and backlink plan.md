# IndexNow, local guides aur assets se thefreetools jeetein

**Seedhi baat:** thefreetools.eu ke liye SEO growth plan ki ranking yeh hai. **(1)** Pehle hafte mein IndexNow ka key file aur post-deploy ping lagayein, Bing Webmaster Tools poora setup karein, aur Cloudflare ki AI-bot settings check karein. **(2)** Har tool ko ek language-wise category hub ke neeche rakhein, 3-6 sourced local guides banayein, aur programmatic pages sirf wahan banayein jahan rules ya math waqai alag hon. **(3)** Links "linkable assets" se kamayein, jaise university GPA scale tables, Hijri 1448 calendar, VAT rate table, aur open-source tafqit/numeros-a-letras packages. Directories aur communities sirf starting ke liye hain. Har target market mein Google ka share **88-97%** aur Bing ka **2-9%** hai. Is ka matlab hai ke baaki engines (Yandex, Naver, Seznam) ke liye alag console banane ki zaroorat nahi, kyunki IndexNow ka ek ping unhein bhi pohanch jata hai. AI answers (ChatGPT, Copilot, Perplexity, Claude) mein citation ka raasta bhi Google aur Bing index se guzarta hai. llms.txt ko Google khud ignore karta hai. Realistic target yeh hai: pehle 3 mahine **5-12 referring domains/month**, jab assets ban jayein to **10-25/month**. Head terms ("GPA calculator") par 12+ mahine lagenge, lekin Arabic aur Spanish long-tail 1-3 mahine mein move kar sakti hain. Yeh sab planning estimates hain, measurement nahi. Report mein jahan claim verify nahi hua, wahan **(unverified)** likha hai.

---

## 1. Do engines 97% market hain, IndexNow baaki sab ko ek ping mein cover karta hai

### Market share: Google + Bing ke ilawa koi console zaroori nahi

StatCounter ka August 2026 data (pageviews par based hai, queries par nahi, is liye isay directional samjhein) har target market mein ek hi pattern dikhata hai.

| Market | Google | Bing | Yandex | Source |
|---|---|---|---|---|
| Saudi Arabia | 95.76% | 2.82% | 0.82% | [StatCounter KSA](https://gs.statcounter.com/search-engine-market-share/all/saudi-arabia) |
| UAE | 95.8% | 2.37% | 1.25% | [StatCounter UAE](https://gs.statcounter.com/search-engine-market-share/all/united-arab-emirates) |
| Egypt | 95.37% | 3.29% | 0.6% | [StatCounter Egypt](https://gs.statcounter.com/search-engine-market-share/all/egypt) |
| Jordan | 96.56% | 2.36% | 0.39% | [StatCounter Jordan](https://gs.statcounter.com/search-engine-market-share/all/jordan) |
| Mexico | 88.42% | **9.23%** | 0.17% | [StatCounter Mexico](https://gs.statcounter.com/search-engine-market-share/all/mexico) |
| Chile | 89.86% | **7.49%** | 0.23% | [StatCounter Chile](https://gs.statcounter.com/search-engine-market-share/all/chile) |
| Colombia | 93.29% | 4.74% | 0.12% | [StatCounter Colombia](https://gs.statcounter.com/search-engine-market-share/all/colombia) |

Is table se do nateejay nikalte hain. Pehla, **LATAM mein Bing Gulf se taqreeban 3x strong hai**, is liye Spanish pages ke liye Bing Webmaster Tools (BWT) priority #2 hai. Doosra, Bing ahmiyat mein apne share se zyada hai, kyunki woh Copilot ka retrieval layer hai aur ChatGPT search ka bara input bhi. Ek secondary analysis ke mutabiq **ChatGPT ke ~87% citations Bing ke top organic results se match karte the** ([Peec AI](https://peec.ai/blog/chatgpt-built-its-own-search-index)). Yeh figure indicative hai, is par zyada bharosa na karein. Naver, Seznam aur Baidu in markets mein nazar hi nahi aate, is liye unke consoles skip karein. Yandex Webmaster optional hai (UAE mein max ~1.25%), kyunki IndexNow already Yandex ko cover karta hai.

### IndexNow: Bing, Yandex, Naver, Seznam, Yep ko ek hi ping

IndexNow mein ek engine ko bheja gaya URL **baaki sab participating engines ke saath share hota hai** ([indexnow.org](https://www.indexnow.org/documentation)). **Google IndexNow use nahi karta.** Woh 2021 se test kar raha hai lekin 2026 tak support nahi aaya ([Pressonify](https://pressonify.ai/blog/indexnow-instant-indexing-press-releases-2026)). Static Astro site par implementation yeh hai:

1. 32-character random hex key banayein aur `public/<key>.txt` commit karein. File mein sirf key ho. Key 8-128 chars (a-z, A-Z, 0-9, dash) honi chahiye ([indexnow.org](https://www.indexnow.org/documentation)).
2. `scripts/indexnow.mjs` banayein. Yeh `dist/sitemap-0.xml` parhe, sirf woh URLs uthaye jin ka `lastmod` aaj ka ho, aur unhein `POST https://api.indexnow.org/indexnow` par JSON `{"host","key","keyLocation","urlList"}` ke saath bheje. Ek POST mein max 10,000 URLs ja sakte hain.
3. **200 ya 202 success hai.** 403 ka matlab invalid key, 422 ka matlab URL host se match nahi karta, 429 ka matlab bahut zyada requests.
4. Sirf real content changes par ping karein. Har deploy par saare URLs dobara bhejna 429 ka risk hai.
5. Key file **hamesha live rakhein**. File hatane se aglay saare pings invalid ho jate hain.

**Cloudflare Crawler Hints** (zone > Caching > Configuration > toggle) cache MISS dekh kar khud IndexNow ko ping karta hai ([Cloudflare docs](https://developers.cloudflare.com/cache/advanced-configuration/crawler-hints/)). Lekin Workers static assets ke docs yeh nahi batate ke yeh un par fire hota hai ya nahi ([Cloudflare Workers static assets](https://developers.cloudflare.com/workers/static-assets/)). **(unverified)** Is liye isay on kar dein, yeh free aur harmless hai, lekin rely explicit script par hi karein. BWT ki IndexNow report mein dekh lein ke Cloudflare se koi submission aa raha hai ya nahi.

Google ke liye GSC sitemap (already done) aur URL Inspection > "Request indexing" hi raasta hai. Google Indexing API sirf JobPosting/BroadcastEvent ke liye hai, yahan use na karein. **(Yeh official docs se re-verify nahi hua.)**

### AI search: search bots allow karein, training bots par faisla aap ka

Google ka seedha kehna hai ke AI Overviews/AI Mode ke liye **"no additional requirements"** hain. Normal Googlebot indexing kaafi hai ([Google AI features](https://developers.google.com/search/docs/appearance/ai-features)). Google ki May 2026 guide kehti hai ke AI text files (llms.txt waghera) **"neither harm nor help … as Google Search ignores them"**, aur structured data AI search ke liye required nahi hai ([Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)). Is liye llms.txt ko rehne dein lekin us par aur waqt na lagayein.

| Platform | Citation ke liye allow karein | Training bot (block optional) | Note |
|---|---|---|---|
| Google AI Overviews / AI Mode | Googlebot | Google-Extended | Google-Extended block karne se Search ranking par asar nahi ([Google crawlers](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers)), lekin Gemini-app grounding par asar ho sakta hai |
| ChatGPT search | OAI-SearchBot, ChatGPT-User | GPTBot | robots.txt change reflect hone mein ~24h lagte hain ([OpenAI bots](https://developers.openai.com/api/docs/bots)) |
| Perplexity | PerplexityBot | (training nahi karta) | Perplexity-User aam taur par robots.txt ignore karta hai ([Perplexity docs](https://docs.perplexity.ai/guides/bots)) |
| Claude | Claude-SearchBot, Claude-User | ClaudeBot | Teeno robots.txt follow karte hain ([Anthropic help](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)) |
| Copilot / Bing | Bingbot | — | BWT ki **AI Performance report** (Feb 2026 se preview) citations aur grounding queries dikhati hai ([Bing blog](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)) |

**Recommendation:** Current `robots.txt` (`User-agent: * Allow: /`) sahi hai. AdSense-only free tools site ke liye training allow karna brand mentions mein thori madad kar sakta hai, is liye sab allow rakhna defensible default hai. Sab se bara hidden risk **Cloudflare ki "Block AI bots" / AI Crawl Control setting** hai. Yeh robots.txt ko override kar ke OAI-SearchBot, PerplexityBot aur Claude-SearchBot ko edge par hi block kar sakti hai. Dashboard mein check karein. (Menu ke exact 2026 naam **unverified** hain.)

### Setup checklist (priority order)

| # | Kaam | Kahan / kaise | Kaun |
|---|---|---|---|
| 1 | IndexNow key + ping script | `public/<key>.txt`, `scripts/indexnow.mjs`, `wrangler deploy` ke baad run | Claude |
| 2 | Crawler Hints ON | Cloudflare > Caching > Configuration | Owner |
| 3 | Cloudflare AI-bot blocking OFF for search bots | Cloudflare > Security / AI Crawl Control | Owner |
| 4 | BWT: sitemap, IndexNow report, Submit URLs (top pages), AI Performance | bing.com/webmasters | Owner |
| 5 | GSC: Domain property (DNS TXT), email alerts, Request indexing (har language ke top ~10 pages), Performance ko country (SA, EG, AE, JO, MX, CL, CO, PE) aur path (`/ar/`, `/es/`) se filter karein | search.google.com/search-console | Owner |
| 6 | GSC ki nayi **Search Generative AI performance report** dekhein (worldwide 2026-08-31 tak rollout; impressions dikhati hai, clicks nahi) ([Google blog](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)) | GSC | Owner |
| 7 | Validation pass: Rich Results Test, validator.schema.org, hreflang tester (technicalseo.com/tools/hreflang), PageSpeed Insights | Har language ka ek tool page | Claude + Owner |
| 8 | Optional: Yandex Webmaster, YouTube short demos (AR/ES), Google Trends | — | Owner |
| 9 | **Skip:** Google Business Profile (online-only business eligible nahi, **unverified** re-check), Naver/Seznam/Baidu, Indexing API | — | — |

---

## 2. SERP overlap batata hai ke ek page banana hai ya do, aur spam policy ki lakeer kahan hai

### Cluster rule: SERP decide karta hai, keyword list nahi

Calculator sites do tareeqon se clusters jeet-ti hain. Ek, har distinct task ke liye alag single-purpose page. Do, programmatic variants sirf wahan jahan inputs ya rules waqai alag hon. Ahrefs ke mutabiq Groww ke **216 calculator pages 8.6M traffic** laate hain, aur SmartAsset ne har US state ka alag paycheck calculator banaya kyunki har state ke tax rules alag hain ([Ahrefs](https://ahrefs.com/blog/website-calculators/)). Ahrefs ki 2026 "free tools" guide mein pehla example **"grade calculator"** hai. Woh head terms (mortgage calculator, KD 81) ki jagah low-KD niche variants recommend karti hai ([Ahrefs](https://ahrefs.com/blog/the-free-tools-seo-strategy/)). Traffic bohot concentrated hota hai: ek subfolder mein akele pregnancy calculator se **85.4%** traffic aata tha. Is liye har language mein 1-2 winners par zyada mehnat karein.

**Practical rule** (practitioner heuristic hai, Google ka rule nahi) ([HubSpot](https://blog.hubspot.com/marketing/keyword-clustering)):

1. Do keywords ke Google top-10 results compare karein (Semrush trial se ya manually).
2. **3+ URLs common hon** to ek hi page rakhein. Variant ko H2, toggle aur FAQ se cover karein.
3. **0-1 URLs common hon** to alag page banayein, lekin sirf tab jab uska function ya rule set alag ho (jaise 4.0 vs 5.0 scale).

### Hub-and-spoke aur internal linking

Google ki guidance simple hai: har important page ko kam az kam ek internal link mile, anchors descriptive hon, aur "resist the urge to cram every keyword" ([Google links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)). Zyppy ki study (23 million internal links, 1,800 sites) mein **0-4 internal links wale URLs ko average 2 clicks mile, jabke 40-44 links walon ko ~4x**. 45-50 links ke baad traffic girne laga. **Anchor variety** ka traffic se strong correlation tha ([Zyppy](https://zyppy.com/seo/internal-links/seo-study/)). Yeh correlation hai, causation nahi.

| Element | thefreetools.eu par kaise |
|---|---|
| Category hub (per language) | `/ar/education/`, `/es/educacion/`, `/en/education/`, jahan GPA, grade aur percentage tools hon. Finance hub mein VAT, numbers-to-words, ZATCA aur gratuity. Date hub mein Hijri, age aur working days |
| Tool → guides | Har tool page par FAQ ke neeche "Guides" block ho (2-5 links), aur jahan relevant ho wahan inline links |
| Guide → tool | Anchors mix karein: ek exact ("GPA calculator"), baaki partial/descriptive ("apna cumulative GPA nikaalein") |
| Related tools block | 3-6 tools jo contextually related hon: GPA ↔ percentage; VAT ↔ ZATCA invoice ↔ numbers-to-words (invoice par amount words mein likha jata hai); Hijri ↔ age ↔ working days |
| Breadcrumbs | Home > Category > Tool (BreadcrumbList JSON-LD jaisa hai waisa rakhein) |
| Cross-language | Sirf hreflang aur language switcher ke through. In-body cross-language links na dein |
| Avoid | Sitewide footer par ek jaisa exact-match anchor dump |

### Tool page par kitna content? Word count nahi, sub-intents

Google kehta hai ke **"targeting specific word counts"** ek warning sign hai ([Google helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)), aur AI systems synonyms samajhte hain, is liye content ko "chunk" karne ki zaroorat nahi ([Google AI guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)). Aap ka current template (intro, formula, worked example, rules table, 4 FAQs) Omni wale proven pattern se match karta hai ([Creative Widgets](https://creativewidgets.io/blog/calculator-websites-seo)). Growth ka tareeqa yeh hai ke PAA, autocomplete aur related searches se **real local sub-intents** uthayein, jaise "nota mínima para aprobar", "cómo se calcula el NEM", "الفرق بين المعدل الفصلي والتراكمي". Jo sub-intent ~300 words mein jawab ho jaye usay H2/FAQ bana dein, jo zyada lamba ho usay guide. Entities explicit likhein: 4.0/5.0/1-7 scales, NEM/PAES, Umm al-Qura, aur har mulk ka VAT law. Mobile par tool above the fold ho.

### Google spam policies: programmatic pages ka risk map

Google ki spam policies (2026-08-28 update) ke mutabiq **scaled content abuse** yeh hai: "many pages … generated for the primary purpose of manipulating search rankings", chahe AI ne likhe hon ya insaan ne. **Doorway abuse** yeh hai: "substantially similar pages" jo milti-julti queries ke liye banaye jayein ([Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies)). March 2024 mein helpful content system core ranking mein merge ho gaya tha ([Google blog](https://developers.google.com/search/blog/2024/03/core-update-spam-policies)). AI se research aur structure ki ijazat hai, lekin "generate many pages without adding value" violation hai ([Google gen-AI guidance](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)).

| Risk | Idea | Faisla |
|---|---|---|
| **Low** | GPA 4.0 vs 5.0 scale pages; Chile 1-7 vs Mexico 0-10 vs Colombia 0-5 | Banayein, kyunki math alag hai |
| **Low** | Hijri year pages (1447, 1448) jin mein asli day-by-day table, holidays aur Umm al-Qura source ho | Banayein |
| **Low** | Numbers-to-words per currency (ريال vs دينار ki gender/number agreement; pesos chilenos vs euros) | Banayein, kyunki grammar alag hai |
| **Medium** | Per-university GPA pages | Sirf tab jab university ki **verified, sourced** grading table ho aur calculator usi par preconfigured ho |
| **High** | Hazaron "1234 en letras" / "تفقيط 1000" value pages jin mein template text ho | Na banayein, ya sirf top-demand values banayein (cheque format aur rounding rules ke saath) aur long tail ko `noindex` karein |
| **High** | Per-city pages jin ke rules alag na hon; har language mein AI-rewritten intros | Na banayein |

Practitioner test yeh hai: **"If you can swap a location word and keep the page meaning unchanged, you have a risk cluster"** ([eastondev](https://eastondev.com/blog/en/posts/media/20260326-programmatic-seo-guide-2025/)).

**Codebase note:** Google "changing the date of pages to make them seem fresh" ko warning sign kehta hai. Maine `src/lib/routes.ts` check kiya. Wahan `lastmod` ab tool content ke `updated` field aur `PAGES_UPDATED` constant se aata hai, yani manual hai, aur yeh sahi hai. Rule yeh rakhein: `updated` sirf asli content edit par bump ho, rebuild par nahi.

### AI Overviews ka CTR par asar, aur clicks kaise bachayein

Seer Interactive (Sept 2025) ke mutabiq jin queries par AI Overview aata hai un par **organic CTR 1.76% se 0.61% par gir gaya (-61%)**, lekin AIO mein cite hone wale brands ko **35% zyada organic clicks** mile ([Seer](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-september-2025-update)). Calculator queries ke liye koi alag study nahi mili. Simple conversions ("1445 hijri to gregorian", ek amount par VAT) zero-click ke liye sab se zyada exposed hain. **Multi-input ya output wale tools** (poore semester ka GPA, invoice generator, passport photo, holidays ke saath working days) zyada defensible hain, is liye inhein priority dein. Vendor blogs ka dawa hai ke interactive tools zero-click resist karte hain, lekin yeh **speculative** hai ([MaxAEO](https://maxaeo.ai/blog/interactive-tools-ai-citations/)).

### Titles, E-E-A-T aur FAQ

**FAQ rich results 2026-05-07 se Google Search mein nazar aana band ho gaye hain.** Markup rakhne mein koi nuqsan nahi, lekin SERP par koi feature nahi milega ([SEJ](https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/)). Titles concise, page ki language mein, aur bina boilerplate ke hon. Google boilerplate ya outdated titles rewrite kar deta hai ([Google title links](https://developers.google.com/search/docs/appearance/title-link)). Pattern yeh rakhein (inference): **"[Primary keyword]: [outcome/qualifier] | TheFreeTools"**.

| Lang | Title example |
|---|---|
| EN | GPA Calculator – Semester & Cumulative GPA (4.0 Scale) \| TheFreeTools |
| AR | حساب المعدل التراكمي من 4 و 5 – حاسبة فورية \| TheFreeTools |
| ES | Calcular promedio de notas (escala 1 a 7, Chile) \| TheFreeTools |

Title mein saal sirf tab daalein jab content waqai year-specific ho (Hijri 1448, VAT rates). E-E-A-T ke liye Google ka "Who, How, Why" framework follow karein ([Google](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)):

1. About page par yeh sab ho: kaun bana raha hai, contact, aur correction policy.
2. Har tool par "Methodology & sources" section ho, jismein ministry/university scale, Umm al-Qura, VAT law aur UAE Labour Law ke links hon.
3. "Last reviewed" sirf asal review par dikhayein.
4. tool-tester agent ke test cases ko worked examples ke taur par publish karein.
5. Reviewer ka naam sirf tab dein jab woh asli insaan ho.

---

## 3. Har tool ke liye 3-6 sourced guides, har language ke apne folder mein

Guides tab faida deti hain jab woh aise sub-intents cover karein jo tool page mein fit nahi hote: country rules, scale conversion, tricky worked examples, printable tables. Naye domain ke liye **kam lekin sourced guides, volume se behtar hain**. Guides ki tadaad (3-6) aur cadence (1-3/week poori site par) **inference** hain, kisi study se nahi aaye. Ek saath AI-drafted guides ka dump scaled-content risk hai.

**Structure (har guide):**

1. Pehli 2-3 lines mein seedha jawab.
2. Upar hi tool ka link ya mini-CTA.
3. Sourced rules table.
4. Worked example.
5. Aakhir mein "Use the calculator".
6. Tool page ke "Guides" block se is guide ko wapas link karein.

**Location:** `/en/guides/gpa/…`, `/es/guias/promedio/…`, `/ar/guides/…` (ASCII slugs). Generic mixed `/blog/` na banayein. Yeh inference hai, is par koi study nahi hai.

**Priority order of article types:** (1) country/system rules aur conversion tables, (2) tricky cases ke worked examples, (3) printable tables/templates, (4) comparison/explainer, (5) broad tips, sab se aakhir mein.

### Per-tool guide map (hypotheses: likhne se pehle Semrush/autocomplete/PAA se validate karein)

GPA ke titles research notes se hain. Baqi tools ke titles domain knowledge se draft kiye gaye hain, **kisi ki search volume verify nahi hui**.

| Tool | EN guides | AR guides | ES guides | Linkable asset |
|---|---|---|---|---|
| **GPA (live)** | How to Calculate Cumulative GPA (retakes, pass/fail); Weighted vs Unweighted GPA; GPA to Percentage Chart (4.0); Target GPA for next semester | طريقة حساب المعدل التراكمي من 5 في الجامعات السعودية؛ كيف أحسب المعدل التراكمي من 4 في الجامعات الأردنية؛ تحويل المعدل التراكمي إلى نسبة مئوية؛ كم أحتاج في الفصل القادم لرفع معدلي | Cómo calcular el promedio de notas en Chile (1 a 7); Promedio ponderado con porcentajes; ¿Qué nota necesito para aprobar?; Cómo se calcula el NEM; Tabla de conversión 1-7 a GPA | University grading-scale reference pages |
| **Hijri converter** | Hijri 1448 calendar (printable); Umm al-Qura vs sighting explained | التقويم الهجري 1448 بالميلادي (جدول)؛ الفرق بين تقويم أم القرى والرؤية | — | Printable Hijri 1448 PDF (Ramadan 1448 se pehle push, **tareekh moon sighting par depend karti hai**) |
| **Age calculator** | Age in Hijri vs Gregorian years | حساب العمر بالهجري والميلادي | Calcular edad exacta (años, meses, días) | — |
| **Numbers-to-words** | Writing amounts on cheques | التفقيط: قواعد كتابة المبالغ بالريال والدينار | Cómo escribir números en letras en un cheque (CLP/MXN/COP) | npm packages `tafqit`, `numeros-a-letras` |
| **VAT** | GCC VAT rates table | حساب ضريبة القيمة المضافة 15% (إضافة وخصم) | Cómo calcular el IVA (Chile 19%, México 16%) | VAT rate reference table (**rates publish karne se pehle verify karein**) |
| **ZATCA invoice** | ZATCA Phase 2 e-invoicing checklist | متطلبات الفاتورة الإلكترونية المرحلة الثانية؛ شرح رمز QR | — | Phase 2 checklist. **Jab tak certification na ho, "ZATCA certified" imply na karein** |
| **UAE gratuity** | UAE gratuity formula with examples | حساب مكافأة نهاية الخدمة في الإمارات | — | "Typical gratuity after 5/10 years" data study |
| **Working days** | Working days between dates (with holidays) | حساب أيام العمل | Calcular días hábiles (feriados Chile/México) | Holiday tables per country |
| **DNI letter** | — | — | Cómo se calcula la letra del DNI (algoritmo) | Open-source validator snippet |
| **Passport photo** | Passport photo size by country | مقاس صورة الجواز السعودي | Tamaño foto pasaporte México/Chile | Size-by-country table (**official sources se verify karein**) |

UAE gratuity ka formula (pehle 5 saal ke liye har saal ki 21 din ki pay) research notes mein community-answer example ke taur par aaya hai. Publish karne se pehle UAE Labour Law se verify karein.

---

## 4. Links assets se aate hain; directories aur communities sirf shuruaat hain

### Pehle Google ki lakeer samjhein

Google ki link spam policy mein yeh sab explicitly listed hai: links khareedna (goods ya free products ke badle bhi), automated links, **excessive link exchanges**, **low-quality directories**, keyword-rich widget links, sitewide footer links, aur forum signature links ([Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies)). Dec 2022 se SpamBrain buyers aur sellers dono ko detect kar ke unke links **neutralize** karta hai ([Google blog](https://developers.google.com/search/blog/2022/12/december-22-link-spam-update)). Is liye khareede hue links penalty ke baghair bhi paisa zaya hain. Mueller ke mutabiq link velocity khud penalty nahi hai, lekin "200 links in two days" buying jaisa lagta hai ([SEJ](https://www.searchenginejournal.com/google-link-velocity/331637/)).

**Kabhi na karein:** Fiverr ke "DA 50 guest post" packages, PBNs, doosri tool sites se link swap, "free listing agar badge link do" wali directories, blog-comment links, widget mein dofollow credit, "300 directories" services.

### Week 1: directories (4-6 ghante, ~5-8 referring domains)

Dofollow claims aggregator blogs se hain aur **aapas mein conflict karte hain**. Listing ke baad view-source se check karein.

| # | Platform | Cost | Link (reported) | Note |
|---|---|---|---|---|
| 1 | [AlternativeTo](https://alternativeto.net) | Free | DR ~80, dofollow **ya** nofollow (conflict) | Calculator.net, RapidTables, Omni aur gpacalculator.net ke "alternative" ke taur par list karein ([thesaasdir](https://thesaasdir.com/blog/best-saas-directories-for-backlinks/)) |
| 2 | [Uneed](https://www.uneed.best) | Free queue ($29.99 skip) | Conflict: free dofollow vs paid-only ([Uneed pricing](https://www.uneed.best/pricing)) | Daily leaderboard badge |
| 3 | [SaaSHub](https://www.saashub.com) | Free | DR ~70, conflict | — |
| 4 | [Product Hunt](https://www.producthunt.com) | Free | Nofollow | Jab 4+ tools live hon tab launch karein. Faida ek din ka traffic aur brand hai |
| 5 | BetaList, StartupBase, Launching Next, DevHunt, Smol Launch | Free | Reported dofollow ([position.digital](https://www.position.digital/blog/saas-directories/)) | BetaList ki acceptance criteria tool site ke liye **unverified** hai |
| — | There's An AI For That / FutureTools | Free | — | **Sirf passport photo** (agar AI background removal ho). Non-AI calculator yahan list karna misrepresentation hai |

### Communities: referral aur brand ke liye, link equity ke liye nahi

Reddit aur Quora ke links nofollow/UGC hote hain. Reddit ka rule hai "post authentic content … do not cheat or engage in content manipulation". "90/10" ratio sirf community convention hai, aur **subreddit sidebar rules hamesha jeet-te hain** ([redship.io](https://redship.io/blog/reddit-self-promotion-rules)). Quora Arabic aur Spanish abhi bhi active hain ([Quora Help](https://help.quora.com/hc/en-us/articles/360015662751-What-languages-does-Quora-support)). **Kisi subreddit ke rules is research mein verify nahi hue (Reddit fetch block tha).**

| Audience | Venue | Kya karein |
|---|---|---|
| EN | r/college, r/GradSchool, r/ApplyingToCollege, r/gradadmissions; Academia.SE | GPA conversion sawalon ka jawab comment mein poori calculation ke saath dein. Link sirf jahan allowed ho, disclosure ke saath: "I built a free calculator for this" |
| AR | r/saudiarabia, r/jordan, r/dubai, r/UAE; [ar.quora.com](https://ar.quora.com); university Telegram groups aur X study hashtags (**manual discovery zaroori**) | "كيف احسب المعدل التراكمي" jaise sawal. Pinned GPA scale tables (KSU, KAU, UJ, JUST) bare link se zyada share hoti hain |
| ES | r/chile, r/mexico, r/Colombia; [es.quora.com](https://es.quora.com) | "cómo calcular promedio de notas Chile", "cómo escribir números en letras en cheque" |

Rules: pehle **4-6 hafte genuine comment history** banayein, ek hi link multiple subs mein na daalein, aur hamesha bata dein ke tool aap ne banaya hai.

### Resource-page outreach: sab se reliable white-hat link source

Resource page outreach 2025-26 mein bhi mainstream tactic hai. Relevance, authority aur page ka actively maintained hona sab se zaroori hai ([Backlinko](https://backlinko.com/hub/seo/resource-pages), [Blue Tree](https://bluetree.digital/resource-page-link-building/)). SEJ tool sites ke liye yeh recommend karta hai: "best [niche] tools" pages dhoondein aur outdated ya broken entries ki jagah apna tool pitch karein ([SEJ](https://www.searchenginejournal.com/link-building-guide/free-tools/)). Neeche diye operators is plan ke liye likhe gaye hain, **inka yield test nahi hua**.

| Audience | Search operators |
|---|---|
| EN GPA | `intitle:resources "GPA calculator"` · `"useful links" "GPA" site:.edu` · `inurl:counseling "GPA calculator"` |
| ES | `intitle:recursos "calcular promedio"` · `site:.cl "recursos para estudiantes" promedio` · `site:.mx "enlaces útiles" IVA calculadora` · `"herramientas útiles" "números a letras"` |
| AR | `"روابط مفيدة" "المعدل التراكمي"` · `site:edu.sa "روابط" المعدل` · `site:edu.jo روابط الطلبة` · `"أدوات مفيدة" تفقيط` · `"روابط مهمة" الفاتورة الإلكترونية زاتكا` |
| Expat/HR | `"end of service" gratuity "useful links"` · `intitle:resources UAE expats calculator` |
| Accounting | `"VAT" "useful tools" Saudi blog` · `"recursos gratuitos" contadores IVA` |

**Qualify karein:** page pichle ~24 mahine mein update hua ho, us par real outbound tool links hon, aur inclusion ke paise na maange (paid inclusion paid link hai). **Assumption (measured nahi):** 5-10% reply-to-link rate, yani 40-60 prospects/month se ~3-6 links.

### Linkable assets: asal link magnets

Calculators is liye links kamaate hain ke writers problem mention karte waqt uske solution ko link kar dete hain ([seoplaybook](https://seoplaybook.ai/blog/free-tools-and-calculators-for-backlinks)). Widgets ki ijazat hai, lekin Google ne 2016 mein kaha tha ke widget credit link **`rel="nofollow"`** hona chahiye, warna manual action ho sakta hai ([Google blog](https://developers.google.com/search/blog/2016/09/a-reminder-about-widget-links)).

| Rank | Asset | Kis ko pitch karein |
|---|---|---|
| 1 | University GPA scale pages (KSU, KAU, KFUPM, UJ; Chile 1-7 jahan 4.0 pass hai; Mexico 0-10; Colombia 0-5), **sirf verified tables** | Counsellors, admissions blogs, student clubs |
| 2 | Printable Hijri 1448 calendar PDF | Arabic blogs, masjid/community sites, Ramadan se pehle |
| 3 | VAT rate table (KSA 15%, UAE 5%, Bahrain 10%, Oman 5%, Chile 19%, Mexico 16%/8% border, Colombia 19%; **publish se pehle verify karein**) | Accounting blogs |
| 4 | `tafqit` aur `numeros-a-letras` npm/GitHub packages | Dev communities, awesome-lists (PR library ke liye ho, website ke liye nahi) |
| 5 | Data studies: "50 Saudi/Jordan universities ke GPA scales"; "UAE gratuity after 5/10 years" | Gulf News, Khaleej Times, Arabian Business, Saudi Gazette, Argaam/Sabq; BioBioChile, El Mostrador, Emol |

Har tool par **"Cite this tool"** (plain URL), **"Embed"** (sirf brand anchor, nofollow) aur **"Download PDF"** buttons lagayein.

### Digital PR platforms

Cision ne Connectively (purana HARO) **9 Dec 2024** ko band kar diya tha. Featured.com ne HARO ko **22 Apr 2025** ko free relaunch kiya ([prezly](https://www.prezly.com/academy/the-best-haro-alternatives)). Active platforms yeh hain ([presspulse](https://www.presspulse.ai/blog/haro-alternatives)):

1. HARO (free).
2. Qwoted Basic (free; professional email zaroori hai aur GPTZero se AI-detection hoti hai).
3. Source of Sources (free, spam zyada).
4. MentionMatch (free, B2B).

Zyada tar queries US/English hoti hain, is liye rozana max 15-20 min dein aur sirf education, student finance, expat aur SME/VAT queries par pitch karein. **Local PR (Gulf/Chile media) zyada yield degi** (yeh inference hai). Kisi Arabic ya Spanish journalist-request platform ka pata nahi chala.

### Broken links aur unlinked mentions

Semrush trial ke dauran competitors ke backlinks export karein: gpacalculator.net, calculator.net ka GPA page, ek leading Chilean "calcular promedio" site, ek Arabic GPA site, ek UAE gratuity calculator. "Broken backlinks" filter lagayein, jo tool aap ke paas hai us ke liye un pages ko email karein. Google Alerts mein "thefreetools" aur "thefreetools.eu" daalein. Month 3 ke baad unlinked mentions par link request karein.

### Outreach templates (short, personal, koi offer ya swap nahi; 5-7 din baad sirf ek follow-up)

**EN (resource page, GPA)**
> Subject: A free GPA calculator for your "Student Resources" page
> Hi [Name], I was reading your [page title] page ([URL]); the [specific item] section is genuinely useful. I built a free GPA calculator that handles [4.0 / weighted / credit-hour] GPA and shows the working step by step, with no sign-up: [deep URL]. If you think it would help your students, it might fit next to [existing resource]. Either way, thanks for maintaining the page.
> [Name], thefreetools.eu

**AR (accounting blog, تفقيط / VAT)**
> الموضوع: أداة مجانية للتفقيط وحساب ضريبة القيمة المضافة
> مرحباً [الاسم]، قرأت مقالك "[عنوان المقال]" واستفدت من شرحك لـ[نقطة محددة]. أنشأت أداة مجانية تحوّل المبالغ إلى كتابة (تفقيط) بالريال السعودي وتحسب ضريبة القيمة المضافة 15% بدون تسجيل: [الرابط]. إذا رأيت أنها مفيدة لقرائك، قد تكون إضافة مناسبة في المقال أو صفحة الأدوات. شكراً لمحتواك المفيد.
> مع التحية، [الاسم] – thefreetools.eu

**ES (Chilean student/teacher site, promedio)**
> Asunto: Calculadora gratuita de promedio (escala 1 a 7) para su página de recursos
> Hola [Nombre]: Vi su página "[título]" ([URL]) y me pareció muy útil la sección de [ejemplo]. Hice una calculadora gratuita para calcular promedio de notas en escala chilena 1–7, con ponderaciones y nota mínima para aprobar (4,0), sin registro: [URL]. Si cree que les sirve a sus estudiantes, podría complementar [recurso existente]. ¡Gracias por compartir estos recursos!
> Saludos, [Nombre] – thefreetools.eu

### Realistic monthly targets (planning estimate, sourced benchmark nahi)

Ahrefs ke mutabiq naye pages mein se sirf **1.74%** ek saal ke andar top 10 mein pohanchte hain. Jo pohanchte hain un mein se **40.82% pehle mahine mein** pohanch jate hain (aam taur par aasaan terms), aur baaqi ko zyada tar 61-182 din lagte hain ([Ahrefs](https://ahrefs.com/blog/how-long-does-it-take-to-rank-in-google-and-how-old-are-top-ranking-pages/)). Yeh figures search summary se hain, original page fetch nahi hua.

| Month | Focus | EN | AR | ES | Total new RDs |
|---|---|---|---|---|---|
| Oct 2026 (M1) | Directories, GitHub repo, social profiles, Quora AR/ES answers, Reddit history banana | Directories | Quora AR, Telegram discovery | Quora ES | 6-10 (zyada tar nofollow/low-DR) |
| Nov-Dec (M2-3) | 40-60 resource-page prospects/month, npm packages, GPA scale pages, broken-link outreach | .edu resource pages | edu.sa / edu.jo, accounting blogs | .cl student/teacher pages | 5-12/month |
| Jan-Mar 2027 (M4-6) | Hijri 1448 + Ramadan push, VAT table, pehla data study, HARO/Qwoted | HARO/Qwoted | Gulf media, Hijri PDF | Chile media | 10-20/month |
| M7-12 | Cycles repeat karein, unlinked mentions | — | — | — | 10-25/month |

Progress raw link count se nahi, **relevant referring domains + GSC impressions per language** se naapein.

---

## 5. Claude Code ke liye data connectors pehle, skill packs baad mein

Sab se zyada value woh cheez deti hai jo Claude ko **real data** de. Skill packs aksar Claude ki apni reasoning hi repackage karte hain. Aap ke paas already local agents hain (`seo-auditor`, `perf-auditor`, `tool-tester`, `mobile-checker`), jo generic SEO audit skills ka bara hissa cover kar lete hain.

| Priority | Tool | Kya deta hai | Cost | Install / note |
|---|---|---|---|---|
| 1 | **GSC MCP server** (community: [AminForou/mcp-gsc](https://github.com/AminForou/mcp-gsc), [search-console-mcp](https://github.com/charlesdove977/search-console-mcp)) | Per-language queries, indexing, URL inspection | Free (Google Cloud project + Search Console API + OAuth) ([guide](https://suganthan.com/blog/google-search-console-mcp-server/)) | Read-only scope rakhein, tokens repo se bahar store karein. **Koi Google-official GSC MCP nahi hai** |
| 2 | **SearchFit SEO plugin** ([GitHub](https://github.com/searchfit/searchfit-seo)) | `/translate-content`, `/generate-schema`, internal linking, broken links, `/keyword-cluster` | Free, MIT, koi API key nahi | Anthropic ke knowledge-work-plugins marketplace mein hai ([claude.com](https://claude.com/plugins/searchfit-seo)). Iska SEO Auditor local agent se overlap karta hai |
| 3 | **aaron-marketing-skills** ([GitHub](https://github.com/aaron-he-zhu/aaron-marketing-skills)) | keyword-research, content-gap, serp-markup-builder, site-structure-optimizer, geo-content-optimizer | Free, Apache-2.0, koi key nahi | Bundle mein 120 skills hain (ads, email ki bhi), is liye sirf kaam ke SKILL.md files review kar ke `.claude/skills/` mein copy karein. Repo khud kehta hai "real-project outcomes remain unvalidated" |
| 4 | PSI MCP ([ruslanlap](https://github.com/ruslanlap/pagespeed-insights-mcp)) | PSI + CrUX | Free | Optional, kyunki perf-auditor already hai |
| 5 | **DataForSEO MCP** ([official](https://dataforseo.com/model-context-protocol)) | Real keyword volumes/SERPs, AR/ES bhi | Pay-as-you-go, $50 minimum deposit, ~$0.0006/SERP ([ContextBolt](https://contextbolt.com/blog/dataforseo-mcp-pricing/)) | Sirf tab jab Semrush trial khatam ho aur volumes chahiye hon |
| — | skills.sh / find-skills ([skills.sh](https://skills.sh/)) | Discovery | Free | Top SEO skill coreyhaines31 ka `seo-audit` hai (~214.5K installs). seranking ke pack ke sirf ~1.6K installs hain aur yeh vendor pack hai. Har skill ke security scans parhein, find-skills ko bhi Snyk "Warn" mila hai |
| — | Semrush/Ahrefs MCP | — | Paid hone ka imkaan hai (**unverified**) | $0 budget mein fit nahi |

**Free SEO stack (owner ke liye):**

| Tool | Free limit | Use |
|---|---|---|
| GSC + BWT | Unlimited | BWT **Keyword Research** mein per-country volumes free milte hain, jo AR/ES ke liye sab se acha free volume source hai ([Bing help](https://www.bing.com/webmasters/help/keyword-research-628070b6)) |
| [Ahrefs Free](https://ahrefs.com/webmaster-tools) | 5,000 crawl credits/project/month; apni site ke backlinks | Monthly site audit, backlink tracking |
| Screaming Frog free | 500 URLs/crawl | Ek language subfolder ek waqt mein crawl karein |
| Semrush free | ~10 requests/day (secondary source) | Spot checks. Trial ko competitor backlink exports ke liye bacha kar rakhein |
| Keyword Surfer, Google Trends, AnswerThePublic (3/day) | Free | AR vs EN query forms compare karna |

**Security rules** ([Claude Code docs](https://code.claude.com/docs/en/discover-plugins)):

1. Install pane parhein, kyunki plugin hooks aur MCP servers chala sakta hai.
2. `#tag` se pin karein.
3. Third-party marketplaces ka auto-update off rakhein (default bhi off hai).
4. Local scope use karein.
5. `claude plugin details <name>` se token cost check karein aur jo use na ho usay uninstall kar dein.

---

## 6. Weekly routine aur kaam ki taqseem

### Weekly routine (~5-7 ghante owner, baaqi Claude)

| Din | Owner (30-60 min) | Claude (codebase) |
|---|---|---|
| **Mon** | GSC + BWT check: indexing errors, AR/ES impressions by country, AI Performance / Gen-AI report | GSC MCP se weekly query pull karein; nayi queries jo page par cover nahi hain unhein H2/FAQ/guide candidates ki list mein daalein |
| **Tue** | 10-15 resource-page prospects dhoondein (operators), 5-8 personalized emails bhejein | Prospect ke page ke hisaab se template draft karein (owner review kar ke khud bhejega) |
| **Wed** | Guide ke facts verify karein (official sources) aur review karein | Ek guide draft karein: sourced table, worked example, internal links, JSON-LD. tool-tester se examples verify karwayein |
| **Thu** | Quora AR/ES par 2-3 jawab; Reddit par genuine comments | Guide publish karein, `updated` field bump karein, build, deploy, IndexNow ping |
| **Fri** | 2 HARO/Qwoted pitches (sirf relevant); pichle hafte ke emails ka ek follow-up | seo-auditor + perf-auditor + mobile-checker run karein; broken internal links aur hreflang check |
| **Monthly** | Ahrefs Free audit, referring domains count, ek asset (table/PDF/study) ka launch aur outreach | Naya tool build karein (hub, related-tools, guides block ke saath); competitor gap list update karein |

### Kaun kya karega

**Owner (sirf aap kar sakte hain, kyunki accounts, faislay aur bahar ke logon se baat aap ki zimmedari hai):**

1. Cloudflare: Crawler Hints ON karein; AI Crawl Control mein search bots allowed hain yeh confirm karein; training-bot policy ka faisla karein.
2. BWT/GSC: Domain property, sitemaps, Request indexing, Submit URLs, email alerts, aur GSC MCP ke liye Google Cloud OAuth setup.
3. Directory submissions, Product Hunt launch, social profiles, aur branded email (hello@thefreetools.eu).
4. Saari outreach emails, Reddit/Quora/Telegram posting aur PR pitches khud bhejna.
5. Facts verify karna (university scales, VAT rates, UAE Labour Law, Umm al-Qura, passport sizes) aur named reviewer ka faisla.
6. Plugins/MCP install karne ki approval (pehle files review karein).

**Claude (codebase mein):**

1. `public/<key>.txt` aur `scripts/indexnow.mjs` banayein, aur deploy script mein ping jorein.
2. Category hubs, related-tools block, "Guides" block, "Cite this tool / Embed (nofollow) / Download PDF" components banayein.
3. Guides ka content collection `/en/guides/`, `/es/guias/`, `/ar/guides/` banayein, hreflang aur sitemap mein add karein.
4. Titles aur meta descriptions ko naye pattern par align karein; har tool par Methodology & sources section; About page par editorial/correction policy.
5. Programmatic pages (scale, Hijri year, currency) sirf low-risk table ke mutabiq; high-risk value pages ko `noindex` karein.
6. `tafqit` / `numeros-a-letras` ko alag open-source packages ke taur par nikaalein.
7. Har release se pehle seo-auditor, tool-tester, perf-auditor aur mobile-checker agents chalayein; outreach drafts aur prospect lists tayyar karein, lekin **bhejein nahi**.

---

## Conclusion

Is research ka sab se ahem nateeja yeh hai ke "AI search optimization" ab alag discipline nahi raha. Google ne khud kaha hai ke yeh "still SEO" hai, aur ChatGPT aur Copilot ka raasta Bing index se guzarta hai. Is liye ek naye static site ke liye IndexNow + BWT + Cloudflare bot settings kisi bhi llms.txt tweak se zyada kaam ke hain. Doosri baat, thefreetools.eu ka asli faida uski **localization depth** mein hai: Saudi 5-point scale, Chile ka 1-7 aur NEM, ريال/دينار ki grammar, aur Umm al-Qura. Yahi cheezein safe programmatic pages, citable guides aur link-worthy assets teeno ka kaam karti hain. Generic English calculators se yeh cheez copy karna mushkil hai.

Ahrefs data ke mutabiq naye pages ka sirf 1.74% saal bhar mein top 10 tak pohanchta hai, is liye pehle 6 mahine ka kamyabi ka paimana traffic nahi hona chahiye. Paimana yeh ho: AR/ES impressions ka barhna, 20-40 relevant referring domains, aur 2-3 aise assets jin ko log bina maange cite karein. Sab se bara risk links ki kami nahi, balke jaldi mein AI-generated value pages ya guides ka dump hai, jo scaled-content policy ki zad mein aata hai aur AdSense account ko bhi khatre mein daal sakta hai.
