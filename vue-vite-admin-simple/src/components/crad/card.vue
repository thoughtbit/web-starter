<template>
  <div class="$ui-base border $ui-border-base rounded shadow-sm">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Icon",
});
</script>
