<template>
  <div class="result-container" role="main">
    <div class="result-bg-img">
      <component :is="dynamicComponent"></component>
    </div>
    <div class="result-title">{{ title }}</div>
    <div class="result-tip">{{ tip }}</div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";

import Result403Icon from "@/assets/images/result/result-403.svg?component";
import Result404Icon from "@/assets/images/result/result-404.svg?component";
import Result500Icon from "@/assets/images/result/result-500.svg?component";
import ResultIeIcon from "@/assets/images/result/result-ie.svg?component";
import ResultWifiIcon from "@/assets/images/result/result-wifi.svg?component";
import ResultMaintenanceIcon from "@/assets/images/result/result-maintenance.svg?component";

type ResultType = "403" | "404" | "500" | "ie" | "wifi" | "maintenance";

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
      type: String as PropType<ResultType>,
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
        case "maintenance":
          return ResultMaintenanceIcon;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 24px;
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
