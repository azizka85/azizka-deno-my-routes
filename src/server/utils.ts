import { readableStreamFromReader } from 'streams/conversion.ts';

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

export function checkJSContentType(path: string, headers: Headers) {
  if(path.endsWith('.js')) {
    headers.set('Content-Type', 'application/javascript; charset=UTF-8');

    return true;
  }

  return false;
}

export function checkSVGContentType(path: string, headers: Headers) {
  if(path.endsWith('.svg')) {
    headers.set('Content-Type', 'image/svg+xml');

    return true;
  }

  return false;
}

export function checkPNGContentType(path: string, headers: Headers) {
  if(path.endsWith('.png')) {
    headers.set('Content-Type', 'image/png');

    return true;
  }

  return false;
}

export function checkCSSContentType(path: string, headers: Headers) {
  if(path.endsWith('.css')) {
    headers.set('Content-Type', 'text/css; charset=UTF-8');

    return true;
  }

  return false;
}

export async function checkStaticResponse(page: Page<RouteOptions, RouteState>, path: string) {
  if(page.state) {
    try {
      const stat = await Deno.stat(path);
  
      if(stat.isFile) {
        const readableStream = readableStreamFromReader(
          await Deno.open(path)
        );
  
        page.state.response = new Response(readableStream);
  
        checkJSContentType(path, page.state.response.headers) ||
        checkSVGContentType(path, page.state.response.headers) ||
        checkPNGContentType(path, page.state.response.headers) ||
        checkCSSContentType(path, page.state.response.headers);
  
        return true;
      }
    } catch { }
  }

  return false;
}
