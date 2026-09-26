# Germany (German-language) keyword opportunities for free client-side tools

Method note (applies to all sections): demand signals come from (a) live Google autocomplete, queried on 2026-09-25 via `https://suggestqueries.google.com/complete/search?client=firefox&hl=de&gl=de&q=...` (reachable, returned JSON). How many suggestions come back and how varied the modifiers are ("kostenlos", "online", "2026/2027", Bundesland, bank names) is a *proxy* for demand, not a volume. (b) SERP composition from WebSearch results (US-based index, German query). A direct google.de SERP fetch was blocked (Google returned an error/consent page), so rankings below are **approximate**. I found **no reliable, current, public monthly search volumes** for any candidate. Only Semrush's 2021 list had numbers, and those are old. All demand levels below are therefore qualitative estimates.

## Q1: Which Germany-specific utility tools are searched, and where is competition weak?

### Takeaway
The biggest *new* demand driver in Germany is the E-Rechnung mandate. Businesses must be able to receive e-invoices since 2025 and must issue them from 2027/2028. That has produced a family of autocomplete queries ("xrechnung viewer kostenlos/online/pdf/offline", "e-rechnung prüfen online kostenlos", "zugferd erstellen kostenlos", "xrechnung in pdf umwandeln"). All of it can be built client-side (XML parsing, XSLT, pdf-lib). The classic HR/tax calculators (Arbeitstage, Kündigungsfrist, Urlaubsanspruch, Minijob) are clearly searched, but in 2025–26 they were flooded with near-identical "Rechner" sites (deutschland-rechner.de, rechnercheck.de, rechner-hub.de, klarzahl.de, ordio.com, talentmatch24.de, expert-select.com), so their competition is no longer weak.

