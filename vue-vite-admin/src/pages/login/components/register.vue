<template>
  <el-form ref="registerFormRef" :model="formData" :rules="formRules" class="register-form" autocomplete="on">
    <div class="form-item-group">
      <el-form-item prop="phone">
        <el-input ref="phoneRef" v-model="formData.phone" placeholder="请输入手机号" tabindex="1" autocomplete="on">
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
          placeholder="请输入短信验证码"
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
      <el-form-item prop="password">
        <el-input
          ref="passwordRef"
          v-model="formData.password"
          :type="passwordType"
          placeholder="请输入密码"
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
      <el-form-item prop="repassword">
        <el-input
          ref="repasswordRef"
          v-model="formData.repassword"
          :type="passwordType"
          placeholder="请再次输入密码"
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
      <el-button :loading="loading" type="primary" size="large" @click.prevent="submitForm(registerFormRef)"
        >注册</el-button
      >
      <el-button @click="resetForm(registerFormRef)" size="large">重置</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, nextTick } from "vue";
import { ElMessage } from "element-plus";
import type { ElForm } from "element-plus";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { useLoading, useCounter } from "@/hooks";

type FormInstance = InstanceType<typeof ElForm>;

// 处理登录逻辑
const useRegisterEffect = (emit: any) => {
  const router = useRouter();
  const { user } = useStore();
  const { loading, setLoading } = useLoading();

  const type = ref("password");
  const passwordType = ref("password");
  const registerFormRef = ref<FormInstance>();
  const passwordRef = ref<any>();

  const formData = reactive({
    phone: "",
    password: "",
    repassword: "",
    captcha: "",
  });
  const formRules = reactive({
    password: [
      { required: true, trigger: "blur", message: "密码必填" },
      { min: 6, max: 18, trigger: "blur", message: "密码长度为6到18位" },
    ],
    repassword: [
      { required: true, trigger: "blur", message: "请再次输入密码" },
      {
        validator: (rule: any, value: any, callback: any) => {
          if (value !== formData.password) {
            callback(new Error("两次输入的密码不一致"));
          } else {
            callback();
          }
        },
      },
    ],
    phone: [{ required: true, trigger: "blur", message: "手机号必填" }],
    captcha: [{ required: true, trigger: "blur", message: "验证码必填" }],
  });

  const handleRegister = async () => {
    setLoading(true);
    await user
      .register(formData)
      .then((result: any) => {
        setLoading(false);
        if (result.code == 0) {
          ElMessage.success("注册成功");
          emit("registerSuccess");
        } else {
          ElMessage.error(`${result.message}`);
        }
      })
      .catch((error: any) => {
        setLoading(false);
        ElMessage.error("注册失败!");
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
        handleRegister();
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
    registerFormRef,
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
  name: "Register",
  emits: ["registerSuccess"],
  setup(props, { emit }) {
    const {
      loading,
      type,
      passwordRef,
      registerFormRef,
      formData,
      formRules,
      passwordType,
      submitForm,
      resetForm,
      showPassword,
      switchType,
    } = useRegisterEffect(emit);

    const [countDown, handleCounter] = useCounter();

    return {
      type,
      registerFormRef,
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
.register-form {
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
  .qrcode-register,
  .phone-register {
    line-height: 22px;
    background-color: #fff;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 30px;
  }
}
</style>
