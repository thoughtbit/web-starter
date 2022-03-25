import { computed, defineComponent } from "vue";
import { ConfigInjectionKey, UpdateConfigModeInjectionKey } from "@/context/ConfigProvider";

import { injectStrict } from "@/utils/inject-strict";

export default defineComponent({
  name: "DisplayModeControl",
  setup() {
    const config = injectStrict(ConfigInjectionKey);
    const updateConfigMode = injectStrict(UpdateConfigModeInjectionKey);
    const mode = computed(() => config.value.mode);
    const toggleMode = () => {
      updateConfigMode(config.value.mode === "Light" ? "Dark" : "Light");
    };
    return {
      mode,
      toggleMode,
    };
  },
  render() {
    return <button onClick={this.toggleMode}>{this.mode} Mode</button>;
  },
});
