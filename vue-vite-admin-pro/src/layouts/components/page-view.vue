<template>
  <router-view v-slot="{ Component, route }">
    <transition appear name="fade">
      <component :is="Component" v-if="route.meta.ignoreCache" :key="route.fullPath" />
      <keep-alive v-else :include="cacheList">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "PageView",
  setup() {
    const { tabbar } = useStore();
    const cacheList = computed(() => tabbar.getCacheList);
    return {
      cacheList,
    };
  },
});
</script>

<style lang="scss" scoped>
.fade-leave-active,
.fade-enter-active {
  transition: all 0.2s;
}
.fade-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
