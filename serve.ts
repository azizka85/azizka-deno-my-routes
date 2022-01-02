import { Server } from 'http/server.ts';

import { createBundles } from './src/client/bundler.ts';
import { start } from './src/server/main.ts';

const watcher = Deno.watchFs('src');

let server: Server | undefined;

async function serve(event?: Deno.FsEvent) {
  if(!event || event.kind === 'access') {
    console.log('>>> event', event);

    if(server && !server.closed) server.close();
  
    await createBundles();
    server = start();
  }  
}

await serve();

for await (const event of watcher) {
  await serve(event);
}
