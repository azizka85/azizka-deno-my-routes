import { fromFileUrl, join, dirname } from 'https://deno.land/std@0.119.0/path/mod.ts';

import { build } from 'https://deno.land/x/esbuild@v0.14.9/mod.js';

import { VERSION } from '../globals.ts';

const dev = Deno.env.get('NODE_ENV') !== 'production';

const currentPath = dirname(
  fromFileUrl(import.meta.url)
);

try {
  await Deno.remove(
    join(currentPath, `../../public/dist/${VERSION}`),
    {
      recursive: true
    }
  );
} catch(error) {
  console.error(error);  
}

const scriptsResult = await build({
  entryPoints: {
    './locales/en': join(currentPath, '../locales/en.ts'),
    './locales/ru': join(currentPath, '../locales/ru.ts'),
    './locales/kz': join(currentPath, '../locales/kz.ts'),
    './main': join(currentPath, 'main.ts')
  },
  outdir: join(currentPath, `../../public/dist/${VERSION}/js`),
  format: 'esm',
  target: 'esnext',
  bundle: true,
  splitting: true,
  sourcemap: dev,
  minify: !dev
});

console.log('scripts - ', scriptsResult);

const process = Deno.run({
  cmd: [
    'sass',
    dev ? '--style=expanded' : '--style=compressed',
    dev ? '--source-map' : '--no-source-map',
    join(currentPath, 'styles/main.scss'),
    join(currentPath, `../../public/dist/${VERSION}/css/main.css`)
  ]
})

const stylesResult = await process.status();

console.log(`styles - ${JSON.stringify(stylesResult)}`);

Deno.exit(0);
