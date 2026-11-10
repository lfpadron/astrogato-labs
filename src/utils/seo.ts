import { getDictionary, type Locale } from '../i18n';
export const SITE = 'https://astrogatolabs.com.mx';
export function getSeo(locale: Locale) {
  const t = getDictionary(locale);
  return { ...t.seo, canonical: `${SITE}/${locale}/`, language: t.lang, ogLocale: t.lang.replace('-', '_'), alternateLocale: locale === 'es' ? 'en_US' : 'es_MX', image: `${SITE}/og-image${locale === 'en' ? '-en' : ''}.png` };
}
