<template>
  <!-- 侧栏导航 -->
  <el-aside
    :width="collapsed ? '160px' : '60px'"
    class="aside-menu"
    :class="{ 'aside-collapsed': collapsed }"
  >
    <div class="aside-menu-wrap scrollbar">
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical"
        text-color="#fff"
        active-text-color="#fff"
        @select="onSelect"
      >
        <el-menu-item
          class="aside-menu-item"
          :index="item.path"
          v-for="(item, index) in menuData.filter((m) => !m.hidden)"
          :key="index"
        >
          <ui-icon :iconClass="item.icon" class="lg" />
          <span class="ui-text" slot="title">{{ $t("menus." + item.name) }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="aside-menu-fold">
      <a href="javascript:;" class="aside-trigger" title="折叠菜单" @click.stop.prevent="toggleCollapse">
        <ui-icon icon-class="menu-fold-outlined" class="lg" />
      </a>
    </div>
  </el-aside>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";

  @Component
  export default class AsideMenu extends Vue {
    @Prop({
      type: Array,
      required: true,
      default: () => []
    })
    private menuData!: any;

    @Prop({ type: Boolean, default: true })
    private collapsed: boolean | undefined;

    @Prop({ type: String })
    private activeMenu: string | undefined;

    private onSelect(index: string) {
      let collapsed = false;
      const selectMenu = this.menuData.find((m: any) => {
        return m.path === index;
      });
      if (!(selectMenu && selectMenu.children && selectMenu.children.filter((m: any) => !m.hidden).length)) {
        collapsed = true;

        // @ts-ignore
        this.$routerLink(index);
      }
      this.$emit("menuSelect", index, collapsed);
    }

    private toggleCollapse() {
      this.$emit("toggleCollapse");
    }

    private mounted() {
      // console.log("menuData:", this.menuData);
      // console.log("activeMenu:", this.activeMenu);
    }
  }
</script>

<style lang="scss" scoped>
  .aside-menu {
    position: relative;
    overflow: visible;
    background-color: #666;
    .el-menu-vertical {
      border-right: 0;
      background-color: transparent !important;
      .el-menu-item {
        display: flex;
        align-items: center;
        width: auto;
        height: 48px;
        line-height: 24px;
        padding: 12px 10px 12px 20px !important;
        font-size: 16px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        &.is-active,
        &:focus,
        &:hover {
          background-color: #1ec6df;
        }
        .ui-icon {
          width: 20px;
          margin-right: 10px;
        }
        .ui-text {
          display: none;
        }
      }
    }
    &-wrap {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 888;
      width: 60px;
      overflow-x: hidden;
      overflow-y: overlay;
      padding-bottom: 48px;
      background-color: #666;
      transition: all cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
    }

    &-fold {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 999;
      width: 60px;
      height: 48px;
      background-color: #262f3e;
      transition: all cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      .aside-trigger {
        .ui-icon {
          color: #fff;
          vertical-align: top;
        }
        display: block;
        width: 34px;
        height: 34px;
        padding: 8px;
        text-align: center;
        border-radius: 50%;
        &:hover {
          background-color: #121920;
        }
      }
    }

    &:hover {
      .aside-menu-wrap,
      .aside-menu-fold {
        width: 160px;
      }
      .el-menu-vertical {
        .el-menu-item {
          .ui-text {
            display: block;
          }
        }
      }
    }
  }

  .aside-collapsed {
    .aside-menu-wrap,
    .aside-menu-fold {
      width: 160px;
    }
    .el-menu-vertical {
      .el-menu-item {
        .ui-text {
          display: block;
        }
      }
    }
  }
</style>
