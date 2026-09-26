import type { Locale } from '../i18n/locales';
import type { ToolContent } from './types';

import gpaEn from './gpa/content/en';
import gpaAr from './gpa/content/ar';
import gpaEs from './gpa/content/es';

export type ToolId = 'gpa';

export type ToolEntry = {
  id: ToolId;
  /** Tabler-style inline icon name, see components/ToolIcon.astro. */
  icon: 'school';
  /** Only the locales listed here get a page (and a hreflang entry). */
  content: Partial<Record<Locale, ToolContent<any>>>;
};

export const TOOLS: ToolEntry[] = [
  {
    id: 'gpa',
    icon: 'school',
    content: { en: gpaEn, ar: gpaAr, es: gpaEs },
  },
];

export function toolsFor(locale: Locale) {
  return TOOLS.filter((t) => t.content[locale]).map((t) => ({ tool: t, content: t.content[locale]! }));
}
