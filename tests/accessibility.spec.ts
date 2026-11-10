import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { dictionaries, locales } from '../src/i18n';
import { missions } from '../src/data/missions';

for (const locale of locales) {
  const t = dictionaries[locale];
  test(`${locale}: content, metadata, exact links and local assets`, async ({ page, baseURL }) => {
    const errors: string[] = [];
    const externalRequests: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('request', (request) => { if (new URL(request.url()).origin !== new URL(baseURL!).origin) externalRequests.push(request.url()); });
    const response = await page.goto(`/${locale}/`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', t.lang);
    await expect(page).toHaveTitle(t.seo.title);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://astrogatolabs.com.mx/${locale}/`);
    await expect(page.locator('link[hreflang]')).toHaveCount(3);
    await expect(page.locator('[data-mission]')).toHaveCount(5);
    for (const mission of missions) {
      const card = page.locator(`[data-mission="${mission.id}"]`);
      await expect(card.getByRole('heading')).toHaveText(mission.title[locale]);
      await expect(card.locator('img')).toHaveAttribute('alt', mission.imageAlt[locale]);
      await expect(card.locator('img')).toHaveAttribute('src', `/images/missions/${mission.id}-${locale}.webp`);
      await expect(card.locator('figcaption')).toHaveCount(0);
      if (mission.url) {
        await expect(card.locator('a')).toHaveAttribute('href', mission.url);
        await expect(card.locator('a')).toHaveAttribute('target', '_blank');
        await expect(card.locator('a')).toHaveAttribute('rel', 'noopener noreferrer');
      } else await expect(card.locator('a,button')).toHaveCount(0);
    }
    await expect(page.getByText(t.missions.warning, { exact: true })).toBeVisible();
    const brokenAnchors = await page.locator('a[href^="#"]').evaluateAll((links) => links.map((link) => link.getAttribute('href')!).filter((href) => !document.getElementById(href.slice(1))));
    expect(brokenAnchors).toEqual([]);
    await page.locator('img').evaluateAll((images) => images.forEach((image) => { image.setAttribute('loading', 'eager'); }));
    await expect.poll(() => page.locator('img').evaluateAll((images) => images.every((image) => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0))).toBe(true);
    expect(await page.locator('img:not([alt])').count()).toBe(0);
    expect(errors).toEqual([]);
    expect(externalRequests).toEqual([]);
  });

  for (const width of [320, 390, 479, 480, 767, 768, 1023, 1024, 1439, 1440, 1920]) {
    test(`${locale}: responsive layout at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${locale}/`);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      for (const card of await page.locator('[data-mission]').all()) {
        const image = (await card.locator('img').boundingBox())!;
        const content = (await card.locator('.mission-content').boundingBox())!;
        expect(image.width / image.height).toBeCloseTo(16 / 9, 1);
        if (width >= 768) expect(image.x + image.width).toBeLessThanOrEqual(content.x + 1);
        else expect(image.y + image.height).toBeLessThanOrEqual(content.y + 1);
      }
      if (width === 390 || width === 1440) {
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.locator('img').evaluateAll((images) => images.forEach((image) => { image.setAttribute('loading', 'eager'); }));
        await expect.poll(() => page.locator('img').evaluateAll((images) => images.every((image) => image instanceof HTMLImageElement && image.complete))).toBe(true);
        await page.screenshot({ path: `test-results/${locale}-${width}.png`, fullPage: true });
        await page.screenshot({ path: `test-results/${locale}-${width}-viewport.png` });
        await page.locator('[data-mission]').first().screenshot({ path: `test-results/${locale}-${width}-mission.png` });
      }
    });
  }

  for (const width of [320, 1280]) {
    test(`${locale}: WCAG 2.2 AA automated checks at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${locale}/`);
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(result.violations).toEqual([]);
      if (width === 320) {
        await page.locator('summary').click();
        const openMenu = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
        expect(openMenu.violations).toEqual([]);
      }
    });
  }

  test(`${locale}: keyboard menu, Escape, anchor focus and visible focus`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/${locale}/`);
    await page.keyboard.press('Tab');
    await expect(page.getByText(t.a11y.skip, { exact: true })).toBeFocused();
    expect(await page.locator(':focus').evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe('none');
    await page.keyboard.press('Enter');
    await expect(page.locator('#main')).toBeFocused();
    const summary = page.locator('summary');
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('details')).toHaveAttribute('open', '');
    await page.keyboard.press('Tab');
    await expect(page.locator('#mobile-links a').first()).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.locator('details')).not.toHaveAttribute('open');
    await expect(summary).toBeFocused();
    await page.keyboard.press('Space');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(new RegExp(`/${locale}/#philosophy$`));
    await expect(page.locator('#philosophy')).toBeFocused();
    await expect(page.locator('details')).not.toHaveAttribute('open');
  });

  test(`${locale}: manual language choice preserves the section`, async ({ page }) => {
    const alternate = locale === 'es' ? 'en' : 'es';
    await page.goto(`/${locale}/#missions`);
    await page.locator(`[data-language-link][hreflang="${dictionaries[alternate].lang}"]`).click();
    await expect(page).toHaveURL(new RegExp(`/${alternate}/#missions$`));
    await expect(page.locator('html')).toHaveAttribute('lang', dictionaries[alternate].lang);
    for (const mission of missions) {
      await expect(page.locator(`[data-mission="${mission.id}"] img`)).toHaveAttribute('src', `/images/missions/${mission.id}-${alternate}.webp`);
    }
  });

  test(`${locale}: motion can be paused and respects reduced motion`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(`/${locale}/`);
    const orbit = page.locator('.orbit').first();
    await expect(orbit).toHaveCSS('animation-play-state', 'running');
    await page.getByRole('button', { name: t.a11y.pause }).click();
    await expect(orbit).toHaveCSS('animation-play-state', 'paused');
    await expect(page.getByRole('button', { name: t.a11y.resume })).toHaveAttribute('aria-pressed', 'true');
    await page.getByRole('button', { name: t.a11y.resume }).click();
    await expect(orbit).toHaveCSS('animation-play-state', 'running');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(orbit).toHaveCSS('animation-name', 'none');
    await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
    await expect(page.locator('[data-motion-toggle]')).toBeHidden();
  });
}

for (const [browserLocale, destination] of [['es-MX', 'es'], ['en-US', 'en'], ['fr-FR', 'es']]) {
  test(`entry detects ${browserLocale} as ${destination} without loops`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ locale: browserLocale, baseURL });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(new RegExp(`/${destination}/$`));
    await page.reload();
    await expect(page).toHaveURL(new RegExp(`/${destination}/$`));
    await context.close();
  });
}

test('entry and mobile navigation remain usable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL, viewport: { width: 320, height: 800 } });
  const page = await context.newPage();
  await page.goto('/');
  await page.getByRole('link', { name: 'Español' }).click();
  await expect(page.locator('[data-mission]')).toHaveCount(5);
  await page.locator('summary').click();
  await page.locator('#mobile-links a[href="#missions"]').click();
  await expect(page).toHaveURL(/\/es\/#missions$/);
  await expect(page.locator('.orbit').first()).toHaveCSS('animation-play-state', 'paused');
  await context.close();
});

test('sitemap and robots use the canonical domain', async ({ request }) => {
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('Sitemap: https://astrogatolabs.com.mx/sitemap.xml');
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect(xml).toContain('<loc>https://astrogatolabs.com.mx/es/</loc>');
  expect(xml).toContain('<loc>https://astrogatolabs.com.mx/en/</loc>');
});
