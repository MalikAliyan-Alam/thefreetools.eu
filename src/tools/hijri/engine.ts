/**
 * Hijri ⇄ Gregorian conversion using the browser's built-in ICU calendars.
 * 'islamic-umalqura' is Saudi Arabia's official calendar; 'islamic-civil' is
 * the arithmetic (tabular) calendar. Pure functions, covered by tests/hijri.test.ts.
 */

export type HijriCalendar = 'islamic-umalqura' | 'islamic-civil';
export type YMD = { y: number; m: number; d: number };

/** Supported range: Umm al-Qura tables in ICU cover roughly 1300–1600 AH. */
export const HIJRI_MIN_YEAR = 1300;
export const HIJRI_MAX_YEAR = 1500;

const fmtCache = new Map<HijriCalendar, Intl.DateTimeFormat>();
function hijriFormat(cal: HijriCalendar) {
  let f = fmtCache.get(cal);
  if (!f) {
    f = new Intl.DateTimeFormat(`en-u-ca-${cal}-nu-latn`, {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    });
    fmtCache.set(cal, f);
  }
  return f;
}

const utc = ({ y, m, d }: YMD) => {
  const t = new Date(0);
  t.setUTCFullYear(y, m - 1, d);
  return t;
};

export function isValidGregorian({ y, m, d }: YMD): boolean {
  if (![y, m, d].every(Number.isInteger) || m < 1 || m > 12 || d < 1) return false;
  const t = utc({ y, m, d });
  return t.getUTCFullYear() === y && t.getUTCMonth() === m - 1 && t.getUTCDate() === d;
}

export function gregorianToHijri(g: YMD, cal: HijriCalendar = 'islamic-umalqura'): YMD {
  const parts = hijriFormat(cal).formatToParts(utc(g));
  const num = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { y: num('year'), m: num('month'), d: num('day') };
}

/** Julian day of a tabular Islamic date; used only as a starting guess. */
function tabularJd({ y, m, d }: YMD) {
  return Math.floor((11 * y + 3) / 30) + 354 * y + 30 * m - Math.floor((m - 1) / 2) + d + 1948440 - 385;
}

/**
 * Returns the Gregorian date for a Hijri date, or null if that date doesn't
 * exist (e.g. day 30 of a 29-day month) or is outside the supported range.
 */
export function hijriToGregorian(h: YMD, cal: HijriCalendar = 'islamic-umalqura'): YMD | null {
  if (![h.y, h.m, h.d].every(Number.isInteger)) return null;
  if (h.y < HIJRI_MIN_YEAR || h.y > HIJRI_MAX_YEAR || h.m < 1 || h.m > 12 || h.d < 1 || h.d > 30) return null;
  const guess = new Date((tabularJd(h) - 2440587.5) * 864e5);
  // Umm al-Qura differs from the tabular calendar by a day or two; search nearby.
  for (const offset of [0, -1, 1, -2, 2, -3, 3]) {
    const t = new Date(guess.getTime() + offset * 864e5);
    const g = { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
    const back = gregorianToHijri(g, cal);
    if (back.y === h.y && back.m === h.m && back.d === h.d) return g;
  }
  return null;
}

/** 29 or 30, or null outside the supported range. */
export function hijriMonthLength(y: number, m: number, cal: HijriCalendar = 'islamic-umalqura'): number | null {
  if (hijriToGregorian({ y, m, d: 30 }, cal)) return 30;
  return hijriToGregorian({ y, m, d: 29 }, cal) ? 29 : null;
}

/** Day of week, 0 = Sunday. */
export function weekday(g: YMD): number {
  return utc(g).getUTCDay();
}

export function todayGregorian(now = new Date()): YMD {
  return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() };
}

export const HIJRI_MONTHS: Record<'en' | 'ar', string[]> = {
  en: [
    'Muharram',
    'Safar',
    'Rabi al-Awwal',
    'Rabi al-Thani',
    'Jumada al-Ula',
    'Jumada al-Akhirah',
    'Rajab',
    'Shaban',
    'Ramadan',
    'Shawwal',
    'Dhu al-Qadah',
    'Dhu al-Hijjah',
  ],
  ar: ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'],
};
