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
      captcha: "/kaptcha",
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

    private beforeMount () {
      setTimeout(() => {
        if (!! this.authState.isLogin) {
          this.$router.push({
            name: "/"
          })
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
