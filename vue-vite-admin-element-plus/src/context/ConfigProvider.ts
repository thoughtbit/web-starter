import { defineComponent, provide, ref } from "vue";
import type { InjectionKey, Ref } from "vue";

export const ConfigInjectionKey: InjectionKey<Ref<any>> = Symbol("Config");

export const UpdateConfigModeInjectionKey: InjectionKey<(mode: any) => void> = Symbol("Config");

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
