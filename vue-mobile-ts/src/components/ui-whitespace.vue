<template>
  <div
    class="ui-whitespace"
    :class="[
      {
        xs: size === 'xs',
        sm: size === 'sm',
        md: size === 'md',
        lg: size === 'lg',
        xl: size === 'xl'
      }
    ]"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class WhiteSpace extends Vue {
  @Prop({ type: String, default: "sm" }) private size!: string;
}
</script>

<style lang="scss">
.ui-whitespace {
  overflow: hidden;
  line-height: 0;
  font-size: 0;
  &.xs {
    height: 5px;
  }
  &.sm {
    height: 10px;
  }
  &.md {
    height: 15px;
  }
  &.lg {
    height: 20px;
  }
  &.xl {
    height: 25px;
  }
}
</style>
