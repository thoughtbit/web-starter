<template>
  <Foo>
    <div>{{ count }} x {{ times }} = {{ result }}</div>
    <button @click="times += 1">x1</button>
  </Foo>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineExpose } from "vue";
import Foo from "./Foo.vue";
const times = ref(2);
const props = defineProps<{ count: number }>();
const result = computed(() => props.count * times.value);
defineExpose(props);
</script>

