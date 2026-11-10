# Astrogato Labs — Prompt maestro para Codex v1.0

## Objetivo y rol
Actúa como ingeniero senior Astro/TypeScript, diseñador UX, especialista en accesibilidad y DevOps. Construye un **sitio web real**, bilingüe, responsivo y listo para desplegar con Podman; no solo una maqueta. Inspecciona el repositorio antes de cambiarlo, conserva los recursos existentes, implementa, prueba y documenta. Evita la sobreingeniería y no inventes testimonios, métricas o capacidades.

## Identidad y posicionamiento
Marca: **Astrogato Labs**.

- ES: «Diseñamos tecnología que genera confianza».
- ES: «Exploramos ideas. Construimos herramientas».
- EN: “We design technology that builds trust.”
- EN: “We explore ideas. We build tools.”

No se distingue por vender IA, software u horas de programación, sino **confianza tecnológica**: menos fricción, cuellos de botella, errores y riesgos; más productividad, trazabilidad, privacidad y enfoque humano. Tono profesional, cercano y sin exageraciones.

## Tecnología
Astro estable, Node.js 24, TypeScript estricto, CSS nativo con variables, generación estática (SSG), JavaScript mínimo. No React/Vue/Angular ni base de datos/backend/CMS salvo necesidad justificada. Componentes reutilizables, datos de misiones y traducciones centralizados. Build estático servido en contenedor OCI ligero, compatible con Podman.

## Logos oficiales
Usar los originales adjuntos sin redibujar, recolorear, recortar ni alterar proporciones:

1. `astrogato-texto derecha centrado(1).png` → `public/images/brand/astrogato-logo-horizontal.png` (gato orbital a la izquierda, texto ASTROGATO LABS a la derecha).
2. `gato orbital-degradado(1).png` → `public/images/brand/gato-orbital-gradient.png`.

Conservar transparencia; usar `object-fit: contain`. Si faltan en el workspace, documentar su ausencia, no inventar logos. Paleta azul marino espacial, azul claro, naranja y blanco; evitar morado dominante. Inspirarse en `astrogato-banner-linkedin.png` para la composición del hero, pero usar HTML real, no texto aplanado en imagen.

## Navegación y páginas
Single page por idioma: `/es/` y `/en/`. En `/`, detectar idioma del navegador cuando sea viable, fallback español y sin bucles. Selector manual arriba a la derecha: 🇲🇽 Español / 🇺🇸 English. Menú escritorio con Filosofía, Diferenciadores, Misiones y Contacto. En móvil, menú plegable accesible. Scroll suave salvo movimiento reducido.

Orden: Hero; Filosofía y valores; ¿Qué nos distingue?; Pilares técnicos; Misiones próximas; Misiones de demostración; Cierre; Footer.

## Hero
Título: «Diseñamos tecnología que genera confianza».
Lema: «Exploramos ideas. Construimos herramientas».
Apoyo: «No comenzamos preguntando qué tecnología utilizar. Comenzamos entendiendo qué problema de negocio necesitamos resolver».
Conceptos: Seguridad · Trazabilidad · IA responsable · Privacidad · Diseño centrado en personas.
CTA: «Explorar misiones» (ancla) y «Hablemos de tu proyecto» (`mailto:lfpadron@astrogatolabs.com`).

Fondo con círculos orbitales animados discretos (CSS/SVG, trazos 1–3px, movimiento lento, baja opacidad). No afectar legibilidad ni rendimiento. Respetar `prefers-reduced-motion` y ocultar decoración a lectores de pantalla.

## Filosofía
Título: «Una filosofía centrada en la confianza». Desarrollar:
- Confianza desde el diseño: operaciones verificables y auditables.
- Simplicidad: arquitectura entendible y mantenible.
- Diseño humano: el usuario final es una persona.
- IA responsable: automatización con controles y supervisión humana.
- Privacidad: datos del cliente pertenecen al cliente; preferir procesamiento local cuando convenga, nube cuando aporte valor.
- Colaboración: entender necesidades junto al cliente, estudiar procesos, eliminar fricciones, duplicidades, cuellos de botella y riesgos. No todo problema requiere software nuevo.

## ¿Qué nos distingue?
Cuatro tarjetas con icono y explicación:
1. Comenzamos por el problema de negocio, no por la tecnología.
2. La confianza se diseña: seguridad, evidencia y trazabilidad desde la arquitectura.
3. La IA es una herramienta, no un mago: controles y decisiones humanas.
4. Las personas importan: menos fricción para usuarios finales.

## Pilares técnicos
Seis tarjetas: Seguridad desde el diseño; Trazabilidad y auditabilidad; Arquitecturas simples y modulares; IA responsable y explicable; Privacidad desde el diseño; Mantenibilidad y evolución continua. Enfatizar beneficio de negocio. No inventar certificaciones.

## Misiones: componente y diseño
Crear `MissionCard.astro` y `src/data/missions.ts` con `id`, `category`, `status`, `image`, `url?`, y `title`, `description`, `impact`, `imageAlt` en ES/EN. Categorías `upcoming` y `demonstration`; estados `preparing`, `coming-soon`, `demo`.

