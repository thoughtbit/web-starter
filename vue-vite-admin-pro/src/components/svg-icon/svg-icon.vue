<template>
  <svg :class="svgClass" aria-hidden="true" v-bind="attrs">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from "vue";

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
      default: "",
    },
    size: {
      type: Number,
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

    const fontSize = computed(() => {
      return size.value ? `${size.value}px` : 'inherit';
    });

    return {
      attrs,
      iconName,
      svgClass,
      fontSize,
    };
  },
});
</script>

<style scope lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  fill: currentColor;
  font-size: v-bind(fontSize);
}
</style>
