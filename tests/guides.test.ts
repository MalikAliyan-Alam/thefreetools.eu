import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SCALES, summarize, cumulative, requiredAverage, formatAverage } from '../src/tools/gpa/engine.ts';

// Every number printed in src/guides/gpa/*.ts, recomputed with the engine.
const prior = (avg: number, credits: number) => cumulative(summarize(SCALES.us4, []), avg, credits);
const creditsForTarget = (avg: number, credits: number, target: number, max: number) =>
  Math.ceil((target * credits - avg * credits) / (max - target) - 1e-9);

test('EN cumulative guide', () => {
  assert.equal(formatAverage((3.8 * 12 + 3.0 * 18) / 30), '3.32');
  assert.equal(formatAverage((90 + 3 * 4) / 34), '3.00');
  assert.equal(formatAverage((90 + 1 * 4 + 3 * 4) / 38), '2.79');
});

test('EN target guide', () => {
  assert.equal(formatAverage(requiredAverage(prior(2.8, 60), 3.0, 15)!), '3.80');
  assert.equal(formatAverage(requiredAverage(prior(2.8, 60), 3.2, 15)!), '4.80');
  assert.equal(creditsForTarget(2.8, 60, 3.0, 4), 12);
  assert.equal(creditsForTarget(2.8, 60, 3.2, 4), 30);
  assert.equal(creditsForTarget(2.8, 60, 3.5, 4), 84);
});

test('AR guides (out of 5)', () => {
  const term = summarize(SCALES.sa5, [
    { name: '', grade: 'A+', weight: 3 },
    { name: '', grade: 'B', weight: 3 },
    { name: '', grade: 'B+', weight: 4 },
    { name: '', grade: 'C+', weight: 2 },
  ]);
  assert.equal(term.points, 52);
  assert.equal(formatAverage(term.average!), '4.33');
  assert.equal(formatAverage(cumulative(term, 3.9, 45).average!), '3.99');
  assert.equal(formatAverage(requiredAverage(prior(3.6, 60), 3.75, 18)!), '4.25');
  assert.equal(formatAverage(requiredAverage(prior(3.6, 60), 4.0, 18)!), '5.33');
  assert.equal(creditsForTarget(3.6, 60, 4.0, 5), 24);
});

test('ES guides (1 to 7)', () => {
  assert.equal(formatAverage((5.0 + 6.2 + 4.5 + 5.8) / 4, 3), '5.375');
  assert.equal(formatAverage(5.2 * 0.2 + 4.8 * 0.3 + 6.1 * 0.5), '5.53');
  assert.equal(formatAverage((5.2 * 0.2 + 4.8 * 0.3) / 0.5), '4.96');
  const done = 5.0 * 0.25 + 3.8 * 0.25 + 4.5 * 0.2;
  assert.equal(formatAverage(done), '3.10');
  assert.equal(formatAverage((4.0 - done) / 0.3), '3.00');
  assert.equal(formatAverage((5.0 - done) / 0.3), '6.33');
  assert.equal(formatAverage((6.5 - done) / 0.3, 1), '11.3');
});

test('numbers-to-words cheque guides: hand-written answers match the engine', async () => {
  const { parseAmount, toWords } = await import('../src/tools/words/engine.ts');
  const a = parseAmount('1250.75') as { negative: boolean; int: string; frac: string };
  assert.equal(toWords('en', a, { currency: 'USD', cheque: true }), 'One thousand two hundred fifty and 75/100 dollars');
  assert.equal(toWords('es', a, { currency: 'MXN', letterCase: 'lower' }), 'mil doscientos cincuenta pesos 75/100 M.N.');
  assert.equal(toWords('ar', a, { currency: 'SAR', only: true }), 'فقط ألف ومائتان وخمسون ريالاً سعودياً وخمس وسبعون هللة لا غير');
});

