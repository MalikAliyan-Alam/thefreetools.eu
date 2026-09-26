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
