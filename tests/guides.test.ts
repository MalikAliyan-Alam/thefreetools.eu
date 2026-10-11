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
