<template>
  <main class="result" role="main">
    <div class="result-container">
      <div class="result-bg-img">
        <component :is="dynamicComponent"></component>
      </div>
      <div class="result-title">{{ title }}</div>
      <div class="result-tip">{{ tip }}</div>
      <slot />
    </div>
  </main>
</template>
<script lang="ts">
// @ts-nocheck
import { defineComponent, PropType, computed } from "vue";

import Result403Icon from "@/assets/icons/result-403.svg?component";
import Result404Icon from "@/assets/icons/result-404.svg?component";
import Result500Icon from "@/assets/icons/result-500.svg?component";
import ResultIeIcon from "@/assets/icons/result-ie.svg?component";
import ResultWifiIcon from "@/assets/icons/result-wifi.svg?component";

export default defineComponent({
  name: "Result",
  props: {
    bgUrl: {
      type: String as PropType<string>,
      default: "",
    },
    title: {
      type: String as PropType<string>,
      default: "",
    },
    tip: {
      type: String as PropType<string>,
      default: "",
    },
    type: {
      type: String as PropType<string>,
      default: "",
    },
  },
  setup(props) {
    const dynamicComponent = computed(() => {
      switch (props.type) {
        case "403":
          return Result403Icon;
        case "404":
          return Result404Icon;
        case "500":
          return Result500Icon;
        case "ie":
          return ResultIeIcon;
        case "wifi":
          return ResultWifiIcon;
        default:
          return Result403Icon;
      }
    });
    return {
      dynamicComponent,
    };
  },
});
</script>
<style lang="scss" scoped>
.result {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &-link {
    color: #fa233b;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #fa233b;
    }

    &:active {
      color: #fa233b;
    }

    &--active {
      color: #fa233b;
    }

    &:focus {
      text-decoration: none;
    }
  }

  &-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
    width: 680px;
    background-color: rgba(255, 255, 255, 0.8);
    color: #fff;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 40px;
      height: 40px;
      border: 2px solid #04d2ff;
      border-width: 1px 0 0 1px;
    }
    &::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;
      width: 40px;
      height: 40px;
      border: 2px solid #04d2ff;
      border-width: 0 1px 1px 0;
    }
  }

  &-bg-img {
    width: 200px;
    color: #fa233b;
  }

  &-title {
    font-style: normal;
    font-weight: 500;
    margin-top: 8px;
    color: #333;
    font-size: 16px;
    line-height: 24px;
  }

  &-tip {
    margin: 8px 0 32px;
    font-size: 14;
    color: #666;
    line-height: 18px;
  }
}
</style>
