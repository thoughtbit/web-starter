<script lang="ts">
import { defineComponent } from "vue";

export type ToggleEmits = {
  /** Event handler called when the pressed state of the toggle changes. */
  "update:pressed": [value: boolean];
};

export type DataState = "on" | "off";

export interface ToggleProps {
  /**
   * The pressed state of the toggle when it is initially rendered. Use when you do not need to control its open state.
   */
  defaultValue?: boolean;
  /**
   * The controlled pressed state of the toggle. Can be bind as `v-model`.
   */
  pressed?: boolean;
  /**
   * When `true`, prevents the user from interacting with the toggle.
   */
  disabled?: boolean;
}

export default defineComponent({
  name: "Toggle",
});
</script>

<script setup lang="ts">
import { computed } from "vue";
import { useVModel } from "@vueuse/core";
import { useForwardExpose } from "@/hooks";

const props = withDefaults(defineProps<ToggleProps>(), {
  defaultValue: false,
  pressed: undefined,
  disabled: false,
});
const emits = defineEmits<ToggleEmits>();

useForwardExpose();
const pressed = useVModel(props, "pressed", emits, {
  defaultValue: props.defaultValue,
  passive: (props.pressed === undefined) as false,
});

function togglePressed() {
  pressed.value = !pressed.value;
}

const dataState = computed<DataState>(() => {
  return pressed.value ? "on" : "off";
});
</script>

<template>
  <button
    :aria-pressed="pressed"
    :data-state="dataState"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"
    @click="togglePressed"
  >
    <slot />
  </button>
</template>
