import { EventBus } from "@/utils/event-bus";
import VueRouter, { Route } from "vue-router";

declare module "vue/types/vue" {
  interface Vue {
    // @ts-ignore
    $router: VueRouter
    $route: Route,
    $eventBus: EventBus;
    // 本地国际化映射配置
    $locale: {
      [propsName: string]: any;
    };
  }
}
