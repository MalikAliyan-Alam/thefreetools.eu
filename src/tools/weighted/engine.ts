/**
 * Saudi weighted admission percentage (النسبة الموزونة): a weighted average of the
 * high school percentage, the Qudrat score and the Tahsili score, each out of 100.
 * The common split is 30 / 30 / 40, but universities and majors publish their own,
 * so the weights are inputs. Pure functions, covered by tests/weighted.test.ts.
 */

export type Scores = { school: number; qudrat: number; tahsili: number };
export type Weights = { school: number; qudrat: number; tahsili: number };

export const DEFAULT_WEIGHTS: Weights = { school: 30, qudrat: 30, tahsili: 40 };
export const PARTS = ['school', 'qudrat', 'tahsili'] as const;

/** Half-up rounding without float noise. */
export function round(n: number, decimals = 2): number {
  const shifted = Math.round(Number(`${Number(n.toPrecision(12))}e${decimals}`));
  return Number(`${shifted}e-${decimals}`) + 0;
}

export const weightsTotal = (w: Weights) => w.school + w.qudrat + w.tahsili;

/**
 * Weighted percentage. A part with weight 0 is ignored (its score may be empty).
 * Returns null if the weights are all zero or a needed score is outside 0 to 100.
 */
export function weighted(scores: Partial<Record<keyof Scores, number | null>>, w: Weights): number | null {
  const total = weightsTotal(w);
  if (!(total > 0)) return null;
  let sum = 0;
  for (const k of PARTS) {
    if (w[k] < 0) return null;
    if (w[k] === 0) continue;
    const s = scores[k];
    if (s == null || !(s >= 0 && s <= 100)) return null;
    sum += s * w[k];
  }
  return round(sum / total, 2);
}

/** Points each part adds to the final percentage, in the same order as PARTS. */
export function contributions(scores: Scores, w: Weights): Scores {
  const total = weightsTotal(w);
  return {
    school: round((scores.school * w.school) / total, 2),
    qudrat: round((scores.qudrat * w.qudrat) / total, 2),
    tahsili: round((scores.tahsili * w.tahsili) / total, 2),
  };
}
