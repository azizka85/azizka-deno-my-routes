import { createBundles } from './src/compiler/bundler.ts';
import { start } from './src/server/main.ts';

import { VERSION } from './src/globals.ts';

await createBundles(true, VERSION);

start();
