import { fromFileUrl, join, dirname } from 'path/mod.ts';

import { load } from 'denv/mod.ts';

export const currentPath = dirname(
  fromFileUrl(import.meta.url)
);

await load({
  path: join(currentPath, '../../.env'),
  ignoreMissingFile: true
});

export const dev = Deno.env.get('DENO_ENV') !== 'production';
