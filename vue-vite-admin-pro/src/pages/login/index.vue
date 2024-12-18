<template>
  <div class="page page-login">
    <login-header />
    <div class="login-container">
      <div class="hd">
        <h1 class="title">欢迎来到</h1>
        <h1 class="title">{{ APP_NAME }}</h1>
        <div class="sub-title">
          <p class="tip">{{ type == "register" ? "已有账号?" : "没有账号吗?" }}</p>
          <p class="tip" @click="switchType(type == 'register' ? 'login' : 'register')">
            {{ type == "register" ? "登录" : "注册新账号" }}
          </p>
        </div>
      </div>
      <div class="bd">
        <login v-if="type === 'login'" />
        <register v-else @register-success="switchType('login')" />
      </div>
    </div>
    <footer class="copyright">Copyright &copy; 2022-2024. All Rights Reserved</footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { APP_NAME } from "@/constants";
import LoginHeader from "./components/header.vue";
import Login from "./components/login.vue";
import Register from "./components/register.vue";

export default defineComponent({
  name: "LoginPage",
  components: {
    LoginHeader,
    Login,
    Register,
  },
  setup() {
    const type = ref("login");
    const switchType = (val: string) => {
      type.value = val;
    };
    return {
      APP_NAME,
      type,
      switchType,
    };
  },
});
</script>

<style lang="scss" scoped>
.page {
  &-login {
    position: relative;
    height: 100%;
    background: #f8fbff url("@/assets/images/login/login_bg.png") no-repeat 50% 50%;
    background-size: cover;
    .login-container {
      position: absolute;
      top: 22%;
      left: 50%;
      margin-left: -210px;
      width: 420px;
      padding: 30px;

      border-radius: 8px;
      background-color: rgba(255, 255, 255, 0.6);
      background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
      // background-image: linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);
      .hd {
        margin-bottom: 20px;
        .title {
          line-height: 36px;
          font-size: 28px;
        }
        .sub-title {
          display: flex;
          padding-top: 20px;
          line-height: 22px;

          .tip {
            color: #888;
            margin-right: 10px;
            &:last-child {
              color: #333;
              cursor: pointer;
              &:hover {
                color: #14b5a7;
              }
            }
          }
        }
      }
    }
    .copyright {
      position: absolute;
      left: 0;
      bottom: 10px;
      width: 100%;
      text-align: center;
      line-height: 22px;
      padding: 10px 20px;
      color: #505050;
    }
  }
}
</style>
