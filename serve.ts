import { createBundles } from './src/compiler/bundler.ts';
import { start } from './src/server/main.ts';

import { VERSION } from './src/globals.ts';

import { dev } from './src/server/init-environment.ts';

await createBundles(dev, VERSION);

start();
