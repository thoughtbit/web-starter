<template>
  <router-link :aria-label="props.name" :to="props" v-bind="attrs">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "app-link",
  components: {
    RouterLink,
  },
  props: {
    name: { type: String, required: true },
    params: { type: Object, default: () => ({}) },
  },
  setup(props, { attrs }) {
    return {
      props,
      attrs,
    };
  },
});
</script>
