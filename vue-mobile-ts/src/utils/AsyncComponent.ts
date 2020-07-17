import { AsyncComponent } from "vue";
export const loadView = (view: string): AsyncComponent => (resolve) => require([`@/${view}`], resolve);
