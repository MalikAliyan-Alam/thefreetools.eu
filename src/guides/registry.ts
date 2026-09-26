import { localePath, type Locale } from '../i18n/locales';
import type { ToolId } from '../tools/registry';
import type { GuideContent } from './types';

import gpaCumulativeEn from './gpa/en-cumulative';
import gpaTargetEn from './gpa/en-target';
import gpaSaudiAr from './gpa/ar-saudi-5';
import gpaTargetAr from './gpa/ar-target';
import promedioChileEs from './gpa/es-chile';
import notaNecesariaEs from './gpa/es-nota-necesaria';

/** Folder name for guides in each language (the phrase readers recognise). */
export const GUIDES_DIR: Record<Locale, string> = { en: 'guides', ar: 'guides', es: 'guias' };

export const GUIDES: Record<Locale, GuideContent[]> = {
  en: [gpaCumulativeEn, gpaTargetEn],
  ar: [gpaSaudiAr, gpaTargetAr],
  es: [promedioChileEs, notaNecesariaEs],
};

export const guidesHubPath = (locale: Locale) => localePath(locale, GUIDES_DIR[locale]);
export const guidePath = (locale: Locale, g: GuideContent) => localePath(locale, `${GUIDES_DIR[locale]}/${g.slug}`);

export const guidesForTool = (locale: Locale, tool: ToolId) => GUIDES[locale].filter((g) => g.tool === tool);
