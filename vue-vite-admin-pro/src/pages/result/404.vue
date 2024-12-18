<template>
  <result title="404 Not Found" tip="抱歉，您访问的页面不存在" type="404">
    <el-button type="primary" @click="() => $router.push('/')">返回首页</el-button>
  </result>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Result404",
});
</script>
