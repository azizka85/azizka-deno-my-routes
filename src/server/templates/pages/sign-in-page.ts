import { fromFileUrl, join, dirname } from 'https://deno.land/std@0.119.0/path/mod.ts';

import { compile } from 'https://deno.land/x/dejs@0.10.2/mod.ts';

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
