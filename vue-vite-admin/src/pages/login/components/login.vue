<template>
  <el-form ref="loginFormRef" :model="formData" :rules="formRules" class="login-form" autocomplete="on">
    <template v-if="type == 'password'">
      <div class="form-item-group">
        <el-form-item prop="username">
          <el-input
            ref="usernameRef"
            v-model="formData.username"
            placeholder="请输入登录账号"
            text
            tabindex="1"
            autocomplete="on"
            size="large"
          >
            <template #prefix>
              <el-icon :size="24">
                <svg-icon name="user-o" />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            ref="passwordRef"
            v-model="formData.password"
            :type="passwordType"
            placeholder="请输入登录密码"
            tabindex="2"
            autocomplete="on"
            @keyup.enter="submitForm(loginFormRef)"
            size="large"
          >
            <template #prefix>
              <el-icon :size="24">
                <svg-icon name="lock" />
              </el-icon>
            </template>
            <template #suffix>
              <el-icon @click="showPassword" :size="24">
                <svg-icon :name="passwordType === 'password' ? 'eye-off' : 'eye'" />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </div>
      <div class="form-item-addition">
        <el-checkbox v-model="formData.remember">记住账号</el-checkbox>
        <el-link type="primary" :underline="false" @click="switchType('reset')">忘记账号?</el-link>
      </div>
      <div class="form-item-action">
        <el-button :loading="loading" type="primary" size="large" @click.prevent="submitForm(loginFormRef)"
          >登录</el-button
        >
        <el-button @click="resetForm(loginFormRef)" size="large">重置</el-button>
      </div>
    </template>

    <template v-else-if="type == 'reset'">
      <div class="form-item-group">
        <el-form-item prop="username">
          <el-input
            ref="usernameRef"
            v-model="formData.username"
            placeholder="请输入手机号"
            tabindex="1"
            autocomplete="on"
          >
            <template #prefix>
              <el-icon>
                <svg-icon name="user" />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input
            ref="captchaRef"
            v-model="formData.captcha"
            placeholder="输入短信验证码"
            tabindex="2"
            autocomplete="on"
          >
            <template #prefix>
              <el-icon>
                <svg-icon name="user" />
              </el-icon>
            </template>
            <template #append>
              <el-button :disabled="countDown > 0" @click="handleCounter" style="width: 120px; padding: 0;">
                {{ countDown == 0 ? "发送验证码" : `${countDown}秒后可重发` }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="newpassword">
          <el-input
            ref="newpasswordRef"
            v-model="formData.newpassword"
            :type="passwordType"
            placeholder="请输入新密码"
            tabindex="3"
            autocomplete="on"
          >
            <template #prefix>
              <el-icon>
                <svg-icon name="user" />
              </el-icon>
            </template>
            <template #suffix>
              <el-icon>
                <svg-icon :name="passwordType === 'password' ? 'eye' : 'eye-open'" @click="showPassword" />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </div>

      <div class="form-item-action">
        <el-button :loading="loading" type="primary" size="large" @click.prevent="submitForm(loginFormRef)">找回密码</el-button>
        <el-button @click="resetForm(loginFormRef)" size="large">重置</el-button>
      </div>
    </template>

    <!-- 扫码登陆 -->
    <template v-else-if="type == 'qrcode'">
      <div class="qrcode-login">微信登录, 开发中...</div>
    </template>

    <!-- 手机号登陆 -->
    <template v-else>
      <div class="phone-login">手机号登陆, 开发中...</div>
    </template>

    <div class="switch-container">
      <el-button link v-if="type !== 'password'" @click="switchType('password')">账号密码登录</el-button>
      <el-button link v-if="type !== 'phone'" @click="switchType('phone')">手机号登录</el-button>
      <el-button link v-if="type !== 'qrcode'" @click="switchType('qrcode')">微信扫码登录</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, nextTick } from "vue";
import { ElMessage } from "element-plus";
import type { ElForm } from "element-plus";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { useCounter, useLoading } from "@/hooks";

type FormInstance = InstanceType<typeof ElForm>;

// 处理登录逻辑
const useLoginEffect = () => {
  const router = useRouter();
  const { user, menu } = useStore();
  const { loading, setLoading } = useLoading();

  const type = ref("password");
  const passwordType = ref("password");
  const loginFormRef = ref<FormInstance>();
  const passwordRef = ref<any>();

  const formData = reactive({
    phone: "",
    username: "",
    password: "",
    newpassword: "",
    captcha: "",
    remember: false,
  });
  const formRules = reactive({
    username: [{ required: true, trigger: "blur", message: "账号必填" }],
    password: [
      { required: true, trigger: "blur", message: "密码必填" },
      { min: 6, max: 18, trigger: "blur", message: "密码长度为6到18位" },
    ],
    newpassword: [{ required: true, trigger: "blur", message: "请输入新密码" }],
    phone: [{ required: true, trigger: "blur", message: "手机号必填" }],
    captcha: [{ required: true, trigger: "blur", message: "验证码必填" }],
  });

  const handleLogin = async () => {
    setLoading(true);
    await user
      .login(formData)
      .then((result: any) => {
        setLoading(false);
        if (result.code == 0) {
          // 登录成功之后清除上个账号的 menulist 数据
          menu.setMenuList([]);
          ElMessage.success("登录成功！");
          router.push({ name: "home" });
        } else {
          ElMessage.error(`${result.message}`);
        }
      })
      .catch((error: any) => {
        setLoading(false);
        ElMessage.error("登录失败！");
      });
  };

  // 重置表单
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
  };

  // 提交表单
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async (valid) => {
      if (valid) {
        handleLogin();
      }
    });
  };

  const showPassword = () => {
    passwordType.value = passwordType.value === "password" ? "" : "password";
    nextTick(() => {
      passwordRef.value.focus();
    });
  };

  const switchType = (val: string) => {
    type.value = val;
  };

  return {
    loginFormRef,
    passwordRef,
    formData,
    formRules,
    type,
    passwordType,
    showPassword,
    switchType,
    submitForm,
    resetForm,
    loading,
  };
};

export default defineComponent({
  name: "Login",
  setup() {
    const {
      loading,
      type,
      passwordRef,
      loginFormRef,
      formData,
      formRules,
      passwordType,
      submitForm,
      resetForm,
      showPassword,
      switchType,
    } = useLoginEffect();

    const [countDown, handleCounter] = useCounter();

    return {
      type,
      loginFormRef,
      passwordRef,
      formData,
      formRules,
      passwordType,
      showPassword,
      switchType,
      loading,
      submitForm,
      resetForm,
      countDown,
      handleCounter,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-form {
  .form-item-group {
    .el-form-item {
      margin-bottom: 30px;
    }
  }
  .form-item-addition,
  .form-item-action {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .form-item-action {
    margin-bottom: 30px;
    :deep(.el-button) {
      width: 45%;
    }
  }
  .switch-container {
    :deep(.el-button) {
      font-weight: normal;
    }
  }
  .qrcode-login,
  .phone-login {
    line-height: 22px;
    background-color: #fff;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 30px;
  }
}
</style>
