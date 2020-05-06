<template>
  <div class="login-container">
    <ui-header msg="登录" />
    <div class="login-box">
      <div class="box-hd">
        <h2 class="title">用户登录</h2>
      </div>
      <!--/.box-hd -->
      <div class="box-bd">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
        >
          <el-form-item prop="username">
            <span class="svg-container">
              <i class="ui-icon icon-user"></i>
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="用户名"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>
          <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
            <el-form-item prop="password">
              <span class="svg-container">
                <i class="ui-class icon-password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="密码"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <i class="ui-icon" :class="passwordType === 'password' ? 'eye' : 'eye-open'"></i>
              </span>
            </el-form-item>
          </el-tooltip>
          <el-form-item prop="captcha">
            <span class="svg-container">
              <i class="ui-icon icon-captcha"></i>
            </span>
            <el-input
              ref="captcha"
              v-model="loginForm.verifiy"
              placeholder="验证码"
              name="verifiy"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
            <img :src="loginForm.captcha" alt="" @click="refreshCaptcha" height="40" width="128" />
          </el-form-item>
          <el-button :loading="loading" type="primary" class="login-btn" @click.native.prevent="handleLogin"
            >Login</el-button
          >
        </el-form>
      </div><!-- /.box-bd -->
    </div><!-- /.box -->
    <ui-footer />
  </div>
</template>

<script lang="ts" src="@/views/containers/login.ts"></script>

<style lang="scss" scoped>
  .login-box {
    width: 480px;
    margin: 0 auto;
    padding: 20px 0;
    .box-hd {
    }
    .box-bd {
    }
    .login-btn {
      width: 100%;
    }
  }
</style>
