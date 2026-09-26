export type ToolContent<Labels = Record<string, string>> = {
  /** URL segment for this language, e.g. "gpa-calculator". */
  slug: string;
  metaTitle: string;
  metaDescription: string;
  /** Small monospace label above the H1. */
  eyebrow: string;
  h1: string;
  intro: string;
  /** Long-form sections under the tool. `html` is trusted, hand-written markup. */
  sections: { heading: string; html: string }[];
  faq: { q: string; a: string }[];
  /** ISO date of the last meaningful content edit. */
  updated: string;
  /** Strings used inside the interactive tool. */
  labels: Labels;
};
