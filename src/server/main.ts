import { Server } from 'http/server.ts';

import { RouteState } from './data/route-state.ts';

import { fragment, query } from './utils.ts';

import app from './app.ts';

export const port = parseInt(Deno.env.get('PORT') || '3000');

export function start() {
  const server = new Server({
    port,    
    handler: async (request) => {
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
    }
  });
  
  server.listenAndServe();
  
  console.log(`Server listening on port ${port}`); 
  
  return server;
}
