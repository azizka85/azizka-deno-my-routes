export interface RouteState {
  request: Request;
  response?: Response;
  file?: Deno.File;
}
