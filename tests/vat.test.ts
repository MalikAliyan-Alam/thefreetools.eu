import { test } from 'node:test';
import assert from 'node:assert/strict';
import { round, solve, mxWithholding } from '../src/tools/vat/engine.ts';

test('Saudi 15%: add and remove VAT', () => {
  assert.deepEqual(solve('net', 1000, 15), { net: 1000, vat: 150, gross: 1150 });
  assert.deepEqual(solve('gross', 1150, 15), { net: 1000, vat: 150, gross: 1150 });
  assert.deepEqual(solve('vat', 150, 15), { net: 1000, vat: 150, gross: 1150 });
  // 99.99 incl. VAT: net 86.95, VAT 13.04
  assert.deepEqual(solve('gross', 99.99, 15), { net: 86.95, vat: 13.04, gross: 99.99 });
});

test('net + vat always equals gross', () => {
  for (const rate of [5, 8, 10, 14, 15, 16, 18, 19, 21]) {
    for (let g = 0.01; g < 50; g += 0.37) {
      const b = solve('gross', g, rate);
      assert.equal(round(b.net + b.vat), b.gross);
    }
  }
});

test('Chile 19% in whole pesos', () => {
  assert.deepEqual(solve('gross', 11900, 19, 0), { net: 10000, vat: 1900, gross: 11900 });
  assert.deepEqual(solve('net', 12345, 19, 0), { net: 12345, vat: 2346, gross: 14691 });
});

test('Mexico withholdings (honorarios)', () => {
  const b = solve('net', 10000, 16);
  assert.deepEqual(b, { net: 10000, vat: 1600, gross: 11600 });
  // 2/3 of IVA = 1066.67; ISR 10% = 1000 → receives 9533.33
  assert.deepEqual(mxWithholding(b, true, 10), { ivaRet: 1066.67, isrRet: 1000, receive: 9533.33 });
  // RESICO: ISR 1.25% = 125 → 10408.33
  assert.deepEqual(mxWithholding(b, true, 1.25), { ivaRet: 1066.67, isrRet: 125, receive: 10408.33 });
});

test('numbers printed on the content pages', () => {
  assert.deepEqual(solve('net', 1000, 16), { net: 1000, vat: 160, gross: 1160 });
  assert.deepEqual(solve('gross', 1160, 16), { net: 1000, vat: 160, gross: 1160 });
  assert.equal(round(1160 * 0.84), 974.4);
  assert.equal(round(1150 * 0.85), 977.5);
  assert.deepEqual(solve('net', 2500, 16), { net: 2500, vat: 400, gross: 2900 });
  assert.deepEqual(solve('net', 2000, 15), { net: 2000, vat: 300, gross: 2300 });
});
