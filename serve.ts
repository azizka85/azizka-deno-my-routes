import { createBundles } from './src/client/bundler.ts';
import { start } from './src/server/main.ts';

await createBundles();

start();
