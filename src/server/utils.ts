import { Page } from 'router/src/data/page.ts';
import { RouteOptions } from './data/route-options.ts';
import { RouteState } from './data/route-state.ts';

import { trimSlashes, parseQuery } from 'router/src/utils.ts';

export function fragment(path: string, root: string) {
  let value = decodeURI(path);

  if(root !== '/') {
    value = value.replace(root, '');
  }

  return trimSlashes(value);
}

export function query(search: string) {
  return parseQuery(search);
}

export async function checkStaticResponse(page: Page<RouteOptions, RouteState>, path: string) {
  if(page.state) {
    try {
      const stat = await Deno.stat(path);
  
      if(stat.isFile) {
        const data = await Deno.readFile(path);
  
        page.state.response = new Response(data);

        if(path.endsWith('.js')) {
          page.state.response.headers.set('Content-Type', 'application/javascript; charset=UTF-8');
        } else if(path.endsWith('.svg')) {
          page.state.response.headers.set('Content-Type', 'image/svg+xml');
        } else if(path.endsWith('.png')) {
          page.state.response.headers.set('Content-Type', 'image/png');
        } else if(path.endsWith('.css')) {
          page.state.response.headers.set('Content-Type', 'text/css; charset=UTF-8');
        }
  
        return true;
      }
    } catch { }
  }

  return false;
}
