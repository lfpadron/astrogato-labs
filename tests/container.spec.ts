import { test, expect } from '@playwright/test';

test('Nginx serves routes, a real 404 and security headers', async ({ request }) => {
  for (const path of ['/', '/es/', '/en/', '/robots.txt', '/sitemap.xml', '/images/missions/control-accesos.webp', '/not-a-real-page']) {
    const response = await request.get(path);
    expect(response.status()).toBe(path === '/not-a-real-page' ? 404 : 200);
    expect(response.headers()['x-content-type-options']).toBe('nosniff');
    expect(response.headers()['x-frame-options']).toBe('DENY');
    expect(response.headers()['content-security-policy']).toContain("script-src 'self'");
    expect(response.headers()['referrer-policy']).toBe('strict-origin-when-cross-origin');
    expect(response.headers()['server']).not.toMatch(/nginx\//);
    if (path === '/es/') expect(response.headers()['cache-control']).toBe('no-cache');
  }
  expect((await request.get('/.env')).status()).toBe(403);
  const redirect = await request.get('/es', { maxRedirects: 0 });
  expect(redirect.status()).toBe(301);
  expect(redirect.headers()['location']).toBe('/es/');
});

test('CSP allows the built scripts and denies inline script execution', async ({ page }) => {
  const violations: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') violations.push(message.text()); });
  await page.goto('/es/');
  await expect(page.locator('html')).toHaveClass(/motion-ready/);
  expect(violations).toEqual([]);
  const allowed = await page.evaluate(() => {
    const script = document.createElement('script');
    script.textContent = 'window.__cspInlineAllowed = true';
    document.body.appendChild(script);
    return '__cspInlineAllowed' in window;
  });
  expect(allowed).toBe(false);
});
