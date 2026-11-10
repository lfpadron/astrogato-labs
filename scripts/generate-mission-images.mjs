import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const missionDir = path.join(root, 'public', 'images', 'missions');
const missionIds = ['control-accesos', 'consultorios-compartidos', 'pagos-recurrentes', 'bug-scrubs', 'narrador-futbol'];
await mkdir(missionDir, { recursive: true });

for (const id of missionIds) {
  for (const locale of ['es', 'en']) {
    const name = `${id}-${locale}`;
    // Keep the supplied originals intact and fit the entire artwork without cropping.
    const result = await sharp(path.join(root, 'imagenes-referencia', `${name}.png`))
      .rotate()
      .resize(1200, 675, { fit: 'contain', background: '#0c2032' })
      .webp({ quality: 90, effort: 6, smartSubsample: true })
      .toFile(path.join(missionDir, `${name}.webp`));
    console.log(`${name}.webp: ${Math.round(result.size / 1024)} KiB`);
  }
}
