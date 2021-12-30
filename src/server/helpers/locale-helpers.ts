import enValues from '../../locales/en.ts';
import ruValues from '../../locales/ru.ts';
import kzValues from '../../locales/kz.ts';

import { Translator } from 'https://deno.land/x/azizka_deno_i18n@1.0.0/src/translator.ts';

export const locales: {
  [key: string]: Translator
} = {
  en: Translator.create(enValues),
  ru: Translator.create(ruValues),
  kz: Translator.create(kzValues)
};
