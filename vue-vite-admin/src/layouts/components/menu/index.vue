<template>
  <div
    class="menu-container"
    :style="{ width: isCollapse ? '70px' : '240px' }"
    v-loading="loading"
    element-loading-text="加载中..."
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(122, 122, 122, 0.01)"
  >
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :router="true"
        :collapse="isCollapse"
        :collapse-transition="false"
        :unique-opened="true"
        background-color="transparent"
        text-color="#fff"
        active-text-color="#61eec3"
      >
        <sub-item :menuList="menuList" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import SubItem from "./sub-item.vue";
import { useStore } from "@/store";
import { useLoading } from "@/hooks";

const useDataEffect = () => {
  const route = useRoute();
  const { menu, user } = useStore();
  const { loading, setLoading } = useLoading();

  onMounted(async () => {
    setLoading(true);
    await menu.getMenuList({ role: user.getUserInfo.username }).finally(() => {
      setLoading(false);
    });
  });

  const activeMenu = computed((): string => route.path);
  const isCollapse = computed((): boolean => menu.isCollapse);
  const menuList = computed((): any[] => menu.menuList);

  return {
    menuList,
    activeMenu,
    isCollapse,
    loading,
  };
};

export default defineComponent({
  name: "Menu",
  components: {
    SubItem,
  },
  setup() {
    const { menuList, activeMenu, isCollapse, loading } = useDataEffect();

    return {
      menuList,
      activeMenu,
      isCollapse,
      loading,
    };
  },
});
</script>

<style scoped lang="scss">
.menu-container {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.3s ease;
}
:deep(.el-menu) {
  border-right: 0 none;
  .el-icon {
    .svg-icon {
      font-size: 22px;
    }
  }
  .el-menu-item {
    &.is-active {
      background-color: #1a5f80;
    }
    &.is-active::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 4px;
      content: "";
      background-color: #61eec3;
    }
  }
  .el-sub-menu {
    .el-sub-menu__title {
      &:hover {
        background-color: var(--el-menu-hover-bg-color) !important;
      }
    }
  }
}
</style>
