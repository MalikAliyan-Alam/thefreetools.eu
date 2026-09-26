/**
 * GPA / grade average engine. Pure functions, no UI — shared by every
 * language version of the tool and covered by tests/gpa.test.ts.
 */

export type LetterScale = {
  kind: 'letter';
  id: string;
  max: number;
  grades: { label: string; points: number }[];
};

export type NumericScale = {
  kind: 'numeric';
  id: string;
  min: number;
  max: number;
  /** Lowest passing mark, if the system has one. */
  pass?: number;
};

export type Scale = LetterScale | NumericScale;

export type Course = {
  name: string;
  /** Letter label for letter scales, or the typed mark for numeric scales. */
  grade: string;
  /** Credit hours, or a percentage weight. */
  weight: number;
};

export const SCALES = {
  us4: {
    kind: 'letter',
    id: 'us4',
    max: 4,
    grades: [
      { label: 'A+', points: 4 },
      { label: 'A', points: 4 },
      { label: 'A-', points: 3.7 },
      { label: 'B+', points: 3.3 },
      { label: 'B', points: 3 },
      { label: 'B-', points: 2.7 },
      { label: 'C+', points: 2.3 },
      { label: 'C', points: 2 },
      { label: 'C-', points: 1.7 },
      { label: 'D+', points: 1.3 },
      { label: 'D', points: 1 },
      { label: 'D-', points: 0.7 },
      { label: 'F', points: 0 },
    ],
  },
  sa5: {
    kind: 'letter',
    id: 'sa5',
    max: 5,
    grades: [
      { label: 'A+', points: 5 },
      { label: 'A', points: 4.75 },
      { label: 'B+', points: 4.5 },
      { label: 'B', points: 4 },
      { label: 'C+', points: 3.5 },
      { label: 'C', points: 3 },
      { label: 'D+', points: 2.5 },
      { label: 'D', points: 2 },
      { label: 'F', points: 1 },
    ],
  },
  sa4: {
    kind: 'letter',
    id: 'sa4',
    max: 4,
    grades: [
      { label: 'A+', points: 4 },
      { label: 'A', points: 3.75 },
      { label: 'B+', points: 3.5 },
      { label: 'B', points: 3 },
      { label: 'C+', points: 2.5 },
      { label: 'C', points: 2 },
      { label: 'D+', points: 1.5 },
      { label: 'D', points: 1 },
      { label: 'F', points: 0 },
    ],
  },
  pct100: { kind: 'numeric', id: 'pct100', min: 0, max: 100, pass: 50 },
  cl7: { kind: 'numeric', id: 'cl7', min: 1, max: 7, pass: 4 },
} satisfies Record<string, Scale>;

export type ScaleId = keyof typeof SCALES;

/** Parses "4,5" as well as "4.5" — both are common in our markets. */
export function parseNumber(input: string): number | null {
  const cleaned = input.trim().replace(',', '.');
  if (cleaned === '') return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

/** Returns the grade points for one course, or null if the grade is missing or out of range. */
export function gradeValue(scale: Scale, grade: string): number | null {
  if (scale.kind === 'letter') {
    return scale.grades.find((g) => g.label === grade)?.points ?? null;
  }
  const n = parseNumber(grade);
  if (n === null || n < scale.min || n > scale.max) return null;
  return n;
}

export type Summary = {
  /** Sum of grade × weight over valid rows. */
  points: number;
  /** Sum of weights over valid rows. */
  weight: number;
  /** Weighted average, or null when there is nothing to average. */
  average: number | null;
  /** Indexes of rows that were skipped because the grade or weight is invalid. */
  invalid: number[];
};

export function summarize(scale: Scale, courses: Course[]): Summary {
  let points = 0;
  let weight = 0;
  const invalid: number[] = [];
  courses.forEach((c, i) => {
    const empty = c.grade.trim() === '' && !c.weight;
    if (empty) return;
    const value = gradeValue(scale, c.grade);
    if (value === null || !(c.weight > 0)) {
      invalid.push(i);
      return;
    }
    points += value * c.weight;
    weight += c.weight;
  });
  return { points, weight, average: weight > 0 ? points / weight : null, invalid };
}

/** Folds a previous cumulative average into this term's results. */
export function cumulative(term: Summary, previousAverage: number | null, previousWeight: number | null): Summary {
  if (previousAverage === null || !previousWeight || previousWeight <= 0) return term;
  const points = term.points + previousAverage * previousWeight;
  const weight = term.weight + previousWeight;
  return { points, weight, average: weight > 0 ? points / weight : null, invalid: term.invalid };
}

/**
 * Average needed over `nextWeight` more credits to reach `target` overall.
 * May be above the scale maximum (target out of reach) or below the minimum (already safe).
 */
export function requiredAverage(current: Summary, target: number, nextWeight: number): number | null {
  if (!(nextWeight > 0)) return null;
  return (target * (current.weight + nextWeight) - current.points) / nextWeight;
}

export function scaleMax(scale: Scale): number {
  return scale.max;
}

export function scaleMin(scale: Scale): number {
  return scale.kind === 'numeric' ? scale.min : 0;
}

/**
 * Rounds half up without float noise: 4.975 → 4.98 (plain Math.round(n * 100)
 * gives 4.97 because 4.975 * 100 is 497.4999…). Shifting via the exponent avoids it.
 */
export function roundTo(n: number, decimals = 2): number {
  const shifted = Math.round(Number(`${Number(n.toPrecision(12))}e${decimals}`));
  return Number(`${shifted}e-${decimals}`);
}

export function formatAverage(n: number, decimals = 2): string {
  return roundTo(n, decimals).toFixed(decimals);
}
