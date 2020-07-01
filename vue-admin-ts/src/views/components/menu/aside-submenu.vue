<template>
  <el-aside :width="collapsed ? '0' : '200px'" class="aside-menu" :class="{ 'aside-collapsed': !collapsed }">
    <div class="aside-menu-title">{{ $t("menus." + menuTitle) }}</div>
    <div class="aside-menu-wrap scrollbar">
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical"
        @select="onSelect"
        v-for="(menu, index) in menuData"
        :key="index"
      >
        <template v-for="(item, index) in menu.children">
          <el-submenu
            class="aside-menu-item children"
            :class="{ show: menuPath.startsWith(menu.path) && !filterMenus.includes(item.name) }"
            :index="item.path"
            v-if="item.children && item.children.filter((c) => !c.hidden).length"
          >
            <template slot="title">
              <span class="title">{{ item.hidden ? "" : $t("menus." + item.name) }}</span>
            </template>
            <el-menu-item
              class="aside-menu-item"
              :index="subItem.path"
              v-for="(subItem, index) in item.children"
              :key="index"
            >
              <div class="dot"></div>
              <span class="title" slot="title">{{ $t("menus." + subItem.name) }}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item
            class="aside-menu-item"
            :class="{ show: menuPath.startsWith(menu.path) && !filterMenus.includes(item.name) }"
            v-else-if="item"
            :index="item.path"
          >
            <span class="title" slot="title">{{ item.hidden ? "" : $t("menus." + item.name) }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <a href="javascript:;" class="aside-trigger" @click.stop.prevent="toggleCollapse">折叠</a>
  </el-aside>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch } from "vue-property-decorator";
  import { Getter } from "vuex-class";

  @Component
  export default class AsideSubMenu extends Vue {
    @Getter private setting: any;

    @Prop({ type: Boolean, default: true })
    private collapsed: boolean | undefined;

    @Prop({
      type: Array,
      required: true,
      default: () => []
    })
    private menuData!: any;

    @Prop({ type: String, default: "", required: true })
    private menuPath!: string;

    @Prop({ type: String, default: "", required: true })
    private menuTitle!: string;

    private filterMenus: Array<{}> = [];

    // 设置过滤列表
    private setFilterMenus() {
      this.filterMenus = this.memberRegisterExamine === "1" ? [] : ["vipCheckPending"];
    }

    private onSelect(index: string) {
      // @ts-ignore
      this.$routerLink(index);
    }

    private toggleCollapse() {
      this.$emit("toggleCollapse");
    }

    private get memberRegisterExamine() {
      const { memberRegisterExamine } = this.setting.attrs || {};
      return memberRegisterExamine;
    }

    private get activeMenu() {
      // @ts-ignore
      const { meta, path } = this.$route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }

    @Watch("memberRegisterExamine")
    private onMemberRegisterExamine() {
      this.setFilterMenus();
    }

    private mounted() {
      this.setFilterMenus();
    }
  }
</script>

<style lang="scss" scoped>
  .aside-menu {
    position: relative;
    width: 0;
    overflow: hidden;
    background-color: #f3f5f7;
    transition: width ease-out 400ms;
    border-right: 1px solid rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    &-title {
      color: #666666;
      font-size: 18px;
      height: 48px;
      line-height: 28px;
      padding: 10px 20px;
      border-bottom: 1px solid #dde3e6;
      white-space: nowrap;
    }
    &-wrap {
      overflow-x: hidden;
      overflow-y: overlay;
      flex: 1;
    }
    &-item {
      display: none;
      &.show {
        display: block;
      }
    }
    .el-menu {
      border: 0 none;
      background-color: transparent;
    }

    .el-submenu {
      .el-menu-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 40px;
        .title {
          line-height: 40px;
        }

        .dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.4);
          margin-right: 10px;
        }
      }
    }
  }

  .aside-trigger {
    display: block;
    overflow: hidden;
    position: absolute;
    top: 50%;
    right: -15px;
    z-index: 880;
    margin-top: -40px;
    width: 15px;
    height: 60px;
    text-indent: -999em;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 30px 0 30px 60px;
      border-color: transparent transparent transparent #999;
    }
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -6px;
      margin-left: -5px;
      margin-left: -4px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 6px 6px 6px 0;
      border-color: transparent #fff transparent transparent;
    }

    &:hover {
      &:before {
        border-color: transparent transparent transparent #1ec6df;
      }
    }
  }

  .aside-collapsed {
    overflow: visible;
    .aside-trigger {
      &:after {
        margin-left: -3px;
        transform: rotate(180deg);
      }
    }
  }
</style>
