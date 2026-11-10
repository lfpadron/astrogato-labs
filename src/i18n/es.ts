import type { Dictionary } from './types';

export const es = {
  lang: 'es-MX',
  seo: {
    title: 'Astrogato Labs | Tecnología que genera confianza',
    description: 'Exploramos ideas y construimos herramientas confiables. Seguridad, trazabilidad, privacidad e IA responsable, con las personas en el centro.',
    imageAlt: 'Astrogato Labs. Diseñamos tecnología que genera confianza.',
  },
  a11y: { skip: 'Saltar al contenido', home: 'Astrogato Labs — inicio', navigation: 'Navegación principal', language: 'Seleccionar idioma', menu: 'Menú', closeMenu: 'Cerrar menú', external: 'se abre en una pestaña nueva', pause: 'Pausar órbitas', resume: 'Reanudar órbitas' },
  nav: { philosophy: 'Filosofía', differences: 'Diferenciadores', missions: 'Misiones', contact: 'Contacto' },
  hero: {
    eyebrow: 'Confianza, desde el diseño',
    title: 'Diseñamos tecnología que genera', accent: 'confianza',
    motto: 'Exploramos ideas. Construimos herramientas.',
    description: 'No comenzamos preguntando qué tecnología utilizar. Comenzamos entendiendo qué problema de negocio necesitamos resolver.',
    explore: 'Explorar misiones', contact: 'Hablemos de tu proyecto',
    concepts: ['Seguridad', 'Trazabilidad', 'IA responsable', 'Privacidad', 'Diseño centrado en personas'],
    orbitLabel: 'Ideas en órbita. Personas en el centro.', orbitNote: 'Tecnología con propósito',
  },
  philosophy: {
    eyebrow: '01 / Nuestra filosofía', title: 'Una filosofía centrada en la confianza',
    intro: 'Antes de construir, escuchamos. Entendemos el contexto y diseñamos herramientas que tengan sentido para tu negocio y para quienes las usan.',
    items: [
      { icon: 'shield', title: 'Confianza desde el diseño', description: 'Operaciones verificables y auditables. Cada decisión importante debe dejar evidencia que puedas entender y revisar.' },
      { icon: 'modules', title: 'Simplicidad', description: 'Arquitecturas entendibles y mantenibles. Elegimos lo necesario para resolver el problema sin añadir complejidad innecesaria.' },
      { icon: 'person', title: 'Diseño humano', description: 'El usuario final es una persona. Cuidamos su tiempo, su atención y su experiencia en cada interacción.' },
      { icon: 'spark', title: 'IA responsable', description: 'Automatización con límites claros, controles y supervisión humana. Las personas conservan las decisiones que importan.' },
      { icon: 'lock', title: 'Privacidad', description: 'Tus datos te pertenecen. Preferimos el procesamiento local cuando conviene y la nube cuando aporta valor al proyecto.' },
      { icon: 'team', title: 'Colaboración', description: 'Estudiamos tus procesos contigo para eliminar fricciones, duplicidades, cuellos de botella y riesgos. No todo problema requiere software nuevo.' },
    ],
  },
  differences: {
    eyebrow: '02 / Nuestra manera de trabajar', title: '¿Qué nos distingue?',
    intro: 'La tecnología es el medio. La confianza y un problema bien resuelto son el propósito.',
    items: [
      { icon: 'target', title: 'Primero, el problema de negocio', description: 'Entendemos qué necesitas resolver, quién lo vive y qué impide avanzar. Después elegimos la tecnología adecuada.' },
      { icon: 'trace', title: 'La confianza se diseña', description: 'Integramos seguridad, evidencia y trazabilidad desde la arquitectura para que puedas verificar lo que ocurre.' },
      { icon: 'spark', title: 'La IA es una herramienta, no un mago', description: 'Aplicamos IA cuando aporta valor, con controles y decisiones humanas. Sus resultados deben poder revisarse.' },
      { icon: 'person', title: 'Las personas importan', description: 'Buscamos menos pasos, menos fricción y más claridad para quienes utilizan las herramientas todos los días.' },
    ],
  },
  pillars: {
    eyebrow: '03 / Bases para construir', title: 'Cimientos técnicos. Beneficios reales.',
    intro: 'Principios que orientan nuestras decisiones para que las herramientas sean útiles hoy y puedan evolucionar mañana.',
    items: [
      { icon: 'shield', title: 'Seguridad desde el diseño', description: 'Accesos y controles pensados desde el inicio para reducir riesgos operativos y proteger lo que importa.' },
      { icon: 'trace', title: 'Trazabilidad y auditabilidad', description: 'Evidencia de qué ocurrió y cuándo, para investigar incidencias y tomar decisiones con contexto.' },
      { icon: 'modules', title: 'Arquitecturas simples y modulares', description: 'Piezas con responsabilidades claras que facilitan los cambios y reducen dependencias innecesarias.' },
      { icon: 'spark', title: 'IA responsable y explicable', description: 'Resultados que se puedan revisar, límites visibles y supervisión humana para usar la automatización con criterio.' },
      { icon: 'lock', title: 'Privacidad desde el diseño', description: 'Recopilar solo lo necesario y elegir dónde procesarlo para mantener el control sobre tu información.' },
      { icon: 'refresh', title: 'Mantenibilidad y evolución continua', description: 'Código claro y documentación útil para dar continuidad al proyecto y adaptarlo a nuevas necesidades.' },
    ],
  },
  missions: {
    eyebrow: '04 / Ideas que toman forma', upcoming: 'Próximas a despegar',
    upcomingIntro: 'Herramientas en preparación para resolver necesidades concretas. Cada misión parte de un problema y busca un impacto positivo.',
    demonstration: 'Misiones de demostración', demonstrationIntro: 'Un espacio para explorar posibilidades, aprender y mostrar ideas en funcionamiento.',
    impact: 'Impacto positivo', platform: 'Ir al login de la plataforma', demo: 'Explorar demostración',
    preparing: 'En preparación', comingSoon: 'Próximamente', demoStatus: 'Demostración',
    warning: 'Demostración: no usar para analizar redes de producción.',
  },
  closing: {
    eyebrow: 'El siguiente paso, juntos',
    title: 'La innovación cambia el futuro. La confianza permite construirlo.',
    description: 'En Astrogato Labs convertimos problemas complejos en herramientas confiables, seguras y diseñadas para las personas.',
    cta: 'Hablemos de tu proyecto',
  },
  footer: { contact: 'Contacto', website: 'Sitio web', motto: 'Exploramos ideas. Construimos herramientas.', note: 'Tecnología con propósito. Personas en el centro.' },
  entry: { title: 'Elige tu idioma', description: 'Diseñamos tecnología que genera confianza.' },
  notFound: { title: 'Esta órbita no existe', description: 'La página que buscas no está aquí. Regresa al inicio para explorar nuestras misiones.', back: 'Volver al inicio' },
} satisfies Dictionary;
