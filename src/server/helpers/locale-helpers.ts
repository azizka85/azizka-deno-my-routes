import { Translator } from 'i18n/src/translator.ts';

import enValues from '../../locales/en.ts';
import ruValues from '../../locales/ru.ts';
import kzValues from '../../locales/kz.ts';

export const locales: {
  [key: string]: Translator
} = {
  en: Translator.create(enValues),
  ru: Translator.create(ruValues),
  kz: Translator.create(kzValues)
};
