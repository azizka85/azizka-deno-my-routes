import { fromFileUrl, join, dirname } from 'path/mod.ts';

import { build, stop } from 'esbuild/mod.js';

import { EsBuildPluginImport } from 'esbuild-import/src/plugin.ts';

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

export const clientPath = join(
  dirname(
    fromFileUrl(import.meta.url)
  ),
  '../client'
);

export async function createBundles(dev: boolean, version: string) {
  try {
    await Deno.remove(
      join(clientPath, `../../public/dist/${version}`),
      {
        recursive: true
      }
    );
  } catch(error) {
    console.error(error);  
  }

  const importMap = JSON.parse(
    await Deno.readTextFile(
      join(clientPath, '../../import-map.json')
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
      './locales/en': join(clientPath, '../locales/en.ts'),
      './locales/ru': join(clientPath, '../locales/ru.ts'),
      './locales/kz': join(clientPath, '../locales/kz.ts'),
      './main': join(clientPath, 'main.ts'),
      './views/layouts/main-layout': join(clientPath, './views/layouts/main-layout.ts'),
      './views/home-page': join(clientPath, './views/pages/home-page.ts'),
      './views/sign-in-page': join(clientPath, './views/pages/sign-in-page.ts'),
      './views/sign-up-page': join(clientPath, './views/pages/sign-up-page.ts')
    },
    outdir: join(clientPath, `../../public/dist/${version}/js`),
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
      join(clientPath, 'styles/main.scss'),
      join(clientPath, `../../public/dist/${version}/css/main.css`)
    ]
  })
  
  const stylesResult = await process.status();
  
  console.log(`styles - ${JSON.stringify(stylesResult)}`);
}
