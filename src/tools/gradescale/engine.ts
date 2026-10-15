/**
 * Chilean grading scale (escala de notas 1,0 a 7,0) with a "nivel de exigencia".
 * Below the required share of the maximum score the grade climbs linearly from 1,0
 * to 4,0; from there it climbs linearly from 4,0 to 7,0. With 60 % exigency, 60 % of
 * the points is a 4,0 and 100 % is a 7,0. Schools choose their exigency (often 60 %,
 * sometimes 50 % or 55 %), so it is an input. Pure functions, covered by tests/gradescale.test.ts.
 */

export const MIN_GRADE = 1;
export const PASS_GRADE = 4;
export const TOP_GRADE = 7;

/** Half-up rounding without float noise. */
export function round(n: number, decimals = 1): number {
  const shifted = Math.round(Number(`${Number(n.toPrecision(12))}e${decimals}`));
  return Number(`${shifted}e-${decimals}`) + 0;
}

/** Points needed for the pass grade (4,0). */
export const passingScore = (max: number, exigency: number) => max * exigency;

/** Unrounded grade for a score. Exigency is a fraction, e.g. 0.6. */
export function rawGrade(score: number, max: number, exigency: number): number {
  const s = Math.min(Math.max(score, 0), max);
  const pass = max * exigency;
  if (s < pass) return MIN_GRADE + ((PASS_GRADE - MIN_GRADE) * s) / pass;
  return PASS_GRADE + ((TOP_GRADE - PASS_GRADE) * (s - pass)) / (max - pass);
}

/** Grade with one decimal, as Chilean schools write it. */
export const gradeFor = (score: number, max: number, exigency: number) => round(rawGrade(score, max, exigency), 1);

/** Points needed to reach a given grade (not rounded). */
export function scoreFor(grade: number, max: number, exigency: number): number {
  const g = Math.min(Math.max(grade, MIN_GRADE), TOP_GRADE);
  const pass = max * exigency;
  if (g < PASS_GRADE) return ((g - MIN_GRADE) * pass) / (PASS_GRADE - MIN_GRADE);
  return pass + ((g - PASS_GRADE) * (max - pass)) / (TOP_GRADE - PASS_GRADE);
}

/** Smallest whole score that gives at least `grade` after rounding to one decimal. */
export function minScoreFor(grade: number, max: number, exigency: number): number {
  const exact = Math.ceil(scoreFor(grade, max, exigency) - 1e-9);
  for (let s = Math.max(0, exact - 2); s <= max; s++) if (gradeFor(s, max, exigency) >= grade - 1e-9) return s;
  return max;
}

/** Every whole score from 0 to max with its grade. */
export function scaleTable(max: number, exigency: number): { score: number; grade: number }[] {
  return Array.from({ length: max + 1 }, (_, score) => ({ score, grade: gradeFor(score, max, exigency) }));
}
