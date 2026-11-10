import { es } from './es';
import { en } from './en';
import type { Dictionary, Locale } from './types';
export type { Dictionary, Locale, IconName } from './types';

export const locales = ['es', 'en'] as const;
export const dictionaries: Record<Locale, Dictionary> = { es, en };
export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
export const languageNames: Record<Locale, string> = { es: 'Español', en: 'English' };
