<template>
  <el-config-provider :locale="locale" :button="config" :size="assemblySize">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, watch } from "vue";
// 配置element中英文
import zh from "element-plus/es/locale/lang/zh-cn";
// vue-request 全局配置
import { useRequestProvider } from "vue-request";

import { useStore } from "@/stores";

export default defineComponent({
  name: "App",
  setup() {
    const { app } = useStore();

    useRequestProvider({
      // 默认是false, 自动发送请求, 这里统一设置成手动触发请求
      manual: true,
    });

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
      },
    );

    // 配置element按钮文字中间是否有空格
    const config = reactive({
      autoInsertSpace: false,
    });

    // 配置全局组件大小 (small/default(medium)/large)
    const assemblySize = computed(() => app.assemblySize);

    // element 语言配置
    const locale = computed(() => {
      return zh;
    });

    return {
      config,
      assemblySize,
      locale,
    };
  },
});
</script>
