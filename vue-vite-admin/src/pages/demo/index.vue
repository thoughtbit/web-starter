<template>
  <main class="page page-demo" role="main">
    <h2 class="title">{{ title }}</h2>
    <svg-icon name="user" color="#fa233b" />
    {{ token }}
    <div class="row row-center">
      <div class="col-12">22</div>
      <div class="col-12">22</div>
    </div>
    <van-button type="success" @click="handleChangeState">触发 stores state 更新</van-button>
    <div v-if="loading">数据加载中....</div>

    <h3>mock data</h3>
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item.name }} -- {{ item.email }}</li>
    </ul>

    <h3>dev data</h3>
    <ul>
      <li v-for="(item, index) in list_d" :key="index">{{ item.name }} -- {{ item.email }}</li>
    </ul>
  </main>
  <app-tab-bar />
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useRequest } from "vue-request";
import { useStore } from "@/store";
import { api } from "@/services";

export default defineComponent({
  name: "HealthPage",
  setup() {
    const { t } = useI18n();
    const { user } = useStore();

    // const token = computed(() => {
    //   return user.token;
    // })

    // const { token } = user; // TODO: 静态对象,  使用 storeToRefs 包裹转换成 响应式对象, 推荐使用storeToRefs转换
    const { token } = storeToRefs(user);

    const { data, loading } = useRequest(api.getUsers());

    const handleChangeState = () => {
      // // 方式一: 直接更改状态
      // user.token = "19MD256dphg72Sxcg7ks=";
      // // 方式二: 如果需要修改多个状态数据, 建议使用 $patch 批量更新
      // user.$patch({
      //   token: "39MD256dphg72Sxcg7ks=",
      //   userInfo: {
      //     username: "moocss",
      //   }
      // });
      // // 方式三: 更好的批量更新的方式: $patch 一个函数
      // user.$patch((state: any)=>{
      //   state.token = "e9MD256dphg72Sxcg7ks",
      //   state.userInfo = {
      //     username: "moocss",
      //   }
      // });

      // 方式四: 逻辑比较多可以封装到 actions 做处理
      user.setToken("o5w0hoYeIWzMsxxCXKMdkZfveu2BLRXY");
    };

    const list = computed(() => data.value?.data.list || []);

    const list_d = computed(() => data.value?.data || []);

    const title = t("demo.user.info");

    return {
      token,
      handleChangeState,
      loading,
      list,
      list_d,
      title,
    };
  },
});
</script>

<style lang="scss" scoped>
.page {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: var(--van-nav-bar-height);
  bottom: var(--van-tabbar-height);
  right: 0;
  padding: 24px;
  &-demo {
    font-size: 28px;
  }
}
</style>
