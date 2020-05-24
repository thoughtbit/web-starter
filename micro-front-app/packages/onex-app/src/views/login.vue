<template>
  <section class="login-container">
    <el-button type="primary" @click.native.prevent="login">登录</el-button>
  </section>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { Component, Vue } from "vue-property-decorator";
import VueRouter from "vue-router";
import { actions } from "@/shared/store";

@Component
export default class Login extends Vue {
  $router!: VueRouter;

  // `mounted` 是 Vue 的生命周期钩子函数，在组件挂载时执行
  mounted() {
    // 注册一个观察者函数
    actions.onGlobalStateChange((state, prevState) => {
      // state: 变更后的状态; prevState: 变更前的状态
      console.log("主应用观察者：token 改变前的值为 ", prevState.token);
      console.log(
        "主应用观察者：登录状态发生改变，改变后的 token 的值为 ",
        state.token
      );

      this.$router.push("/");
    });
  }

  async login() {
    const result = await axios
      .post("/login", {
        username: "admin",
        password: "123456"
      })
      .then((res: AxiosResponse) => {
        if (!res.data.data) {
          return;
        }
        return res.data.data;
      })
      .then((data: any) => {
        console.log("data:", data);
        if (!data) {
          return;
        }
        // 登录成功后，设置 token
        actions.setGlobalState({ token: data.access_token });
      });
  }
}
</script>

<style lang="scss" scoped></style>
