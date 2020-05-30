<template>
  <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">
    <el-form-item prop="phone">
      <el-input
        clearable
        ref="phone"
        v-model="loginForm.phone"
        :placeholder="$t('login.phone')"
        name="phone"
        type="text"
        tabindex="1"
        minlength="11"
        maxlength="20"
        prefix-icon="el-icon-mobile-phone"
        autocomplete="off"
        @keyup.enter.native="handleLogin"
      />
    </el-form-item>
    <el-form-item prop="code">
      <el-input
        clearable
        ref="code"
        v-model="loginForm.code"
        :placeholder="$t('login.code')"
        name="code"
        type="text"
        tabindex="2"
        maxlength="5"
        prefix-icon="el-icon-c-scale-to-original"
        autocomplete="off"
        @keyup.enter.native="handleLogin"
        class="el-input-code"
      >
        <el-button
          slot="append"
          :disabled="isSendVerifyCode"
          tabindex="3"
          type="text"
          class="verify-code-btn"
          @click.native.prevent="handleSendVerifyCode"
        >
          {{ (!isSendVerifyCode && "发送验证码") || computedTime + "秒后重发" }}
        </el-button>
      </el-input>
    </el-form-item>
    <el-form-item class="login-action">
      <el-button :loading="loading" type="primary" class="login-btn" @click.native.prevent="handleLogin"
        >{{$t('login.title')}}</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator";
  import SERVICE from "@/core/lib/sevice";
  import { isValidateMobile, validMobile } from "@/utils/validation";
  import { Route } from "vue-router";
  import { State } from "vuex-class";

  interface User {
    phone: string | any[];
    code: string | any[];
  }

  @Component
  export default class CodeLogin extends Vue {
    private timer: any;
    private loginForm = <User>{
      phone: "13484903846",
      code: ""
    };


    private validatePhone = (rule: any, value: string, callback: any): void => {
      if (isValidateMobile(value)[0]) {
        callback(new Error(isValidateMobile(value)[1]));
      } else {
        callback();
      }
    };

    private loginRules = <User>{
      phone: [{ required: true, trigger: "blur", validator: this.validatePhone }],
      code: [
        { required: true, trigger: "blur",  message: "请输入验证码" },
        { min: 5, message: '验证码长度最少为5位', trigger: 'blur' }
      ]
    };

    private loading: boolean = false;
    private redirect: any = null;
    private otherQuery: any = {};

    private checkLoginStatus = false;

    private computedTime: number = 0;
    private isSendVerifyCode: boolean = false;

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
      if (this.loginForm.phone === "") {
        // @ts-ignore
        this.$refs.phone.focus();
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
            .dispatch("auth/loginByMobile", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/", query: this.otherQuery });
              this.loading = false;
            })
            .catch((error) => {
              console.log("error:", error);
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }

    private getOtherQuery(query: any) {
      return Object.keys(query).reduce((acc: any, cur: any) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc;
      }, {})
    }

    private handleSendVerifyCode() {
      if (!validMobile(this.loginForm.phone)) {
        this.$refs.loginForm.validateField("phone");
        return false;
      }

      SERVICE["getSnsCode"]({ phone: this.loginForm.phone })
        .then(() => {
          this.isSendVerifyCode = true;
          this.computedTime = 60;
          // 60秒倒计时，60秒后可以重新获取验证码
          this.timer = window.setInterval(() => {
            this.computedTime--;
            if (this.computedTime === 0) {
              this.isSendVerifyCode = false;
              window.clearInterval(this.timer);
            }
          }, 1000);
        })
        .catch(() => {
          this.isSendVerifyCode = false;
          console.log("手机验证码获取失败");
        });
    }

    private destroyed() {
      window.clearInterval(this.timer);
    }
  }
</script>

<style lang="scss" scoped>
  .login-form {
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
</style>
