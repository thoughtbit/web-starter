<template>
  <teleport :to="teleportTo" :disabled="disableTeleport">
    <slot />
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TeleportComp",
  props: {
    teleportTo: {
      type: String,
      default: "body",
    },
    disableTeleport: Boolean,
  },
});
</script>
