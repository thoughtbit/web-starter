<template>
  <i
    v-if="isExternal"
    :style="styleExternalIcon"
    class="ui-icon ui-icon-external"
    v-on="$listeners"
  />
  <svg
    v-else
    class="ui-icon"
    :class="[
      {
        sm: size === 'sm',
        lg: size === 'lg',
        xl: size === 'xl',
        loading: loading
      },
      svgClass
    ]"
    aria-hidden="true"
    v-on="$listeners"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import "@/assets/svgs";

function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

@Component
export default class Icon extends Vue {
  @Prop({ type: String, required: true }) private iconClass!: string;
  @Prop({ type: String, default: "" }) private className!: string;
  @Prop({ type: String, default: "" }) private size!: string;
  @Prop({ type: Boolean, default: false }) private loading!: boolean;
  @Prop({ type: Boolean, default: false }) private offset!: boolean;

  private get isExternal() {
    return isExternal(this.iconClass);
  }
  private get iconName() {
    return `#icon-${this.iconClass}`;
  }
  private get svgClass() {
    if (this.className) {
      return "ui-icon-" + this.iconClass + " " + this.className;
    } else {
      return "ui-icon-" + this.iconClass;
    }
  }
  private get styleExternalIcon() {
    return {
      mask: `url(${this.iconClass}) no-repeat 50% 50%`,
      "-webkit-mask": `url(${this.iconClass}) no-repeat 50% 50%`
    };
  }
}
</script>

<style lang="scss">
.ui-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  overflow: hidden;
  font-size: 16px;
  vertical-align: -0.15em;
  fill: currentColor;
  &.sm {
    width: 14px;
    height: 14px;
    font-size: 14px;
  }
  &.lg {
    width: 18px;
    height: 18px;
    font-size: 18px;
  }
  &.xl {
    width: 24px;
    height: 24px;
    font-size: 24px;
  }
  &.loading {
    animation: loading 1.5s linear infinite;
  }
  &-external {
    background-color: currentColor;
    mask-size: cover !important;
    display: inline-block;
  }
}
</style>
