import { View } from "../view.ts";

import { mount, unmount } from '../../utils.ts';

export class BaseLayout {
  protected content: View | null = null;

  async replaceContent(content: View) {
    if(this.content?.replaceSelf) {
      this.content.replaceSelf(content);
    } else {
      await this.content?.unmount?.();
      await unmount(this.content?.elem || null);

      this.content?.elem?.replaceWith(content.elem || '');
      
      await content.mount?.();
      await mount(content.elem);
    }

    this.content = content;
  }
}
