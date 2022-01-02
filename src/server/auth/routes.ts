import { Route } from 'router/src/data/route.ts';

import { RouteOptions } from '../data/route-options.ts';
import { RouteState } from '../data/route-state.ts';

import github from './handlers/github.ts';

const routes: Route<RouteOptions, RouteState>[] = [];

routes.push({
  rule: 'auth/service/(:word)',
  async handler(page) {
    if(page.state) {
      const name = page.match?.[0];

      switch(name) {
        case 'github': 
          page.state.response = github.service(page);
          break;
      }
    }
  }
}, {
  rule: 'auth/callback/(:word)',
  async handler(page) {
    if(page.state) {
      const name = page.match?.[0];

      switch(name) {
        case 'github': 
          page.state.response = await github.callback(page);
          break;
      }
    }
  }
});
