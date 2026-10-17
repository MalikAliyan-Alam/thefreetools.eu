import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cleanNames, parseExclusions, draw, isValid, shuffle, encodeReveal, decodeReveal } from '../src/tools/secretsanta/engine.ts';

// Small seeded generator so failures are reproducible.
const seeded = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

test('cleanNames trims, removes blanks and duplicates, accepts commas', () => {
  assert.deepEqual(cleanNames('  Ana \n\nluis\nANA\nMaría José, Pedro'), ['Ana', 'luis', 'María José', 'Pedro']);
  assert.deepEqual(cleanNames(['a', ' A ', 'b']), ['a', 'b']);
});

test('parseExclusions reads common separators', () => {
  assert.deepEqual(parseExclusions('Ana - Luis\nPedro, Marta\nSol / Juan'), [['Ana', 'Luis'], ['Pedro', 'Marta'], ['Sol', 'Juan']]);
  assert.deepEqual(parseExclusions('solo uno'), []);
});

test('shuffle keeps every element', () => {
  const s = shuffle([1, 2, 3, 4, 5, 6], seeded(7));
  assert.deepEqual([...s].sort(), [1, 2, 3, 4, 5, 6]);
});

test('too few or too many people give null', () => {
  assert.equal(draw(['A', 'B']), null);
  assert.equal(draw([]), null);
  assert.equal(draw(Array.from({ length: 61 }, (_, i) => `P${i}`)), null);
});

test('property: every draw is a valid derangement for 3 to 25 people (odd and even)', () => {
  for (let n = 3; n <= 25; n++) {
    const names = Array.from({ length: n }, (_, i) => `Persona ${i + 1}`);
    for (let seed = 1; seed <= 25; seed++) {
      const d = draw(names, [], seeded(seed * 31 + n))!;
      assert.ok(d, `n=${n} seed=${seed}`);
      assert.ok(isValid(d, names), `n=${n} seed=${seed}`);
    }
  }
});

test('exclusions are respected in both directions', () => {
  const names = ['Ana', 'Luis', 'Marta', 'Pedro', 'Sol', 'Juan'];
  const ex: [string, string][] = [['Ana', 'Luis'], ['Marta', 'Pedro']];
  for (let seed = 1; seed <= 200; seed++) {
    const d = draw(names, ex, seeded(seed))!;
    assert.ok(d);
    assert.ok(isValid(d, names, ex));
    for (const x of d) {
      assert.ok(!(x.giver === 'Ana' && x.receiver === 'Luis'));
      assert.ok(!(x.giver === 'Luis' && x.receiver === 'Ana'));
    }
  }
});

test('exclusions ignore letter case', () => {
  const names = ['Ana', 'Luis', 'Marta', 'Pedro'];
  for (let seed = 1; seed <= 50; seed++) {
    const d = draw(names, [['ANA', 'luis']], seeded(seed))!;
    assert.ok(d && !d.some((x) => (x.giver === 'Ana' && x.receiver === 'Luis') || (x.giver === 'Luis' && x.receiver === 'Ana')));
  }
});

test('with 3 people one excluded pair is already impossible (every 3-cycle uses every pair)', () => {
  assert.equal(draw(['Ana', 'Luis', 'Marta'], [['Ana', 'Luis']]), null);
});

test('impossible constraints give null instead of hanging', () => {
  // With three people, if Ana cannot give to Luis or Marta, Ana has nobody.
  assert.equal(draw(['Ana', 'Luis', 'Marta'], [['Ana', 'Luis'], ['Ana', 'Marta']]), null);
  // Everyone excluded from everyone.
  const names = ['A', 'B', 'C', 'D'];
  const all: [string, string][] = [];
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) all.push([names[i], names[j]]);
  assert.equal(draw(names, all), null);
});

test('different seeds give different draws (it is really random)', () => {
  const names = Array.from({ length: 8 }, (_, i) => `N${i}`);
  const seen = new Set<string>();
  for (let seed = 1; seed <= 40; seed++) seen.add(JSON.stringify(draw(names, [], seeded(seed))));
  assert.ok(seen.size > 30);
});

test('private link tokens round trip, including accents, emoji and quotes', () => {
  for (const r of [
    { giver: 'Ana', receiver: 'Luis' },
    { giver: 'María José', receiver: 'Núñez "Pepe"', budget: '20 €' },
    { giver: '李雷', receiver: 'Jürgen 🎅' },
  ]) {
    const t = encodeReveal(r);
    assert.ok(/^[A-Za-z0-9_-]+$/.test(t), 'token is URL safe');
    assert.deepEqual(decodeReveal(t), { ...r, budget: r.budget });
  }
  assert.equal(decodeReveal('not-a-token'), null);
  assert.equal(decodeReveal(''), null);
});

test('page claims about 3 and 4 people are true, and the pages have no em dash', async () => {
  const { default: es } = await import('../src/tools/secretsanta/content/es.ts');
  const { default: en } = await import('../src/tools/secretsanta/content/en.ts');
  assert.equal(draw(['A', 'B', 'C'], [['A', 'B']]), null);
  assert.ok(draw(['A', 'B', 'C', 'D'], [['A', 'B']], seeded(3)));
  for (const c of [es, en]) {
    assert.ok(!/\u2014/.test(JSON.stringify(c)), 'em dash found');
    assert.ok(c.metaTitle.length <= 70, `title ${c.metaTitle.length}`);
    assert.ok(c.metaDescription.length <= 180, `description ${c.metaDescription.length}`);
  }
});
