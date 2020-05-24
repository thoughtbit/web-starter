<template>
  <ul class="menu">
    <li
      class="item"
      v-for="item in menus"
      :key="item.key"
      @click="changeMenu(item)"
    >
      <router-link :to="{ path: item.path }">
        {{ item.title }}
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

type MenuItem = {
  key: string;
  title: string;
  icon?: string;
  path: string;
  children?: MenuItem[];
};

@Component
export default class Menu extends Vue {
  menus: MenuItem[] = [
    {
      key: "Home",
      title: "主页",
      path: "/"
    },
    {
      key: "Vue",
      title: "Vue 子应用",
      path: "/vue"
    },
    {
      key: "React",
      title: "React 子应用",
      path: "/react"
    },
    {
      key: "VueList",
      title: "Vue 列表页",
      path: "/vue/list"
    },
    {
      key: "ReactList",
      title: "React 列表页",
      path: "/react/list"
    },
    {
      key: "MainCommunication",
      title: "主应用通讯页",
      path: "/communication"
    },
    {
      key: "VueCommunication",
      title: "Vue 通讯页",
      path: "/vue/communication"
    },
    {
      key: "ReactCommunication",
      title: "React 通讯页",
      path: "/react/communication"
    }
  ];

  selectKey = "";

  created() {
    this._initMenus();
  }

  private _initMenus() {
    const currentMenu = this._findCurrentMenu(
      this.menus,
      this.$route.path
    ) as MenuItem;
    if (!currentMenu) return;
    const { key } = currentMenu;
    this.selectKey = key;
  }

  private _findCurrentMenu(
    menus: MenuItem[],
    currentPath: string
  ): MenuItem | null {
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];
      const { path } = menu;
      if (path === currentPath) return menu;

      const currentMenu = this._findCurrentMenu(
        menu.children || [],
        currentPath
      );
      if (currentMenu) return currentMenu;
    }
    return null;
  }

  /**
   * 切换菜单
   */
  private changeMenu(item: MenuItem) {
    const { key } = item;
    this.selectKey = key;
  }
}
</script>

<style scoped lang="scss">
.menu {
  height: 100%;
  background-color: #1E1E28;
  .item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    a {
      padding: 10px;
      line-height: 22px;
      display: block;
      color: #fff;
      text-underline: none;
      &:hover {
        background-color: #0b0b11;
        color: red;
      }
    }
  }
}
</style>
