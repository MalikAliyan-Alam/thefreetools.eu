import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  gregorianToHijri,
  hijriToGregorian,
  hijriMonthLength,
  isValidGregorian,
  weekday,
} from '../src/tools/hijri/engine.ts';

test('known Umm al-Qura dates (Saudi announcements)', () => {
  // 1 Ramadan 1446 = 1 March 2025; 1 Shawwal 1446 (Eid al-Fitr) = 30 March 2025
  assert.deepEqual(gregorianToHijri({ y: 2025, m: 3, d: 1 }), { y: 1446, m: 9, d: 1 });
  assert.deepEqual(hijriToGregorian({ y: 1446, m: 10, d: 1 }), { y: 2025, m: 3, d: 30 });
});

test('round trip every day from 1990 to 2040', () => {
  const start = Date.UTC(1990, 0, 1);
  for (let t = start; t < Date.UTC(2041, 0, 1); t += 864e5) {
    const d = new Date(t);
    const g = { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate() };
    for (const cal of ['islamic-umalqura', 'islamic-civil'] as const) {
      assert.deepEqual(hijriToGregorian(gregorianToHijri(g, cal), cal), g);
    }
  }
});

test('month lengths and invalid dates', () => {
  for (let m = 1; m <= 12; m++) assert.ok([29, 30].includes(hijriMonthLength(1447, m)!));
  // Tabular calendar: odd months have 30 days, even months 29 (except leap-year Dhu al-Hijjah)
  assert.equal(hijriMonthLength(1447, 1, 'islamic-civil'), 30);
  assert.equal(hijriMonthLength(1447, 2, 'islamic-civil'), 29);
  assert.equal(hijriToGregorian({ y: 1447, m: 2, d: 30 }, 'islamic-civil'), null);
  assert.equal(hijriToGregorian({ y: 1200, m: 1, d: 1 }), null);
  assert.equal(isValidGregorian({ y: 2025, m: 2, d: 29 }), false);
  assert.equal(isValidGregorian({ y: 2024, m: 2, d: 29 }), true);
});

test('weekday', () => {
  assert.equal(weekday({ y: 2025, m: 3, d: 30 }), 0); // Sunday
});
