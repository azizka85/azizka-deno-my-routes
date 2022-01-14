import { Status } from 'http/http_status.ts';

import { fromFileUrl, join, dirname } from 'path/mod.ts';

import { Router } from 'router/src/router.ts';

import { RouteOptions } from './data/route-options.ts';
import { RouteState } from './data/route-state.ts';

import homeRoutes from './home/routes.ts';

import signInRoutes from './sign-in/routes.ts';
import signUpRoutes from './sign-up/routes.ts';

import authRoutes from './auth/routes.ts';

import { checkStaticResponse } from './utils.ts';

import { PAGE_ROOT } from '../globals.ts';

const app = new Router<RouteOptions, RouteState>({
  root: PAGE_ROOT,
  async page404(page) {
    if(page.state) {
      page.state.response = new Response(
        `${page.state.request.method} ${page.state.request.url} not found`, 
        {
          status: Status.NotFound,
          headers: {
            'Content-Type': 'text/html;charset=UTF-8'
          }
        }
      );
    }
  },
  async before(page) {
    if(page.state) {
      const path = join(
        dirname(
          fromFileUrl(import.meta.url)
        ), 
        '../../public', 
        page.fragment
      );         

      if(await checkStaticResponse(page, path)) {
        return true;
      }      
    }        

    return false;
  }  
});

app.addRoutes(homeRoutes);

app.addRoutes(signInRoutes);
app.addRoutes(signUpRoutes);

app.addRoutes(authRoutes);

export default app;
