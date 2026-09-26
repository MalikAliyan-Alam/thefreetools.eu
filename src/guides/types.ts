import type { ToolId } from '../tools/registry';

export type GuideContent = {
  /** Same key across languages = same article translated/adapted (drives hreflang). */
  key: string;
  /** Tool this guide supports; the page links to it prominently. */
  tool: ToolId;
  /** URL segment inside the language's guides folder. */
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Direct answer in 1–3 sentences, shown first. */
  answer: string;
  /** Trusted, hand-written HTML sections. */
  sections: { heading: string; html: string }[];
  faq?: { q: string; a: string }[];
  published: string;
  /** Bump only when the content really changes. */
  updated: string;
};