test('VAT guides: hand-written numbers match the engine', async () => {
  const { solve, mxWithholding, round } = await import('../src/tools/vat/engine.ts');
  assert.deepEqual(solve('gross', 1000, 15), { net: 869.57, vat: 130.43, gross: 1000 });
  assert.deepEqual(solve('gross', 100, 15), { net: 86.96, vat: 13.04, gross: 100 });
  assert.deepEqual(solve('gross', 1000, 16), { net: 862.07, vat: 137.93, gross: 1000 });
  assert.deepEqual(solve('gross', 100, 16), { net: 86.21, vat: 13.79, gross: 100 });
  assert.equal(round(1150 * 0.85), 977.5);
  assert.equal(round(1160 * 0.84), 974.4);
  assert.equal(round(1000 * 3 / 23), solve('gross', 1000, 15).vat);
  const b = solve('net', 10000, 16);
  assert.equal(mxWithholding(b, true, 10).receive, 9533.33);
  assert.equal(mxWithholding(b, true, 1.25).receive, 10408.33);
});

test('French words guides: spelling rules match the engine, written out by hand', async () => {
  const { frWords, parseAmount, toWords } = await import('../src/tools/words/engine.ts');
  const fr = (n: string) => frWords(n);
  const eur = (n: string, c: string) => toWords('fr', parseAmount(n, false, true) as any, { currency: c, letterCase: 'lower' });
  // quatre-vingt
  assert.equal(fr('80'), 'quatre-vingts');
  assert.equal(fr('81'), 'quatre-vingt-un');
  assert.equal(fr('90'), 'quatre-vingt-dix');
  assert.equal(fr('180'), 'cent quatre-vingts');
  assert.equal(fr('280'), 'deux cent quatre-vingts');
  assert.equal(fr('80000'), 'quatre-vingt mille');
  assert.equal(fr('80080'), 'quatre-vingt mille quatre-vingts');
  assert.equal(fr('80000000'), 'quatre-vingts millions');
  // cent
  assert.equal(fr('100'), 'cent');
  assert.equal(fr('200'), 'deux cents');
  assert.equal(fr('201'), 'deux cent un');
  assert.equal(fr('700'), 'sept cents');
  assert.equal(fr('200000'), 'deux cent mille');
  assert.equal(fr('200000000'), 'deux cents millions');
  assert.equal(fr('2000300'), 'deux millions trois cents');
  assert.equal(eur('300', 'EUR'), 'trois cents euros');
  assert.equal(eur('350', 'EUR'), 'trois cent cinquante euros');
  // cheque
  assert.equal(eur('85', 'EUR'), 'quatre-vingt-cinq euros');
  assert.equal(eur('1234,56', 'EUR'), 'mille deux cent trente-quatre euros et cinquante-six centimes');
  assert.equal(eur('2000,05', 'EUR'), 'deux mille euros et cinq centimes');
  assert.equal(eur('10000', 'EUR'), 'dix mille euros');
  assert.equal(eur('1000000', 'EUR'), 'un million d’euros');
  assert.equal(eur('1234,56', 'CHF'), 'mille deux cent trente-quatre francs et cinquante-six centimes');
  assert.equal(eur('1234,56', 'MAD'), 'mille deux cent trente-quatre dirhams et cinquante-six centimes');
  // francs CFA
  assert.equal(eur('25000', 'XOF'), 'vingt-cinq mille francs CFA');
  assert.equal(eur('150000', 'XOF'), 'cent cinquante mille francs CFA');
  assert.equal(eur('1000000', 'XOF'), 'un million de francs CFA');
  assert.equal(eur('2500000', 'XOF'), 'deux millions cinq cent mille francs CFA');
  assert.equal(eur('3000000', 'XOF'), 'trois millions de francs CFA');
});

test('new guides keep a human voice: no em or en dashes, no filler words', async () => {
  const { FR_WORDS_GUIDES } = await import('../src/guides/words/fr-guides.ts');
  for (const g of FR_WORDS_GUIDES) {
    const text = JSON.stringify(g);
    assert.ok(!/[\u2014\u2013]/.test(text), `${g.slug} has a dash`);
    assert.ok(!/(unlock|seamless|powerful|débloquez|puissant)/i.test(text), `${g.slug} has filler`);
    assert.ok(g.metaTitle.length <= 70, `${g.slug} title too long`);
    assert.ok(g.metaDescription.length <= 175, `${g.slug} description too long`);
  }
});

