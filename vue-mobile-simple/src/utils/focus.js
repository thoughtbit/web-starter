/* eslint-disable */
export default {
  bind(el) {
    requestAnimationFrame(() => {
      const input = el.querySelector('input');
      if (input) el = input;
      el.focus();
    });
  },
};

/**
 * <input v-focus type="text">
 */
