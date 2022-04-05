<template>
  <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" label-position="left">
    <el-form-item prop="username">
      <el-tooltip class="item" effect="dark" placement="top-start">
        <template slot="content">
          设置后不可更改, 中英文均可, 最多20字符
        </template>
        <el-input
          clearable
          ref="username"
          v-model="registerForm.username"
          :placeholder="$t('register.username')"
          name="username"
          type="text"
          tabindex="1"
          maxlength="20"
          prefix-icon="el-icon-user"
          autocomplete="off"
          @keyup.enter.native="handleRegister"
        />
      </el-tooltip>
    </el-form-item>
    <el-form-item prop="password">
      <el-tooltip class="item" effect="dark" placement="top-start">
        <template slot="content">
          长度最好为8~20位字符<br />
          字母/数字以及标点符号至少包含2种<br />不允许有空格或中文字符
        </template>
        <el-input
          clearable
          ref="password"
          v-model="registerForm.password"
          :placeholder="$t('register.password')"
          :show-password="true"
          name="password"
          type="password"
          maxlength="16"
          minlength="8"
          tabindex="2"
          autocomplete="off"
          prefix-icon="el-icon-key"
          @keyup.enter.native="handleRegister"
        />
      </el-tooltip>
    </el-form-item>
    <el-form-item prop="repassword">
      <el-input
        clearable
        ref="repassword"
        v-model="registerForm.repassword"
        :placeholder="$t('register.repassword')"
        :show-password="true"
        name="repassword"
        type="password"
        maxlength="16"
        minlength="8"
        tabindex="3"
        autocomplete="off"
        prefix-icon="el-icon-key"
        @keyup.enter.native="handleRegister"
      />
    </el-form-item>
    <div class="el-form-item-title">
      <span>手机信息</span>
    </div>
    <el-form-item prop="phone">
      <el-input
        clearable
        ref="phone"
        v-model="registerForm.phone"
        :placeholder="$t('register.phone')"
        name="phone"
        type="text"
        tabindex="4"
        minlength="11"
        maxlength="20"
        prefix-icon="el-icon-mobile-phone"
        autocomplete="off"
        @keyup.enter.native="handleRegister"
      />
    </el-form-item>
    <el-form-item prop="code">
      <el-input
        clearable
        ref="code"
        v-model="registerForm.code"
        :placeholder="$t('register.code')"
        name="code"
        type="text"
        tabindex="5"
        maxlength="5"
        prefix-icon="el-icon-c-scale-to-original"
        autocomplete="off"
        @keyup.enter.native="handleRegister"
        class="el-input-code"
      >
        <el-button
          slot="append"
          :disabled="isSendVerifyCode"
          tabindex="6"
          type="text"
          class="verify-code-btn"
          @click.native.prevent="handleSendVerifyCode"
        >
          {{ (!isSendVerifyCode && "发送验证码") || computedTime + "秒后重发" }}
        </el-button>
      </el-input>
    </el-form-item>
    <el-form-item prop="isAgree">
      <el-checkbox name="isAgree" v-model="registerForm.isAgree">
        阅读并接受 <a href="javascript:;">《用户协议》</a>及 <a href="javascript:;">《隐私权保护声明》</a>
      </el-checkbox>
    </el-form-item>
    <div class="register-action">
      <el-button :loading="loading" type="primary" class="login-btn" @click.native.prevent="handleRegister">{{
        $t("register.sumbitBtn")
      }}</el-button>
      <el-button @click="resetRegisterForm()">重置</el-button>
    </div>
    <router-link to="/login" class="goto-login-link"><ui-icon icon-class="arrow-left-outlined" class="xl" />已有账号, 立即登录</router-link>
  </el-form>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import SERVICE from "@/core/lib/service";
  import { isValidateMobile, validMobile } from "@/utils/validation";

  interface User {
    username: string | any[];
    password: string | any[];
    repassword: string | any[];
    phone: string | any[];
    code: string | any[];
    isAgree: boolean | any[];
  }

  @Component
  export default class UserRegister extends Vue {
    private timer: any;
    private registerForm = <User>{
      username: "",
      password: "",
      repassword: "",
      phone: "18088888888",
      code: "",
      isAgree: false
    };

    private validatePhone = (rule: any, value: string, callback: any): void => {
      if (isValidateMobile(value)[0]) {
        callback(new Error(isValidateMobile(value)[1]));
      } else {
        callback();
      }
    };

    private validateAgree = (rule: any, value: string, callback: any): void => {
      if (value) {
        callback();
      } else {
        callback(new Error("请同意并阅读用户协议和隐私"));
      }
    };
    private validatePassword = (rule: any, value: string, callback: any): void => {
      if (value === "") {
        callback(new Error("请输入登录密码"));
      } else {
        if (this.registerForm.repassword !== "") {
          this.$refs.registerForm.validateField("repassword");
        }
        callback();
      }
    };
    private validateRePassword = (rule: any, value: string, callback: any): void => {
      if (value === "") {
        callback(new Error("请再次输入确认密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    private registerRules = <Register>{
      username: [
        { required: true, trigger: "blur", message: "请输入用户名" },
        { min: 2, message: "用户名长度最少为2位", trigger: "blur" }
      ],
      password: [
        { required: true, trigger: "blur", validator: this.validatePassword },
        { min: 8, max: 16, message: "登录密码长度最少为8位, 最多16位", trigger: "blur" }
      ],
      repassword: [
        { required: true, trigger: "blur", validator: this.validateRePassword },
        { min: 8, max: 16, message: "确认密码长度最少为8位, 最多16位", trigger: "blur" }
      ],
      phone: [{ required: true, trigger: "blur", validator: this.validatePhone }],
      code: [
        { required: true, trigger: "blur", message: "请输入验证码" },
        { min: 5, message: "验证码长度最少为5位", trigger: "blur" }
      ],
      isAgree: [{ required: true, trigger: "change", validator: this.validateAgree }]
    };

    private loading: boolean = false;

    private computedTime: number = 0;
    private isSendVerifyCode: boolean = false;

    private mounted() {
      if (this.registerForm.username === "") {
        // @ts-ignore
        this.$refs.username.focus();
      } else if (this.registerForm.password === "") {
        // @ts-ignore
        this.$refs.password.focus();
      } else if (this.registerForm.repassword === "") {
        // @ts-ignore
        this.$refs.repassword.focus();
      } else if (this.registerForm.phone === "") {
        // @ts-ignore
        this.$refs.phone.focus();
      } else if (this.registerForm.code === "") {
        // @ts-ignore
        this.$refs.code.focus();
      }
    }

    private handleRegister(): void {
      // @ts-ignore
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          SERVICE["signup"](this.registerForm)
            .then(() => {
              this.$router.push({ path: "/login" });
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

    resetRegisterForm() {
      this.$refs.registerForm.resetFields();
    }

    private handleSendVerifyCode() {
      if (!validMobile(this.registerForm.phone)) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "手机号码不能为空"
        });
        this.$refs.registerForm.validateField("phone");
        return false;
      }

      SERVICE["getSnsCode"]({ phone: this.registerForm.phone })
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
  .register-form {
    .verify-code-btn{
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
    .register-action {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .el-button {
        flex: 1;
      }
    }
  }

  .el-form-item-title {
    position: relative;
    text-align: center;
    margin-bottom: 22px;
    color: #999;
    font-size: 14px;
    span {
      position: relative;
      z-index: 2;
      background-color: #fff;
      line-height: 22px;
      padding: 10px 20px;
    }
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 0;
      margin-top: -1px;
      border-bottom: 1px solid #e5e5e5;
      color: #1890ff;
      z-index: 1;
    }
  }
  .register-action {
    margin-bottom: 20px;
  }
  .goto-login-link {
    display: block;
    color: #409eff;
    line-height: 22px;
    padding: 10px;
    text-align: center;
    .ui-icon {
      vertical-align: top;
    }
    &:hover {
      color: #0587f8;
    }
  }
</style>