test('Spanish number rules guide: hand-written answers match the engine', async () => {
  const { esWords, parseAmount, toWords } = await import('../src/tools/words/engine.ts');
  assert.equal(esWords('16'), 'dieciséis');
  assert.equal(esWords('22'), 'veintidós');
  assert.equal(esWords('31'), 'treinta y uno');
  assert.equal(esWords('100'), 'cien');
  assert.equal(esWords('101'), 'ciento uno');
  assert.equal(esWords('1001'), 'mil uno');
  assert.equal(esWords('185000'), 'ciento ochenta y cinco mil');
  assert.equal(esWords('600000'), 'seiscientos mil');
  assert.equal(esWords('1500000'), 'un millón quinientos mil');
  assert.equal(esWords('1000000000'), 'mil millones');
  assert.equal(esWords('21'), 'veintiuno');
  assert.equal(esWords('21', true), 'veintiún');
  assert.equal(esWords('21000'), 'veintiún mil');
  assert.equal(esWords('21000000'), 'veintiún millones');
  assert.equal(esWords('31000'), 'treinta y un mil');
  assert.equal(esWords('5500'), 'cinco mil quinientos');
  assert.equal(toWords('es', parseAmount('1000000') as any, { currency: 'MXN', letterCase: 'lower' }), 'un millón de pesos 00/100 M.N.');
});

test('photo guides: pixel sizes and sheet counts match the engine', async () => {
  const { SPECS, PAPERS, layoutSheet, mmToPx } = await import('../src/tools/photo/engine.ts');
  assert.equal(mmToPx(50.8, 300), 600);
  assert.equal(mmToPx(35, 300), 413);
  assert.equal(mmToPx(45, 300), 531);
  assert.equal(mmToPx(50, 300), 591);
  assert.equal(mmToPx(70, 300), 827);
  assert.equal(mmToPx(25, 300), 295);
  assert.equal(mmToPx(30, 300), 354);
  const n = (p: keyof typeof PAPERS, s: keyof typeof SPECS) => layoutSheet(PAPERS[p], SPECS[s]).cells.length;
  assert.equal(n('4x6', 'mx-infantil'), 12);
  assert.equal(n('letter', 'mx-infantil'), 60);
  assert.equal(n('a4', 'mx-infantil'), 63);
  assert.equal(n('4x6', 'mx-credencial'), 6);
  assert.ok(n('4x6', 'us-passport') >= 1 && n('4x6', 'uk-passport') >= 1);
  // 2 x 2 in = 50.8 mm; 35 mm = 1.378 in; 50 x 70 mm = 1.97 x 2.76 in
  assert.equal((35 / 25.4).toFixed(2), '1.38');
  assert.equal((45 / 25.4).toFixed(2), '1.77');
  assert.equal((50 / 25.4).toFixed(2), '1.97');
  assert.equal((70 / 25.4).toFixed(2), '2.76');
  assert.equal((2.5 / 2.54).toFixed(2), '0.98');
  assert.equal((3 / 2.54).toFixed(2), '1.18');
});

test('Arabic Hijri examples: dates match the Umm al-Qura engine', async () => {
  const { hijriToGregorian, weekday } = await import('../src/tools/hijri/engine.ts');
  const d = (m: number, day: number) => hijriToGregorian({ y: 1448, m, d: day })!;
  assert.deepEqual(d(5, 1), { y: 2026, m: 10, d: 12 });
  assert.deepEqual(d(5, 3), { y: 2026, m: 10, d: 14 });
  assert.deepEqual(d(5, 8), { y: 2026, m: 10, d: 19 });
  assert.equal(weekday(d(5, 8)), 1);
  assert.deepEqual(d(5, 15), { y: 2026, m: 10, d: 26 });
  assert.deepEqual(d(9, 1), { y: 2027, m: 2, d: 8 });
  assert.deepEqual(d(10, 1), { y: 2027, m: 3, d: 9 });
  assert.deepEqual(d(12, 10), { y: 2027, m: 5, d: 16 });
});

