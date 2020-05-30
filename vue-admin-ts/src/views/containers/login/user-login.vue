<template>
  <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">
    <el-form-item prop="username">
      <el-input
        clearable
        ref="username"
        v-model="loginForm.username"
        :placeholder="$t('login.username')"
        name="username"
        type="text"
        tabindex="1"
        maxlength="20"
        prefix-icon="el-icon-user"
        autocomplete="off"
        @keyup.enter.native="handleLogin"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        clearable
        ref="password"
        v-model="loginForm.password"
        :placeholder="$t('login.password')"
        :show-password="true"
        name="password"
        type="password"
        maxlength="16"
        minlength="8"
        tabindex="2"
        autocomplete="off"
        prefix-icon="el-icon-key"
        @keyup.enter.native="handleLogin"
      />
    </el-form-item>
    <el-form-item class="captcha-wrapper" prop="code">
      <el-input
        clearable
        ref="code"
        v-model="loginForm.code"
        :placeholder="$t('login.code')"
        name="code"
        type="text"
        maxlength="5"
        tabindex="3"
        prefix-icon="el-icon-lock"
        autocomplete="off"
        @keyup.enter.native="handleLogin"
        class="el-input-code"
      />
      <img :src="captcha.src" alt="" @click="refreshCaptcha" height="40" width="128" class="captcha" />
      <a href="javascript:;" class="captcha-btn" @click="refreshCaptcha">换一张</a>
    </el-form-item>
    <el-form-item class="login-action">
      <el-button :loading="loading" type="primary" tabindex="4" class="login-btn" @click.native.prevent="handleLogin">{{
        $t("login.sumbitBtn")
      }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator";
  import { State, Mutation } from "vuex-class";
  import { Route } from "vue-router";
  interface User {
    username: string | any[];
    password: string | any[];
    code: string | any[];
  }

  @Component({})
  export default class Login extends Vue {
    private loginForm = <User>{
      username: "admin",
      password: "12345678",
      code: ""
    };
    private loginRules = <User>{
      username: [
        { required: true, trigger: "blur", message: "请输入用户名" },
        { min: 2, message: '用户名长度最少为2位', trigger: 'blur' }
      ],
      password: [
        { required: true, trigger: "blur",  message: "请输入密码" },
        { min: 8, max: 16, message: '密码长度最少为8位, 最多16位', trigger: 'blur' }
      ],
      code: [
        { required: true, trigger: "blur",  message: "请输入验证码" },
        { min: 5, message: '验证码长度最少为5位', trigger: 'blur' }
      ]
    };

    private captcha = {
      src: "/kaptcha",
      value: "",
      length: "5"
    };

    private loading: boolean = false;
    private redirect: any = null;
    private otherQuery: any = {};

    private checkLoginStatus = false;

    @State("auth")
    private authState: any;

    get loginStatus(): boolean {
      return this.authState.isLogin;
    }

    @Watch("loginStatus")
    change() {
      this.checkLoginStatus = this.loginStatus;
    }

    @Watch("$route", { immediate: true })
    private onRouteChange(route: Route) {
      const query = route.query;
      if (query) {
        this.redirect = route.query && (route.query.redirect as string);
        this.otherQuery = this.getOtherQuery(query);
      }
    }

    private created() {
      this.refreshCaptcha();
    }

    private beforeMount() {
      setTimeout(() => {
        if (!!this.authState.isLogin) {
          this.$router.push({
            name: "/"
          });
        }
      }, 1000);
    }

    private mounted() {
      if (this.loginForm.username === "") {
        // @ts-ignore
        this.$refs.username.focus();
      } else if (this.loginForm.password === "") {
        // @ts-ignore
        this.$refs.password.focus();
      } else if (this.loginForm.code === "") {
        // @ts-ignore
        this.$refs.code.focus();
      }
    }

    private handleLogin(): void {
      // @ts-ignore
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("auth/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/", query: this.otherQuery });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }

    private refreshCaptcha(): void {
      this.captcha.src = `/kaptcha?t=${new Date().getTime()}`;
    }

    private getOtherQuery(query: any) {
      return Object.keys(query).reduce((acc: any, cur: any) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc;
      }, {})
    }
  }
</script>

<style lang="scss" scoped>
  .login-form {
    .captcha-wrapper {
      .el-input-code {
        width: 140px;
      }
      .captcha {
        display: inline-block;
        vertical-align: top;
        margin-right: 10px;
        margin-left: 10px;
        border: 1px solid #eee;
        border-radius: 4px;
        overflow: hidden;
        height: 40px;
        width: 128px;
        background-color: #fff;
      }
      .captcha-btn {
        border-radius: 4px;
        display: inline-block;
        vertical-align: top;
        line-height: 20px;
        padding: 10px;
        font-size: 14px;
        color: #999;
        &:hover {
          background-color: #f5f5f5;
          color: #409eff;
        }
      }
    }
  }
</style>
