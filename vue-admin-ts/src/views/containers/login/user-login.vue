<template>
  <el-form ref="loginForm" class="login-form" autocomplete="on" label-position="left">
    <el-form-item prop="username">
      <el-input
        auto-complete="off"
        :placeholder="$t('login.username')"
      >
      </el-input>
    </el-form-item>
    <el-form-item prop="username">
      <el-input
          auto-complete="off"
          :placeholder="$t('login.username')"
      >
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component
  export default class UserLogin extends Vue {}
</script>

<style lang="scss" scoped>
  .login-form {
    .el-form-item {
      margin-bottom: 10px;
    }
  }
</style>
