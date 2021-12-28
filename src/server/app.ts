import { Router } from 'https://deno.land/x/azizka_deno_router@1.1.0/src/router.ts';

import { RouteOptions } from './data/route-options.ts';
import { RouteState } from './data/route-state.ts';

import homeRoutes from './home/routes.ts';

import signInRoutes from './sign-in/routes.ts';
import signUpRoutes from './sign-up/routes.ts';

const app = new Router<RouteOptions, RouteState>({
  page404(page) {
    if(page.state) {
      page.state.response = new Response(
        `${page.state.request.method} ${page.state.request.url} not found`, 
        {
          status: 404,
          headers: {
            'Content-Type': 'text/html;charset=UTF-8'
          }
        }
      );
    }
  },
  before(page) {
    return false;
  }  
});

app.addRoutes(homeRoutes);

app.addRoutes(signInRoutes);
app.addRoutes(signUpRoutes);

export default app;