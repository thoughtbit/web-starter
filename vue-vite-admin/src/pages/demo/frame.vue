<template>
  <page-iframe />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { PageIframe } from "@/layouts";

export default defineComponent({
  name: "IframePage",
  components: {
    PageIframe,
  },
  setup() {},
});
</script>

<style lang="scss" scoped></style>
