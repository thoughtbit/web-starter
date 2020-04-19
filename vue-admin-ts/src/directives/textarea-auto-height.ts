import { DirectiveOptions } from "vue";

export const textareaAutoHeight: DirectiveOptions = {
  update({ scrollHeight, clientHeight, style }) {
    if (scrollHeight !== clientHeight) {
      style.minHeight = `${scrollHeight}px`;
    }
  }
};

/**
 *<div class="page" v-textarea-auto-height=""></div>
 */
