import { fromFileUrl, join, dirname } from 'path/mod.ts';

import { build, stop } from 'esbuild/mod.js';

import { EsBuildPluginImport } from 'esbuild-import/src/plugin.ts';

import { VERSION } from '../globals.ts';

import { dev } from '../server/init-environment.ts';

export const baseUrl = new URL(import.meta.url);

export const cachePath = JSON
  .parse(
    new TextDecoder()
      .decode(
        await Deno.run({
          cmd: [
            'deno',
            'info',
            '--json'
          ],
          stdout: 'piped'
        }).output()
      )
  )
  .modulesCache;

export const currentPath = dirname(
  fromFileUrl(import.meta.url)
);

export async function createBundles() {
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

  const importMap = JSON.parse(
    await Deno.readTextFile(
      join(currentPath, '../../import-map.json')
    )
  );    

  const pluginImport = new EsBuildPluginImport(
    'esbuild-import',
    cachePath,
    baseUrl, 
    importMap
  );
  
  const scriptsResult = await build({
    plugins: [{
      name: pluginImport.name,
      setup: pluginImport.setup.bind(pluginImport)
    }],
    entryPoints: {
      './locales/en': join(currentPath, '../locales/en.ts'),
      './locales/ru': join(currentPath, '../locales/ru.ts'),
      './locales/kz': join(currentPath, '../locales/kz.ts'),
      './main': join(currentPath, 'main.ts'),
      './views/layouts/main-layout': join(currentPath, './views/layouts/main-layout.ts'),
      './views/home-page': join(currentPath, './views/pages/home-page.ts'),
      './views/sign-in-page': join(currentPath, './views/pages/sign-in-page.ts'),
      './views/sign-up-page': join(currentPath, './views/pages/sign-up-page.ts')
    },
    outdir: join(currentPath, `../../public/dist/${VERSION}/js`),
    format: 'esm',
    target: 'esnext',
    bundle: true,
    splitting: true,
    sourcemap: dev,
    minify: !dev
  });

  stop();
  
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
}
