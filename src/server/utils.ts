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
