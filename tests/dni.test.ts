import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LETTERS, dniLetter, mod23, checkId } from '../src/tools/dni/engine.ts';

test('table has 23 distinct letters without I, N-tilde, O, U', () => {
  assert.equal(LETTERS.length, 23);
  assert.equal(new Set(LETTERS).size, 23);
  for (const bad of 'IÑOU') assert.ok(!LETTERS.includes(bad));
});

test('official example 12345678 gives Z (remainder 14)', () => {
  assert.equal(mod23('12345678'), 14);
  assert.equal(12345678 % 23, 14);
  assert.equal(12345678 - 23 * 536768, 14);
  assert.equal(dniLetter('12345678'), 'Z');
});

test('edges and leading zeros', () => {
  assert.equal(dniLetter('0'), 'T');
  assert.equal(dniLetter('1'), 'R');
  assert.equal(dniLetter('00000001'), 'R');
  assert.equal(dniLetter('23'), 'T');
  assert.equal(dniLetter('22'), 'E');
  assert.equal(dniLetter('99999999'), LETTERS[99999999 % 23]);
});

test('every remainder maps to the table position', () => {
  for (let r = 0; r < 23; r++) assert.equal(dniLetter(String(r)), LETTERS[r]);
});

test('validation of a full DNI', () => {
  const ok = checkId('12345678Z');
  assert.ok(ok.ok && ok.valid === true && ok.expected === 'Z' && ok.full === '12345678Z');
  const bad = checkId('12345678A');
  assert.ok(bad.ok && bad.valid === false && bad.expected === 'Z' && bad.given === 'A');
  const spaced = checkId('12.345.678-z');
  assert.ok(spaced.ok && spaced.valid === true);
  const noLetter = checkId('12345678');
  assert.ok(noLetter.ok && noLetter.valid === undefined && noLetter.expected === 'Z');
});

test('7-digit DNI is padded to 8 in the full number, same letter', () => {
  const r = checkId('1234567');
  assert.ok(r.ok && r.full === '01234567' + r.expected && r.expected === dniLetter('01234567'));
});

test('NIE: X, Y, Z become 0, 1, 2', () => {
  const x = checkId('X1234567');
  assert.ok(x.ok && x.kind === 'nie' && x.number === '01234567' && x.expected === 'L' && x.full === 'X1234567L');
  const y = checkId('Y1234567');
  assert.ok(y.ok && y.number === '11234567' && y.expected === LETTERS[11234567 % 23]);
  const z = checkId('z1234567');
  assert.ok(z.ok && z.number === '21234567' && z.expected === LETTERS[21234567 % 23]);
  const checked = checkId('X1234567L');
  assert.ok(checked.ok && checked.valid === true);
});

test('invalid input', () => {
  assert.deepEqual(checkId(''), { ok: false, reason: 'empty' });
  assert.deepEqual(checkId('abc'), { ok: false, reason: 'format' });
  assert.deepEqual(checkId('123456789'), { ok: false, reason: 'format' });
  assert.deepEqual(checkId('X12345'), { ok: false, reason: 'length' });
});