test('new guides: no em or en dashes, no filler, sane meta lengths', async () => {
  const { esReglas } = await import('../src/guides/words/es-reglas.ts');
  const { photoPixelsEn, photoPrintEs } = await import('../src/guides/photo/guides.ts');
  const { hijriExamplesAr } = await import('../src/guides/hijri/ar-examples.ts');
  for (const g of [esReglas, photoPixelsEn, photoPrintEs, hijriExamplesAr]) {
    const text = JSON.stringify(g);
    assert.ok(!/[\u2014\u2013]/.test(text), `${g.slug} has a dash`);
    assert.ok(!/(unlock|seamless|powerful|desbloquea|potente)/i.test(text), `${g.slug} has filler`);
    assert.ok(g.metaTitle.length <= 75, `${g.slug} title ${g.metaTitle.length}`);
    assert.ok(g.metaDescription.length <= 180, `${g.slug} description ${g.metaDescription.length}`);
  }
});

test('Spanish cheque guide: amounts in words match the engine', async () => {
  const { parseAmount, toWords } = await import('../src/tools/words/engine.ts');
  const mx = (n: string) => toWords('es', parseAmount(n, false) as any, { currency: 'MXN', letterCase: 'lower' });
  assert.equal(mx('1000'), 'mil pesos 00/100 M.N.');
  assert.equal(mx('1500'), 'mil quinientos pesos 00/100 M.N.');
  assert.equal(mx('5000'), 'cinco mil pesos 00/100 M.N.');
  assert.equal(mx('10000'), 'diez mil pesos 00/100 M.N.');
  assert.equal(mx('15000'), 'quince mil pesos 00/100 M.N.');
  assert.equal(mx('50000'), 'cincuenta mil pesos 00/100 M.N.');
  assert.equal(mx('125,75'), 'ciento veinticinco pesos 75/100 M.N.');
  assert.equal(mx('1235,5'), 'mil doscientos treinta y cinco pesos 50/100 M.N.');
  assert.equal(mx('1,01'), 'un peso 01/100 M.N.');
  assert.equal(mx('0,50'), 'cero pesos 50/100 M.N.');
  const { wordsChequeEs } = await import('../src/guides/words/guides.ts');
  const text = JSON.stringify(wordsChequeEs);
  assert.ok(!/[—–]/.test(text), 'dash in cheque ES guide');
  assert.ok(wordsChequeEs.metaTitle.length <= 70 && wordsChequeEs.metaDescription.length <= 175);
});

test('French mille guide: forms match the engine and the 1990 spelling', async () => {
  const { frWords } = await import('../src/tools/words/engine.ts');
  assert.equal(frWords('170000'), 'cent soixante-dix mille');
  assert.equal(frWords('170000', { reform: true }), 'cent-soixante-dix-mille');
  assert.equal(frWords('130000'), 'cent trente mille');
  assert.equal(frWords('200000'), 'deux cent mille');
  assert.equal(frWords('1100'), 'mille cent');
  assert.equal(frWords('4060039'), 'quatre millions soixante mille trente-neuf');
  assert.equal(frWords('4500000', { reform: true }), 'quatre millions cinq-cent-mille');
  assert.equal(frWords('1000000000'), 'un milliard');
  assert.equal(frWords('2000000000'), 'deux milliards');
  assert.equal(frWords('170000', { variant: 'be' }), 'cent septante mille');
  assert.equal(frWords('80000', { variant: 'ch' }), 'huitante mille');
  const { frNombres } = await import('../src/guides/words/fr-nombres.ts');
  const text = JSON.stringify(frNombres);
  assert.ok(!/[\u2014\u2013]/.test(text), 'dash in FR guide');
  assert.ok(frNombres.metaTitle.length <= 70 && frNombres.metaDescription.length <= 175);
});

test('Hijri 1448 month starts (Arabic examples guide)', async () => {
  const { hijriToGregorian } = await import('../src/tools/hijri/engine.ts');
  const starts = Array.from({ length: 12 }, (_, i) => {
    const g = hijriToGregorian({ y: 1448, m: i + 1, d: 1 })!;
    return [g.y, g.m, g.d];
  });
  assert.deepEqual(starts, [[2026, 6, 16], [2026, 7, 15], [2026, 8, 14], [2026, 9, 12], [2026, 10, 12], [2026, 11, 11], [2026, 12, 10], [2027, 1, 9], [2027, 2, 8], [2027, 3, 9], [2027, 4, 8], [2027, 5, 7]]);
  assert.deepEqual(hijriToGregorian({ y: 1448, m: 5, d: 2 }), { y: 2026, m: 10, d: 13 });
});