**Escritorio:** imagen SIEMPRE a la izquierda y texto a la derecha. **Celular:** imagen arriba y texto abajo. Nunca alternar. Cada misión con encabezado, descripción, impacto positivo, estado y CTA si hay URL. Enlaces externos con `target="_blank" rel="noopener noreferrer"`.

### Próximas a despegar
**Control de Accesos:** https://control-acceso-qr.com.mx/login — `/images/missions/control-accesos.webp`. QR, check-in clínico, recepción y pantallas de llamado. Impacto: menos fricción administrativa, mejor flujo y privacidad. «En preparación»; identificar enlace como login/plataforma.

**Consultorios Compartidos:** https://tu-consultorio.com/login/?next=/ — `/images/missions/consultorios-compartidos.webp`. Gestión de espacios médicos compartidos, agenda, reservaciones, administración y seguimiento financiero. Impacto: mejor aprovechamiento de espacios y menos coordinación manual. «En preparación»; enlace identificado como login/plataforma.

**Pagos Recurrentes:** sin URL; no inventarla. `/images/missions/pagos-recurrentes.webp`. Calendario de compromisos, estado de pagos y obligaciones próximas. Impacto: visibilidad, menos omisiones y seguimiento sencillo. «Próximamente», sin botón externo inerte.

### Misiones de demostración
**Bug Scrubs:** https://bugscrubs.astrogatolabs.com.mx/ — `/images/missions/bug-scrubs.webp`. Análisis demostrativo de defectos conocidos en plataformas de redes y evaluación de riesgos. Impacto: convertir información compleja en análisis accionable. Aviso visible: demostración, no usar para analizar redes de producción.

**Narrador AI de Fútbol:** https://futbol.astrogatolabs.com.mx/ — `/images/missions/narrador-futbol.webp`. Análisis de eventos de partidos con visualizaciones, hallazgos y relatos asistidos por IA. Impacto: datos crudos convertidos en información comprensible y atractiva.

## Imágenes de misiones
Crear **cinco placeholders locales**, no ilustraciones finales ni stock, con estética azul/naranja, icono/motivo abstracto y etiqueta. Preferir WebP 1200×675 (16:9), con nombres exactos `control-accesos.webp`, `consultorios-compartidos.webp`, `pagos-recurrentes.webp`, `bug-scrubs.webp`, `narrador-futbol.webp`. Debe bastar sustituir el archivo para reemplazar la imagen. Documentar en `ASSETS.md`. Si falta conversor WebP, SVG temporal y documentar adaptación.

## Cierre
ES: «La innovación cambia el futuro. La confianza permite construirlo».
ES: «En Astrogato Labs convertimos problemas complejos en herramientas confiables, seguras y diseñadas para las personas».
EN: “Innovation changes the future. Trust makes it possible to build it.”
EN: “At Astrogato Labs, we turn complex problems into reliable, secure tools designed for people.”

