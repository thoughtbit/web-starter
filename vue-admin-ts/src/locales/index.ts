import Vue from "vue";
import VueI18n from "vue-i18n";

// element-ui lang
import elementEnLocale from "element-ui/lib/locale/lang/en";
import elementZhLocale from "element-ui/lib/locale/lang/zh-CN";

// 用户自定义 lang
import { enLocale, zhLocale } from "@/locales/lang";

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
};

// 获取设备语言
function detectLanguage() {
  try {
    const lang =
      (window.navigator.languages && window.navigator.languages[0]) ||
      window.navigator.language ||
      // @ts-ignore
      window.navigator.userLanguage;
    return [lang, lang.toLowerCase(), lang.substr(0, 2)];
  } catch (e) {
    return [];
  }
}

export const getLocale = () => {
  let language = "zh";
  const codes = detectLanguage();

  if (codes.length > 0) {
    language = codes[1];
    const locales = Object.keys(messages);
    for (const locale of locales) {
      if (language.indexOf(locale) > -1) {
        return locale;
      }
    }
  }

  // 默认语言是中文
  return language;
};

const i18n = new VueI18n({
  locale: getLocale(),
  messages,
  fallbackLocale: "zh",
  silentTranslationWarn: process.env.NODE_ENV !== "production"
});

export default i18n;
