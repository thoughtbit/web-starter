<template>
  <div @click="onChange('111')" v-bind="{ ...props, ...emitsAsProps }" class="toggle-group">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useEmitAsProps, useForwardExpose } from "@/hooks";

type ToggleGroupEmits = {
  "update:modelValue": [payload: string];
  change: [value: string];
};
type ToggleGroupProps = {
  disabled?: boolean;
};
const props = defineProps<ToggleGroupProps>();
const emits = defineEmits<ToggleGroupEmits>();

const onChange = (value: string) => {
  emits("update:modelValue", value);
  emits("change", value);
};

const emitsAsProps = useEmitAsProps(emits);
useForwardExpose();
</script>