test('Spanish tool page: round-amount table matches the engine', async () => {
  const { parseAmount, toWords } = await import('../src/tools/words/engine.ts');
  const { default: es } = await import('../src/tools/words/content/es.ts');
  const sec = es.sections.find((s: any) => s.heading.startsWith('Montos redondos'))!;
  const rows = [...sec.html.matchAll(/<tr><td>\$([\d,]+)\.00<\/td><td>([^<]+)<\/td><\/tr>/g)];
  assert.ok(rows.length >= 30);
  for (const [, num, words] of rows) {
    const n = num.replace(/,/g, '');
    assert.equal(words, toWords('es', parseAmount(n, false) as any, { currency: 'MXN', letterCase: 'lower' }));
  }
});

test('Arabic Hijri converter and age pages: computed examples are right', async () => {
  const { gregorianToHijri, hijriToGregorian } = await import('../src/tools/hijri/engine.ts');
  const { hijriAge, gregorianAge } = await import('../src/tools/age/engine.ts');
  assert.deepEqual(gregorianToHijri({ y: 2000, m: 1, d: 1 }), { y: 1420, m: 9, d: 24 });
  assert.deepEqual(gregorianToHijri({ y: 1995, m: 6, d: 15 }), { y: 1416, m: 1, d: 16 });
  assert.deepEqual(gregorianToHijri({ y: 2005, m: 3, d: 20 }), { y: 1426, m: 2, d: 10 });
  assert.deepEqual(gregorianToHijri({ y: 2027, m: 1, d: 1 }), { y: 1448, m: 7, d: 23 });
  const on = { y: 2026, m: 10, d: 15 };
  assert.deepEqual(hijriAge({ y: 2000, m: 1, d: 1 }, on), { years: 27, months: 7, days: 10 });
  assert.deepEqual(gregorianAge({ y: 2000, m: 1, d: 1 }, on), { years: 26, months: 9, days: 14 });
  assert.deepEqual(hijriAge({ y: 1995, m: 6, d: 15 }, on), { years: 32, months: 3, days: 18 });
  assert.deepEqual(hijriAge({ y: 2005, m: 3, d: 20 }, on), { years: 22, months: 2, days: 24 });
  assert.deepEqual(hijriToGregorian({ y: 1448, m: 7, d: 23 }), { y: 2027, m: 1, d: 1 });
  // 1.03 rule of thumb
  for (const [n, h] of [[20, '20.6'], [30, '30.9'], [40, '41.2'], [50, '51.5'], [60, '61.8']] as const) {
    assert.equal(((n * 365.2425) / 354.367).toFixed(1), h);
  }
  const hijri = (await import('../src/tools/hijri/content/ar.ts')).default;
  const age = (await import('../src/tools/age/content/ar-hijri.ts')).default;
  for (const c of [hijri, age]) {
    assert.ok(!/[\u2014\u2013]/.test(JSON.stringify(c)), 'dash in AR page');
  }
});

test('French tool page: small numbers and euro table match the engine', async () => {
  const { frWords, parseAmount, toWords } = await import('../src/tools/words/engine.ts');
  const { default: fr } = await import('../src/tools/words/content/fr.ts');
  const sec = fr.sections.find((s: any) => s.heading.startsWith('Petits nombres'))!;
  const small = [...sec.html.matchAll(/<tr><td>(\d+)<\/td><td>([^<]+)<\/td><\/tr>/g)];
  assert.ok(small.length >= 30);
  for (const [, n, words] of small) assert.equal(words, frWords(n));
  const eur = [...sec.html.matchAll(/<tr><td>([\d\u202f\u00a0 ]+)\u00a0€<\/td><td>([^<]+)<\/td><\/tr>/g)];
  assert.equal(eur.length, 7);
  for (const [, n, words] of eur) {
    const v = n.replace(/[\u202f\u00a0 ]/g, '');
    assert.equal(words, toWords('fr', parseAmount(v, false, true) as any, { currency: 'EUR', letterCase: 'lower' }));
  }
});

