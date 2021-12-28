import { Route } from 'https://deno.land/x/azizka_deno_router@1.1.0/src/data/route.ts';

import { RouteOptions } from '../data/route-options.ts';
import { RouteState } from '../data/route-state.ts';

import { localeRoute } from '../../utils.ts';

const routes: Route<RouteOptions, RouteState>[] = [];

routes.push({
  rule: `${localeRoute}/?sign-up`,
  async handler(page) {
    if(page.state) {
      const content = `
        <h1>Sign up page</h1>
        <p><b>Description</b></p>
        <p>Fragment: ${page.fragment}</p>
        <p>Query: ${JSON.stringify(page.query)}</p>
        <p>Match: ${JSON.stringify(page.match)}</p>
      `;

      page.state.response = new Response(
        content, 
        {
          headers: {
            'Content-Type': 'text/html;charset=UTF-8'
          }
        }
      );
    }
  }
});

export default routes;