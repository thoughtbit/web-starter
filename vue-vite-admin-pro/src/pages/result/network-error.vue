<template>
  <result title="网络异常" tip="网络异常，请稍后再试" type="wifi">
    <div>
      <el-button type="primary" @click="() => $router.push('/')">返回首页</el-button>
      <el-button @click="() => $router.push('/')">重新加载</el-button>
    </div>
  </result>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ResultNetworkError",
});
</script>
