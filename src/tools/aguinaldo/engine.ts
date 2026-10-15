/**
 * Aguinaldo (Mexico). Ley Federal del Trabajo, art. 87: at least 15 days of salary,
 * paid before 20 December; if the year was not worked in full, the part proportional
 * to the days worked. Income tax: the part up to 30 times the daily UMA is exempt
 * (Ley del ISR, art. 93 fr. XIV). The UMA changes every year, so it is an input.
 * Pure functions, covered by tests/aguinaldo.test.ts.
 */

export const DEFAULT_DAYS = 15;
export const EXEMPT_UMA_DAYS = 30;
/** Daily UMA in force from February 2026 (INEGI). Check the current value before relying on it. */
export const UMA_2026 = 117.31;

/** Half-up rounding to cents without float noise. */
export function round(n: number, decimals = 2): number {
  const shifted = Math.round(Number(`${Number(n.toPrecision(12))}e${decimals}`));
  return Number(`${shifted}e-${decimals}`) + 0;
}

/** Daily salary from a monthly one (monthly salary divided by 30). */
export const dailyFromMonthly = (monthly: number) => round(monthly / 30, 2);

/** Days from `start` to 31 December of that year, counting both ends; 365 if hired before the year began. */
export function daysWorkedInYear(start: { y: number; m: number; d: number }, year: number): number {
  const from = start.y < year ? Date.UTC(year, 0, 1) : start.y > year ? Date.UTC(year + 1, 0, 1) : Date.UTC(start.y, start.m - 1, start.d);
  const days = Math.round((Date.UTC(year, 11, 31) - from) / 864e5) + 1;
  return Math.min(365, Math.max(0, days));
}

export type Aguinaldo = { gross: number; exempt: number; taxable: number; exemptLimit: number };

/**
 * gross = daily salary x days of aguinaldo x days worked / 365 (capped at 365).
 * exempt = the part up to 30 UMA; taxable = the rest.
 */
export function aguinaldo(o: { daily: number; days?: number; daysWorked?: number; uma?: number }): Aguinaldo {
  const days = o.days ?? DEFAULT_DAYS;
  const worked = Math.min(Math.max(o.daysWorked ?? 365, 0), 365);
  const uma = o.uma ?? UMA_2026;
  const gross = round((o.daily * days * worked) / 365, 2);
  const exemptLimit = round(EXEMPT_UMA_DAYS * uma, 2);
  const exempt = Math.min(gross, exemptLimit);
  return { gross, exempt, taxable: round(gross - exempt, 2), exemptLimit };
}
