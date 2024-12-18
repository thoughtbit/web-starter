<template>
  <div class="page page-demos">
    <Toggle v-model:pressed="toggleState" aria-label="Toggle italic" class="toggle" :ref="forwardRef">
      <Icon type="ui-icon" name="arrow-down" />
    </Toggle>
    <ToggleGroup @change="onChange">
      <div>ttt</div>
    </ToggleGroup>
    <div class="ui-base border ui-border-base rounded shadow-sm">
       卡片
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, getCurrentInstance } from "vue";
import { useForwardExpose } from "@/hooks";
import ToggleGroup from "./toggle-group.vue";

const { forwardRef, currentRef, currentElement } = useForwardExpose();

const toggleState = ref(false);

watch(toggleState, () => {
  console.log("toggleState", currentRef.value?.pressed, currentElement);
});

const onChange = (value: boolean) => {
  console.log("onChange:", value);
};
</script>

<style lang="scss" scoped>
.page {
  &-demos {
    padding-top: 90px;
    height: calc(100vh - 90px);
    .toggle {
      padding: 0;
      border: none;
      background: none;
      color: var(--color-text-primary);
      font-size: 1.5rem;
      font-weight: 600;
      cursor: pointer;
      transition: color 0.2s ease-in-out;
      padding: 5px 10px;
      border-radius: 4px;
      background-color: #eee;
      &[data-state="on"] {
        background: #000;
        color: #fff;
      }
    }
  }
}
</style>
