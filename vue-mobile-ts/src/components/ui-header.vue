<template>
  <div class="ui-header">
    {{ msg }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped lang="scss">
.ui-header {
  display: flex;
  height: 48px;
  line-height: 48px;
  background-color: #f5f5f5;
}
</style>
