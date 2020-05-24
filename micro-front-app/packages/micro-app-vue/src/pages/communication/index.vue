<template>
  <section class="communication-container">
    <a-card :title="`欢迎你，${userInfo.nickname}`">
      <section class="container">
        <div>
          <a-avatar :size="50" :src="userInfo.avatar_url" />
        </div>
        <div>
          <span>用户名：</span>
          {{userInfo.nickname}}
        </div>
        <div>
          <span>性别：</span>
          {{userInfo.gender ? "男" : "女"}}
        </div>
      </section>
    </a-card>
  </section>
</template>
<script>
import axios from "axios";
// 引入 actions 实例
import actions from "@/shared/actions";

export default {
  name: "Communication",

  data() {
    return {
      userInfo: {}
    };
  },

  mounted() {
    // 添加观察者
    // onGlobalStateChange 第二个入参为 true，代表立即执行一次观察者函数
    actions.onGlobalStateChange(state => {
      const { token } = state;
      // 未登录 - 返回主页
      if (!token) {
        this.$message.error("未检测到登录信息！");
        return this.$router.push("/");
      }
      // 获取用户信息
      this.getUserInfo(token);
    }, true);
  },

  methods: {
    async getUserInfo(token) {
      await axios.get(
          "/user",
          {
            headers: {
              "Authorization": token,
            }
          }
        )
        .then((res) => {
          if (!res.data.data) {
            return;
          }
          return res.data.data;
        })
        .then((data) => {
          console.log("data:", data);
          if (!data) {
            return;
          }
          // 登录成功后，设置 token
          this.userInfo = data;
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/styles/flex.less";
.communication-container {
  .container {
    .flex-center;
    padding-top: 30px;
    flex-wrap: wrap;
    div {
      width: 100%;
      margin: 10px;
      text-align: center;
      font-size: 16px;
      span {
        font-weight: bold;
      }
    }
  }
}
</style>
