<template>
  <div class="login-page h-full flex flex-col">
    <ui-header msg="未来智能云" class="login-header" />
    <main class="container mx-auto flex flex-1 items-center">
      <div class="flex-1">
        <div class="brand ">
          <h2>数字改变未来, 数据驱动生活</h2>
          <ul>
            <li>开放, 方便的数据共享</li>
            <li>安全, 可靠的数字管家</li>
            <li>先进, 快速的服务保障</li>
          </ul>
          <div class="divider"></div>
          <div class="banner">

          </div>
          <div class="copyright">Copyright &copy; 2020-2022 moocss.com 版权所有</div>
        </div>
      </div>
      <div class="login-box">
        <div class="box-bd">
          <nav class="login-nav">
            <a @click.stop="activeName='user'">{{ $t('login.userLogin') }}</a>
            <a @click.stop="activeName='code'">{{ $t('login.phoneLogin') }}</a>
          </nav>

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
        <div class="box-ft">
          <ul>
            <li>
              <router-link class="nav-link" to="/">忘记密码</router-link>
            </li>
            <li>
              <router-link class="nav-link" to="/register">立即注册</router-link>
            </li>
            <li>
              <router-link class="nav-link" to="/">扫码登录</router-link>
            </li>
            <li>
              <router-link class="nav-link" to="/">子用户登录</router-link>
            </li>
          </ul>

          <dl>
            <dt>其他登录方式</dt>
            <dt>
              <router-link class="nav-link" to="/">微信</router-link>
              <router-link class="nav-link" to="/">QQ</router-link>
              <router-link class="nav-link" to="/">邮箱</router-link>
            </dt>
          </dl>

          <dl>
            <dt>温馨提示：</dt>
            <dd>我们不会公开的你的敏感信息</dd>
          </dl>
        </div>
      </div><!-- /.box -->
    </main>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator";
  import { State, Mutation } from "vuex-class";
  import { Route } from "vue-router";
  import { isValidUsername } from "@/utils/validation";

  interface User {
    username: string | any[];
    password: string | any[];
    captcha: string | any[];
  }

  const validateUsername = (rule: any, value: string, callback: any): void => {
    if (!isValidUsername(value)) {
      callback(new Error("请输入正确的用户名"));
    } else {
      callback();
    }
  };
  const validatePassword = (rule: any, value: string, callback: any): void => {
    if (value.length < 6) {
      callback(new Error("密码不能少于6位"));
    } else {
      callback();
    }
  };

  @Component({})
  export default class Login extends Vue {
    private loginForm = <User>{
      username: "",
      password: "",
      verifiy: "",
      captcha: "/kaptcha"
    };
    private loginRules = <User>{
      username: [{ required: true, trigger: "blur", validator: validateUsername }],
      password: [{ required: true, trigger: "blur", validator: validatePassword }]
    };

    private passwordType: string = "password";
    private capsTooltip: boolean = false;
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
      this.redirect = route.query && (route.query.redirect as string);
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
      }
    }

    // private destroyed() {
    //   console.log("===> destroyed");
    // }

    private checkCapslock({ shiftKey = "", key = "" } = {}) {
      if (key && key.length === 1) {
        if ((shiftKey && key >= "a" && key <= "z") || (!shiftKey && key >= "A" && key <= "Z")) {
          this.capsTooltip = true;
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === "CapsLock" && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    }

    private showPwd(): void {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
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
      this.loginForm.captcha = `/kaptcha?t=${new Date().getTime()}`;
    }
  }
</script>

<style lang="scss">
  .login-page {
    background-color: #f5f5f8;
    position: relative;
    margin: 0 auto;
    overflow-x: auto;
    min-width: 1200px;
    min-height: 720px;
    &::before {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 18%;
      background-color: #2468f2;
      z-index: 1;
    }

    .container {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 16.5%;
        background-color: #2468f2;
        z-index: 1;
      }
    }
    .header,
    .footer {
      position: absolute;
      left: 0;
      right: 0;
      z-index: 8;
    }

    .footer {
      bottom: 0;
    }
    .login-header {
      background-color: transparent;
      .header-logo {
        background: url(../../assets/images/logo_b.png) no-repeat 0 50%;
      }
    }

    .banner {
      background-color: #2468f2;
      width: 368px;
      height: 140px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    .brand {
      width: 368px;
      margin-left: 120px;
      h2 {
        margin-bottom: 10px;
        font-size: 28px;
      }

      ul {
        padding: 20px 0;
        li {
          position: relative;
          line-height: 22px;
          padding: 8px 0 8px 20px;
          color: #717a92;
          &::before {
            content: "";
            position: absolute;
            left: 5px;
            top: 50%;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #aaa;
            margin-top: -2.5px;
          }
        }
      }
    }

    .divider {
      border-bottom: 1px solid #bbbbbb;
      margin: 20px 0 50px;
    }

    .copyright {
      padding: 20px 0;
      color: #999;
      font-size: 14px;
    }
  }
  .login-box {
    position: relative;
    z-index: 88;
    height: 540px;
    width: 426px;
    padding: 30px;
    overflow: hidden;
    background-color: #FFF;
    border-radius: 3px;
    box-shadow: 0 10px 20px 0px rgba(0, 0, 0, .1);
    border: 1px solid #f5f5f5;
    .box-hd {
    }
    .box-bd {
    }
    .login-btn {
      width: 100%;
    }
  }


  @media (min-width: 1024px) {
    .login-page {
      .container {
        &::before {
          width: 20.5%;
        }
      }
    }
  }

  @media (min-width: 1280px) {
    .login-page {
      .container {
        &::before {
          width: 16.5%;
        }
      }
    }
  }
</style>
