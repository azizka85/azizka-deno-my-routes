import { fromFileUrl, join, dirname } from 'https://deno.land/std@0.119.0/path/mod.ts';
import { readableStreamFromReader } from "https://deno.land/std@0.119.0/streams/mod.ts";
import { Status } from "https://deno.land/std/http/http_status.ts";

import { Router } from 'https://deno.land/x/azizka_deno_router@1.2.0/src/router.ts';

import { RouteOptions } from './data/route-options.ts';
import { RouteState } from './data/route-state.ts';

import homeRoutes from './home/routes.ts';

import signInRoutes from './sign-in/routes.ts';
import signUpRoutes from './sign-up/routes.ts';

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

      let file: Deno.File | null = null;

      try {
        file = await Deno.open(path);                
      } catch {}

      if(file) {
        const readableStream = readableStreamFromReader(file);

        page.state.response = new Response(readableStream);

        return true;
      }
    }

    return false;
  }  
});

app.addRoutes(homeRoutes);

app.addRoutes(signInRoutes);
app.addRoutes(signUpRoutes);

export default app;
