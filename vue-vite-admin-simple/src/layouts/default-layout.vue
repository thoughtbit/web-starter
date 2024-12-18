<template>
  <layout-header />
  <router-view v-if="isRouteShow" v-slot="{ Component, route }">
    <transition name="fade" mode="out-in" appear>
      <component :is="Component" :key="route.fullPath" />
    </transition>
  </router-view>
  <layout-footer />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/stores";
import LayoutHeader from "@/layouts/components/layout-header.vue";
import LayoutFooter from "@/layouts/components/layout-footer.vue";

export default defineComponent({
  name: "Layout",
  components: {
    LayoutHeader,
    LayoutFooter,
  },
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
