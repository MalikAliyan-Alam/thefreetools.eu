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
import wordsEn from './words/content/en';
import wordsAr from './words/content/ar';
import wordsEs from './words/content/es';
import vatEn from './vat/content/en';
import vatAr from './vat/content/ar';
import vatEs from './vat/content/es';

export type ToolId = 'gpa' | 'hijri' | 'age' | 'hijri-age' | 'words' | 'vat';

export type ToolEntry = {
  id: ToolId;
  /** Tabler-style inline icon name, see components/ToolIcon.astro. */
  icon: 'school' | 'moon' | 'cake' | 'letters' | 'receipt';
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
  {
    id: 'words',
    icon: 'letters',
    content: { en: wordsEn, ar: wordsAr, es: wordsEs },
  },
  {
    id: 'vat',
    icon: 'receipt',
    content: { en: vatEn, ar: vatAr, es: vatEs },
  },
];

export function toolsFor(locale: Locale) {
  return TOOLS.filter((t) => t.content[locale]).map((t) => ({ tool: t, content: t.content[locale]! }));
}
