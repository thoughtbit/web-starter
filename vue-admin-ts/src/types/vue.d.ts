import Vue from 'vue';
import { EventBus } from "@/utils/event-bus";

declare module 'vue/types/vue' {
  interface Vue {
    $eventBus: EventBus;
  }
}
