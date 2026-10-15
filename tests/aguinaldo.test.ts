import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aguinaldo, dailyFromMonthly, daysWorkedInYear, UMA_2026 } from '../src/tools/aguinaldo/engine.ts';

test('full year, 15 days', () => {
  const r = aguinaldo({ daily: 500 });
  assert.equal(r.gross, 7500);
  assert.equal(r.exemptLimit, 3519.3);
  assert.equal(r.exempt, 3519.3);
  assert.equal(r.taxable, 3980.7);
});

test('proportional to days worked', () => {
  assert.equal(aguinaldo({ daily: 500, daysWorked: 183 }).gross, 3760.27);
  assert.equal(aguinaldo({ daily: 500, daysWorked: 91 }).gross, 1869.86);
  assert.equal(aguinaldo({ daily: 500, daysWorked: 400 }).gross, 7500);
});

test('more than 15 days and small aguinaldo fully exempt', () => {
  assert.equal(aguinaldo({ daily: 500, days: 30 }).gross, 15000);
  const small = aguinaldo({ daily: 200 });
  assert.equal(small.gross, 3000);
  assert.equal(small.exempt, 3000);
  assert.equal(small.taxable, 0);
});

test('UMA is an input', () => {
  assert.equal(UMA_2026, 117.31);
  assert.equal(aguinaldo({ daily: 500, uma: 113.14 }).exemptLimit, 3394.2);
});

test('daily salary from monthly', () => {
  assert.equal(dailyFromMonthly(15000), 500);
  assert.equal(dailyFromMonthly(10000), 333.33);
});

test('days worked in the year', () => {
  assert.equal(daysWorkedInYear({ y: 2025, m: 3, d: 1 }, 2026), 365);
  assert.equal(daysWorkedInYear({ y: 2026, m: 1, d: 1 }, 2026), 365);
  assert.equal(daysWorkedInYear({ y: 2026, m: 7, d: 1 }, 2026), 184);
  assert.equal(daysWorkedInYear({ y: 2026, m: 12, d: 31 }, 2026), 1);
  assert.equal(daysWorkedInYear({ y: 2027, m: 1, d: 5 }, 2026), 0);
});
