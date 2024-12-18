<template>
  <component :aria-label="props.name" :is="type" v-bind="linkProps()">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { RouterLink } from "vue-router";
import { isExternal } from "@/utils";

export default defineComponent({
  name: "app-link",
  components: {
    RouterLink,
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    to: {
      type: [String, Object],
      required: true,
    },
  },
  setup(props) {
    const { to } = props;
    const isExternalLink = computed(() => {
      return typeof to !== "object" && isExternal(to);
    });

    const type = computed(() => {
      if (isExternalLink.value) {
        return "a";
      }
      return "router-link";
    });

    function linkProps() {
      if (isExternalLink.value) {
        return {
          href: to,
          target: "_blank",
          rel: "noopener",
        };
      }
      return {
        to: props.to,
      };
    }

    return {
      props,

      type,
      linkProps,
    };
  },
});
</script>
