<template>
  <result title="404 Not Found" tip="抱歉，您访问的页面不存在" type="404">
    <el-button type="primary" @click="() => $router.go(-1)"
      >返回上一页 ({{ second }}s)</el-button
    >
  </result>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useIntervalFn } from "@vueuse/core";

export default defineComponent({
  name: "Result404",
  setup() {
    const second = ref(5);
    const router = useRouter();

    useIntervalFn(() => {
      if (second.value === 1) {
        router.go(-1);
      } else {
        second.value--;
      }
    }, 1000);

    return {
      second,
    };
  },
});
</script>
