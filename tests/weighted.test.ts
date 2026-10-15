import { test } from 'node:test';
import assert from 'node:assert/strict';
import { weighted, contributions, DEFAULT_WEIGHTS } from '../src/tools/weighted/engine.ts';

test('weighted percentage with the common 30/30/40 split', () => {
  assert.equal(weighted({ school: 95, qudrat: 88, tahsili: 82 }, DEFAULT_WEIGHTS), 87.7);
  assert.equal(weighted({ school: 90, qudrat: 80, tahsili: 85 }, DEFAULT_WEIGHTS), 85);
  assert.equal(weighted({ school: 100, qudrat: 100, tahsili: 100 }, DEFAULT_WEIGHTS), 100);
  assert.equal(weighted({ school: 0, qudrat: 0, tahsili: 0 }, DEFAULT_WEIGHTS), 0);
});

test('custom weights and a zero weight ignores that score', () => {
  assert.equal(weighted({ school: 90, qudrat: 80, tahsili: 70 }, { school: 20, qudrat: 30, tahsili: 50 }), 77);
  assert.equal(weighted({ school: 90, qudrat: 80 }, { school: 50, qudrat: 50, tahsili: 0 }), 85);
  // weights that do not add to 100 are normalised
  assert.equal(weighted({ school: 90, qudrat: 80, tahsili: 70 }, { school: 3, qudrat: 3, tahsili: 4 }), 79);
});

test('invalid input', () => {
  assert.equal(weighted({ school: 101, qudrat: 80, tahsili: 70 }, DEFAULT_WEIGHTS), null);
  assert.equal(weighted({ school: 90, qudrat: 80 }, DEFAULT_WEIGHTS), null);
  assert.equal(weighted({ school: 90, qudrat: 80, tahsili: 70 }, { school: 0, qudrat: 0, tahsili: 0 }), null);
});

test('contributions add up to the result', () => {
  const c = contributions({ school: 95, qudrat: 88, tahsili: 82 }, DEFAULT_WEIGHTS);
  assert.deepEqual(c, { school: 28.5, qudrat: 26.4, tahsili: 32.8 });
});
