import { createPage, onLoad } from '@mpxjs/core';

createPage({
  setup() {
    onLoad(() => {
      console.log('subpackage onload');
    });

    return {};
  },
});
