/**
 * Age in Gregorian and Hijri (Umm al-Qura) years, months and days.
 * Pure functions, covered by tests/age.test.ts.
 */
import { gregorianToHijri, hijriMonthLength, hijriToGregorian, type YMD } from '../hijri/engine.ts';

export type Span = { years: number; months: number; days: number };

const toUtc = ({ y, m, d }: YMD) => {
  const t = new Date(0);
  t.setUTCFullYear(y, m - 1, d);
  return t.getTime();
};
const daysInGregorianMonth = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate();

export const compare = (a: YMD, b: YMD) => toUtc(a) - toUtc(b);

/**
 * Completed months are counted by stepping whole months from the birth date
 * (a 31st lands on the last day of shorter months), then the leftover days.
 * Example: 31 Jan → 1 Mar 2025 = 1 month (to 28 Feb) + 1 day.
 */
function span(totalMonthsBetween: number, anchorAt: (months: number) => YMD, on: YMD): Span {
  let months = totalMonthsBetween;
  let anchor = anchorAt(months);
  while (months > 0 && compare(anchor, on) > 0) anchor = anchorAt(--months);
  return { years: Math.floor(months / 12), months: months % 12, days: totalDays(anchor, on) };
}

/** Completed years, months and days from `birth` to `on` in the Gregorian calendar. */
export function gregorianAge(birth: YMD, on: YMD): Span {
  const add = (n: number): YMD => {
    const idx = birth.m - 1 + n;
    const y = birth.y + Math.floor(idx / 12);
    const m = (idx % 12) + 1;
    return { y, m, d: Math.min(birth.d, daysInGregorianMonth(y, m)) };
  };
  return span((on.y - birth.y) * 12 + (on.m - birth.m), add, on);
}

/** Same, counted in Umm al-Qura Hijri months (29 or 30 days). */
export function hijriAge(birth: YMD, on: YMD): Span {
  const b = gregorianToHijri(birth);
  const o = gregorianToHijri(on);
  const add = (n: number): YMD => {
    const idx = b.m - 1 + n;
    const y = b.y + Math.floor(idx / 12);
    const m = (idx % 12) + 1;
    const d = Math.min(b.d, hijriMonthLength(y, m) ?? 29);
    return hijriToGregorian({ y, m, d })!;
  };
  return span((o.y - b.y) * 12 + (o.m - b.m), add, on);
}

export const totalDays = (birth: YMD, on: YMD) => Math.round((toUtc(on) - toUtc(birth)) / 864e5);

/** Next Gregorian birthday on or after `on` (29 Feb falls on 1 Mar in common years). */
export function nextBirthday(birth: YMD, on: YMD): { date: YMD; inDays: number } {
  for (const y of [on.y, on.y + 1]) {
    const t = new Date(0);
    t.setUTCFullYear(y, birth.m - 1, birth.d);
    const date = { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
    const inDays = totalDays(on, date);
    if (inDays >= 0) return { date, inDays };
  }
  throw new Error('unreachable');
}
