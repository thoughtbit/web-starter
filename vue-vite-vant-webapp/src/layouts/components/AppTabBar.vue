<template>
  <div>
    <van-tabbar v-model="activeIndex" @change="onChangeTabbar">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search" dot>搜索</van-tabbar-item>
      <van-tabbar-item icon="friends-o" badge="5">社区</van-tabbar-item>
      <van-tabbar-item icon="setting-o" badge="3">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";
import { Tabbar, TabbarItem } from "vant";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AppTabBar",
  props: {
    active: {
      type: Number,
      default: 0,
    },
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  setup(props) {
    const { active } = toRefs(props);
    const activeIndex = ref(0);
    const router = useRouter();

    // @ts-ignore
    activeIndex.value = active;

    function onChangeTabbar() {
      switch (activeIndex.value) {
        case 0:
          return router.push("/");
        case 1:
          return router.push("/tabTwo");
        case 2:
          return router.push("/tabThree");
        case 3:
          return router.push("/tabFour");
        default:
          return true;
      }
    }
    return {
      activeIndex,
      onChangeTabbar,
    };
  },
});
</script>

<style lang="scss" scoped></style>
