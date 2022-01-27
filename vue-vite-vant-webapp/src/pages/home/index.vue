<template>
  <main class="page page-home" role="main">
    <van-tabs v-model="data.active" scrollspy sticky>
      <van-tab v-for="(item, index) in data.list" :key="index" :title="item.title">
        <div style="text-align: center">
          {{ item.title }}
        </div>
        <div style="margin: 20px 0">
          {{ item.desc }}
        </div>
      </van-tab>
    </van-tabs>
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" @click="sorry"> 客服 </van-action-bar-icon>
      <van-action-bar-icon icon="cart-o" @click="onClickCart"> 购物车 </van-action-bar-icon>
      <van-action-bar-button type="warning" @click="sorry"> 加入购物车 </van-action-bar-button>
      <van-action-bar-button type="danger" @click="sorry"> 立即购买 </van-action-bar-button>
    </van-action-bar>
  </main>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Button, Tab, Tabs, ActionBar, ActionBarIcon, ActionBarButton, Toast } from "vant";
import { useState } from "@/hooks";
export default defineComponent({
  name: "HealthPage",
  components: {
    [Button.name]: Button,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [ActionBar.name]: ActionBar,
    [ActionBarIcon.name]: ActionBarIcon,
    [ActionBarButton.name]: ActionBarButton,
  },
  setup() {
    const router = useRouter();
    const [state, setState] = useState<any>({});

    setState({
      active: 0,
      list: [
        {
          title: "标题a",
          desc: "标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容标题a内容",
        },
        {
          title: "标题b",
          desc: "标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题bb标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b标题b",
        },
        {
          title: "标题c",
          desc: "标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c标题c",
        },
      ],
    });

    onMounted(() => {});

    const onClickCart = () => {
      router.push("cart");
    };

    const sorry = () => {
      Toast("暂无后续逻辑~");
    };

    return {
      data: state,
      onClickCart,
      sorry,
    };
  },
});
</script>

<style lang="scss" scoped>
.page {
  &-home {
    display: flex;
    flex-direction: column;
  }
}
</style>
