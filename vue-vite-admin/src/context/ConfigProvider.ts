import { defineComponent, provide, ref } from "vue";
import type { InjectionKey, Ref } from "vue";

export const ConfigInjectionKey = Symbol("Config") as InjectionKey<Ref<any>>;

export const UpdateConfigModeInjectionKey = Symbol("Config") as InjectionKey<(mode: any) => void>;

export default defineComponent({
  name: "ConfigProvider",
  setup() {
    const config = ref({
      mode: "Light",
    });
    const updateConfigMode = (mode: any) => {
      config.value.mode = mode;
    };
    provide(ConfigInjectionKey, config);
    provide(UpdateConfigModeInjectionKey, updateConfigMode);
  },
  render() {
    return this.$slots.default?.();
  },
});
