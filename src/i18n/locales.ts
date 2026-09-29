export const LOCALES = ['en', 'ar', 'es', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_META: Record<Locale, { name: string; short: string; dir: 'ltr' | 'rtl'; ogLocale: string }> = {
  en: { name: 'English', short: 'EN', dir: 'ltr', ogLocale: 'en_US' },
  ar: { name: 'العربية', short: 'AR', dir: 'rtl', ogLocale: 'ar_SA' },
  es: { name: 'Español', short: 'ES', dir: 'ltr', ogLocale: 'es_ES' },
  fr: { name: 'Français', short: 'FR', dir: 'ltr', ogLocale: 'fr_FR' },
};

/** English lives at the root; every other locale gets a /xx/ prefix. */
export function localePath(locale: Locale, slug = ''): string {
  const parts = locale === DEFAULT_LOCALE ? [slug] : [locale, slug];
  const path = parts.filter(Boolean).join('/');
  return path ? `/${path}/` : '/';
}
