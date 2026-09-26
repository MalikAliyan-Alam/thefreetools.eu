import type { APIRoute } from 'astro';
import { LOCALES, DEFAULT_LOCALE } from '../i18n/locales';
import { allRoutes } from '../lib/routes';
import { SITE } from '../site';

const abs = (p: string) => new URL(p, SITE.url).href;
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** Sitemap with lastmod and hreflang alternates for every language version. */
export const GET: APIRoute = () => {
  const urls = allRoutes().map((r) => {
    const links = LOCALES.filter((l) => r.alternates[l]).map(
      (l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${esc(abs(r.alternates[l]!))}"/>`,
    );
    const xDefault = r.alternates[DEFAULT_LOCALE];
    if (xDefault) links.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${esc(abs(xDefault))}"/>`);
    return `<url><loc>${esc(abs(r.path))}</loc><lastmod>${r.lastmod}</lastmod>${links.join('')}</url>`;
  });
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    urls.join('\n') +
    '\n</urlset>\n';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