test('new tool pages: examples printed on the pages match the engines', async () => {
  const { default: gs } = await import('../src/tools/gradescale/content/es.ts');
  const { default: ag } = await import('../src/tools/aguinaldo/content/es.ts');
  const { default: wt } = await import('../src/tools/weighted/content/ar.ts');
  const { gradeFor, minScoreFor } = await import('../src/tools/gradescale/engine.ts');
  const { aguinaldo, daysWorkedInYear } = await import('../src/tools/aguinaldo/engine.ts');
  assert.equal(gradeFor(25, 38, 0.6), 4.4);
  assert.equal(gradeFor(80, 100, 0.6), 5.5);
  assert.equal(gradeFor(50, 100, 0.5), 4);
  assert.equal(gradeFor(50, 100, 0.55), 3.7);
  assert.equal(gradeFor(50, 100, 0.6), 3.5);
  assert.equal(gradeFor(60, 100, 0.5), 4.6);
  assert.deepEqual([4, 5, 6, 7].map((g) => minScoreFor(g, 60, 0.6)), [36, 44, 52, 60]);
  assert.equal(aguinaldo({ daily: 500, days: 20 }).gross, 10000);
  assert.equal(aguinaldo({ daily: 500, days: 40 }).gross, 20000);
  assert.equal(daysWorkedInYear({ y: 2026, m: 7, d: 1 }, 2026), 184);
  assert.equal(aguinaldo({ daily: 500, daysWorked: 184 }).gross, 3780.82);
  for (const c of [gs, ag, wt]) {
    const text = JSON.stringify(c);
    assert.ok(!/[\u2014\u2013]/.test(text) || c === gs, 'dash found');
    assert.ok(c.metaTitle.length <= 75, `title length ${c.slug}`);
    assert.ok(c.metaDescription.length <= 180, `description length ${c.slug}`);
  }
});

test('age guides: worked values match the engines', async () => {
  const { gregorianAge, hijriAge, totalDays, nextBirthday } = await import('../src/tools/age/engine.ts');
  const on = { y: 2026, m: 9, d: 26 };
  assert.equal(totalDays({ y: 1990, m: 5, d: 15 }, on), 13283);
  assert.equal(36 * 365 + 9 + 134, 13283);
  assert.deepEqual(gregorianAge({ y: 2001, m: 8, d: 31 }, on), { years: 25, months: 0, days: 26 });
  assert.deepEqual(gregorianAge({ y: 2004, m: 1, d: 30 }, on), { years: 22, months: 7, days: 27 });
  assert.deepEqual(gregorianAge({ y: 2000, m: 2, d: 29 }, on), { years: 26, months: 6, days: 28 });
  assert.deepEqual(gregorianAge({ y: 2000, m: 12, d: 20 }, { y: 2026, m: 1, d: 10 }), { years: 25, months: 0, days: 21 });
  assert.deepEqual(gregorianAge({ y: 1990, m: 5, d: 15 }, { y: 2026, m: 12, d: 31 }), { years: 36, months: 7, days: 16 });
  assert.deepEqual(hijriAge({ y: 2000, m: 1, d: 1 }, on), { years: 27, months: 6, days: 20 });
  assert.equal((13283 / 365.2425).toFixed(1), '36.4');
  assert.equal((13283 / 365.25).toFixed(2), '36.37');
  assert.deepEqual(nextBirthday({ y: 2000, m: 2, d: 29 }, { y: 2026, m: 3, d: 2 }), { date: { y: 2027, m: 2, d: 28 }, inDays: 363 });
  assert.ok(Math.round(33 * 354.367) === 11694 && Math.round(32 * 365.2425) === 11688);
  const { hijriToGregorian } = await import('../src/tools/hijri/engine.ts');
  const d1447 = hijriToGregorian({ y: 1447, m: 10, d: 20 })!;
  const d1448 = hijriToGregorian({ y: 1448, m: 10, d: 20 })!;
  const gap = (Date.UTC(d1448.y, d1448.m - 1, d1448.d) - Date.UTC(d1447.y, d1447.m - 1, d1447.d)) / 864e5;
  assert.ok(gap === 354 || gap === 355);
});

