import { assertExists } from "https://deno.land/std@0.119.0/testing/asserts.ts";

import './init-environment.ts';

Deno.test('should environments will be loaded correctly', () => {
  assertExists(
    Deno.env.get('GITHUB_CLIENT_ID'),
    'GITHUB_CLIENT_ID variable should will be loaded'
  );

  assertExists(
    Deno.env.get('GITHUB_CLIENT_SECRET'),
    'GITHUB_CLIENT_SECRET variable should will be loaded'
  );
});
