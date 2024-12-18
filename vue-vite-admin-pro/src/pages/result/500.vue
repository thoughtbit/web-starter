<template>
  <result title="500 Internal Server Error" type="500" tip="抱歉，服务器出错啦">
    <el-button type="primary" @click="() => $router.push('/')">返回首页</el-button>
  </result>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Result500",
});
</script>
