import type { App } from "vue";
import { createI18n } from "vue-i18n";
import en from "./en-US";
import cn from "./zh-CN";

const defaultLocale = localStorage.getItem("locales") || "zh-CN";

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: "en-US",
  messages: {
    "en-US": en,
    "zh-CN": cn,
  },
});

export function setupI18n(app: App<Element>) {
  app.use(i18n);
}