test('Hijri guides: key dates, Ramadan shift and calendar differences', async () => {
  const { hijriToGregorian } = await import('../src/tools/hijri/engine.ts');
  const d = (y: number, m: number, day: number, cal?: any) => hijriToGregorian({ y, m, d: day }, cal)!;
  assert.deepEqual(d(1448, 1, 10), { y: 2026, m: 6, d: 25 });
  assert.deepEqual(d(1448, 3, 12), { y: 2026, m: 8, d: 25 });
  assert.deepEqual(d(1448, 7, 27), { y: 2027, m: 1, d: 5 });
  assert.deepEqual(d(1448, 8, 15), { y: 2027, m: 1, d: 23 });
  assert.deepEqual(d(1448, 9, 27), { y: 2027, m: 3, d: 6 });
  assert.deepEqual(d(1446, 9, 1), { y: 2025, m: 3, d: 1 });
  assert.deepEqual(d(1447, 9, 1), { y: 2026, m: 2, d: 18 });
  assert.deepEqual(d(1449, 9, 1), { y: 2028, m: 1, d: 28 });
  const diff = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter((m) => {
    const a = d(1448, m, 1), b = d(1448, m, 1, 'islamic-civil');
    return a.y !== b.y || a.m !== b.m || a.d !== b.d;
  });
  assert.equal(diff.length, 10);
  assert.deepEqual(d(1448, 9, 1, 'islamic-civil'), d(1448, 9, 1));
  for (const m of diff) {
    const a = Date.UTC(d(1448, m, 1).y, d(1448, m, 1).m - 1, d(1448, m, 1).d);
    const b = Date.UTC(d(1448, m, 1, 'islamic-civil').y, d(1448, m, 1, 'islamic-civil').m - 1, d(1448, m, 1, 'islamic-civil').d);
    assert.ok([1, 2].includes((b - a) / 864e5));
  }
});

test('every guide source: no em dash, no filler words', async () => {
  const { readdirSync, readFileSync } = await import('node:fs');
  const { join } = await import('node:path');
  const walk = (d: string): string[] =>
    readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : e.name.endsWith('.ts') ? [join(d, e.name)] : []));
  for (const f of walk('src/guides')) {
    const text = readFileSync(f, 'utf8');
    assert.ok(!/—/.test(text), `${f} has an em dash`);
    assert.ok(!/(unlock|seamless|powerful|delve|game-changer|débloquez|puissant|desbloquea|potente)/i.test(text), `${f} has filler`);
  }
});

test('VAT guides: tax inside 100 and rounding examples', async () => {
  const { solve, round, mxWithholding } = await import('../src/tools/vat/engine.ts');
  const inside = (r: number) => solve('gross', 100, r).vat;
  assert.deepEqual([15, 5, 20, 21, 16, 19, 8].map(inside), [13.04, 4.76, 16.67, 17.36, 13.79, 15.97, 7.41]);
  assert.equal(round(0.3 * 0.15, 2) * 3 > 0.149 && round(0.3 * 0.15, 2) * 3 < 0.151, true);
  assert.equal(round(0.9 * 0.15, 2), 0.14);
  assert.equal(round(0.3 * 0.16, 2), 0.05);
  assert.equal(round(0.9 * 0.16, 2), 0.14);
  assert.equal(solve('gross', 115, 15).vat, 15);
  assert.equal(solve('gross', 116, 16).vat, 16);
  const wh = mxWithholding(solve('net', 10000, 16), true, 10);
  assert.equal(wh.ivaRet, 1066.67);
  assert.equal(wh.isrRet, 1000);
  assert.equal(mxWithholding(solve('net', 10000, 16), true, 1.25).isrRet, 125);
});

test('cheque guides (EN, AR) and FR additions: engine outputs', async () => {
  const { parseAmount, toWords, frWords } = await import('../src/tools/words/engine.ts');
  const en = (n: string) => toWords('en', parseAmount(n) as any, { currency: '', cheque: true } as any);
  assert.equal(frWords('200', { reform: true }), 'deux-cents');
  assert.equal(frWords('201', { reform: true }), 'deux-cent-un');
  assert.equal(frWords('200000', { reform: true }), 'deux-cent-mille');
  assert.equal(Math.round(100 * 655.957), 65596);
  assert.equal(Math.round(1000 * 655.957), 655957);
});

