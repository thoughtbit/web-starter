/// <reference types="vite/client" />

import type { VNode } from "vue";

declare interface Window {
  // extend the window
}

// vue
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// jsx
declare global {
  namespace JSX {
    type Element = VNode;
    type ElementClass = Vue;
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

declare module "@vue/runtime-dom" {
  interface HTMLAttributes {
    [attr: string]: any;
  }

  interface CSSProperties {
    [attr: string]: any;
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    // todo
    [x: string]: any;
  }
}

declare module "*.json" {
  const value: any;
  export default value;
}
