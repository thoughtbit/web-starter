<script setup lang="ts">
import { useCounterStore } from '@/store'

const useCount = useCounterStore()
const { inc, dec } = useCount
</script>

<template>
  <div>
    <p class="font-semibold">
      {{ useCount.count }}
    </p>
    <button class="m-4 h-8 w-8 rounded-full text-center btn" @click="inc()">
      +
    </button>
    <button class="m-4 h-8 w-8 rounded-full text-center btn" @click="dec()">
      -
    </button>
  </div>
</template>
