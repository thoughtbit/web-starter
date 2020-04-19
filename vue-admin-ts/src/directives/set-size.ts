import { DirectiveOptions } from "vue";

export const setSize: DirectiveOptions = {
  bind(el, { value }) {
    if (typeof value === 'string') {
      value = el.querySelector(value);
    }
    requestAnimationFrame(() => {
      const bounds = value.getBoundingClientRect();
      el.style.width = `${bounds.width}px`;
      el.style.height = `${bounds.height}px`;
    });
  }
};

/**
 *<div class="page" v-set-size="'.wrapper'"></div>
 */
