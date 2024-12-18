<template>
  <svg :class="svgClass" aria-hidden="true" v-bind="attrs" :style="styles">
    <use :xlink:href="iconName" fill="currentColor" />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from "vue";
import type { CSSProperties } from "vue";
import { addUnit } from "@/utils";

export default defineComponent({
  name: "svg-icon",
  props: {
    name: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "inherit",
    },
    size: {
      type: [Number, String],
      default: 16,
    },
  },
  setup(props, { attrs }) {
    const { name, className, size } = toRefs(props);

    const iconName = computed(() => `#icon-${name.value}`);
    const svgClass = computed(() => {
      if (className.value) {
        return `svg-icon ${className.value}`;
      }
      return "svg-icon";
    });

    const styles = computed<CSSProperties>(() => {
      return {
        width: addUnit(size.value),
        height: addUnit(size.value),
        color: props.color,
      };
    });

    return {
      attrs,
      iconName,
      svgClass,
      styles,
    };
  },
});
</script>
