import { Page } from 'router/src/data/page.ts';
import { Router } from 'router/src/router.ts';
import { RouteNavigator } from 'router/src/route-navigator.ts';

import { FormattingContext } from 'i18n/src/data/formatting-context.ts';
import { Translator } from 'i18n/src/translator.ts';

import { RouteOptions } from './data/route-options.ts';
import { RouteState } from './data/route-state.ts';

import { View } from './views/view.ts';
import { BaseLayout } from './views/layouts/base-layout.ts';

import { PAGE_ROOT } from '../globals.ts';

export const router = new Router<RouteOptions, RouteState>({ root: PAGE_ROOT });
export const routeNavigator = new RouteNavigator<RouteOptions, RouteState>(router);

export const views: {
  [key: string]: View
} = {};

export const layouts: {
  [key: string]: BaseLayout & View
} = {};

export const languages: {
  [key: string]: Translator
} = {};

export interface GlobalContext {
  page?: Page<RouteOptions, RouteState>,
  tr: (
    text: string | number, 
    defaultNumOrFormatting?: number | FormattingContext, 
    numOrFormattingOrContext?: number | FormattingContext,
    formattingOrContext?: FormattingContext    
  ) => string;
}

const translator = new Translator();

export const context: GlobalContext = {   
  tr: translator.translate.bind(translator)
};