### Cited Findings
**Demand drivers / regulatory facts**
- Since 1 Jan 2025 all domestic businesses must be able to receive e-invoices. From 2027, businesses with more than €800,000 prior-year turnover must issue them for domestic B2B. From 1 Jan 2028 everyone must. Formats must be EN 16931-conformant (XRechnung, ZUGFeRD) — [BMF FAQ](https://www.bundesfinanzministerium.de/Content/DE/FAQ/e-rechnung.html); [IHK Stuttgart](https://www.ihk.de/stuttgart/fuer-unternehmen/recht-und-steuern/steuerrecht/steuermeldungen/e-rechnungen-5864496); [E-Rechnungen.org summary](https://www.e-rechnungen.org/e-rechnung-pflicht-fristen)
- Minijob earnings cap rises to €633/month in 2027 because the minimum wage rises to €14.60 on 1 Jan 2027 (formula: Mindestlohn × 130 ÷ 3) — [Minijob-Zentrale Magazin](https://magazin.minijob-zentrale.de/minijob-mindestlohn-2026-2027/); [deutschland-rechner.de](https://www.deutschland-rechner.de/minijob-rechner)
- Steuer-ID structure: 11 digits, first digit ≠ 0, digit-repetition rules for digits 2–10, and a check digit using modified ISO 7064 MOD 11,10. The official spec PDF is published by ELSTER — [ELSTER PDF](https://download.elster.de/download/schnittstellen/Pruefung_der_Steuer_und_Steueridentifikatsnummer.pdf); [kryptografie.de](https://kryptografie.de/kryptografie/chiffre/steuer-id.htm)
- Arbeitstage 2026 (5-day week) range from 252 (BW) to 254 (Berlin) depending on Bundesland — [deutschland-rechner.de / search snippet](https://www.deutschland-rechner.de/arbeitstage-rechner)

**Autocomplete evidence (google.de, hl=de, 2026-09-25)**, used as the demand proxy:
- "xrechnung viewer" → kostenlos, online, download, elster, pdf, offline, datev, open-source; "xrechnung in pdf" → umwandeln (kostenlos/online), einbetten, anzeigen, pdf24; "e-rechnung lesen" → kostenlos, software kostenlos, elster, online, mit pdf24; "e-rechnung prüfen" → online kostenlos (top suggestion), datev, elster, zugferd; "xrechnung" → validator, erstellen, viewer; "zugferd" → validator, validator online, rechnung prüfen; "zugferd erstellen" → kostenlos, aus pdf, excel kostenlos, open source; "e-rechnung" → "e-rechnung erstellen kostenlos" — autocomplete query (see method note)
- "girocode erstellen" → sparkasse, kostenlos, volksbank, app, excel, deutsche bank, word, ing, online; "sepa qr code" → generator, erstellen, validator — autocomplete
- "steuer-id prüfen" → online, deutschland, kostenlos, privatperson, eu, ausland; "steuernummer format" → Bundesland modifiers (nrw, hessen, bayern, bw); "ust-idnr prüfen" → bzst, vies, kostenlos, europäische kommission; "rentenversicherungsnummer prüfen" → only 2 suggestions (low demand) — autocomplete
- "iban prüfen" → kontoinhaber, kostenlos, welche bank, sparkasse, volksbank, empfänger — autocomplete
- "arbeitstage rechner" → 2025/2026/2024, nrw, bayern, bw, "bis zur rente"; "feiertage 2027" and "brückentage 2027" each → 9 Bundesland variants; "kalenderwochen 2026/2027" top suggestions — autocomplete
- "urlaubsanspruch berechnen" → bei kündigung, teilzeit, anteilig, minijob, 4-/3-/2-tage-woche, tvöd — autocomplete
- "kündigungsfrist rechner" → rewritten to "kündigungsfristenrechner" + arbeitnehmer, arbeitgeber, wohnung, tvöd, mietvertrag, "6 wochen zum quartalsende" — autocomplete
- "minijob rechner" → 2026, arbeitgeber, brutto netto, **2027**, stunden, haushaltshilfe — autocomplete
- "arbeitszeitrechner" → online, mit pause, dezimal, kostenlos, woche, monat; "überstunden rechner" → netto, auszahlung — autocomplete
- "mutterschutz rechner" → aok, tk, haufe, barmer (health insurers own this); "elternzeit rechner" → mutter, vater, tk, barmer, aok — autocomplete
- "pendlerpauschale rechner" → 2026, 2025, österreich, bmf; "kfz steuer rechner" → 2026, hsn tsn, e auto, hybrid; "grunderwerbsteuer rechner" → Bundesland variants, bmf — autocomplete
- "rundfunkbeitrag rechner" → only 4 suggestions (low demand) — autocomplete
- "stromkosten rechner" → watt, kwh, gerät, e auto, jahr — autocomplete
- "wie alt bin ich" → rechner, am datum, genau, in tagen, plus many "wenn ich [Jahr] geboren bin"; "tage bis" → weihnachten, rechner, zur rente — autocomplete

**Competition observed (WebSearch SERPs)**
- XRechnung viewer SERP: rechnex.de (server-side; the file is "discarded after the request", so it is uploaded), b2brouter (freemium SaaS funnel), sevdesk (accounting SaaS lead-gen), erechnung-tool.de, xrechnung-lesen.de, bxf1.de, erechnung-viewer.com, xrechnung-erstellen.com, xrechnungs.de. That is many exact-match microsites, mostly SaaS funnels — [WebSearch results incl. rechnex.de](https://rechnex.de/viewer); [sevdesk](https://sevdesk.de/e-rechnung-viewer/); [B2Brouter](https://www.b2brouter.net/de/xrechnung-viewer-online-und-gratis/)
- GiroCode SERP: Kreissparkasse Tuttlingen (bank info page, no tool), TEC-IT, qr4free.de, kursmediasystems.de, litewerk.de, girocodegenerator.com ("100% local processing"), zahlen-mit-code.com, halli-online.de — [TEC-IT](https://qrcode.tec-it.com/de/SEPA); [girocodegenerator.com](https://girocodegenerator.com/wissen/girocode)
- Steuer-ID check SERP: FastBill (SaaS), ELSTER spec PDF, sevdesk article, kryptografie.de, klarzahl.de, rechnerplus.de, ustidpruefen.de, gentools.io, salesianer.de (old-style page) — [klarzahl](https://klarzahl.de/steuerid-validator); [rechnerplus](https://www.rechnerplus.de/steuer-id-rechner)
- Arbeitstage SERP: smart-rechner.de, ordio.com, deutschland-rechner.de, rechneneinfach.de, rechnercheck.de, schnelle-online.info, arbeitszeit-berechnen.de, kwheute.de, expert-select.com. That is saturated — [smart-rechner](https://www.smart-rechner.de/arbeitstage/rechner.php); [schnelle-online](https://www.schnelle-online.info/Arbeitstage/Anzahl-Arbeitstage-2026.html)
- Kündigungsfrist SERP: gesetze-im-internet.de, ordio, afa-anwalt.de, deutschland-rechner.de, talentmatch24.de, kuendigungsfristrechner-online.de (EMD), cms-hr-tools.de (law firm), gebuehren-portal.de. That is saturated — [ordio](https://www.ordio.com/tools/kuendigungsfrist-rechner); [afa-anwalt](https://www.afa-anwalt.de/kuendigungsfristenrechner/)
- Urlaubsanspruch SERP: lohn24.de, smart-rechner.de, factorialhr, lexware, finanzfluss, personio, shiftjuggler, teamhero. Mostly HR-SaaS content marketing with strong domains — [Lexware](https://www.lexware.de/tools/urlaubsanspruch-berechnen/); [Finanzfluss](https://www.finanzfluss.de/rechner/urlaubsrechner/)
- Minijob 2027 SERP: minijob-zentrale (official), deutschland-rechner.de, rechner-hub.de, minijob-ratgeber.de, gehalts-tipp.de, expert-select.com — [minijob-ratgeber.de](https://minijob-ratgeber.de/rechner/2027)
- Brutto-Netto SERP: Randstad, Sparkasse, smart-rechner, Handelsblatt, smartsteuer, brutto-netto-rechner.info, bruttocheck.de. That means high-authority brands plus YMYL, so avoid — [brutto-netto-rechner.info](https://www.brutto-netto-rechner.info/); [Sparkasse](https://www.sparkasse.de/rechner/brutto-netto-rechner.html)
- Old volume data point: Semrush (March 2021) listed "bmi rechner" at 3,290,000 monthly searches in Germany. That is old and looks inflated for a single keyword, so it is not usable as a current estimate — [Semrush DE blog](https://de.semrush.com/blog/top-google-suchanfragen/)

### Inferences
Candidate shortlist for Germany-specific tools. Opportunity is scored 1–10, where 10 means best. Everything listed is client-side buildable.

| # | Tool / main keyword(s) | Demand (est.) | Competition | Opp. | Build | YMYL / AdSense risk |
|---|---|---|---|---|---|---|
| 1 | **XRechnung / ZUGFeRD Viewer "ohne Upload"** (xrechnung viewer kostenlos, e-rechnung lesen kostenlos, xrechnung in pdf umwandeln) | Medium, rising into the 2027/2028 deadlines | Many microsites, but mostly SaaS funnels or server-upload. A privacy-first local viewer that also extracts XML embedded in ZUGFeRD PDFs is a real differentiator. | **8** | Medium (XML parse + KoSIT-style XSLT/HTML render; pdf.js/pdf-lib to extract the ZUGFeRD attachment; print to PDF) | Low–medium (tax-adjacent but informational). B2B CPCs are likely good. |
| 2 | **E-Rechnung / ZUGFeRD erstellen kostenlos** (zugferd erstellen kostenlos, e-rechnung erstellen kostenlos, rechnung erstellen kostenlos ohne anmeldung) | Medium now; likely high in 2027–28 | SaaS (sevdesk, lexoffice-type) gate generation behind signup. Few free no-login generators found (not fully verified). | **8** | Hard (valid EN 16931 CII/UBL XML plus PDF/A-3 embedding in-browser with pdf-lib. Correct conformance is non-trivial.) | Medium: tax-compliance. It must carry a disclaimer and pass a validator. |
| 3 | **E-Rechnung prüfen / XRechnung Validator** (e-rechnung prüfen online kostenlos, zugferd validator online) | Medium | Official KoSIT validator is Java/desktop. Online validators were not inspected in depth. | 6 | Hard (EN 16931 + XRechnung Schematron in the browser via SaxonJS; rules need updating per release) | Medium |
| 4 | **GiroCode / SEPA-QR-Code erstellen** | Medium (bank-name modifiers show real users) | 6–8 small sites, some old-style (TEC-IT, halli-online), one already "local". Beatable with better UX, bulk/CSV mode, and a print/invoice snippet. | **7** | Easy (EPC069-12 string + QR lib) | Low |
| 5 | **Brückentage / Feiertage / Arbeitstage 2027 nach Bundesland** (programmatic pages per Land and year) | High, seasonal (Q4–Q1) | Saturated for "arbeitstage rechner". "brückentage 2027 [Land]" is also contested, but a smarter holiday-optimiser planner can differentiate. | 6 | Easy (static holiday rules; Easter algorithm) | Low |
| 6 | **Steuer-ID / Steuernummer / RV-Nummer / USt-IdNr Format-Prüfer** (ID-validator hub) | Low–medium each; combined medium | Small sites (klarzahl, rechnerplus, salesianer) plus SaaS. Intent mismatch: many users want to verify that a number *exists* (BZSt/VIES), which offline math cannot do. | 6 | Easy (checksums; Steuernummer format per Bundesland per the ELSTER spec). A USt-IdNr existence check needs the VIES API. CORS support was not verified, so the tool may only do a format check plus a link out. | Low–medium |
| 7 | **Urlaubsanspruch-Rechner** (Teilzeit, 4-Tage-Woche, bei Kündigung, Minijob) | Medium–high (rich long-tail) | Strong HR SaaS domains (Lexware, Personio, Finanzfluss). Long-tail pages ("bei 3 tage woche") are more winnable. | 5 | Easy | Medium (labour-law; needs disclaimer) |
| 8 | **Minijob-Rechner 2027** | Medium; spikes Dec–Jan | Official Minijob-Zentrale plus many new rechner sites. "2027" pages already exist. | 5 | Easy | Medium (payroll/finance) |
| 9 | **Arbeitszeitrechner (mit Pause, dezimal) / Überstunden** | Medium–high | Many sites. Not inspected in depth. | 5 | Easy | Low |
| 10 | **Kündigungsfristenrechner** | Medium–high | Saturated (8+ dedicated tools incl. law firms) | 4 | Easy | High-ish (legal YMYL) |
| 11 | **Stromkosten-Rechner (Gerät/Watt/kWh)** | Medium | Not inspected | 5 | Easy | Low |
| 12 | **Wie alt bin ich / Tage bis / Datumsrechner / Kalenderwoche** | High (generic) | Established date sites (not inspected here) | 5 | Easy | Low |
| — | Brutto-Netto, Kfz-Steuer (BMF official), Grunderwerbsteuer, Mutterschutz/Elternzeit (insurers TK/AOK/Barmer rank in autocomplete), Impressum/Datenschutz generator (eRecht24 in autocomplete) | High | Dominated by authorities, banks, publishers, insurers, legal-tech | 1–3 | Medium–hard | High YMYL. Avoid or deprioritise. |
| — | Rundfunkbeitrag-Rechner, RV-Nummer prüfen (standalone) | Low (only 2–4 autocomplete suggestions) | — | 2–3 | Easy | Low |

- The E-Rechnung cluster (1–3) is the most time-sensitive opening: demand should grow sharply toward Jan 2027 and Jan 2028 given the legal timeline. Its SERPs are full of vendor lead-gen pages rather than neutral tools. The key angle is "lokal im Browser, keine Datei-Uploads", which matters for invoices containing business data.
- The new wave of programmatic German "Rechner" sites means classic calculator keywords are no longer low-competition. A new domain (thefreetools.eu, non-.de) will struggle on them unless the page is much better or targets long-tail variants.

### Gaps
- No current monthly search volumes found for any keyword. Google Keyword Planner, Ahrefs and Semrush require login; Google Trends and google.de SERPs could not be fetched (a direct google.de SERP fetch returned an error page). Demand levels are autocomplete-based estimates only.
- "People also ask" boxes and ad load could not be observed because the google.de SERP was blocked.
- Whether the VIES REST API allows browser (CORS) calls for a client-side USt-IdNr existence check was not verified.
- Pendlerpauschale rule changes for 2026 and German passport-photo rule changes (digital submission) were not verified in this session. They could change the value of "pendlerpauschale rechner 2026" and "biometrisches passbild erstellen" tools.

## Q2: Which generic tools in German have weak German-language competition?

### Takeaway
Generic German file tools (PDF zusammenfügen/verkleinern/Seiten löschen/entsperren, Bild in PDF, Bild verkleinern) have very high demand. They are dominated by PDF24, a German brand that is entirely free and appears *inside* autocomplete ("pdf zusammenfügen pdf24", "pdf verkleinern pdf24", "e rechnung lesen mit pdf24"), plus Smallpdf, iLovePDF and Adobe. They are poor targets for a new site. Text utilities (Text vergleichen) and HEIC→JPG are more contestable, and the winning angle is "ohne Upload / lokal".

### Cited Findings
- "pdf zusammenfügen" autocomplete: kostenlos, online kostenlos, **pdf24**, "24", kostenlos ohne anmeldung, adobe, mac, iphone. "pdf verkleinern" also shows pdf24 and adobe. "pdf seiten löschen" shows pdf24. "pdf entsperren" shows pdf24 and "i love pdf" — autocomplete query (method note)
- PDF merge SERP: online-umwandeln.de, smallpdf (de), PDF24 ("100% kostenlos"), Adobe, tooltea.com, plus Play Store apps — [PDF24](https://tools.pdf24.org/de/pdf-zusammenfuegen); [Smallpdf](https://smallpdf.com/de/pdfs-zusammenfuegen); [Adobe](https://www.adobe.com/de/acrobat/online/merge-pdf.html)
- "heic in jpg" autocomplete: umwandeln, kostenlos, iphone, windows (10/11), mac, online. That signals high demand, much of it from users who want an OS-level solution — autocomplete
- HEIC→JPG SERP: iLoveIMG, PDF24, Adobe Express, heic-zu-jpg.de (already "100% lokal im Browser"), online2pdf, FreeConvert, heictopng.org (local), heic.online, Apowersoft — [heic-zu-jpg.de](https://heic-zu-jpg.de/); [iLoveIMG](https://www.iloveimg.com/de/bild-in-jpg/heic-in-jpg)
- "text vergleichen" autocomplete: online, excel, tool, word, notepad ++, unterschiede, ki — autocomplete
- Text-compare SERP: diffchecker.com (English-first, freemium/Pro), textcompare.org/de, xodo, prlbr.de (a 2015 personal page), tool.yuzhulin.com (Chinese-hosted), 60tools, text-compare.com (English). Few strong native-German tools — [Diffchecker](https://www.diffchecker.com/); [prlbr.de](https://prlbr.de/2015/textvergleicher/)
- "zeichen zählen" → word, online, excel, mit leerzeichen, in pdf; "wörter zählen" → word, online, pdf, google docs. Many modifiers point to software how-tos rather than tools — autocomplete
- "qr code erstellen" → kostenlos, **kostenlos dauerhaft**, ohne anmeldung, "kostenlos ohne anmeldung dauerhaft". This signals user frustration with freemium QR sites that expire dynamic codes — autocomplete
- "bild in pdf umwandeln" → handy, iphone, android, samsung, kostenlos ohne anmeldung; "passbild erstellen" → kostenlos, app, ki, dm, rossmann, aus foto — autocomplete

### Inferences
| # | Tool / keyword | Demand (est.) | Competition | Opp. | Build | Risk |
|---|---|---|---|---|---|---|
| 13 | **QR-Code erstellen kostenlos dauerhaft (statisch, ohne Anmeldung)** | High | Crowded, but many results are freemium dynamic-QR funnels, and the "dauerhaft" / "ohne anmeldung" modifiers show that this pain is unmet. Can be combined with GiroCode, vCard and WLAN QR. | **7** | Easy | Low |
| 14 | **Text vergleichen (Diff) auf Deutsch** | Medium | Weak native-German field (English-first diffchecker, dated or foreign hosted pages) | **7** | Easy (jsdiff; word-level diff, file upload of .txt/.docx via mammoth.js) | Low |
| 15 | **HEIC in JPG umwandeln (lokal, Stapel)** | High | Big brands plus at least 2 local-processing sites already | 5 | Medium (libheif WASM) | Low |
| 16 | Zeichen/Wörter zählen | Medium–high | Not inspected in depth | 4 | Easy | Low |
| 17 | PDF zusammenfügen / verkleinern / Seiten löschen / entsperren, Bild in PDF | Very high | PDF24 (free, German, brand-searched) plus Smallpdf/iLovePDF/Adobe | 2–3 | Medium (pdf-lib, qpdf-wasm) | Low. Only worth it as a supporting feature for the E-Rechnung cluster. |

- The overall recommended German top 12–15, ranked by opportunity: 1) XRechnung/ZUGFeRD viewer (local), 2) E-Rechnung/ZUGFeRD generator, 3) GiroCode/SEPA-QR generator, 4) static QR "dauerhaft", 5) Text vergleichen, 6) E-Rechnung validator, 7) Brückentage/Feiertage 2027 planner per Bundesland, 8) ID-validator hub (Steuer-ID, Steuernummer format, USt-IdNr format, RV-Nr, IBAN+BLZ), 9) Urlaubsanspruch long-tail, 10) Minijob-Rechner 2027, 11) Arbeitszeitrechner/Überstunden, 12) Stromkosten-Rechner, 13) HEIC→JPG local, 14) date tools (Wie alt bin ich / Tage bis / KW).
- AdSense note: the E-Rechnung and GiroCode tools attract B2B/fintech advertisers, which likely means higher CPCs. That is an inference and was not measured.

### Gaps
- Zeichen zählen, Stromkosten, Arbeitszeitrechner and date-tool SERPs were not inspected. Their competition ratings are unverified.
- Could not confirm whether free no-login ZUGFeRD/XRechnung *generators* exist at scale. Only viewers were checked.
- Ad density and Core Web Vitals of competitor pages were not measured.
