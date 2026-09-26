import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  SCALES,
  summarize,
  cumulative,
  requiredAverage,
  gradeValue,
  parseNumber,
  formatAverage,
} from '../src/tools/gpa/engine.ts';

test('US 4.0: credit-weighted average', () => {
  const s = summarize(SCALES.us4, [
    { name: 'Calculus', grade: 'A', weight: 4 },
    { name: 'History', grade: 'B+', weight: 3 },
    { name: 'Lab', grade: 'C', weight: 1 },
  ]);
  // (4*4 + 3.3*3 + 2*1) / 8 = 27.9 / 8
  assert.equal(s.weight, 8);
  assert.ok(Math.abs((s.average ?? 0) - 3.4875) < 1e-9);
  assert.deepEqual(s.invalid, []);
});

test('Saudi 5-point scale values', () => {
  assert.equal(gradeValue(SCALES.sa5, 'A+'), 5);
  assert.equal(gradeValue(SCALES.sa5, 'A'), 4.75);
  assert.equal(gradeValue(SCALES.sa5, 'F'), 1);
  const s = summarize(SCALES.sa5, [
    { name: '', grade: 'A+', weight: 3 },
    { name: '', grade: 'B', weight: 3 },
  ]);
  assert.equal(s.average, 4.5);
});

test('matches published results from calculator.net and laamea.com', () => {
  // calculator.net, 4.0 scale: A×4, B+×3, C×1 → 3.488
  const us = summarize(SCALES.us4, [
    { name: '', grade: 'A', weight: 4 },
    { name: '', grade: 'B+', weight: 3 },
    { name: '', grade: 'C', weight: 1 },
  ]);
  assert.equal(formatAverage(us.average!, 3), '3.488');
  // laamea.com, 5.0 scale: A×3, B+×4, C×2 → 38.25 / 9 = 4.25; with 60 prior hours at 4.10 → 4.12
  const sa = summarize(SCALES.sa5, [
    { name: '', grade: 'A', weight: 3 },
    { name: '', grade: 'B+', weight: 4 },
    { name: '', grade: 'C', weight: 2 },
  ]);
  assert.equal(sa.points, 38.25);
  assert.equal(formatAverage(sa.average!), '4.25');
  assert.equal(formatAverage(cumulative(sa, 4.1, 60).average!), '4.12');
  // mipromedio.cl, 1–7 with partial weights (70%): 5.0×25, 6.0×25, 5.5×20 → 5.5
  const cl = summarize(SCALES.cl7, [
    { name: '', grade: '5', weight: 25 },
    { name: '', grade: '6', weight: 25 },
    { name: '', grade: '5.5', weight: 20 },
  ]);
  assert.equal(cl.average, 5.5);
});

test('Chile 1–7: decimal comma and range check', () => {
  assert.equal(parseNumber('5,5'), 5.5);
  assert.equal(gradeValue(SCALES.cl7, '7,1'), null);
  assert.equal(gradeValue(SCALES.cl7, '0.9'), null);
  const s = summarize(SCALES.cl7, [
    { name: 'Prueba 1', grade: '5,0', weight: 30 },
    { name: 'Prueba 2', grade: '6.0', weight: 30 },
    { name: 'Examen', grade: '4,5', weight: 40 },
  ]);
  // (150 + 180 + 180) / 100
  assert.equal(s.average, 5.1);
});

test('invalid rows are skipped and reported; blank rows ignored', () => {
  const s = summarize(SCALES.pct100, [
    { name: '', grade: '80', weight: 3 },
    { name: '', grade: '120', weight: 3 },
    { name: '', grade: '', weight: 0 },
    { name: '', grade: '70', weight: 0 },
  ]);
  assert.equal(s.average, 80);
  assert.deepEqual(s.invalid, [1, 3]);
});

test('cumulative folds in previous GPA', () => {
  const term = summarize(SCALES.us4, [{ name: '', grade: 'A', weight: 15 }]);
  const total = cumulative(term, 3, 45);
  // (4*15 + 3*45) / 60 = 3.25
  assert.equal(total.average, 3.25);
  assert.equal(cumulative(term, null, 45), term);
});

test('required average for a target', () => {
  const now = cumulative(summarize(SCALES.us4, []), 3, 60);
  // need x over 15 credits: (3.2*75 - 180) / 15 = 4
  assert.ok(Math.abs((requiredAverage(now, 3.2, 15) ?? 0) - 4) < 1e-9);
  assert.equal(requiredAverage(now, 3.2, 0), null);
});

test('formatAverage rounds half up without float noise', () => {
  assert.equal(formatAverage(2.675), '2.68');
  assert.equal(formatAverage((5.5 * 140 - 571) / 40), '4.98');
  assert.equal(formatAverage(1.005), '1.01');
  assert.equal(formatAverage(3), '3.00');
});

test('Jordan and Kuwait 4.0 scales', () => {
  assert.equal(gradeValue(SCALES.jo4, 'A'), 3.75);
  assert.equal(gradeValue(SCALES.jo4, 'D'), 1.5);
  assert.equal(gradeValue(SCALES.kw4, 'A-'), 3.67);
  const jo = summarize(SCALES.jo4, [
    { name: '', grade: 'A+', weight: 3 },
    { name: '', grade: 'B', weight: 3 },
  ]);
  assert.equal(jo.average, 3.5);
});
