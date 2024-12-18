<script setup lang="ts">
import { toggleDark } from '@/composables'

const isDark = useDark()
</script>

<template>
  <button
    class="icon-btn !outline-none"
    :class="isDark ? 'i-line-md:sunny-outline-to-moon-loop-transition' : 'i-line-md:sunny-outline-loop'"
    @click.stop="toggleDark"
  />
</template>
