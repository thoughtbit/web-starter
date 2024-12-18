<template>
  <result title="系统维护中" tip="系统维护中，请稍后再试" type="maintenance">
    <el-button type="primary" @click="() => $router.push('/')">返回首页</el-button>
  </result>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ResultMaintenance",
});
</script>
