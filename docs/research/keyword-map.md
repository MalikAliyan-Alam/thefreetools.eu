# Keyword map: topic groups, one page per group

Data: GSC 28 days to 2026-10-11 (769 queries, 52 pages) + Google autocomplete (2026-10-14, hl/gl per market) + SERP checks the same day. GSC impressions are low-volume (hidden rare queries), so use them for ranking order, not as traffic forecast. Re-run every 4 weeks.

## Principle
Google ranks a page for a whole **group of queries** when the page answers the main question, then the follow-up questions people ask next, with a worked example for each. So the unit is not "one keyword = one page", it is "one intent group = one page":
- **Group page** (tool or guide): H1 and first paragraph answer the head query in 2 sentences. Then one H2 per follow-up question (the autocomplete / PAA wording, in the user's own words), each with a number or example. FAQ block repeats the 4-6 shortest ones (FAQPage schema).
- A query that is already answered by an existing page: improve that page (add the missing H2 + example). Only write a new page when the intent is different (different document, country, or task).
- Pillar (tool) links to every guide in its cluster; guides link back with the head keyword as anchor and to 2 siblings. Same terms in the whole cluster.
- Every number must be pinned in `tests/guides.test.ts`.

## What the SERP check showed (2026-10-14)
- ES "00/100 M.N. que significa", "como se escribe 10000 en un cheque": results are scraper FAQ sites (clubmitsubishiasx.com/faq, todosloshechos.es) with thin, contradictory answers (one says `m. n.` per RAE, others `M.N.`; some mix "y 75/100" and "pesos 75/100"). Easy to beat with one page that shows both forms and says when each is used.
- FR "170.000 en lettres": official sources agree: mille is invariable; traditional spelling has no hyphens around cent/mille (cent soixante-dix mille); 1990 rectification hyphenates everything (cent-soixante-dix-mille). Q&A sites (synonyme-du-mot) mix the two. Our page must state both spellings and which one a cheque bank accepts.
- ES foto infantil: 2,5 x 3 cm = 295 x 354 px at 300 ppi (checked: 2.5/2.54*300 = 295.3, 3/2.54*300 = 354.3). Competitors disagree: one site lists 35x45 mm and 2x2 in for "Mexico", a Jalisco news site swaps width/height (30 x 25). Do not copy them; state size per document and orientation.
- Autocomplete shows foto "carnet" is a separate, large intent in AR, CL, PE, EC, ES, VE (4x4, 3x4, 4x5 cm by country). Not covered yet.

## Groups (ordered by evidence)

### G1 Spanish: importe en letra / cheque (pillar /es/numeros-a-letras/, guide como-escribir-cantidad-con-letra)
Queries to answer on the guide (autocomplete + GSC): qué significa 00/100 M.N. (24 impr.), cómo se escribe en un cheque los centavos, 10000 / 5000 / 50000 / 1500 / 15000 en un cheque, mil pesos / un millón de pesos, "un mil o mil", sin centavos / 50 centavos, cheque con centavos en México vs Argentina, fecha en un cheque.
Action: **extend the existing guide**, do not make a new page. Add H2s: "Qué significa 00/100 M.N." (centavos + moneda nacional; RAE writes the abbreviation "m. n."), "Ejemplos por monto" (table 1,000 / 1,500 / 5,000 / 10,000 / 15,000 / 50,000 / 1,000,000), "Con centavos" (45/100), "Si el número y la letra no coinciden" (the written amount prevails; we only state this if a bank/Ley General de Títulos y Operaciones de Crédito source confirms: verify first), "¿mil o un mil?".
Verified 2026-10-14: art. 16 LGTOC (text in force, last reform before 26 Mar 2024): if the amount is written in words and figures, the words prevail; if written several times in words or in figures, the smaller sum prevails. A bill proposing "smaller sum always" exists but is not in force. Sources: mley.mx/LGTOC/articulo/16, sdv.com.mx/compendio/ley-titulos-operaciones-credito/articulo-16. Re-check the DOF text when writing (cite the article, not a blog).

### G2 French: montant / nombre en lettres (pillar /fr/chiffres-en-lettres/)
Queries: 170.000 en lettre(s) (18), 130.000, 4 millions en lettres, un milliard en lettres, montant en lettres chèque, majuscule, règle, trait d'union, septante / nonante (BE, CH), chiffre en lettre Suisse (7).
Action: new guide "nombre-en-lettres-regles-mille-cent-trait-union" covering mille invariable, cent/vingt s-rule, traditional vs 1990 hyphens (two spellings side by side for 170 000, 130 000, 4 060 039), plus a short "Belgique / Suisse: septante, nonante, huitante" table (existing fr-quatre-vingt guide mentions it: link, do not repeat). Check existing `quatre-vingt-ou-quatre-vingts`, `cent-ou-cents`, `ecrire-montant-cheque-en-lettres` first so the new page answers only what they do not.

### G3 Spanish: tamaño foto infantil / carnet (pillar /es/foto-tamano-infantil/)
Queries: tamaño de foto infantil en cm / pulgadas / píxeles / mm / en word / en canva / en celular / para imprimir / tamaño carta, tamaño foto carnet por país.
Action 1: extend existing pillar/guides with "en Word", "en Canva", "en celular" H2s, each with exact steps and the 295 x 354 px, 0,98 x 1,18 in numbers.
Action 2 (new guide): "Tamaño foto carnet por país" table (AR, CL, PE, EC, ES, VE) — **only after** each size is verified against an official source (consulate/registry pages). No table row without a source link.

### G4 Hijri 1448 (pillar /hijri-converter/, AR/EN/ID)
Queries: 1448 hijriah tahun berapa (20; autocomplete: berapa masehi, kapan, 1 Muharram 1448 hari apa, Ramadan 1448 kapan, puasa 1448), AR: 8/5/1448 كم ميلادي (22), 3/5/1448, 02/05/1448, التقويم الهجري 1448 والميلادي 2027.
Action: Arabic guide "hijri-to-gregorian-1448-examples" already exists: add a month-start table for all 12 months (Umm al-Qura) and one H2 per date asked. Indonesian is a new locale: do not add a locale for 20 impressions; instead put an ID FAQ on the EN calendar page only if the locale policy allows (it does not: CLAUDE.md says list a locale only when written and reviewed). Park ID.

### G5 GPA / promedio (already 6 guides): extend, do not add
Queries: como se suman las notas (5), nota 7 promedio 7 (6), معدل من 5 (7; guide gpa-out-of-5-saudi exists). Action: check GSC page for these queries; if they land on the guide, add an H2 + example.

### G6 VAT / IVA (4 guides exist): extend `como-quitar-el-iva` with "a un precio" example if missing; Saudi VAT calculator is a tool-page matter (KSA 15%).

### G7 Age in Excel: guides exist in EN + ES. Only add H2s for "fórmula para calcular la edad" variants.

## Order of work
1. G1 extension (highest impressions with 0 clicks on es/numeros-a-letras, 1,215 in 2 days).
2. G2 new FR guide.
3. G3 extension (Word / Canva / celular).
4. G4 month-start table.
5. G3 carnet by country (after sources).
Verify each: tests for every number, `pnpm test`, `npx astro check`, build, then IndexNow + GSC request.

## Rules that stay
- Update `updated` only on real change; never future-date.
- No dashes as punctuation in prose, no filler words (tests/guides.test.ts enforces).
- Re-measure 28 days after publishing: compare impressions, position and clicks of the group, not single queries.

---

## Semrush volumes (2026-10-15, exports in docs/research/semrush/)
Each export is Semrush's top 100 by volume, so tails are cut. Volume 0 means under 10 searches a month.

| Group | Head keyword | Volume | KD | Our page and where we stand |
|---|---|---|---|---|
| AR Hijri date | التاريخ الهجري / تاريخ اليوم هجري | 1.2M / 1.0M | 37-41 | no page aims here (needs a "today" page, KD 40 too hard for now) |
| AR convert | تحويل التاريخ 450K; من هجري الى ميلادي 165K; من ميلادي لهجري 40K; تحويل من هجري لميلادي 110K | 800K+ together | 12-25 | /ar/hijri-converter/ had 5 impressions in 28 days. Biggest gap. Page deepened 2026-10-15 |
| AR age in Hijri | حساب العمر بالهجري 110K; العمر بالهجري 33K | 143K | 10-12 | /ar/hijri-age-calculator/ had 2 impressions. Easiest big win. Page deepened 2026-10-15 |
| ES foto infantil | foto tamaño infantil 18.1K; tamaño de foto infantil 14.8K; medidas 3.6K | 40K+ | 25-36 | /es/foto-tamano-infantil/ pos about 10 (942 impr.). Sections added 2026-10-14/15 |
| ES cantidad con letra | cantidad con letra 8.1K; + y numero 320; en excel 110 | 9K+ | 25-31 | /es/numeros-a-letras/ pos 9.5 (2,732 impr.) |
| ES cheque | como se escriben los centavos 110; 10000/5000/15000: 40 each | 1K | 13-27 | guide extended 2026-10-14 |
| FR chiffre en lettre | chiffre en lettre 22.2K; chiffres en lettres 4.4K; en lettre les chiffres 3.6K; nombre en lettre 1.9K | 50K+ | 17-31 | /fr/chiffres-en-lettres/ pos 10.8 (3,557 impr.). Title and tables updated 2026-10-15 |

Decisions from the data:
1. Do not write per-amount pages. Volumes are 10-40 each; one tool page with a lookup table covers them (done for ES and FR).
2. Arabic converter and Hijri age are the largest and easiest (KD 10-25). Next steps: get them indexed, internal links from the home and the Hijri guides, then re-measure position in 2 weeks. If still above 20, rebuild the page around "اليوم" (today) which is where the 1M volume is.
3. "fotos tamaño infantil cerca de mi" (2.9K) and pharmacy brand queries are local intent: we cannot serve them. Ignore.
4. Ideas queued from the exports: ES "plantilla para fotos tamaño infantil" (480+320, a printable sheet, covered by one H2 for now), "convertir foto a tamaño infantil" (720, covered by Word/Canva steps), "cantidad con letra en excel" (110+40+30..., an Excel formula guide, low priority).

---

## Semrush round 2 (2026-10-15): new tools and gaps
Exports are top 100 each; files in docs/research/semrush/. KD is Semrush's difficulty (under 30 is realistic for us).

| Group | Head keywords (volume, KD) | What we did |
|---|---|---|
| AR النسبة الموزونة (Saudi admission) | حساب الموزونة 135K (KD18), حساب موزونة 22K, حساب النسبة الموزونة 9.9K, الموزونه 12K | New tool /ar/weighted-percentage-calculator/ (30/30/40 default, editable weights) |
| ES Chile escala de notas | escala de notas 165K (KD31), generador de notas 90K (KD24), calculador de notas 90K, escala de notas al 60 27K (KD14), calcular nota 22K | New tool /es/escala-de-notas/ (exigency formula, table, points needed) |
| ES Mexico aguinaldo | aguinaldo 135K (KD44), calculadora de aguinaldo 22K (KD25), como calcular el aguinaldo 22K (KD20), calculo de aguinaldo 18K | New tool /es/calculadora-de-aguinaldo/ (proportional, 30 UMA exempt). Must be indexed before late November |
| AR حساب المعدل (GPA) | حساب المعدل 33K (KD10), احسب معدلي 15K (KD8), حساب المعدل التراكمي 15K (KD18) | Title and 2 FAQs added on /ar/gpa-calculator/. University-specific scales (KSU, Qassim...) not added: no verified source yet |
| ES Mexico promedio | como sacar el promedio de calificaciones 9.9K (KD30), como sacar promedio 8.1K | Guide to write (next) |
| ES days between dates | contador de dias 18K (KD34), calculadora de dias 15K (KD45), dias habiles 9.9K (KD27) | Tool idea, next |
| FR lettre en chiffre | lettre en chiffre 2.9K (KD41), lettres en chiffres 480 | Existing /fr/lettres-en-chiffres/, low volume, keep |

Order for the next builds: ES promedio guide, days-between-dates tool, Saudi university-specific weights (only with an official source per university), Chile "generador de notas" variants (same tool, add H2s if GSC shows the queries).
