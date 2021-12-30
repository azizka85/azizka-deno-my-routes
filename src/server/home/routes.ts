import { Route } from 'https://deno.land/x/azizka_deno_router@1.1.0/src/data/route.ts';

import { RouteOptions } from '../data/route-options.ts';
import { RouteState } from '../data/route-state.ts';

import homePage from '../templates/pages/home-page.ts';

import { renderPage, stringToArray, getLayoutHandlers } from '../helpers/layout-helpers.ts';

import { localeRoute } from '../../utils.ts';

import { DEFAULT_LANGUAGE, PAGE_ROOT, VERSION } from '../../globals.ts';

const routes: Route<RouteOptions, RouteState>[] = [];

routes.push({
  rule: `${localeRoute}/?`,
  async handler(page) {
    if(page.state) {
      const lang = page.match?.[0] || DEFAULT_LANGUAGE;      

      const data = {
        time: Date.now()
      };

      if(page.query.ajax && !page.query.init) {
        page.state.response = new Response(
          JSON.stringify(data),
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }
        );
      } else {
        const layouts = !page.query.ajax
          ? ['main-layout']
          : stringToArray(page.query.layouts);

        const layoutHandlers = getLayoutHandlers(layouts);

        page.state.response = new Response(
          await renderPage(
            lang, 
            PAGE_ROOT, 
            VERSION, 
            page, 
            'home-page', 
            homePage, 
            data,
            layoutHandlers            
          ), 
          {
            headers: {
              'Content-Type': 'text/html;charset=UTF-8'
            }
          }
        );
      }      
    }
  }
});

export default routes;
