import type { ScaleId } from './engine';

export type GpaLabels = {
  scale: string;
  scaleNames: Partial<Record<ScaleId, string>>;
  /** Scales offered in this language, first one is the default. */
  scales: ScaleId[];
  course: string;
  coursePlaceholder: string;
  grade: string;
  gradePick: string;
  weight: string;
  weightHint: string;
  addCourse: string;
  removeCourse: string;
  example: string;
  reset: string;
  editPoints: string;
  pointsFor: string;
  previousToggle: string;
  previousAverage: string;
  previousWeight: string;
  resultTerm: string;
  resultCumulative: string;
  outOf: string;
  totalWeight: string;
  emptyResult: string;
  invalidRows: string;
  targetTitle: string;
  targetAverage: string;
  targetWeight: string;
  targetNeed: string;
  targetImpossible: string;
  targetAlready: string;
  copy: string;
  copied: string;
  share: string;
  shared: string;
  /** Text copied to the clipboard; {avg} {max} {weight} are replaced. */
  copyTemplate: string;
  /** Course names and weights for the "try an example" button; grades come from the chosen scale. */
  exampleCourses: { name: string; weight: number }[];
};
