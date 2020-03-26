// @ts-nocheck
import { default as UiHeader } from "./ui-header.vue";
import { default as UiFooter } from "./ui-footer.vue";

const components: any = {
  UiHeader,
  UiFooter
};

const componentsName: string[] = Object.keys(components);
export default {
  install: (vue: any) => {
    componentsName.forEach((i) => {
      vue.component(i, components[i]);
    });
  }
};