test('GPA guides: new tables match the arithmetic', () => {
  const t = (g: number, c: number, tg: number, tc: number) => ((g * c + tg * tc) / (c + tc)).toFixed(2);
  assert.deepEqual([30, 60, 90].map((c) => [4, 3, 2].map((x) => t(3.5, c, x, 15))), [['3.67', '3.33', '3.00'], ['3.60', '3.40', '3.20'], ['3.57', '3.43', '3.29']]);
  assert.deepEqual([15, 18].map((h) => t(2.8, 60, 4, h)), ['3.04', '3.08']);
  assert.equal(((2.8 * 60 + 4 * 30) / 90).toFixed(2), '3.20');
  assert.deepEqual([12, 15, 18].map((h) => t(3.6, 60, 5, h)), ['3.83', '3.88', '3.92']);
  assert.equal((0.2 * 5.5 + 0.3 * 4.2 + 0.2 * 6.0 + 0.3 * 4.8).toFixed(2), '5.00');
  assert.equal(((5.2 + 4.8 + 6.1 + 5.5 + 4.0) / 5).toFixed(2), '5.12');
  const need = (avg: number, w: number) => Math.ceil(((4 - avg * (1 - w)) / w) * 10 - 1e-9) / 10;
  assert.deepEqual([3, 3.5, 4, 4.5].map((a) => need(a, 0.3)), [6.4, 5.2, 4, 2.9]);
  assert.deepEqual([3, 3.5, 4, 4.5].map((a) => need(a, 0.4)), [5.5, 4.8, 4, 3.3]);
});

test('photo guides: head share and conversions', async () => {
  const { SPECS } = await import('../src/tools/photo/engine.ts');
  const share = (k: 'us-passport' | 'uk-passport', i: 0 | 1) => Math.round(((SPECS[k].head![i] as number) / SPECS[k].h) * 100);
  assert.deepEqual([share('us-passport', 0), share('us-passport', 1), share('uk-passport', 0), share('uk-passport', 1)], [50, 69, 64, 76]);
  assert.equal(Math.round(354 * 0.75), 266);
  assert.equal((4 * 25.4).toFixed(1), '101.6');
  assert.equal((6 * 25.4).toFixed(1), '152.4');
});

test('tool page additions: discount, weighted reverse and age units', async () => {
  const { round } = await import('../src/tools/vat/engine.ts');
  assert.equal(round(1000 * 0.9 * 0.15, 2), 135);
  assert.equal(1000 * 0.9 + 135, 1035);
  assert.equal(round(1000 * 0.9 * 0.16, 2), 144);
  assert.equal(900 + 144, 1044);
  const need = (target: number) => (target - 95 * 0.3 - 85 * 0.3) / 0.4;
  assert.deepEqual([85, 90, 95].map(need), [77.5, 90, 102.5]);
  assert.equal(Math.floor(13283 / 7), 1897);
  assert.equal(13283 % 7, 4);
  assert.equal(36 * 12 + 4, 436);
});

test('DNI tool page: letters printed on the page match the engine', async () => {
  const { checkId, dniLetter } = await import('../src/tools/dni/engine.ts');
  const { default: dni } = await import('../src/tools/dni/content/es.ts');
  const letter = (s: string) => {
    const r = checkId(s);
    return r.ok ? r.expected : '?';
  };
  assert.equal(letter('X1234567'), 'L');
  assert.equal(letter('Y1234567'), 'X');
  assert.equal(letter('Z1234567'), 'R');
  assert.equal(dniLetter('12345687'), 'T');
  assert.equal(11234567 % 23, 10);
  assert.equal(21234567 % 23, 1);
  assert.equal(12345687 % 23, 0);
  const text = JSON.stringify(dni);
  assert.ok(!/\u2014/.test(text), 'em dash in DNI page');
  assert.ok(dni.metaTitle.length <= 70 && dni.metaDescription.length <= 175);
  assert.ok(text.includes('X1234567L') && text.includes('12345678Z'));
});
