import sharp from 'sharp';
import { copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'public');
const brand = path.join(output, 'images', 'brand');
await mkdir(brand, { recursive: true });
// Byte-for-byte copies; never trim, recolor or flatten the official logos.
await copyFile(path.join(root, 'imagenes-referencia', 'astrogato-texto derecha centrado.png'), path.join(brand, 'astrogato-logo-horizontal.png'));
await copyFile(path.join(root, 'imagenes-referencia', 'gato orbital-degradado.png'), path.join(brand, 'gato-orbital-gradient.png'));
for (const [name, size] of [['favicon.png', 64], ['apple-touch-icon.png', 180]]) {
  await sharp(path.join(brand, 'gato-orbital-gradient.png')).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(output, name));
}

await import('./generate-mission-images.mjs');
const logo = await sharp(path.join(brand, 'astrogato-logo-horizontal.png')).resize({ width: 360, withoutEnlargement: true }).png().toBuffer();
const cat = await sharp(path.join(brand, 'gato-orbital-gradient.png')).resize({ width: 230, withoutEnlargement: true }).png().toBuffer();
for (const [locale, lines, motto] of [
  ['es', ['Diseñamos tecnología', 'que genera confianza.'], 'Exploramos ideas. Construimos herramientas.'],
  ['en', ['We design technology', 'that builds trust.'], 'We explore ideas. We build tools.'],
]) {
  const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#091726"/><circle cx="980" cy="320" r="240" fill="none" stroke="#345a75" stroke-width="2"/><circle cx="980" cy="320" r="180" fill="none" stroke="#345a75" stroke-width="1"/><text x="65" y="300" font-family="Arial, sans-serif" font-size="52" font-weight="bold" fill="#ffffff">${lines[0]}</text><text x="65" y="370" font-family="Arial, sans-serif" font-size="52" font-weight="bold" fill="#75c9ee">${lines[1]}</text><text x="65" y="455" font-family="Arial, sans-serif" font-size="25" fill="#c0cedb">${motto}</text><path d="M65 530h1070" stroke="#345a75"/><text x="65" y="575" font-family="Arial, sans-serif" font-size="21" fill="#ffac70">astrogatolabs.com.mx</text></svg>`;
  await sharp(Buffer.from(bg)).composite([{ input: logo, top: 45, left: 65 }, { input: cat, top: 190, left: 865 }]).png().toFile(path.join(output, `og-image${locale === 'en' ? '-en' : ''}.png`));
}
const metadata = await sharp(path.join(brand, 'gato-orbital-gradient.png')).metadata();
console.log(`Assets generated: 10 localized WebP mission images, 2 social cards, 2 icons. Official cat: ${metadata.width} × ${metadata.height}, alpha: ${metadata.hasAlpha}.`);
