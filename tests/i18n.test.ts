import { describe, expect, it } from 'vitest';
import { dictionaries, locales } from '../src/i18n';
import { getSeo } from '../src/utils/seo';

function paths(value: unknown, prefix = ''): string[] {
  if (typeof value === 'string') {
    expect(value.trim().length, prefix).toBeGreaterThan(0);
    return [prefix];
  }
  return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) => paths(child, `${prefix}.${key}`));
}
describe('Complete, consistent translations', () => {
  it('has matching dictionary keys and nonempty copy, including all content arrays', () => {
    expect(paths(dictionaries.es).sort()).toEqual(paths(dictionaries.en).sort());
  });
  it.each(locales)('%s has six values, four differentiators and six technical pillars', (locale) => {
    const t = dictionaries[locale];
    expect(t.philosophy.items).toHaveLength(6);
    expect(t.differences.items).toHaveLength(4);
    expect(t.pillars.items).toHaveLength(6);
    expect(t.hero.concepts).toHaveLength(5);
  });
  it.each(locales)('%s has a canonical URL and language-specific social metadata', (locale) => {
    const seo = getSeo(locale);
    expect(seo.canonical).toBe(`https://astrogatolabs.com.mx/${locale}/`);
    expect(seo.language).toBe(locale === 'es' ? 'es-MX' : 'en-US');
    expect(seo.image).toMatch(locale === 'es' ? /\/og-image.png$/ : /\/og-image-en.png$/);
  });
});
