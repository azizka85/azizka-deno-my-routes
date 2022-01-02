import { Route } from 'router/src/data/route.ts';

import { RouteOptions } from '../data/route-options.ts';
import { RouteState } from '../data/route-state.ts';

import signInPage from '../templates/pages/sign-in-page.ts';

import authServiceComponent from '../templates/components/auth-service-component.ts';

import { renderPage } from '../helpers/layout-helpers.ts';

import { localeRoute } from '../../utils.ts';

import { DEFAULT_LANGUAGE, PAGE_ROOT, VERSION } from '../../globals.ts';

const routes: Route<RouteOptions, RouteState>[] = [];

routes.push({
  rule: `${localeRoute}/?sign-in`,
  async handler(page) {
    if(page.state) {
      const lang = page.match?.[0] || DEFAULT_LANGUAGE; 
      
      const data = {};

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
        page.state.response = new Response(
          await renderPage(
            lang, 
            PAGE_ROOT, 
            VERSION, 
            page, 
            'sign-in-page', 
            signInPage, 
            data,
            undefined,
            {
              'auth-service-component': authServiceComponent
            }            
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
