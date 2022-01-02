import { Params } from 'dejs/mod.ts';

import { Page } from 'router/src/data/page.ts';

import { Translator } from 'i18n/src/translator.ts';

import { RouteOptions } from '../data/route-options.ts';
import { RouteState } from '../data/route-state.ts';

import defaultLayout from '../templates/layouts/default-layout.ts';
import mainLayout from '../templates/layouts/main-layout.ts';

import { locales } from './locale-helpers.ts';

import { toggleQueryParameter, changeLangPath } from '../../utils.ts';

import { LANGUAGES } from '../../globals.ts';

export interface LayoutHandlerOutput {
  partials: {
    [key: string]: (params: Params) => Promise<string>
  };
  helpers: {
    [key: string]: (...items: any[]) => any;
  };
  data: any;
  view: (params: Params) => Promise<string>;
}

export interface LayoutHandlerInput extends LayoutHandlerOutput {
  lang: string;
  rootLink: string;
  viewName: string;
}

export interface LayoutHandlerInfo {
  name: string,
  handler: (page: Page<RouteOptions, RouteState>, input: LayoutHandlerInput) => LayoutHandlerOutput;
}

export interface LayoutHandlers {
  [key: string]: (page: Page<RouteOptions, RouteState>, input: LayoutHandlerInput) => LayoutHandlerOutput;
}

export const layoutHandlersMap: LayoutHandlers = {
  'main-layout': mainLayoutHandler
};

export function stringToArray(param?: string) {
  if(param) {
    const array = param.split(',');

    return array.map(item => item.trim());
  }

  return [];
}

export function getLayoutHandlers(layouts: string[]) {
  const handlers: LayoutHandlerInfo[] = [];

  for(const layout of layouts) {
    if(layout in layoutHandlersMap) {
      handlers.push({
        name: layout,
        handler: layoutHandlersMap[layout]
      });
    }
  }

  return handlers;
}

export async function renderPage(
  lang: string,
  rootLink: string,
  version: string,  
  page: Page<RouteOptions, RouteState>, 
  pageName: string,
  pageLayout: (params: Params) => Promise<string>, 
  data: any,   
  layoutHandlers?: LayoutHandlerInfo[],
  partials?: {
    [key: string]: (params: Params) => Promise<string>
  },
  helpers?: {
    [key: string]: (...items: any[]) => any;
  },
) {
  const translator = lang in locales ? locales[lang] : new Translator();

  partials = {
    ...partials
  };
  
  helpers = {
    ...helpers,
    tr: translator.translate.bind(translator)
  };

  data = {
    ...data,
    lang,
    rootLink
  };

  let viewName = pageName;
  let view = pageLayout;

  if(layoutHandlers) {
    for(const handlerInfo of layoutHandlers) {
      const handler = handlerInfo.handler;

      const viewData = handler(page, {
        lang,
        rootLink,
        data,
        helpers,
        partials,
        viewName,
        view
      });

      data = viewData.data;
      helpers = viewData.helpers;
      partials = viewData.partials;

      view = viewData.view;
      viewName = handlerInfo.name;
    }
  }

  if(!page.query.ajax) {
    if(viewName) {
      partials[viewName] = view;
    }

    view = defaultLayout;    

    data = {
      lang,
      rootLink,
      version,
      content: viewName,
      contentData: data
    };
  }

  return await view({ 
    data,
    partials,
    helpers 
  });
}

export function mainLayoutHandler(page: Page<RouteOptions, RouteState>, input: LayoutHandlerInput): LayoutHandlerOutput {
  const view = mainLayout;

  const lang = input.lang;
  const url = page.fragment;
  const rootLink = input.rootLink;

  input.partials[input.viewName] = input.view;

  const helpers = {
    ...input.helpers,
    toggleQueryParameter,
    changeLangPath
  };

  const navigation = page.query['main-layout-navigation'] === '1';
  const search = page.query['main-layout-search'] === '1';  

  const data = {
    lang,
    rootLink,
    navigation,
    search,
    url,
    query: page.query,
    languages: LANGUAGES,
    content: input.viewName,
    contentData: input.data
  };

  return {
    data,
    helpers,
    partials: input.partials,
    view
  };
}
