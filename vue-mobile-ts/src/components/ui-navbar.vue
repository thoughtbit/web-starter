<template>
  <div
    class="ui-navbar"
    :style="navBarStyle"
    :class="[{ 'bottom-line': pageName }]"
  >
    <div class="ui-navbar__left" @click="onClickLeft">
      <ui-icon v-if="isShowBack" icon-class="back" class="lg" />
      <slot name="left"></slot>
    </div>
    <div class="ui-navbar__middle">
      <span class="page-title" v-if="pageName">{{ pageName }}</span>
      <slot name="center"></slot>
    </div>
    <div class="ui-navbar__right" @click="onClickRight">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * 页面标题的名称
     */
    pageName: {
      type: String,
      default: ""
    },
    /**
     * 是否展示后退按钮
     */
    isShowBack: {
      type: Boolean,
      default: true
    },
    /**
     * navBar 样式
     */
    navBarStyle: {
      type: Object,
      default: function() {
        return {
          backgroundColor: "white"
        };
      }
    }
  },
  methods: {
    onClickLeft(event) {
      this.$emit("click-left", event);
    },
    onClickRight(event) {
      this.$emit("click-right", event);
    }
  }
};
</script>

<style scoped lang="scss">
.#{$ns}-navbar {
  width: 100%;
  position: relative;
  z-index: $--nav-bar-z-index;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $--nav-bar-height;
  line-height: 1.5;
  text-align: center;
  user-select: none;
  &__left,
  &__right {
    display: flex;
    align-items: center;
    padding: 0 $--padding-sm;
    font-size: $--font-size-md;
    cursor: pointer;

    img {
      width: 24px;
      align-self: center;
    }
  }

  &__middle {
    display: flex;
    height: 100%;
    flex-grow: 1;

    .page-title {
      font-size: 16px;
      text-align: center;
      margin: 0 auto;
      font-weight: bold;
    }
  }
}

.bottom-line {
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid #eee;
    font-size: 0;
    overflow: hidden;
  }
}
</style>
