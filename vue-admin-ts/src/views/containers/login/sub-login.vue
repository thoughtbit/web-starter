<template>
  <div class="sub-login-page">
    <ui-header msg="子用户登录" />
    <div class="sub-login-box">
      <div class="box-hd">
        <h2 class="title">{{$t('subLogin.title')}}</h2>
      </div><!--/.box-hd -->
      <div class="box-bd">
        <el-form ref="subAccountLoginForm" :model="subAccountLoginForm" :rules="subAccountLoginRules" class="register-form" label-position="left">
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
                maxlength="20"
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
              $t("subLogin.sumbitBtn")
              }}</el-button>
          </el-form-item>
        </el-form>
      </div><!-- /.box-bd -->
    </div><!-- /.box -->
    <ui-footer />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator";
  import { State } from "vuex-class";
  import { Route } from "vue-router";
  interface User {
    username: string | any[];
    password: string | any[];
    code: string | any[];
  }

  @Component({})
  export default class SubAccountLogin extends Vue {
    private subAccountLoginForm = <User>{
      username: "admin",
      password: "123456",
      code: ""
    };
    private subAccountLoginRules = <User>{
      username: [
        { required: true, trigger: "blur", message: "请输入用户名" },
        { min: 2, message: '用户名长度最少为2位', trigger: 'blur' }
      ],
      password: [
        { required: true, trigger: "blur",  message: "请输入密码" },
        { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
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
      if (this.subAccountLoginForm.username === "") {
        // @ts-ignore
        this.$refs.username.focus();
      } else if (this.subAccountLoginForm.password === "") {
        // @ts-ignore
        this.$refs.password.focus();
      } else if (this.subAccountLoginForm.code === "") {
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
            .dispatch("auth/login", this.subAccountLoginForm)
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
  .register-page {
    background-color: #f5f5f8;
    position: relative;
    margin: 0 auto;
    overflow-x: auto;
    min-width: 1200px;
    min-height: 720px;
    height: 100%;
  }
  .register-box {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 4px 40px 0px rgba(0, 0, 0, .15);
    border: 1px solid #f5f5f5;
    width: 480px;
    margin: 80px auto 0;
    padding: 40px;
    .box-hd {
      .title {
        padding: 10px 0;
        line-height: 22px;
        text-align: center;
        color: #409eff;
        font-size: 24px;
      }

      margin-bottom: 20px;
    }
    .verify-code-btn {
      width: 128px;
      text-align: center;
      color: #409eff;
      padding: 12px 20px;
      &:hover {
        background-color: #fff;
      }
      &.is-disabled {
        background-color: #f5f7fa;
      }
    }
  }
  .register-action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-button {
      flex: 1;
    }
  }
</style>
