<template>
  <result title="403 Forbidden" tip="抱歉，您无权限访问此页面">
    <el-button type="primary" @click="() => $router.push('/')">返回首页</el-button>
  </result>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Result403',
});
</script>
