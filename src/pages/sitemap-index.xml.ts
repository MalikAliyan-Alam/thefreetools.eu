import type { APIRoute } from 'astro';
import { allRoutes } from '../lib/routes';
import { SITE } from '../site';

export const GET: APIRoute = () => {
  const lastmod = allRoutes().map((r) => r.lastmod).sort().at(-1);
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    `<sitemap><loc>${SITE.url}/sitemap-0.xml</loc><lastmod>${lastmod}</lastmod></sitemap>\n` +
    '</sitemapindex>\n';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
