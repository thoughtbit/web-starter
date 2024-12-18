<template>
  <el-config-provider :locale="locale" :button="config" :size="assemblySize">
    <router-view />
    <global-setting />
  </el-config-provider>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, watch } from "vue";

// 配置element中英文
import zh from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { GlobalSetting } from "@/components"

import { useStore } from "@/store";
import { useLocale } from "@/hooks";

export default defineComponent({
  name: "App",
  components: {
    GlobalSetting,
  },
  setup() {
    const { app } = useStore();
    const { currentLocale } = useLocale();

    watch(
      () => app.colorScheme,
      () => {
        if (app.colorScheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
      {
        immediate: true,
      }
    );

    // 配置element按钮文字中间是否有空格
    const config = reactive({
      autoInsertSpace: false,
    });

    // element 语言配置
    const locale = computed(() => {
      switch (currentLocale.value) {
        case "zh-CN":
          return zh;
        case "en-US":
          return en;
        default:
          return en;
      }
    });

    // 配置全局组件大小 (small/default(medium)/large)
    const assemblySize = computed(() => app.assemblySize);

    return {
      config,
      locale,
      assemblySize,
    };
  },
});
</script>
