import Vue from "vue";
import type { VNode } from "vue";

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
