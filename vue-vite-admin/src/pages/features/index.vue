<template>
  <nav class="nav">
    <app-link v-for="(item, index) in nav" :key="index" class="menu-link" :name="item.name" :params="{}">
      {{ item.title }}
    </app-link>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";

const nav = ref([
  {
    name: "player",
    title: "Teleport 悬浮视频播放器",
  },
  {
    name: "async-component",
    title: "defineAsyncComponent 异步组件按需加载",
  },
  {
    name: "dynamic-component",
    title: "动态加载组件",
  },
  {
    name: "suspense",
    title: "Suspense 实现骨架屏加载",
  },
  {
    name: "custom-ref",
    title: "customRef 实现敏感词替换",
  },
]);
</script>

<style lang="scss" scoped>
.nav {
  @apply flex flex-col justify-center items-center;
  .menu-link {
    margin: 0 10px;
    padding: 10px 0;
    color: #333;
    &:hover {
      color: #ff2233;
    }
  }
}
</style>
