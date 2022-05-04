<template>
  <div id="player_placeholder" class="mini-player"></div>
  <div ref="target" class="player-container">
    <TeleportComp teleport-to="#player_placeholder" :disable-teleport="targetIsVisible">
      <Player />
    </TeleportComp>
  </div>
  <div class="h-1000"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import Player from "./components/player.vue";
import TeleportComp from "./components/teleport-comp.vue";

const target = ref(null);
const targetIsVisible = ref(true);

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  targetIsVisible.value = isIntersecting;
});
</script>

<style scoped lang="scss">
.player-container {
  width: 680px;
}
.mini-player {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 220px;
}
</style>
