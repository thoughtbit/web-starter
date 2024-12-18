<template>
  <header class="login-header">
    <h1 class="logo">{{APP_NAME}}</h1>
    <div class="operations-container">
      <el-button icon="Help" circle />
      <el-button icon="Setting" circle />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { APP_NAME } from "@/constants";

export default defineComponent({
  name: "LoginHeader",
  setup() {
    return {
      APP_NAME,
    };
  },
});

</script>

<style lang="scss" scoped>
.login-header {
  height: 64px;
  padding: 0 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #505050;

  .logo {
    height: 64px;
    line-height: 64px;
    color: #333;
    font-size: 28px;
  }

  .operations-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>
