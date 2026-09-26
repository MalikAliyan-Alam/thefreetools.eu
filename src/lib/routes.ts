import { LOCALES, localePath, type Locale } from '../i18n/locales';
import { TOOLS, type ToolEntry } from '../tools/registry';
import { PAGES, PAGES_UPDATED, type StaticPageId } from '../pages-content/pages';

export type RouteEntry = {
  locale: Locale;
  /** Site path with leading and trailing slash, e.g. "/es/calcular-promedio/". */
  path: string;
  /** Same page in every locale it exists in, for hreflang and the sitemap. */
  alternates: Partial<Record<Locale, string>>;
  /** ISO date of the last meaningful content change. */
  lastmod: string;
} & ({ kind: 'home' } | { kind: 'tool'; tool: ToolEntry } | { kind: 'page'; page: StaticPageId });

const alternatesFor = (make: (l: Locale) => string | undefined) =>
  Object.fromEntries(LOCALES.map((l) => [l, make(l)]).filter(([, p]) => p)) as Partial<Record<Locale, string>>;

/** Every page the site generates. Single source for routing and the sitemap. */
export function allRoutes(): RouteEntry[] {
  const out: RouteEntry[] = [];
  const homeAlternates = alternatesFor((l) => localePath(l));
  for (const locale of LOCALES) {
    const toolDates = TOOLS.map((t) => t.content[locale]?.updated).filter(Boolean) as string[];
    out.push({
      kind: 'home',
      locale,
      path: localePath(locale),
      alternates: homeAlternates,
      lastmod: [PAGES_UPDATED, ...toolDates].sort().at(-1)!,
    });
    for (const tool of TOOLS) {
      const c = tool.content[locale];
      if (!c) continue;
      out.push({
        kind: 'tool',
        tool,
        locale,
        path: localePath(locale, c.slug),
        alternates: alternatesFor((l) => (tool.content[l] ? localePath(l, tool.content[l]!.slug) : undefined)),
        lastmod: c.updated,
      });
    }
    for (const page of Object.keys(PAGES) as StaticPageId[]) {
      out.push({
        kind: 'page',
        page,
        locale,
        path: localePath(locale, PAGES[page][locale].slug),
        alternates: alternatesFor((l) => localePath(l, PAGES[page][l].slug)),
        lastmod: PAGES_UPDATED,
      });
    }
  }
  return out;
}
