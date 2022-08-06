<template>
  <div class="tabbar-container">
    <span
      v-for="(tab, index) in tabList"
      :key="tab.fullPath"
      class="tab"
      :class="{ 'on': tab.fullPath === $route.fullPath }"
      @click="goto(tab)"
    >
      <span class="tab-name">
        {{ tab.title }}
      </span>
      <span class="tab-close" @click.stop="tagClose(tab, index)"> x </span>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import type { RouteLocationNormalized } from "vue-router";
import { listenerRouteChange } from "@/utils/route-listener";
import { useStore } from "@/store";

export default defineComponent({
  name: "TabBar",
  setup() {
    const router = useRouter();
    const { tabbar } = useStore();

    const tabList = computed(() => {
      return tabbar.getTabList;
    });

    listenerRouteChange((route: RouteLocationNormalized) => {
      if (!route.meta.noAffix && !tabList.value.some((tag: any) => tag.fullPath === route.fullPath)) {
        tabbar.updateTabList(route);
      }
    }, true);

    const tagClose = (tag: any, idx: number) => {
      tabbar.deleteTag(idx, tag);
      if (idx === tabList.value.length) {
        const latest = tabList.value[tabList.value.length - 1];
        router.push({ name: latest.name });
      }
    };
    const goto = (tag: any) => {
      router.push({ ...tag });
    };

    return {
      tabList,
      tagClose,
      goto,
    };
  },
});
</script>

<style scoped lang="less">
.tabbar-container {
}
</style>
