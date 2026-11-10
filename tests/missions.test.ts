import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import { missions } from '../src/data/missions';

describe('Mission contract', () => {
  it('contains exactly five unique missions in the required order and categories', () => {
    expect(missions.map((m) => m.id)).toEqual(['control-accesos', 'consultorios-compartidos', 'pagos-recurrentes', 'bug-scrubs', 'narrador-futbol']);
    expect(new Set(missions.map((m) => m.id)).size).toBe(5);
    expect(missions.filter((m) => m.category === 'upcoming')).toHaveLength(3);
    expect(missions.filter((m) => m.category === 'demonstration')).toHaveLength(2);
  });
  it('preserves platform URLs exactly and leaves Recurring Payments without a URL', () => {
    expect(missions.map((m) => m.url)).toEqual(['https://control-acceso-qr.com.mx/login', 'https://tu-consultorio.com/login/?next=/', undefined, 'https://bugscrubs.astrogatolabs.com.mx/', 'https://futbol.astrogatolabs.com.mx/']);
    expect(missions.map((m) => m.status)).toEqual(['preparing', 'preparing', 'coming-soon', 'demo', 'demo']);
    expect(missions.find((m) => m.id === 'bug-scrubs')?.notice).toBe('demo-not-production');
  });
  it.each(missions)('$id has translated copy and distinct 1200 × 675 WebP images for both languages', async (mission) => {
    for (const field of ['title', 'description', 'impact', 'imageAlt'] as const) {
      expect(mission[field].es.trim().length).toBeGreaterThan(0);
      expect(mission[field].en.trim().length).toBeGreaterThan(0);
    }
    for (const locale of ['es', 'en'] as const) {
      expect(mission.image[locale]).toBe(`/images/missions/${mission.id}-${locale}.webp`);
      const metadata = await sharp(`public${mission.image[locale]}`).metadata();
      expect(metadata).toMatchObject({ width: 1200, height: 675, format: 'webp' });
    }
    expect((await readFile(`public${mission.image.es}`)).equals(await readFile(`public${mission.image.en}`))).toBe(false);
  });
});

describe('Official brand preservation', () => {
  it.each([
    ['astrogato-texto derecha centrado.png', 'astrogato-logo-horizontal.png'],
    ['gato orbital-degradado.png', 'gato-orbital-gradient.png'],
  ])('copies %s without changing any bytes', async (source, target) => {
    const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
    expect(hash(await readFile(`public/images/brand/${target}`))).toBe(hash(await readFile(`imagenes-referencia/${source}`)));
    expect((await sharp(`public/images/brand/${target}`).metadata()).hasAlpha).toBe(true);
  });
  it('provides transparent, uncropped icons and correctly sized social cards', async () => {
    expect(await sharp('public/favicon.png').metadata()).toMatchObject({ width: 64, height: 64, hasAlpha: true });
    for (const file of ['og-image.png', 'og-image-en.png']) {
      expect(await sharp(`public/${file}`).metadata()).toMatchObject({ width: 1200, height: 630 });
    }
  });
});
