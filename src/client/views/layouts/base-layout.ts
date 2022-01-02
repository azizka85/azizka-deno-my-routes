import { View } from "../view.ts";

export class BaseLayout {
  protected content: View | null = null;

  async replaceContent(content: View) {
    await this.content?.unmount?.();
    this.content?.elem?.replaceWith(content.elem || '');
    await content.mount?.();

    this.content = content;
  }
}
