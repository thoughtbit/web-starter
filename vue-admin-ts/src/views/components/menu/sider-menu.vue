<template>
  <!-- 侧栏导航 -->
  <aside class="sider-menu scrollbar">
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical"
      text-color="#fff"
      active-text-color="#fff"
      @select="onSelect"
    >
      <el-menu-item
        class="sider-menu-item"
        :index="item.path"
        v-for="(item, index) in menuData.filter((m) => !m.hidden)"
        :key="index"
      >
        <span slot="title">{{ item.menuName }}</span>
      </el-menu-item>
    </el-menu>
  </aside>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";

  @Component
  export default class SiderMenu extends Vue {
    @Prop({
      type: Array,
      required: true,
      default() {
        return [];
      }
    })
    private menuData!: any;

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

    private mounted() {
      // console.log("menuData:", this.menuData);
      // console.log("activeMenu:", this.activeMenu);
    }
  }
</script>

<style lang="scss" scoped>
  .sider-menu {
    width: 220px;
    background-color: #444;
    overflow-x: hidden;
    overflow-y: auto;
    .el-menu-vertical {
      border-right: 0;
      text-align: center;
      background-color: transparent !important;
      .el-menu-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: auto;
        height: 48px;
        padding: 0;
        &.is-active,
        &:hover {
          background-color: #1ec6df;
        }
      }
    }
    &-item {
      paddingleft: 0;
    }
  }
</style>
