import { trimSlashes, parseQuery } from 'https://deno.land/x/azizka_deno_router@1.1.0/src/utils.ts';

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