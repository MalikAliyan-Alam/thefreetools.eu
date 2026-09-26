import { test } from 'node:test';
import assert from 'node:assert/strict';
import { gregorianAge, hijriAge, nextBirthday, totalDays } from '../src/tools/age/engine.ts';

test('gregorian age with month and day borrowing', () => {
  assert.deepEqual(gregorianAge({ y: 1990, m: 5, d: 15 }, { y: 2026, m: 9, d: 26 }), { years: 36, months: 4, days: 11 });
  // day borrow: 31 Jan -> 1 Mar 2025 (Feb has 28 days)
  assert.deepEqual(gregorianAge({ y: 2000, m: 1, d: 31 }, { y: 2025, m: 3, d: 1 }), { years: 25, months: 1, days: 1 });
  // birthday not reached yet this year
  assert.deepEqual(gregorianAge({ y: 2000, m: 12, d: 1 }, { y: 2026, m: 9, d: 26 }), { years: 25, months: 9, days: 25 });
  assert.deepEqual(gregorianAge({ y: 2000, m: 9, d: 26 }, { y: 2026, m: 9, d: 26 }), { years: 26, months: 0, days: 0 });
});

test('hijri age uses Umm al-Qura months', () => {
  // 1 Ramadan 1446 (2025-03-01) to 15 Rabi al-Thani 1448 (2026-09-26)
  // = 1 year, 7 months, 14 days in Hijri months
  assert.deepEqual(hijriAge({ y: 2025, m: 3, d: 1 }, { y: 2026, m: 9, d: 26 }), { years: 1, months: 7, days: 14 });
  // Hijri years are ~11 days shorter, so the Hijri age is ahead of the Gregorian one
  const g = gregorianAge({ y: 1990, m: 5, d: 15 }, { y: 2026, m: 9, d: 26 });
  const h = hijriAge({ y: 1990, m: 5, d: 15 }, { y: 2026, m: 9, d: 26 });
  assert.ok(h.years === g.years + 1);
});

test('totals and next birthday', () => {
  assert.equal(totalDays({ y: 2024, m: 1, d: 1 }, { y: 2025, m: 1, d: 1 }), 366);
  assert.deepEqual(nextBirthday({ y: 1990, m: 9, d: 30 }, { y: 2026, m: 9, d: 26 }), { date: { y: 2026, m: 9, d: 30 }, inDays: 4 });
  assert.deepEqual(nextBirthday({ y: 1990, m: 9, d: 26 }, { y: 2026, m: 9, d: 26 }), { date: { y: 2026, m: 9, d: 26 }, inDays: 0 });
  assert.deepEqual(nextBirthday({ y: 2000, m: 2, d: 29 }, { y: 2026, m: 3, d: 2 }), { date: { y: 2027, m: 3, d: 1 }, inDays: 364 });
});
