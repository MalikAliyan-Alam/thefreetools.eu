# Extra market selection for thefreetools.eu (beyond DE/FR/IT/ES/PL) and its top tool keywords

Research date: 2026-09-25. Method: WebSearch SERP inspection (US-based search tool, so rankings are an approximation of what nl-NL / nl-BE users see), Google autocomplete endpoint (reachable, used with hl=nl&gl=nl and gl=be), published CPC/RPM studies. **No keyword-volume tool was available.** Demand levels below come from autocomplete presence and how many sites compete, not from measured volumes.

## Which countries have the best combination of high AdSense CPC/RPM and weak local-language tool competition?

### Takeaway
Dutch (Netherlands + Flanders) is the best single extra language. It has high RPM/CPC (roughly Germany-level or better), about 29M internet users, and a clear weak spot: **Belgian/Flemish-specific tools**, whose SERPs are poor. Generic Dutch calculator SERPs in the Netherlands are already crowded. Swedish is a possible second pick: high RPM, a weak validator SERP, but a small market. Austria and Switzerland are not a new language. They are a cheap locale variant of the existing German content with the highest RPMs in the set. Portuguese, Romanian and Czech lose on RPM, and the Portuguese validator SERPs are also crowded.

### Cited Findings
**Internet population**
- Netherlands: 18.1M internet users, 99.0% penetration (Jan 2025) — [DataReportal Digital 2025: Netherlands](https://datareportal.com/reports/digital-2025-netherlands)
- Belgium 11.3M (94.6%), Portugal 9.3M (85.8%), Brazil 183M (84.2%), Sweden 10.5M (95.7%), Romania 17.8M (89.2%), Switzerland 8.9M (97.3%) (all 2023 data); Austria 8.7M (94.9%, 2024). Czech Republic is not listed on the page fetched — [World Population Review, Internet Users by Country 2026](https://worldpopulationreview.com/country-rankings/internet-users-by-country)
  - About 60% of Belgians speak Dutch (general knowledge, not sourced here), so the Flemish market is roughly 6–7M users. Combined Dutch reach is about 24–25M users.

**RPM / CPC evidence.** All sources are weak or proxies, so read them as directional only.
- YouTube AdSense RPM (USD per 1,000 views; aggregated from connected YouTube accounts, updated through 2026-09-22): Switzerland $5.19, Belgium $4.09, Netherlands $3.85, Austria $3.15, Sweden $3.02, Italy $1.76, Spain $1.65, Czech Republic $1.62, France $1.62, Germany $1.57, Romania $0.75, Poland $0.75, Portugal $0.64. Brazil is not listed — [Dynamoi YouTube AdSense RPM, 84 markets, 2026](https://dynamoi.com/data/youtube-adsense-rpm)
  - Caveat: this is YouTube RPM, not display AdSense on websites. Content mix skews it. Germany below the Netherlands and Belgium is plausible, but DE at $1.57 looks low compared with other sources.
- Search CPC 2025, from an agency's own survey of 16 markets and 400+ businesses (no third-party attribution): UK €1.22, Switzerland €1.14, Netherlands €0.95, Germany €0.91, Czech Republic €0.24, Poland €0.17 — [CodeDesign, Google Ads cost Europe 2025](https://codedesign.org/google-ads-cost-europe-your-complete-guide)
- Search result snippet (page not fetched): Netherlands average search CPC $1.22, Sweden $1.44 — surfaced via [superwebtricks / related results](https://www.superwebtricks.com/adsense-earnings-per-views/). Not verified.
- Old AdSense CPC table (article dated 2021-09-16, data from Ybierling): Austria $0.45, Sweden $0.31, Germany $0.22, Belgium $0.21, Switzerland $0.21, Spain $0.19, France $0.17, Italy $0.13. The Netherlands, Portugal, Romania and Czech Republic are not included — [Partnerkin, AdSense RPM rates by country](https://partnerkin.com/en/blog/articles/adsense_rpm_rates_by_country). Old and low quality.
- Language-level claim: Czech-language content earns "above $1" RPM and Romanian around $2 — search snippet from [thesrzone / sarkarilist-type aggregators](https://www.thesrzone.com/2022/03/adsense-cpc-rates-by-country-2022.html). Low quality, not verified.
- The sources conflict on absolute levels. The consistent pattern across them: CH, NL, BE, SE and AT are at or above DE; CZ, RO, PL and PT are well below.

**Competition in local-language tool SERPs (sample)**
- NL generic calculators are saturated. "BSN controleren 11-proef" returns rekenkeizer.nl, berekenen-tool.nl, berekenenhulp.nl, testbestanden.nl, berekenen.nl (twice), plus Wikipedia and infonu — [SERP](https://www.berekenen.nl/a-z/bsn-check). "werkdagen berekenen" returns about 8 dedicated tool sites (berekenhet.nl, rekenkeizer.nl, weeknummers.com, simpelrekenen.nl, werkdagenberekenen.nl, berekentools.be, allesberekenen.nl, eclecticsite.be) — [BerekenHet](https://www.berekenhet.nl/kalender/aantal-werkdagen-berekenen.html)
- BE-specific validators have weak SERPs, mostly helpdesks, old PHP pages, GitHub and blogs (details in the next question).
- Sweden "kontrollera personnummer" is also weak: a SweClockers forum thread, a coursework gitbook, filemakerbloggen, a personal blog, mackan.eu, excelkungen, personnummer.nu, samlogic blog 2012 — [personnummer.nu](https://www.personnummer.nu/verifiera/); [mackan.eu](https://mackan.eu/tools/personuppgifter/?lang=en)
- Portugal "validar NIF" is crowded with dedicated sites: nif.pt, contribuinte.pt, portugal-direct.pt, portugalnif.pt, validarnif.pt, calculariva.pt, gerador.site, lookuptax — [NIF.PT](https://www.nif.pt/); [contribuinte.pt](https://contribuinte.pt/validar-nif)

### Inferences
- **Recommendation 1: Dutch (nl), positioned "NL + BE" with a Flanders-first wedge.** RPM is at or above DE on every source. The build reuses the same client-side tool engine. The first release should favour Belgian tools (OGM, rijksregisternummer, KBO/btw-nummer, Belgian IBAN) where SERPs are weak. Generic NL tools can be added later for completeness.
- **Recommendation 2 (optional): Swedish (sv).** The personnummer check SERP suggests weak competition for tool pages, and RPM is high. Downsides: about 10.5M users, only one country, and it is harder to QA content for native quality. Evidence here is one SERP only.
- **Near-zero-cost add-on: de-AT / de-CH locale variants** of the existing German tools, e.g. Swiss AHV-Nummer (EAN-13 check), Austrian UID/SVNR check, and CH VAT 8.1%. These are not a new language, but CH/AT have the highest RPM in the set. Worth a separate small keyword check.
- **Deprioritise** Portuguese (low PT RPM; Brazil's RPM was not found; crowded NIF SERP), Romanian and Czech (low RPM).
- Ease of content creation: Dutch is a high-resource language for machine-assisted writing, and one nl locale covers NL and BE. BE-specific vocabulary differs (e.g. "btw-nummer = ondernemingsnummer", "gestructureerde mededeling", "bediende"), so a separate nl-BE page set is advisable. This is an inference; no source was checked.

### Gaps
- No real AdSense display RPM by country from a reliable 2025–2026 publisher dataset. Only YouTube RPM and advertiser CPC proxies were found. Brazil's RPM was not found.
- The Czech Republic's internet-user figure was not retrieved. Eurostat was not fetched.
- Romanian, Czech and Brazilian-Portuguese tool SERPs were not inspected.
- No absolute search volumes. Keyword Planner, Ahrefs and Semrush were not available.

## Netherlands/Belgium SERP quality for the named tools

### Takeaway
NL tools (BSN, werkdagen, vakantiegeld, pdf samenvoegen, btw berekenen) face strong competition from many established Dutch calculator sites, payroll SaaS brands or global PDF giants. BE tools (rijksregisternummer, ondernemingsnummer/btw-nummer, gestructureerde mededeling, Belgian IBAN) have weak SERPs: helpdesk articles, GitHub repos, 2000s-era PHP pages and personal homepages.

### Cited Findings
- **BSN controleren (elfproef).** At least 5 dedicated NL calculator sites rank (rekenkeizer, berekenen-tool, berekenenhulp, testbestanden, berekenen.nl), plus Wikipedia. Strong competition — [rekenkeizer](https://www.rekenkeizer.nl/werken/burgerservicenummer-bsn-controleren-geldig); [berekenen.nl](https://www.berekenen.nl/a-z/bsn-check)
- **btw berekenen.** Autocomplete (gl=nl): "btw berekenen 21", "…formule", "…9", "…rabobank", "…21 procent", "…belastingdienst", "…inclusief", "…van bedrag", "…excel". Demand is high, and brand queries (Rabobank, Belastingdienst) show strong incumbents — [Google autocomplete](https://suggestqueries.google.com/complete/search?client=firefox&hl=nl&gl=nl&q=btw%20berekenen)
- **werkdagen berekenen.** About 8 dedicated tools plus Google Docs help. Saturated — [werkdagenberekenen.nl](https://werkdagenberekenen.nl/); [berekentools.be](https://www.berekentools.be/calculators/tijd/werkdagen-berekenen.html)
- **vakantiegeld berekenen.** Payroll and HR brands (Nmbrs, AFAS, LEAN HR, NN) plus about 5 calculator sites (brutonaarnetto.org, berekenen-tool, justrunbiz, snellerekenen, berekenen.online). Crowded, and borders on YMYL — [Nmbrs](https://www.nmbrs.com/nl/resources/vakantiegeld-berekenen-tool); [berekenen-tool](https://berekenen-tool.nl/vakantiegeld-berekenen)
- **pdf samenvoegen.** Smallpdf, Adobe, iLovePDF, PDF24, Xodo, CleverPDF, pdf-samenvoegen.nl, pdfjoiner, freepdfconvert. Very strong competition — [iLovePDF NL](https://www.ilovepdf.com/nl/pdf-samenvoegen); [PDF24](https://tools.pdf24.org/nl/pdf-samenvoegen)
- **rijksregisternummer controleren.** Informat helpdesk, webwoordenboek article, rsolution.be generator/validator, oplossing.be (Access tutorial), z01.be PHP page, a WordPress dev blog (2020) and government pages. Weak — [z01.be](https://z01.be/hst8_php/rijksregisternummer_uitgebreideOpl.php); [rsolution.be](http://rsolution.be/rijksregister-nummer-generator.RSolution)
  - Autocomplete (gl=be): "rijksregisternummer opzoeken", "…kind opzoeken", "…frans", "…engels", "…genereren", "…kind", "…nederland", "…belgie", "…man of vrouw" — [autocomplete](https://suggestqueries.google.com/complete/search?client=firefox&hl=nl&gl=be&q=rijksregisternummer)
- **ondernemingsnummer / BE btw-nummer controleren (mod 97).** Liantis KBO lookup article, eurocompta.eu format check, FOD Economie info page, Exact docs, Wikipedia. Weak to moderate. The check is 97 − (first 8 digits mod 97) and can run fully offline. Confirming the number is actually registered requires VIES — [EuroCompta BE](https://eurocompta.eu/be/nl/btw-nummer-controleren/); [FOD Economie](https://economie.fgov.be/nl/themas/consumentenbescherming/opkomen-voor-uw-rechten/alles-weten-over-uw-verkoper/bestaat-het-ondernemingsnummer)
- **gestructureerde mededeling (OGM).** GitHub repos (2), e-invoice.be blog and generator, Dodona exercise, gestructureerdemededeling.be, invoicing-software docs (onfact, eenvoudigfactureren, efactori), Ivan Goethals personal homepage. Weak. Check digit = mod 97 (0 → 97) — [e-invoice.be OGM](https://e-invoice.be/ogm-generator); [gestructureerdemededeling.be](https://gestructureerdemededeling.be/)
- **Belgian "berekenen" demand (autocomplete, gl=be).** hypotheek, btw, nettoloon, wegenbelasting, boete, biv, opzegtermijn, bmi and iban each combine with "berekenen belgie" — [autocomplete](https://suggestqueries.google.com/complete/search?client=firefox&hl=nl&gl=be&q=berekenen%20belgie)
- **opzegtermijn berekenen België.** Winston, SD Worx (2 pages), Securex, Liantis, personeelsadvies.be, mijnopzegtermijn.be, lawbase.be (2 pages). Strong HR and legal brands; YMYL — [SD Worx](https://www.sdworx.be/nl-be/simulatietools/berekening-opzeggingstermijn-bedienden)
- **BIV berekenen Vlaanderen.** Yago, bivsimulator.be, autogids, carvex (2 pages), paraad, and the official Vlaams Belastingsportaal simulator. Moderate to strong, and the rules change in 2027 — [bivsimulator.be](https://www.bivsimulator.be/); [Vlaams Belastingsportaal](https://belastingen.fenb.be/ui/public/vkb/simulatie)

### Inferences
- Dedicated Dutch-language multi-calculator networks (berekenen.nl, rekenkeizer, berekenhet, berekenen-tool, simpelrekenen, allesberekenen, berekentools.be) already cover NL generic calculators. A new domain in 2026 is unlikely to outrank them quickly on those keywords.
- The opening is **BE validators and generators** that currently rank as helpdesk text or dev blogs, not proper tools. Belgium's RPM proxy ($4.09, the highest after CH) makes Flemish traffic especially valuable.

### Gaps
- IBAN controleren, bruto netto, and "btw berekenen" SERPs were not inspected directly; only autocomplete was checked for btw.
- No volume numbers for any keyword.

## Recommended market (Dutch, NL + BE): 10–12 tool keywords with demand, competition, opportunity, build difficulty, YMYL

### Takeaway
The best targets are Belgian check-digit validators and generators (OGM, rijksregisternummer, ondernemingsnummer, Belgian account to IBAN). They are trivially client-side, have weak SERPs and are not YMYL. High-demand NL generic tools (btw, pdf samenvoegen, werkdagen) are worth building for site completeness, but their opportunity scores are lower.

### Cited Findings (per-keyword table; SERP evidence cited in the previous section)

The opportunity score (1–10) is my own judgment, weighing demand proxy against competition. Demand is inferred from autocomplete and the number of competitors; it is not measured.

| # | Keyword (market) | Demand (evidence) | Competition (SERP) | Opp. | Build | YMYL |
|---|---|---|---|---|---|---|
| 1 | gestructureerde mededeling genereren / controleren; OGM generator (BE) | Medium-low. B2B invoicing niche; several invoicing SaaS publish docs on it ([e-invoice.be](https://e-invoice.be/ogm-gestructureerde-mededeling)) | Weak: GitHub, docs, personal homepage ([SERP sources](https://gestructureerdemededeling.be/)) | 8 | Very easy (mod 97) | No |
| 2 | rijksregisternummer controleren / genereren / "man of vrouw" decoder (BE) | Medium. Several autocomplete variants ([autocomplete](https://suggestqueries.google.com/complete/search?client=firefox&hl=nl&gl=be&q=rijksregisternummer)) | Weak: helpdesk, old PHP, blogs ([z01.be](https://z01.be/hst8_php/rijksregisternummer_uitgebreideOpl.php)) | 8 | Easy (mod 97, pre/post-2000 rule, birth date and gender decode) | Low. "opzoeken" (lookup) intent cannot and should not be served; privacy |
| 3 | ondernemingsnummer / btw-nummer België controleren (BE) | Medium. SMEs and consumers (FOD Economie explainer exists) | Weak–moderate: Liantis, eurocompta, FOD ([EuroCompta](https://eurocompta.eu/be/nl/btw-nummer-controleren/)) | 7 | Easy (format check). A VIES live check needs a server or proxy, so it is not purely client-side | No |
| 4 | iban berekenen belgie (old account number → IBAN) (BE) | Medium-low. In the "berekenen belgie" autocomplete ([autocomplete](https://suggestqueries.google.com/complete/search?client=firefox&hl=nl&gl=be&q=berekenen%20belgie)) | Not inspected (gap) | 7 (provisional) | Easy (ISO 7064 mod 97) | No |
| 5 | IBAN controleren (NL/BE, all EU) | Medium-high (assumed; not verified) | Not inspected; probably banks plus global IBAN tools | 5 (provisional) | Easy | No |
| 6 | btw berekenen (21%/9% NL; 21/12/6% BE; inclusief/exclusief) | High. Many autocomplete variants ([autocomplete](https://suggestqueries.google.com/complete/search?client=firefox&hl=nl&gl=nl&q=btw%20berekenen)) | Strong: Rabobank, Belastingdienst, calculator networks | 5 (a "btw berekenen belgie" variant may be easier) | Very easy | Low |
| 7 | werkdagen berekenen (with NL or BE feestdagen) | Medium-high. About 8 dedicated sites suggest demand ([berekenhet](https://www.berekenhet.nl/kalender/aantal-werkdagen-berekenen.html)) | Strong / saturated | 5 | Easy (holiday tables, Easter algorithm) | No |
| 8 | BSN controleren / elfproef / BSN generator (testdata) (NL) | Medium. Many competing tools ([berekenen.nl](https://www.berekenen.nl/a-z/bsn-check)) | Strong: 5+ calculator sites | 4 | Very easy | Low (privacy disclaimer) |
| 9 | vakantiegeld berekenen (NL 8%) | Medium-high ([Nmbrs](https://www.nmbrs.com/nl/resources/vakantiegeld-berekenen-tool)) | Strong: payroll brands plus calculators | 4 | Easy for gross; net needs tax tables | Yes (money/tax) for the net figure |
| 10 | pdf samenvoegen / pdf splitsen / pdf comprimeren (nl) | High. Global giants localise into NL ([iLovePDF](https://www.ilovepdf.com/nl/pdf-samenvoegen)) | Very strong: Smallpdf, Adobe, iLovePDF, PDF24 | 3 (build anyway; "no upload, local-only" angle) | Medium (pdf-lib / WASM) | No |
| 11 | opzegtermijn berekenen België (bediende, eenheidsstatuut) | Medium. In the autocomplete list ([autocomplete](https://suggestqueries.google.com/complete/search?client=firefox&hl=nl&gl=be&q=berekenen%20belgie)) | Strong: SD Worx, Securex, Liantis, law sites ([SD Worx](https://www.sdworx.be/nl-be/simulatietools/berekening-opzeggingstermijn-bedienden)) | 4 | Medium (statutory week table, pre-2014 "backpack" split) | Yes (legal) |
| 12 | BIV berekenen Vlaanderen / verkeersbelasting | Medium. In the autocomplete list | Moderate–strong, incl. official simulator ([Vlaams Belastingsportaal](https://belastingen.fenb.be/ui/public/vkb/simulatie)); rules change in 2027 ([bivsimulator.be](https://www.bivsimulator.be/)) | 4 | Medium (CO2, Euro norm and age formulas; yearly maintenance) | Yes (tax) |

### Inferences
- Suggested build order for nl-BE: #1 OGM, #2 rijksregisternummer, #3 ondernemingsnummer, #4 IBAN from a Belgian account number. Then generic nl tools that reuse existing engines: #6 btw with a BE variant, #7 werkdagen with BE and NL holiday tables, #10 PDF tools.
- A cluster of developer and test-data generators (BSN generator, rijksregisternummer generator, OGM generator, IBAN generator) looks under-served. It currently ranks as testbestanden.nl, rsolution.be and GitHub, and suits a JS tools site.
- Skip or defer the YMYL items (#9 net figure, #11, #12, plus bruto-netto, nettoloon, hypotheek). They need yearly legal and tax maintenance and face strong incumbents.

### Gaps
- No search-volume figures for any keyword. Demand levels are proxies.
- SERPs for "IBAN controleren", "iban berekenen belgie", "bruto netto berekenen" and "btw berekenen belgie" were not inspected.
- No Swedish keyword list was produced beyond the personnummer SERP check.
