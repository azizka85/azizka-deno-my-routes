import { assertExists, assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts";

import { RouteState } from '../data/route-state.ts';

import app from '../app.ts';

Deno.test('should load page "/sign-up" correctly', async () => {
  const state = {} as RouteState;

  await app.processUrl('sign-up', {}, state);

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
    'text/html;charset=UTF-8',
    `Content-Type should be "text/html;charset=UTF-8" but we have "${state.response.headers.get('Content-Type')}"`
  );
});

Deno.test('should load page "/ru/sign-up" correctly', async () => {
  const state = {} as RouteState;

  await app.processUrl('ru/sign-up', {}, state);

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
    'text/html;charset=UTF-8',
    `Content-Type should be "text/html;charset=UTF-8" but we have "${state.response.headers.get('Content-Type')}"`
  );
});

Deno.test('should load data from "/sign-up" correctly', async () => {
  const state = {} as RouteState;

  await app.processUrl('sign-up', { ajax: '1' }, state);

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
    'application/json;charset=UTF-8',
    `Content-Type should be "application/json;charset=UTF-8" but we have "${state.response.headers.get('Content-Type')}"`
  );
});
