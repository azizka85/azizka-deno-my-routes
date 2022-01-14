import { createBundles } from './src/compiler/bundler.ts';

import { VERSION } from './src/globals.ts';

await createBundles(false, VERSION);
