export type Locale = 'es' | 'en';
export type IconName = 'target' | 'shield' | 'person' | 'spark' | 'lock' | 'team' | 'trace' | 'modules' | 'refresh' | 'arrow' | 'external' | 'mail' | 'whatsapp';
export interface ContentItem { icon: IconName; title: string; description: string }
export interface Dictionary {
  lang: 'es-MX' | 'en-US';
  seo: { title: string; description: string; imageAlt: string };
  a11y: { skip: string; home: string; navigation: string; language: string; menu: string; closeMenu: string; external: string; pause: string; resume: string };
  nav: { philosophy: string; differences: string; missions: string; contact: string };
  hero: { eyebrow: string; title: string; accent: string; motto: string; description: string; explore: string; contact: string; concepts: string[]; orbitLabel: string; orbitNote: string };
  philosophy: { eyebrow: string; title: string; intro: string; items: ContentItem[] };
  differences: { eyebrow: string; title: string; intro: string; items: ContentItem[] };
  pillars: { eyebrow: string; title: string; intro: string; items: ContentItem[] };
  missions: { eyebrow: string; upcoming: string; upcomingIntro: string; demonstration: string; demonstrationIntro: string; impact: string; platform: string; demo: string; preparing: string; comingSoon: string; demoStatus: string; warning: string };
  closing: { eyebrow: string; title: string; description: string; cta: string };
  footer: { contact: string; website: string; motto: string; note: string };
  entry: { title: string; description: string };
  notFound: { title: string; description: string; back: string };
}
