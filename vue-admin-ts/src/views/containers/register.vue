<template>
  <div class="login-container">
    <ui-header msg="注册" />
    <div class="register-box">
      <div class="box-hd">
        <h2 class="title">注册</h2>
      </div>
      <!--/.box-hd -->
      <div class="box-bd">
        <el-form
          ref="registerForm"
          :model="registerForm"
          :rules="registerRules"
          class="register-form"
          autocomplete="on"
          label-position="left"
        >
          <el-form-item prop="username">
            <span class="svg-container">
              <i class="ui-icon icon-user"></i>
            </span>
            <el-input
              ref="username"
              v-model="registerForm.username"
              placeholder="用户名"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>
          <el-button :loading="loading" type="primary" class="register-btn" @click.native.prevent="handleRegister"
            >注册</el-button
          >
        </el-form>
      </div><!-- /.box-bd -->
    </div><!-- /.box -->
    <ui-footer />
  </div>
</template>

<script lang="ts" src="@/views/containers/register.ts"></script>

<style lang="scss" scoped>
  .register-box {
    width: 480px;
    margin: 0 auto;
    padding: 20px 0;
    .box-hd {
    }
    .box-bd {
    }
    .register-btn {
      width: 100%;
    }
  }
</style>
