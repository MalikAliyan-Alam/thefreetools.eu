import type { Locale } from '../i18n/locales';
import type { ToolContent } from './types';

import gpaEn from './gpa/content/en';
import gpaAr from './gpa/content/ar';
import gpaEs from './gpa/content/es';
import hijriEn from './hijri/content/en';
import hijriAr from './hijri/content/ar';
import ageEn from './age/content/en';
import ageAr from './age/content/ar';
import ageArHijri from './age/content/ar-hijri';
import ageEs from './age/content/es';

export type ToolId = 'gpa' | 'hijri' | 'age' | 'hijri-age';

export type ToolEntry = {
  id: ToolId;
  /** Tabler-style inline icon name, see components/ToolIcon.astro. */
  icon: 'school' | 'moon' | 'cake';
  /** Only the locales listed here get a page (and a hreflang entry). */
  content: Partial<Record<Locale, ToolContent<any>>>;
};

export const TOOLS: ToolEntry[] = [
  {
    id: 'gpa',
    icon: 'school',
    content: { en: gpaEn, ar: gpaAr, es: gpaEs },
  },
  {
    id: 'hijri',
    icon: 'moon',
    content: { en: hijriEn, ar: hijriAr },
  },
  {
    id: 'age',
    icon: 'cake',
    content: { en: ageEn, ar: ageAr, es: ageEs },
  },
  {
    // Separate Arabic page: "حساب العمر بالهجري" has its own search results.
    id: 'hijri-age',
    icon: 'moon',
    content: { ar: ageArHijri },
  },
];

export function toolsFor(locale: Locale) {
  return TOOLS.filter((t) => t.content[locale]).map((t) => ({ tool: t, content: t.content[locale]! }));
}
