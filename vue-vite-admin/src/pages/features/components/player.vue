<script setup lang="ts">
import { onMounted, ref } from "vue";
import Player from "xgplayer";

const source = ref("//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4");

onMounted(() => {
  const player = new Player({
    id: "mse",
    url: source.value,
    // width: "100%",
    // height: "100%",
    fluid: true,
  });
});
</script>

<template>
  <div id="mse" class="player"></div>
</template>
