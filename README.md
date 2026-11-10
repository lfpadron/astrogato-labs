# Astrogato Labs

Sitio institucional bilingüe, estático y responsivo implementado a partir de `astrogato_codex.md`. El proyecto vive directamente en la raíz de este workspace; los archivos de `imagenes-referencia/` se conservan intactos.

Incluye filosofía, diferenciadores, pilares técnicos, tres misiones en preparación, dos demostraciones y contacto por correo y WhatsApp. No contiene formularios que almacenen datos, backend, base de datos, analítica, cookies ni solicitudes a CDN. Los enlaces externos se abren únicamente por acción del visitante.

## Stack y requisitos

- Node.js **24.x**, npm y Astro **7.4.4**; versiones exactas en `package.json` y `package-lock.json`.
- TypeScript estricto, componentes Astro y CSS nativo. Sin React, Vue o Angular.
- Vitest para datos e integridad de recursos; Playwright con Chromium y axe-core para navegador y accesibilidad.
- Podman para despliegue OCI; un proveedor de Compose solo si se usa `podman compose`. Docker Desktop no es necesario.
- El runtime es Nginx sin root, UID/GID `101:101`, puerto interno **8080**. Node y las dependencias de desarrollo quedan fuera de la imagen final.

La arquitectura sigue la [configuración estática de Astro](https://docs.astro.build/en/reference/configuration-reference/) y el [runtime oficial de Nginx sin privilegios](https://github.com/nginx/docker-nginx-unprivileged).

## Instalación y desarrollo

```bash
npm ci
npm run dev
# http://127.0.0.1:4321/es/
```

```bash
npm run check
npm test
npm run build
npm run preview
```

`dist/` es la salida estática. No se debe editar a mano. `npm run preview` sirve para revisar el build; las cabeceras de producción se aplican en Nginx, no en el servidor de Astro.

Astro puede emitir telemetría de su herramienta de desarrollo, independiente del sitio entregado. Para desactivarla en una sesión: `export ASTRO_TELEMETRY_DISABLED=1` en bash o `$env:ASTRO_TELEMETRY_DISABLED='1'` en PowerShell. La compilación del contenedor ya la desactiva.

## Rutas, idiomas y contenido

| Ruta | Comportamiento |
| --- | --- |
| `/` | Detecta el primer idioma soportado de `navigator.languages`. Si no hay ES/EN, usa español. Sin JavaScript muestra los dos enlaces. |
| `/es/` | Sitio completo en español, `lang="es-MX"`. |
| `/en/` | Sitio completo en inglés, `lang="en-US"`. |
| `/sitemap.xml` | Sitemap estático con variantes ES, EN y `x-default`. |
| Ruta inexistente | Nginx devuelve HTTP 404 con una página bilingüe. |

La detección se ejecuta solo en `/`; una selección explícita de `/es/` o `/en/` nunca se sobreescribe. El selector conserva el ancla de la sección. No se guarda una preferencia en cookies ni almacenamiento local.

- Traducciones: `src/i18n/es.ts` y `src/i18n/en.ts`, validadas con `Dictionary` en `types.ts`. Mantener las mismas claves y listas en ambos idiomas.
- Plantilla compartida: `src/components/HomePage.astro`. Las páginas de idioma solo pasan la prop `locale`.
- SEO: `src/utils/seo.ts` y `src/layouts/BaseLayout.astro`. El dominio canónico es `https://astrogatolabs.com.mx/`.
- Colores y medidas: `src/styles/variables.css`; estilos base, animación y media queries en archivos separados.
- Contacto: `Header`, `Hero`, `ClosingMessage` y `Footer`; correo `lfpadron@astrogatolabs.com`, WhatsApp `https://wa.me/525539887664`.

## Gestión de misiones

Editar `src/data/missions.ts`. Cada misión tiene `id`, `category`, `status`, `image` con rutas ES/EN, `url?` y textos ES/EN para `title`, `description`, `impact` e `imageAlt`.

Categorías: `upcoming` y `demonstration`. Estados: `preparing`, `coming-soon` y `demo`. `MissionCard.astro` traduce el estado y el CTA; sin `url` no genera ningún botón ni enlace externo. `notice: 'demo-not-production'` muestra el aviso de Bug Scrubs en ambos idiomas.

Las URLs de las plataformas son las de la especificación; las dos primeras están claramente identificadas como login. No se probaron autenticaciones ni funcionalidades de esas aplicaciones externas.

Las imágenes siempre aparecen a la izquierda en escritorio (desde 768 px) y arriba en móvil. Nunca se alterna su posición. Cada misión tiene dos WebP de 1200 × 675 px en `public/images/missions/`, con sufijos `-es` y `-en`; `MissionCard.astro` selecciona la imagen y su texto alternativo según el idioma.

Para sustituirlas, colocar los PNG originales en `imagenes-referencia/` con nombres `<id>-es.png` y `<id>-en.png`, y ejecutar `npm run assets:missions`. Este comando genera únicamente las diez copias WebP, sin recortar el contenido ni modificar los originales. Actualizar `imageAlt` si cambia la ilustración. Ver [ASSETS.md](ASSETS.md).

`npm run assets:generate` regenera **las diez imágenes de misiones a partir de los originales, los recursos sociales y los iconos**, y vuelve a copiar los originales de marca. Ya no genera placeholders. El build habitual no regenera ni modifica los recursos fuente.

## Pruebas

```bash
npx playwright install chromium
npm run validate
```

`validate` ejecuta TypeScript, Vitest, build y Playwright en ese orden y se detiene si falla un paso. Para repetir solo el navegador después de compilar: `npm run test:e2e`. Los resultados HTML se guardan en `playwright-report/` y las capturas ES/EN de 390 y 1440 px en `test-results/`. Esas carpetas no se versionan.

Si los navegadores se instalaron en una ruta local al proyecto:

```powershell
$env:PLAYWRIGHT_BROWSERS_PATH = Join-Path $PWD '.cache/ms-playwright'
npx playwright install chromium
npm run test:e2e
```

La suite revisa los anchos 320, 390, 479, 480, 767, 768, 1023, 1024, 1439, 1440 y 1920 px; ambas traducciones; enlaces y anclas; proporciones y posición de imágenes; ausencia de solicitudes externas; teclado; cambio de idioma; funcionamiento sin JavaScript; y reducción/pausa de movimiento. axe-core se ejecuta a 320 y 1280 px en ambos idiomas, incluido el menú móvil abierto.

Estas comprobaciones apoyan el objetivo WCAG 2.2 AA; no sustituyen una auditoría manual con lectores de pantalla. Ver el alcance y los resultados realmente ejecutados en [VERIFICATION.md](VERIFICATION.md).

## Despliegue con Podman Compose

Desde esta carpeta:

```bash
npm ci
npm run build
podman compose up -d --build
# http://localhost:8080
```

El `Containerfile` vuelve a compilar dentro de Node 24 para que la imagen no dependa del `dist/` local. `.containerignore` excluye cachés, referencias, pruebas, secretos y archivos de desarrollo innecesarios. `.dockerignore` mantiene las mismas exclusiones para proveedores Compose que empaquetan el contexto usando la convención Docker; mantener ambos archivos alineados. El servicio usa sistema de archivos de solo lectura, `/tmp` temporal, ninguna capability y `no-new-privileges`.

`podman compose` necesita un proveedor de Compose. Puede usarse `podman-compose` instalado con el gestor de paquetes de tu sistema (o `pipx install podman-compose` si tienes pipx). Podman también puede utilizar un ejecutable `docker-compose` existente, sin ejecutar Docker Desktop. [Referencia de Podman Compose](https://docs.podman.io/en/latest/markdown/podman-compose.1.html).

**En esta estación Windows**, la validación utilizó `podman-compose` local porque el proveedor Docker Compose existente no completaba la conexión SSH. Para operar el servicio entregado desde una nueva terminal PowerShell, seleccionar primero ese proveedor:

```powershell
$env:PODMAN_COMPOSE_PROVIDER = (Resolve-Path '.cache/podman-compose/Scripts/podman-compose.exe').Path
podman compose up -d --build
```

La variable solo afecta esa terminal. `.cache/` no se distribuye: en otro equipo, instalar un proveedor propio. Si se prefiere la misma instalación local (requiere Python 3):

```powershell
python -m venv .cache/podman-compose
& .\.cache\podman-compose\Scripts\python.exe -m pip install podman-compose==1.6.0
$env:PODMAN_COMPOSE_PROVIDER = (Resolve-Path '.cache/podman-compose/Scripts/podman-compose.exe').Path
podman compose up -d --build
```

Con un proveedor instalado en PATH también se puede seleccionar `$env:PODMAN_COMPOSE_PROVIDER='podman-compose'`; en bash, `export PODMAN_COMPOSE_PROVIDER=podman-compose`.

En Windows/macOS, iniciar la máquina de Podman antes del despliegue:

```bash
podman machine list
podman machine start
podman info
```

Solo si todavía no existe ninguna máquina, crear una con `podman machine init`. No recrear una máquina existente para resolver un problema de conexión.

### Verificación y operación

```bash
podman compose ps
curl -I http://localhost:8080/es/
curl -I http://localhost:8080/en/
curl -I http://localhost:8080/sitemap.xml
podman compose logs --tail=100 web
podman compose logs -f web
podman compose restart web
podman compose stop
podman compose start
podman compose down
```

En Windows PowerShell, usar `curl.exe` para evitar el alias de versiones antiguas. Las rutas de idioma deben devolver 200; una ruta inexistente debe devolver 404. El healthcheck consulta `/es/` cada 30 segundos.

Para verificar el contenedor activo desde el navegador automatizado:

```bash
npm run test:e2e:container
```

Por defecto usa `http://127.0.0.1:8080`; `CONTAINER_URL` permite cambiar el destino. Ejecuta también las pruebas de cabeceras, 404 y CSP real de Nginx.

Después de modificar el código:

```bash
npm run validate
podman compose up -d --build
```

Para actualizar las imágenes base, descargar de nuevo `docker.io/library/node:24-alpine` y `docker.io/nginxinc/nginx-unprivileged:stable-alpine`, y reconstruir. Las etiquetas base son móviles para recibir actualizaciones; las dependencias npm están fijadas por lockfile. Para despliegues auditados, registrar y fijar los digests verificados de esas imágenes en el `Containerfile`.

### Alternativa sin Compose

```bash
podman build -t astrogato-web:1.0 .
podman run -d --name astrogato-web -p 8080:8080 astrogato-web:1.0
podman exec astrogato-web wget -q -O /dev/null http://127.0.0.1:8080/es/
podman logs --tail=100 astrogato-web
podman restart astrogato-web
podman stop astrogato-web
podman start astrogato-web
```

Para aplicar una nueva imagen a ese contenedor, ejecutar `podman stop astrogato-web`, `podman rm astrogato-web`, reconstruir y repetir `podman run`. No hay volúmenes ni datos de usuario que migrar. No ejecutar simultáneamente las alternativas Compose y directa sobre el mismo puerto.

El healthcheck periódico se declara en Compose porque el formato OCI no guarda la instrucción Docker `HEALTHCHECK`. La alternativa directa usa la comprobación HTTP anterior; se puede añadir `--health-cmd 'wget -q -O /dev/null http://127.0.0.1:8080/es/'` a `podman run` si se necesita supervisión periódica sin Compose.

## HTTPS en producción

Nginx escucha HTTP en 8080. Colocar un reverse proxy con certificado TLS válido delante del contenedor, apuntar el DNS de `astrogatolabs.com.mx` al servidor y redirigir HTTP público a HTTPS. Si el proxy corre en el mismo host, cambiar la publicación en Compose a `127.0.0.1:8080:8080` para limitar el acceso directo.

Ejemplo de `Caddyfile` para un Caddy instalado en ese mismo host:

```caddyfile
astrogatolabs.com.mx {
    encode zstd gzip
    reverse_proxy 127.0.0.1:8080
}
```

Caddy puede gestionar certificados automáticamente cuando el DNS y los puertos públicos 80/443 están disponibles; ver [Automatic HTTPS](https://caddyserver.com/docs/automatic-https). Si el proxy está en otro contenedor, usar el nombre del servicio en una red compartida, no `127.0.0.1`. Configurar HSTS en el proxy solo después de verificar HTTPS y su renovación. No se ha cambiado el DNS ni desplegado en un servidor público como parte de esta entrega.

Cabeceras incluidas: CSP sin scripts ni estilos inline, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` y `Permissions-Policy`. HTML se revalida; assets con hash de Astro tienen caché immutable; imágenes tienen caché de una hora. No habilitar `unsafe-inline` para corregir futuros errores: conservar scripts procesados por Astro y CSS externo.

## Accesibilidad y privacidad

Landmarks y encabezados semánticos, enlace de salto, foco visible, texto alternativo, nombres de enlace traducidos, objetivos interactivos de al menos 44 px y menú móvil nativo con `<details>`. Escape cierra el menú y devuelve el foco; al elegir una sección el foco se mueve a su destino. El sitio funciona sin JavaScript; en ese caso las órbitas permanecen inmóviles. Con JavaScript, hay control de pausa y se respeta `prefers-reduced-motion`.

El contenido no usa certificaciones, testimonios ni métricas inventadas. No hay almacenamiento de datos de aplicación en el navegador ni una base de datos. Nginx emite logs HTTP operativos a stdout (incluyen IP, ruta, hora y agente de usuario); el operador del servidor debe definir su retención. Las plataformas externas y los clientes de correo/WhatsApp tienen su propio funcionamiento y políticas.

## Solución de problemas

| Síntoma | Acción |
| --- | --- |
| `EBADENGINE` | Usar Node 24.x y ejecutar `npm ci`. |
| Chromium no encontrado | Ejecutar `npx playwright install chromium`; usar la misma `PLAYWRIGHT_BROWSERS_PATH` al instalar y probar. |
| No conecta Podman | Revisar `podman machine list`, `podman system connection list` y `podman info`; iniciar la máquina correcta. |
| Máquina activa pero lista de conexiones vacía en Windows | Consultar `podman machine inspect`. Registrar una conexión SSH con el puerto, usuario e identidad de esa máquina; no adivinar valores ni regenerar claves. |
| Falta proveedor Compose | Instalar `podman-compose` o usar la alternativa `podman build` / `podman run`. |
| Puerto 8080 ocupado | Detener solo el servicio que corresponda o cambiar el puerto del host (`8081:8080`); el interno sigue en 8080. |
| Imagen anterior tras editar | Reconstruir con `podman compose up -d --build`; una edición en `src/` no cambia una imagen ya creada. |
| Scripts bloqueados por CSP | Revisar la consola y confirmar que el build produce scripts externos en `/_astro/`. |
| Problemas de Nginx | Consultar logs y ejecutar `podman compose exec web nginx -t`. |
| Imagen desactualizada en navegador | Recargar sin caché; las imágenes conservan caché hasta una hora. |

## Estructura

```text
astrogato-labs/
├── astrogato_codex.md             # Especificación original
├── imagenes-referencia/           # Originales intactos
├── public/
│   ├── images/brand/              # Dos PNG oficiales
│   ├── images/missions/           # Diez WebP, versiones ES/EN
│   ├── favicon.png / apple-touch-icon.png
│   ├── og-image.png / og-image-en.png
│   └── robots.txt
├── src/
│   ├── components/               # Header, Hero, MissionCard, Footer y secciones
│   ├── data/missions.ts
│   ├── i18n/                     # es.ts, en.ts, index.ts, types.ts
│   ├── layouts/BaseLayout.astro
│   ├── pages/                    # /, /es/, /en/, 404 y sitemap.xml
│   ├── scripts/navigation.ts
│   ├── styles/                   # Variables, base, animaciones, responsive
│   └── utils/seo.ts
├── scripts/generate-assets.mjs
├── tests/                        # Vitest y Playwright
├── Containerfile / compose.yaml / nginx.conf
├── .containerignore / .dockerignore / .gitignore / .npmrc / .node-version
├── astro.config.mjs / tsconfig.json
├── playwright*.config.ts / vitest.config.ts
├── package.json / package-lock.json
└── README.md / ASSETS.md / VERIFICATION.md
```

## Fases de implementación

1. Fundamentos: Astro, TypeScript estricto, rutas ES/EN y diccionarios tipados.
2. Marca: originales preservados, navegación y hero con órbitas controlables.
3. Contenido: seis valores, cuatro diferenciadores y seis pilares.
4. Misiones: datos centralizados, diez WebP localizados y tarjetas con orden consistente.
5. Cierre: contacto, footer, metadatos, sitemap, favicon y accesibilidad.
6. Contenedor: build multi-stage, Nginx sin root y Compose para Podman.
7. Validación: pruebas automatizadas, revisión visual y documentación.
