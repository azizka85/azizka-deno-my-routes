import { assertExists, assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts";

import { RouteState } from './data/route-state.ts';

import app from './app.ts';

import { dev } from './init-environment.ts';

import { VERSION } from '../globals.ts';

Deno.test('should load static file "favicon.png" correctly', async () => {
  const state = {} as RouteState;

  await app.processUrl('favicon.png', {}, state);

  assertExists(
    state.response,
    'response should be exist'
  );

  assertEquals(
    state.response.status,
    200,
    `response status should be 200 but we have ${state.response.status}`
  );

  assertEquals(
    state.response.headers.get('Content-Type'),
    'image/png',
    `Content-Type should be "image/png" but we have "${state.response.headers.get('Content-Type')}"`
  );

  state.file?.close();
});

Deno.test('should load static file "images/flags/kz.svg" correctly', async () => {
  const state = {} as RouteState;

  await app.processUrl('images/flags/kz.svg', {}, state);

  assertExists(
    state.response,
    'response should be exist'
  );

  assertEquals(
    state.response.status,
    200,
    `response status should be 200 but we have ${state.response.status}`
  );

  assertEquals(
    state.response.headers.get('Content-Type'),
    'image/svg+xml',
    `Content-Type should be "image/svg+xml" but we have "${state.response.headers.get('Content-Type')}"`
  );

  state.file?.close();
});

Deno.test(`should load static file "dist/${VERSION}/js/main.js" correctly`, async () => {
  const state = {} as RouteState;

  await app.processUrl(`dist/${VERSION}/js/main.js`, {}, state);

  assertExists(
    state.response,
    'response should be exist'
  );

  assertEquals(
    state.response.status,
    200,
    `response status should be 200 but we have ${state.response.status}`
  );

  assertEquals(
    state.response.headers.get('Content-Type'),
    'application/javascript; charset=UTF-8',
    `Content-Type should be "application/javascript; charset=UTF-8" but we have "${state.response.headers.get('Content-Type')}"`
  );

  state.file?.close();
});

Deno.test(`should load static file "dist/${VERSION}/css/main.css" correctly`, async () => {
  const state = {} as RouteState;

  await app.processUrl(`dist/${VERSION}/css/main.css`, {}, state);

  assertExists(
    state.response,
    'response should be exist'
  );

  assertEquals(
    state.response.status,
    200,
    `response status should be 200 but we have ${state.response.status}`
  );

  assertEquals(
    state.response.headers.get('Content-Type'),
    'text/css; charset=UTF-8',
    `Content-Type should be "text/css; charset=UTF-8" but we have "${state.response.headers.get('Content-Type')}"`
  );

  state.file?.close();
});

Deno.test(`should load source file "src/globals.ts" correctly`, async () => {
  const state = {
    request: {}
  } as RouteState;

  await app.processUrl('src/globals.ts', {}, state);

  assertExists(
    state.response,
    'response should be exist'
  );

  if(dev) {
    assertEquals(
      state.response.status,
      200,
      `response status should be 200 but we have ${state.response.status}`
    );
  } else {
    assertEquals(
      state.response.status,
      404,
      `response status should be 404 but we have ${state.response.status}`
    );
  }

  state.file?.close();
});
