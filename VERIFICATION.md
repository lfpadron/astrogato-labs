# Verificación de la entrega

## Actualización de imágenes — 31 de octubre de 2026

Integradas las diez ilustraciones finales ES/EN como WebP de 1200 × 675, conservando los originales PNG. Las tarjetas seleccionan la imagen según el idioma, tienen textos alternativos actualizados y ya no muestran leyendas de placeholder. Se retiraron los cinco WebP antiguos y se adaptó el generador para regenerar las imágenes finales.

- `npm run assets:missions`: diez imágenes generadas, sin recortes; reducción total de peso del 91 %.
- `npm run check`: sin errores, warnings ni hints; `npm test`: 15 pruebas aprobadas; `npm run build`: correcto.
- Navegador Chromium: las 17 pruebas de contenido, accesibilidad, navegación, cambio de idioma, movimiento, entrada y SEO pasaron. Las 22 pruebas de presentación se volvieron a ejecutar con `npm run test:e2e -- --grep "responsive layout"` y pasaron en ambos idiomas, de 320 a 1920 px. La comprobación móvil se adaptó para permitir que el borde de la imagen coincida con el inicio de la caja de contenido tras retirar el pie provisional; el padding del contenido conserva la separación visual.
- Revisión visual de tarjetas ES/EN a 390 y 1440 px y de la página completa en español; capturas en `test-results/`.
- El entorno restringido impedía conectar al servidor de preview; las pruebas de navegador se ejecutaron con el permiso de ejecución correspondiente.
- Podman no estuvo disponible en esta sesión: no se reconstruyó ni verificó el contenedor con estas imágenes. El código y `dist/` sí están actualizados. Las comprobaciones de contenedor siguientes corresponden a la entrega del 29 de octubre.

## Registro de la entrega original

Fecha: **29 de octubre de 2026**, zona `America/Mexico_City`.

## Implementado

Las siete fases del documento maestro están completadas: Astro estático, TypeScript estricto, diccionarios ES/EN, marca original, navegación y hero, filosofía/diferenciadores/pilares, cinco misiones, contacto, SEO, accesibilidad, contenedor Podman y documentación.

El sitio entregado está servido localmente por el contenedor `astrogato-labs_web_1`, con la imagen `localhost/astrogato-web:1.0`, en `http://localhost:8080/`. `/es/` y `/en/` son rutas directas; `/` realiza detección de idioma en el navegador.

## Comprobaciones ejecutadas

| Comprobación | Resultado observado |
| --- | --- |
| `npm run check` | Sin errores, warnings ni hints. |
| `npm test` | **15 pruebas unitarias aprobadas** en 2 archivos. |
| `npm run build` | Build Astro correcto: cuatro páginas HTML y sitemap XML. |
| `npm run test:e2e` | **39 pruebas aprobadas** en Chromium contra el preview estático. |
| `npm run test:e2e:container` | **41 pruebas aprobadas** contra Nginx en Podman: las 39 de navegador más dos de servidor/CSP. |
| `podman build -t astrogato-web:1.0 .` | Imagen OCI construida; `npm ci`, TypeScript y build ejecutados dentro de Node 24. |
| `podman compose up -d --build` | Despliegue correcto con `podman-compose` 1.6.0 como proveedor. |
| `podman exec … id` | Usuario y grupo `101:101` (`nginx`), sin root. |
| `podman exec … nginx -t` | Sintaxis y configuración correctas. |
| `podman inspect …` | Sistema de archivos de solo lectura y estado `healthy`. |
| `podman healthcheck run …` | Salida correcta. |
| `podman compose restart web` | Reinicio correcto; healthcheck aprobado y `/en/` respondió HTTP 200 después. |
| HTTP desde el host | 200 en `/es/`, `/en/`, recursos, robots y sitemap; 404 real en ruta inexistente. |
| Cabeceras de Nginx | CSP, nosniff, DENY, referrer policy, permissions policy y caché verificadas. |
| CSP en navegador | El JavaScript compilado funciona; un script inline de prueba se bloquea. |
| Redirección `/es` | HTTP 301 relativo a `/es/`, compatible con un proxy HTTPS. |

Las 41 pruebas contra el contenedor cubren el estado final del sitio. Los conteos de preview y contenedor no representan pruebas distintas que deban sumarse.

## Cobertura funcional y visual

