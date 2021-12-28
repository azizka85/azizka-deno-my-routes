import { serve } from "https://deno.land/std@0.117.0/http/server.ts";

import { RouteState } from './data/route-state.ts';

import { fragment, query } from './utils.ts';

import app from './app.ts';

const port = Deno.env.get('PORT') || '3000';

serve(async (request) => {
  const url = new URL(request.url);

  const state: RouteState = {
    request      
  };

  const currentPath = fragment(url.pathname, app.rootPath);
  const currentQuery = query(url.search);

  await app.processUrl(currentPath, currentQuery, state);

  if(!state.response) {
    const data = {
      path: url.pathname,
      query: url.search,
      method: request.method
    };  
  
    return new Response(
      JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    );
  }

  return state.response;
}, { addr: `:${port}` });

console.log(`Server listening on port ${port}`);
