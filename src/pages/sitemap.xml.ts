import type { APIRoute } from 'astro';
import { SITE } from '../utils/seo';

export const GET: APIRoute = () => new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${['/', '/es/', '/en/'].map((path) => `<url><loc>${SITE}${path}</loc><xhtml:link rel="alternate" hreflang="es-MX" href="${SITE}/es/"/><xhtml:link rel="alternate" hreflang="en-US" href="${SITE}/en/"/><xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/"/></url>`).join('\n')}
</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
