import { fromFileUrl, join, dirname } from 'path/mod.ts';

import { compile } from 'dejs/mod.ts';

export default await compile(
  await Deno.open(
    join(
      dirname(
        fromFileUrl(import.meta.url)
      ), 
      'sign-in-page.ejs'
    )
  )
);
