<template>
  <div class="page-breadcrumb">
    <div class="breadcrumb-title">您现在所在位置:</div>
    <el-breadcrumb separator-icon="ArrowRight" class="breadcrumb">
      <transition-group name="breadcrumb" mode="out-in">
        <el-breadcrumb-item :to="{ path: '/' }" key="home">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in matched" :key="item.path" :to="{ path: item.path }">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "PageBreadcrumb",
  setup() {
    const route = useRoute();
    const matched = computed(() =>
      route.matched.filter((item) => item.meta && item.meta.title && item.meta.title !== "首页")
    );

    return {
      matched,
    };
  },
});
</script>

<style lang="scss" scoped>
.page-breadcrumb {
  display: flex;
  flex-direction: row;
  align-items: center;
  .breadcrumb {
    &-title {
      margin-right: 10px;
      color: #666;
    }
  }

  :deep(.breadcrumb) {
    .el-breadcrumb__inner {
      font-weight: normal;
      color: #666;
    }
    .el-breadcrumb__item:last-child {
      .el-breadcrumb__inner {
        color: #52c2b8;
      }
  
    }
  }
}
</style>