- Diccionarios con claves equivalentes, textos no vacíos, seis valores, cuatro diferenciadores y seis pilares por idioma.
- Cinco misiones en orden, categorías/estados correctos y URLs literales. Pagos Recurrentes no tiene URL, enlace ni botón.
- Aviso de Bug Scrubs visible y traducido; enlaces de plataformas identificados como login y con `noopener noreferrer`.
- Logos originales comparados byte a byte mediante SHA-256; PNG con alfa preservado.
- Cinco WebP reales de 1200 × 675; favicon de 64 × 64 y recursos sociales de 1200 × 630.
- Rutas ES/EN, `lang`, canonical, `hreflang`, títulos, sitemap y robots.
- Detección con navegador español e inglés, fallback con francés, recarga sin bucles y selector que conserva anclas.
- Teclado: salto al contenido, foco visible, apertura del menú con Enter/Espacio, Escape y foco al llegar a una sección.
- Funcionamiento sin JavaScript de la entrada y navegación móvil.
- Órbitas que se pueden pausar; `prefers-reduced-motion` desactiva animaciones y scroll suave.
- Sin recursos de terceros solicitados por el sitio en las pruebas de carga.
- Sin desbordamiento horizontal en **320, 390, 479, 480, 767, 768, 1023, 1024, 1439, 1440 y 1920 px**, en ambos idiomas.
- Imágenes 16:9 siempre a la izquierda desde 768 px y arriba en móvil.
- axe-core sin infracciones automáticas WCAG 2.2 AA en ES/EN a 320 y 1280 px, incluyendo el menú móvil abierto.
- Revisión visual de capturas completas y de detalle de hero, móvil y tarjeta de misión. Capturas generadas por Playwright en `test-results/`; reporte navegable en `playwright-report/index.html`.

## Entorno y operación local

Windows, Node 24.14.0, npm 11.9.0, Astro 7.4.4, Podman 5.8.1 con WSL y Chromium de Playwright. Las versiones exactas de las dependencias están en el lockfile.

La máquina `podman-machine-default` existía, estaba detenida y no tenía ninguna conexión registrada en `podman system connection list`. Se inició y se registró la conexión usando el puerto, usuario e identidad devueltos por `podman machine inspect`, sin recrear la máquina ni generar claves nuevas.

El proveedor Docker Compose existente no completó la conexión SSH. Se detuvieron esos intentos y se instaló `podman-compose` **solo en `.cache/podman-compose/`**. El despliegue correcto se realizó seleccionándolo mediante `PODMAN_COMPOSE_PROVIDER` en la sesión, sin cambiar permanentemente el proveedor global. En una nueva terminal PowerShell:

```powershell
$env:PODMAN_COMPOSE_PROVIDER = (Resolve-Path '.cache/podman-compose/Scripts/podman-compose.exe').Path
podman compose ps
podman compose logs --tail=100 web
podman compose restart web
podman compose down
```

La imagen final ocupa aproximadamente **59.4 MiB** (62,253,539 bytes, sin comprimir). La imagen verificada tiene ID:

```text
409e4ebec1829f54dd46de710717147fff568d27857be02cf8f269584cdbad58
```

El healthcheck se declara en Compose; se eliminó del `Containerfile` la instrucción Docker `HEALTHCHECK` al comprobar que Podman la ignora en formato OCI. La alternativa directa y su verificación HTTP están documentadas en README.

El JavaScript de la página de contenido compilada ocupa 1,165 bytes sin comprimir; la detección de idioma de `/` ocupa 204 bytes. No hay runtime de un framework cliente.

## Pendientes y límites de lo verificado

- El pendiente original de las cinco imágenes provisionales quedó resuelto con las diez imágenes finales ES/EN el 31 de octubre; ver la actualización al inicio de este documento. No falta ningún logo.
- No se ha desplegado el sitio en un servidor público ni cambiado DNS. Para producción hay que configurar el dominio, el reverse proxy HTTPS, el certificado y su renovación; README incluye un ejemplo de Caddy.
- No se han usado credenciales ni validado funciones internas de las plataformas externas enlazadas.
- Las pruebas automatizadas de navegador se ejecutaron con Chromium. No se afirma validación en Safari, Firefox o dispositivos físicos.
- La accesibilidad automática y el recorrido de teclado no equivalen a una certificación WCAG; queda por realizar una auditoría manual con lector de pantalla si se necesita certificar conformidad.
- Las imágenes base del contenedor usan etiquetas móviles. Para repetir exactamente la misma base en una entrega futura, fijar sus digests; el lockfile npm ya fija las dependencias de la aplicación.

No se declara como ejecutada ninguna validación de HTTPS público, autenticación externa o navegadores adicionales.
