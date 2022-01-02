import { Page } from 'router/src/data/page.ts';

import { RouteOptions } from '../data/route-options.ts';
import { RouteState } from '../data/route-state.ts';

export interface Listener {
  listen?(type: string, listener: EventListenerOrEventListenerObject): void;
  unlisten?(type: string, listener: EventListenerOrEventListenerObject): void;
  performAction?(type: string, data: any): void;
}

export interface Component extends Listener {
  init(page: View, firstTime: boolean): Promise<void>;

  mount?(): Promise<void>;
  unmount?(): Promise<void>;

  load?(
    lang: string, 
    page: Page<RouteOptions, RouteState>, 
    firstLoad: boolean
  ): Promise<void>;
}

export interface View extends Listener {
  get elem(): HTMLElement | null;  

  init(parent: HTMLElement | null, firstTime: boolean): Promise<HTMLElement>;

  mount?(): Promise<void>;
  unmount?(): Promise<void>;

  load?(
    lang: string, 
    page: Page<RouteOptions, RouteState>, 
    firstLoad: boolean
  ): Promise<void>;  
}

export interface Layout extends Listener {
  replaceContent(content: View): Promise<void>;
}