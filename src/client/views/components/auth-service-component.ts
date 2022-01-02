import { Page } from 'router/src/data/page.ts';

import { Component, View } from '../view.ts';

import { context } from '../../globals.ts';

import { DEFAULT_LANGUAGE } from '../../../globals.ts';

export class AuthServiceComponent implements Component {
  protected titleElem: HTMLElement | null = null;

  protected googleBtn: HTMLElement | null = null;

  async init(page: View, firstTime: boolean) {
    this.titleElem = page.elem?.querySelector('[data-title="auth-service"]') || null;

    this.googleBtn = page.elem?.querySelector('[data-button="auth-service-google"]') || null;
  }
  
  async load(lang: string, page: Page, firstLoad: boolean) {
    if(this.titleElem) {
      this.titleElem.textContent = context.tr('Or use the service');
    }

    if(this.googleBtn) {
      const langQuery = lang === DEFAULT_LANGUAGE ? '' : `?lang=${lang}`;

      this.googleBtn.setAttribute('href', `/auth/service/github${langQuery}`);
    }
  }
}
