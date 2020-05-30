<template>
  <el-form ref="forgotForm" :model="forgotForm" :rules="forgotRules" class="forgot-form" label-position="left">
    <div class="el-form-item-tip">
      如果您的账号可通过邮箱登录，请输入邮箱重设登录密码
    </div>
    <el-form-item prop="email">
      <el-input
          clearable
          ref="email"
          v-model="forgotForm.email"
          :placeholder="$t('forgot.email')"
          name="email"
          type="text"
          tabindex="1"
          maxlength="20"
          prefix-icon="el-icon-message"
          autocomplete="off"
          @keyup.enter.native="handleforgot"
      />
    </el-form-item>
    <el-form-item prop="code">
      <el-input
          clearable
          ref="code"
          v-model="forgotForm.code"
          :placeholder="$t('forgot.code')"
          name="code"
          type="text"
          tabindex="5"
          maxlength="5"
          prefix-icon="el-icon-c-scale-to-original"
          autocomplete="off"
          @keyup.enter.native="handleforgot"
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

          {{ (!isSendVerifyCode && "发送验证邮件") || "验证邮件发送中..." }}
        </el-button>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-tooltip class="item" effect="dark" placement="top-start">
        <template slot="content">
          长度最好为6~20个字符<br />
          字母/数字以及标点符号至少包含2种<br />不允许有空格或中文字符
        </template>
        <el-input
            clearable
            ref="password"
            v-model="forgotForm.password"
            :placeholder="$t('forgot.password')"
            :show-password="true"
            name="password"
            type="password"
            maxlength="16"
            minlength="8"
            tabindex="2"
            autocomplete="off"
            prefix-icon="el-icon-key"
            @keyup.enter.native="handleforgot"
        />
      </el-tooltip>
    </el-form-item>
    <el-form-item prop="repassword">
      <el-input
          clearable
          ref="repassword"
          v-model="forgotForm.repassword"
          :placeholder="$t('forgot.repassword')"
          :show-password="true"
          name="repassword"
          type="password"
          maxlength="16"
          minlength="8"
          tabindex="3"
          autocomplete="off"
          prefix-icon="el-icon-key"
          @keyup.enter.native="handleforgot"
      />
    </el-form-item>
    <div class="forgot-action">
      <el-button :loading="loading" type="primary" class="login-btn" @click.native.prevent="handleforgot">{{
        $t("forgot.sumbitBtn")
        }}</el-button>
      <el-button @click="resetForgotForm()">重置</el-button>
    </div>
    <router-link to="/login" class="goto-login-link"><ui-icon icon-class="arrow-left-outlined" class="xl" />已有账号, 立即登录</router-link>
  </el-form>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import SERVICE from "@/core/lib/sevice";
  import { isValidateMobile, isValidateEmail, validMobile, validEmail } from "@/utils/validation";

  interface User {
    email: string | any[];
    password: string | any[];
    repassword: string | any[];
    phone: string | any[];
    code: string | any[];
    isAgree: boolean | any[];
  }

  @Component
  export default class EmailForgot extends Vue {
    private timer: any;
    private forgotForm = <User>{
      email: "",
      password: "",
      repassword: "",
      code: ""
    };

    private validateEmail = (rule: any, value: string, callback: any): void => {
      if (isValidateMobile(value)[0]) {
        callback(new Error(isValidateEmail(value)[1]));
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
        if (this.forgotForm.repassword !== "") {
          this.$refs.forgotForm.validateField("repassword");
        }
        callback();
      }
    };
    private validateRePassword = (rule: any, value: string, callback: any): void => {
      if (value === "") {
        callback(new Error("请再次输入确认密码"));
      } else if (value !== this.forgotForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    private forgotRules = <User>{
      email: [{ required: true, trigger: "blur", message: "请输入邮箱地址" }],
      code: [
        { required: true, trigger: "blur", message: "请输入验证码" },
        { min: 5, message: "验证码长度最少为5位", trigger: "blur" }
      ],
      password: [
        { required: true, trigger: "blur", validator: this.validatePassword },
        { min: 8, max: 16, message: "登录密码长度最少为8位, 最多16位", trigger: "blur" }
      ],
      repassword: [
        { required: true, trigger: "blur", validator: this.validateRePassword },
        { min: 8, max: 16, message: "确认密码长度最少为8位, 最多16位", trigger: "blur" }
      ],
      isAgree: [{ required: true, trigger: "change", validator: this.validateAgree }]
    };

    private loading: boolean = false;

    private computedTime: number = 0;
    private isSendVerifyCode: boolean = false;

    private mounted() {
      if (this.forgotForm.email === "") {
        // @ts-ignore
        this.$refs.username.focus();
      } else if (this.forgotForm.code === "") {
        // @ts-ignore
        this.$refs.code.focus();
      } else if (this.forgotForm.password === "") {
        // @ts-ignore
        this.$refs.password.focus();
      } else if (this.forgotForm.repassword === "") {
        // @ts-ignore
        this.$refs.repassword.focus();
      }
    }

    private handleforgot(): void {
      // @ts-ignore
      this.$refs.forgotForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          SERVICE["forgot"](this.forgotForm)
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

    resetForgotForm() {
      this.$refs.forgotForm.resetFields();
    }

    private handleSendVerifyCode() {
      if (!validEmail(this.forgotForm.email)) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "请输入正确的邮箱地址"
        });
        this.$refs.forgotForm.validateField("email");
        return false;
      }

      SERVICE["getEmailCode"]({ phone: this.forgotForm.phone })
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
          console.log("");
        });
    }

    private destroyed() {
      window.clearInterval(this.timer);
    }
  }
</script>

<style lang="scss" scoped>
  .forgot-form {
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
    .forgot-action {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .el-button {
        flex: 1;
      }
    }
  }
  .el-form-item-tip {
    text-align: center;
    font-size: 14px;
    color: #999;
    padding: 10px;
    line-height: 20px;
    margin-bottom: 20px;
  }
  .forgot-action {
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

