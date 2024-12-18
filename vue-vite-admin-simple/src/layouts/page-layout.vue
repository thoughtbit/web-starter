<template>
  <router-view v-if="isRouteShow" v-slot="{ Component, route }">
    <transition name="fade" mode="out-in" appear>
      <component :is="Component" :key="route.fullPath" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/stores";

export default defineComponent({
  name: "Layout",
  setup() {
    const { app } = useStore();
    // 路由强制刷新
    const isRouteShow = computed(() => app.isRouteShow);

    return {
      isRouteShow,
    };
  },
});
</script>
