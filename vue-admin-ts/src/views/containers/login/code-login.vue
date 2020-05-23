<template>
  <el-form ref="loginForm" class="login-form" autocomplete="on" label-position="left">
    <el-form-item prop="phone">
      <el-input
        auto-complete="off"
        :placeholder="$t('login.phone')"
      >
      </el-input>
    </el-form-item>
    <el-form-item prop="phone">
      <el-input
          auto-complete="off"
          :placeholder="$t('login.phone')"
      >
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component
  export default class CodeLogin extends Vue {}
</script>

<style lang="scss" scoped>
  .login-form {
    .el-form-item {
      margin-bottom: 10px;
    }
  }
</style>
