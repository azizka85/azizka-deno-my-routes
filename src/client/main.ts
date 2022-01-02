import { LoaderPage } from './views/pages/loader-page.ts';

import { loadPage } from './helpers/view-helpers.ts';

import { localeRoute } from '../utils.ts';

import { router, routeNavigator } from './globals.ts';
import { DEFAULT_LANGUAGE } from '../globals.ts';

window.addEventListener('DOMContentLoaded', () => {
  let firstTime = true;    

  LoaderPage.instance.init(null, firstTime);

  router.addRoutes([{
    rule: `${localeRoute}/?`,
    async handler(page) {
      await loadPage(
        page.match?.[0] || DEFAULT_LANGUAGE,
        page, 'home-page', 
        ['main-layout'],
        firstTime
      );
    }
  }, {
    rule: `${localeRoute}/?sign-in`,
    async handler(page) {
      await loadPage(
        page.match?.[0] || DEFAULT_LANGUAGE,
        page, 
        'sign-in-page', 
        [], 
        firstTime
      );
    }
  }, {
    rule: `${localeRoute}/?sign-up`,
    async handler(page) {
      await loadPage(
        page.match?.[0] || DEFAULT_LANGUAGE,
        page, 
        'sign-up-page', 
        [], 
        firstTime
      );
    }
  }]);

  routeNavigator.addUriListener();

  router
    .processUrl(routeNavigator.fragment, routeNavigator.query)
    .catch(
      reason => console.error(reason)      
    )
    .finally(() => firstTime = false);
});
