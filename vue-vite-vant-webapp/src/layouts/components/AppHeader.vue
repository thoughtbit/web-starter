<template>
  <header id="header" class="header" role="banner">
    <h1 class="logo">{{ props.title }}</h1>
  </header>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  height: 48px;

  .logo {
    font-size: 18px;
    .link {
      height: 48px;
      display: block;
      text-indent: -999em;
    }
  }
}
</style>