## Footer
Tres columnas escritorio, apiladas móvil:
- Izquierda: logo horizontal oficial (gato izquierda, texto derecha, alineados al centro).
- Centro: `luis fernando padrón` en minúsculas, icono correo `lfpadron@astrogatolabs.com` (`mailto:`), icono WhatsApp `+52 55 3988 7664` (https://wa.me/525539887664).
- Derecha: https://astrogatolabs.com.mx/ y lema.

## Bilingüismo
Traducir TODO: navegación, hero, valores, diferenciadores, pilares, misiones, impactos, estados, botones, avisos, footer, accesibilidad y SEO. Diccionarios tipados `src/i18n/es.ts`, `en.ts`, `index.ts`. No hardcodear español en componentes compartidos. `lang="es-MX"` / `lang="en-US"`.

## Responsive, accesibilidad y SEO
Probar 320–479, 480–767, 768–1023, 1024–1439 y ≥1440px, sin overflow horizontal. Objetivo WCAG 2.2 AA: landmarks semánticos, jerarquía de encabezados, teclado, foco visible, contraste, alt, enlaces claros, menú accesible, objetivos táctiles y movimiento reducido.

SEO por idioma: title, description, canonical, Open Graph, imagen social, `hreflang`, `robots.txt`, sitemap y favicon derivado del gato oficial. Dominio canónico https://astrogatolabs.com.mx/. No inventar redes sociales. Sin secretos, credenciales, trackers ni CDN innecesarios. Cabeceras HTTP de seguridad razonables.

## Despliegue Podman
Entregar `Containerfile`, `.containerignore`, `compose.yaml`, `nginx.conf`. Multi-stage: Node compila Astro; imagen ligera solo sirve estáticos. Preferir runtime no root. Puerto **8080 interno**, publicar `8080:8080`. No exigir Docker Desktop, Kubernetes, Redis ni PostgreSQL. Documentar reverse proxy HTTPS de producción.

```bash
npm ci
npm run build
podman compose up -d --build
# http://localhost:8080
```

Alternativa:
```bash
podman build -t astrogato-web:1.0 .
podman run -d --name astrogato-web -p 8080:8080 astrogato-web:1.0
```

Documentar verificación HTTP, logs, parada, reinicio y reconstrucción. Si Podman no está disponible, reportar la prueba pendiente, no afirmar éxito.

## Estructura de proyecto sugerida
```text
astrogato-web/
├── public/
│   ├── images/
│   │   ├── brand/
│   │   │   ├── astrogato-logo-horizontal.png
│   │   │   └── gato-orbital-gradient.png
│   │   └── missions/
│   │       ├── control-accesos.webp
│   │       ├── consultorios-compartidos.webp
│   │       ├── pagos-recurrentes.webp
│   │       ├── bug-scrubs.webp
│   │       └── narrador-futbol.webp
│   ├── favicon.png
│   ├── og-image.png
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── LanguageSwitcher.astro
│   │   ├── MobileNavigation.astro
│   │   ├── Hero.astro
│   │   ├── OrbitalBackground.astro
│   │   ├── Philosophy.astro
│   │   ├── Differentiators.astro
│   │   ├── TechnicalPillars.astro
│   │   ├── MissionCard.astro
│   │   ├── MissionSection.astro
│   │   ├── ClosingMessage.astro
│   │   └── Footer.astro
│   ├── data/missions.ts
│   ├── i18n/es.ts
│   ├── i18n/en.ts
│   ├── i18n/index.ts
│   ├── layouts/BaseLayout.astro
│   ├── pages/index.astro
│   ├── pages/es/index.astro
│   ├── pages/en/index.astro
│   ├── styles/global.css
│   ├── styles/variables.css
│   ├── styles/animations.css
│   ├── styles/responsive.css
│   └── utils/seo.ts
├── tests/i18n.test.ts
├── tests/missions.test.ts
├── tests/accessibility.spec.ts
├── Containerfile
├── .containerignore
├── compose.yaml
├── nginx.conf
├── .gitignore
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── package-lock.json
├── README.md
└── ASSETS.md
```

## Responsabilidad de componentes
`Header`: navegación y marca; `LanguageSwitcher`: idioma; `MobileNavigation`: menú; `Hero`: propuesta y CTA; `OrbitalBackground`: decoración; `Philosophy`: valores; `Differentiators`: diferenciadores; `TechnicalPillars`: principios; `MissionCard`: una misión; `MissionSection`: agrupación; `ClosingMessage`: cierre; `Footer`: contacto. Props tipadas, sin duplicar plantillas por idioma.

## Modelo de datos
```typescript
type MissionStatus = 'preparing' | 'coming-soon' | 'demo';
type MissionCategory = 'upcoming' | 'demonstration';
type LocalizedText = { es: string; en: string };
interface Mission {
  id: string;
  category: MissionCategory;
  status: MissionStatus;
  image: string;
  url?: string;
  title: LocalizedText;
  description: LocalizedText;
  impact: LocalizedText;
  imageAlt: LocalizedText;
}
```

## Pruebas y aceptación
Verificar: TypeScript, build Astro, ambas rutas, selector de idioma, cinco misiones ES/EN, URLs exactas, Pagos Recurrentes sin URL, menú accesible por teclado, proporciones de imágenes, ausencia de overflow a 320px, reducción de movimiento, alt, enlaces internos y contenedor cuando sea posible. Vitest/Playwright si procede. No afirmar pruebas no ejecutadas.

Criterio de finalización: sitio bilingüe completo, logos preservados, hero animado sutil, filosofía y pilares, cinco misiones con imágenes reemplazables, footer exacto, responsive, accesibilidad, SEO, build y despliegue Podman configurados, documentación.

## Documentación
`README.md` en español con stack, requisitos, instalación, desarrollo, build, traducciones, gestión de misiones, reemplazo de imágenes, comandos Podman, logs, restart, shutdown, troubleshooting y HTTPS. `ASSETS.md` con archivos, uso, dimensiones, transparencia y reemplazo.

## Plan de ejecución
1. Fundamentos: Astro, TS, estilos, rutas e i18n.
2. Marca: logos, navegación, hero y órbitas.
3. Contenido: filosofía, diferenciadores y pilares.
4. Misiones: datos, componentes y placeholders.
5. Cierre: footer, SEO y accesibilidad.
6. Contenedor: Containerfile, Nginx, Podman Compose.
7. Validación: pruebas, build, responsive y documentación.

**No te detengas después del scaffolding.** Implementa el sitio funcional completo.

## Informe final de Codex
Entregar resumen de funcionalidades, árbol de archivos, pruebas realizadas y resultados, comandos Podman, placeholders pendientes, limitaciones y acciones manuales necesarias. Distinguir claramente entre implementado, verificado y pendiente.

**Principio rector:** simplicidad sobre complejidad, trazabilidad sobre suposiciones, privacidad y seguridad desde el diseño, mantenibilidad sobre novedad, y personas sobre exhibicionismo tecnológico.
