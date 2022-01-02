import { Status } from 'std/http/http_status.ts';

import { Page } from 'router/src/data/page.ts';

import { RouteOptions } from '../../data/route-options.ts';
import { RouteState } from '../../data/route-state.ts';

import { getQueryParameters } from '../../../utils.ts';

const githubAuthorizeUrl = 'https://github.com/login/oauth/authorize';
const githubAccessTokenUrl = 'https://github.com/login/oauth/access_token';
const githubUserInfoUrl = 'https://api.github.com/user';

export default {
  service(page: Page<RouteOptions, RouteState>) {
    const params: {
      [key: string]: string
    } = {
      client_id: Deno.env.get('GITHUB_CLIENT_ID') || ''
    };

    if(page.query.lang) {
      params.state = page.query.lang;
    }

    const url = `${githubAuthorizeUrl}?${getQueryParameters(params)}`;

    return new Response(undefined, {
      status: Status.Found,
      headers: {
        'location': encodeURI(url)
      }
    });
  }, 

  async callback(page: Page<RouteOptions, RouteState>) {
    const lang = page.query.state || '';

    const params = new URLSearchParams();

    params.append('client_id', Deno.env.get('GITHUB_CLIENT_ID') || '');
    params.append('client_secret', Deno.env.get('GITHUB_CLIENT_SECRET') || '');
    params.append('code', page.query.code);

    const response = await fetch(githubAccessTokenUrl, {
      method: 'POST',
      headers: { accept: 'application/json' },
      body: params
    });

    const responseData = await response.json();    

    if(responseData.access_token) {
      const userResponse = await fetch(githubUserInfoUrl, {
        headers: { Authorization: `token ${responseData.access_token}` }
      });

      const userData = await userResponse.json();
      
    } else {
      
    }

    return new Response();
  }
};
