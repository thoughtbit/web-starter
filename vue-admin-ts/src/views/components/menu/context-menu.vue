<template>
  <el-menu
    v-show="visible"
    :default-active="active"
    :style="style"
    class="contextmenu"
    @mouseleave="onMouseLeave"
    @select="onSelect"
  >
    <el-menu-item v-for="(item, index) in itemList" :key="index" :index="item.key">
      {{ item.text }}
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";

  @Component
  export default class ContextMenu extends Vue {
    @Prop({
      type: Array,
      required: true,
      default() {
        return [];
      }
    })
    private itemList!: any;

    @Prop({
      type: Boolean,
      required: false,
      default: false
    })
    private visible: boolean | undefined;

    private left = 0;
    private top = 0;
    private target = null;
    private active = null;

    private get style() {
      return {
        left: this.left + "px",
        top: this.top + "px"
      };
    }

    private created() {
      // window.addEventListener('mousedown', e => this.closeMenu(e))
      // window.addEventListener('contextmenu', e => this.setPosition(e))
    }

    closeMenu(e: any) {
      if (["menuitemicon", "menuitem"].indexOf(e.target.getAttribute("role")) < 0) {
        this.$emit("update:visible", false);
      }
    }
    setPosition(e: any) {
      e.preventDefault();
      this.left = e.clientX;
      this.top = e.clientY;
      this.target = e.target.id.substr(4);
    }
    onSelect(key: any) {
      this.$emit("select", key, this.target);
      this.$emit("update:visible", false);
    }
    onMouseLeave() {
      this.$emit("update:visible", false);
    }

    private mounted() {
      document.onclick = () => {
        this.$emit("update:visible", false);
      };
    }
  }
</script>

<style lang="scss" scoped>
  .contextmenu {
    position: fixed;
    z-index: 3;
    width: 110px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    .el-menu-item {
      padding-left: 0;
      height: 36px;
      line-height: 36px;
    }
  }
</style>
