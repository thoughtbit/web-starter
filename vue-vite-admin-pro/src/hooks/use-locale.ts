import { computed } from "vue";
import { useI18n } from "vue-i18n";

export function useLocale() {
  const i18 = useI18n();
  const currentLocale = computed(() => {
    return i18.locale.value;
  });
  const changeLocale = (value: string) => {
    i18.locale.value = value;
    localStorage.setItem("locale", value);
  };
  return {
    currentLocale,
    changeLocale,
  };
}
