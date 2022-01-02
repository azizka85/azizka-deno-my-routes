import {
  DEFAULT_LANGUAGE,
  context
} from "./chunk-XDMKKRA4.js";

// src/client/views/components/auth-service-component.ts
var AuthServiceComponent = class {
  titleElem = null;
  googleBtn = null;
  async init(page, firstTime) {
    this.titleElem = page.elem?.querySelector('[data-title="auth-service"]') || null;
    this.googleBtn = page.elem?.querySelector('[data-button="auth-service-google"]') || null;
  }
  async load(lang, page, firstLoad) {
    if (this.titleElem) {
      this.titleElem.textContent = context.tr("Or use the service");
    }
    if (this.googleBtn) {
      const langQuery = lang === DEFAULT_LANGUAGE ? "" : `?lang=${lang}`;
      this.googleBtn.setAttribute("href", `/auth/service/github${langQuery}`);
    }
  }
};

export {
  AuthServiceComponent
};
//# sourceMappingURL=chunk-2LBP5SAV.js.map
