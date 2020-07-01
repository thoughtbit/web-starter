<template>
  <el-tooltip effect="dark" content="全屏" placement="bottom">
    <div class="top-bar__item">
      <a href="javascript:;" @click.stop.prevent="click" class="fullscreen-link">
        <ui-icon :icon-class="isFullscreen ? 'fullscreen-exit-outlined' : 'fullscreen-outlined'" class="xl" />
      </a>
    </div>
  </el-tooltip>
</template>

<script lang="js">
  import screenfull from "screenfull";
  export default {
    name: "TopFullscreen",
    data() {
      return {
        isFullscreen: false,
      };
    },
    mounted() {
      this.init();
    },
    beforeDestroy() {
      this.destroy();
    },
    methods: {
      click() {
        if (!screenfull.isEnabled) {
          this.$message("开启全屏失败", "error");
          return false;
        }
        screenfull.toggle();
        this.$emit("refresh");
      },
      change() {
        this.isFullscreen = screenfull.isFullscreen;
      },
      init() {
        if (screenfull.isEnabled) {
          screenfull.on("change", this.change);
        }
      },
      destroy() {
        if (screenfull.isEnabled) {
          screenfull.off("change", this.change);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .fullscreen-link {
    display: block;
    height: 60px;
    line-height: 40px;
    padding: 10px 20px;
    color: #fff;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
      color: #1890ff;
    }
  }
</style>
