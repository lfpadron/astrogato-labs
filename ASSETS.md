# Recursos de Astrogato Labs

## Marca oficial

Los nombres con `(1)` del documento maestro no estaban presentes. Se encontraron estos originales equivalentes y se copiaron sin modificar sus bytes; no se usó la variante `_v02`:

| Original conservado | Archivo público | Dimensiones | Uso |
| --- | --- | --- | --- |
| `imagenes-referencia/astrogato-texto derecha centrado.png` | `public/images/brand/astrogato-logo-horizontal.png` | 2902 × 1005 | Header, footer, entrada e imagen social. |
| `imagenes-referencia/gato orbital-degradado.png` | `public/images/brand/gato-orbital-gradient.png` | 901 × 1006 | Hero, iconos e imagen social. |

Ambos PNG tienen canal alfa. Se conservan proporciones y transparencia, sin filtros, recoloración ni recortes. Se muestran con `object-fit: contain`. `tests/missions.test.ts` compara SHA-256 entre las copias y sus originales y verifica la transparencia.

`astrogato-banner-linkedin.png` se utilizó como referencia de composición: ambiente espacial, jerarquía del mensaje y marca. No se publica el banner, su texto aplanado ni su tratamiento morado. Los demás recursos de referencia siguen intactos y no se incluyen en la imagen OCI.

## Imágenes de misiones

El 31 de octubre de 2026 se integraron las diez ilustraciones finales proporcionadas por el usuario, una por proyecto e idioma. Los PNG originales se conservan intactos en `imagenes-referencia/`; son ilustraciones promocionales, no capturas verificadas de las plataformas.

| Proyecto | Originales en `imagenes-referencia/` | Copias en `public/images/missions/` |
| --- | --- | --- |
| Control de Accesos | `control-accesos-es.png`, `control-accesos-en.png` | `control-accesos-es.webp`, `control-accesos-en.webp` |
| Consultorios Compartidos | `consultorios-compartidos-es.png`, `consultorios-compartidos-en.png` | `consultorios-compartidos-es.webp`, `consultorios-compartidos-en.webp` |
| Pagos Recurrentes | `pagos-recurrentes-es.png`, `pagos-recurrentes-en.png` | `pagos-recurrentes-es.webp`, `pagos-recurrentes-en.webp` |
| Bug Scrubs | `bug-scrubs-es.png`, `bug-scrubs-en.png` | `bug-scrubs-es.webp`, `bug-scrubs-en.webp` |
| Narrador AI de Fútbol | `narrador-futbol-es.png`, `narrador-futbol-en.png` | `narrador-futbol-es.webp`, `narrador-futbol-en.webp` |

Los originales miden 1672 × 941 px, excepto `narrador-futbol-en.png` (1672 × 940 px). Las copias WebP miden 1200 × 675 px, con calidad 90, y conservan la ilustración completa mediante ajuste proporcional sin recorte. El fondo de ajuste es azul marino `#0c2032`.

Las diez copias pesan 1,916,194 bytes en total (aproximadamente 151–241 KiB por archivo), un 91 % menos que los PNG originales, que suman 21,283,679 bytes.

`src/data/missions.ts` declara rutas `image.es` e `image.en` y textos alternativos traducidos que describen las ilustraciones. `MissionCard.astro` elige ambos según el idioma y ya no muestra la leyenda de placeholder. El CSS mantiene la proporción 16:9 sin recortar.

Para reemplazar imágenes, actualizar los PNG con los mismos nombres, ejecutar `npm run assets:missions` y ajustar `imageAlt` si cambia el contenido. Las copias WebP se sobrescriben; los originales nunca se modifican. Los antiguos cinco WebP sin sufijo de idioma se retiraron.

## Iconos e imágenes sociales

| Archivo público | Dimensiones | Origen |
| --- | --- | --- |
| `favicon.png` | 64 × 64 | Gato oficial reducido completo dentro de un lienzo transparente. |
| `apple-touch-icon.png` | 180 × 180 | Mismo procedimiento, conservando alfa. |
| `og-image.png` | 1200 × 630 | Composición social en español con logos oficiales y texto. |
| `og-image-en.png` | 1200 × 630 | Composición social en inglés con logos oficiales y texto. |

Los recursos sociales redimensionan uniformemente los originales y los componen sobre un fondo azul marino; los archivos oficiales permanecen intactos. Los iconos de interfaz son SVG geométricos en `Icon.astro`; no reemplazan ni reinterpretan el logo. Las órbitas son CSS decorativo con `aria-hidden`, animación lenta, pausa y soporte de movimiento reducido.

## Regeneración y sustitución

```bash
npm ci
npm run assets:missions  # Solo las diez imágenes de proyectos
npm run assets:generate # Misiones, marca, iconos y recursos sociales
```

La generación de misiones requiere los diez PNG originales con sufijos `-es` y `-en`. El generador completo requiere además los dos originales de marca. Ambos comandos conservan los originales y regeneran sus archivos públicos derivados; no crean placeholders.

`npm run build` no ejecuta los generadores: usa los archivos de `public/` ya preparados. Los originales y los scripts de generación quedan fuera de la imagen OCI.
