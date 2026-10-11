import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseFrench, groupDigits, tokenize } from '../src/tools/unwords/engine.ts';
import { frWords, type FrVariant } from '../src/tools/words/engine.ts';

const val = (s: string) => {
  const r = parseFrench(s);
  assert.ok(r.ok, `"${s}" should parse, got ${JSON.stringify(r, (_, v) => (typeof v === 'bigint' ? v.toString() : v))}`);
  return r.ok ? r.value : -1n;
};

test('examples from the page and from Search Console queries', () => {
  assert.equal(val('quatre millions cinq cent mille'), 4_500_000n);
  assert.equal(val('un million deux cent mille'), 1_200_000n);
  assert.equal(val('cent mille deux'), 100_002n);
  assert.equal(val('un million cent francs'), 1_000_100n);
  assert.equal(val('un million cinq mille'), 1_005_000n);
  assert.equal(val('quatre millions trois cent trente mille'), 4_330_000n);
  assert.equal(val('quatre vingt sept millions cinq mille cent trois'), 87_005_103n);
  assert.equal(val('soixante dix millions sept mille trois cent quatre'), 70_007_304n);
  assert.equal(val('vingt huit milliards neuf cent trente mille'), 28_000_930_000n);
  assert.equal(val('un milliard six cent millions'), 1_600_000_000n);
  assert.equal(val('quatre vingt trois millions dix neuf mille'), 83_019_000n);
  assert.equal(val('deux cent mille dinars'), 200_000n);
  assert.equal(val('cent quatre vingt dix mille euros'), 190_000n);
  assert.equal(val('un million d’euros'), 1_000_000n);
});

test('spelling variants and noise', () => {
  assert.equal(val('QUATRE-VINGT-DIX-SEPT'), 97n);
  assert.equal(val('  quatre   vingts '), 80n);
  assert.equal(val('vingt et un'), 21n);
  assert.equal(val('vingt-et-un'), 21n);
  assert.equal(val('soixante et onze'), 71n);
  assert.equal(val('septante-cinq'), 75n);
  assert.equal(val('huitante'), 80n);
  assert.equal(val('octante'), 80n);
  assert.equal(val('nonante-neuf'), 99n);
  assert.equal(val('zéro'), 0n);
  assert.equal(val('mille'), 1000n);
  assert.equal(val('cent'), 100n);
  assert.equal(val('deux-cents'), 200n);
});

test('rejects what is not a number', () => {
  for (const bad of ['trois vingt', 'dix cent', 'vingt cent', 'million', 'mille mille', 'deux millions un million', 'un deux', 'vingt trente']) {
    assert.equal(parseFrench(bad).ok, false, bad);
  }
  assert.deepEqual(parseFrench(''), { ok: false, kind: 'empty' });
  assert.deepEqual(parseFrench('   '), { ok: false, kind: 'empty' });
  assert.deepEqual(parseFrench('bonjour'), { ok: false, kind: 'unknown', word: 'bonjour' });
  assert.equal((parseFrench('un billiard') as { kind?: string }).kind, 'too-big');
  assert.equal((parseFrench('neuf cent quatre vingt dix neuf billions neuf cent quatre vingt dix neuf milliards') as { ok: boolean }).ok, true);
});

test('flags spelling that differs from the usual one', () => {
  const ok = parseFrench('quatre-vingts');
  assert.ok(ok.ok && ok.spelling === 'usual');
  const bad = parseFrench('deux cent mille') as any;
  assert.equal(bad.spelling, 'usual');
  const odd = parseFrench('deux cents mille') as any;
  assert.equal(odd.value, 200_000n);
  assert.equal(odd.spelling, 'other');
  assert.equal(odd.usual, 'deux cent mille');
  const un = parseFrench('un mille') as any;
  assert.equal(un.value, 1000n);
  assert.equal(un.spelling, 'other');
  assert.equal((parseFrench('septante') as any).spelling, 'usual');
});

test('digits are grouped with narrow no-break spaces', () => {
  assert.equal(groupDigits(4_500_000n), '4\u202f500\u202f000');
  assert.equal(groupDigits(999n), '999');
  assert.equal(groupDigits(0n), '0');
  assert.deepEqual(tokenize('Quatre-vingt-dix  d’euros'), ['quatre', 'vingt', 'dix', 'd', 'euros']);
});

// The strongest check: frWords and the parser are inverses, in every variant and spelling.
test('round trip with frWords for every number to 2000', () => {
  const variants: FrVariant[] = ['fr', 'be', 'ch'];
  for (let n = 0; n <= 2000; n++) {
    for (const variant of variants) {
      for (const reform of [false, true]) {
        const words = frWords(BigInt(n), { variant, reform });
        assert.equal(val(words), BigInt(n), `${n} ${variant} ${reform} → ${words}`);
      }
    }
  }
});

test('round trip with frWords for large and random numbers', () => {
  const edges = [
    9999n, 10_000n, 99_999n, 100_000n, 999_999n, 1_000_000n, 1_000_001n, 2_000_000n, 80_000n, 80_000_000n,
    999_999_999n, 1_000_000_000n, 1_080_000_080n, 10n ** 12n, 10n ** 12n + 1n, 999_999_999_999_999n,
  ];
  let seed = 12345;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  const randoms: bigint[] = [];
  for (let i = 0; i < 1500; i++) {
    const digits = 1 + Math.floor(rnd() * 15);
    let s = '';
    for (let d = 0; d < digits; d++) s += Math.floor(rnd() * 10);
    randoms.push(BigInt(s));
  }
  for (const n of [...edges, ...randoms]) {
    for (const variant of ['fr', 'be', 'ch'] as FrVariant[]) {
      for (const reform of [false, true]) {
        const words = frWords(n, { variant, reform });
        const r = parseFrench(words);
        assert.ok(r.ok, `${n} ${variant} ${reform}: ${words}`);
        if (r.ok) {
          assert.equal(r.value, n, `${words}`);
          assert.equal(r.spelling, 'usual', words);
        }
      }
    }
  }
});

test('every example printed on the page', () => {
  const rows: [string, bigint][] = [
    ['quatre-vingt-dix-sept', 97n], ['cent soixante-dix mille', 170_000n], ['un million deux cent mille', 1_200_000n],
    ['quatre millions trois cent trente mille', 4_330_000n], ['quatre-vingt-sept millions cinq mille cent trois', 87_005_103n],
    ['vingt-huit milliards neuf cent trente mille', 28_000_930_000n], ['quatre millions cinq cent mille euros', 4_500_000n],
    ['deux cents', 200n], ['deux cent mille', 200_000n], ['deux cent un', 201n], ['quatre-vingts', 80n], ['quatre-vingt mille', 80_000n],
    ['soixante et onze', 71n], ['cent mille deux', 100_002n], ['septante', 70n], ['nonante', 90n], ['huitante', 80n], ['octante', 80n],
  ];
  for (const [w, n] of rows) assert.equal(val(w), n, w);
});
