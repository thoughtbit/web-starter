<template>
  <div v-loading="iframe.loading" class="iframe">
    <iframe
      ref="iframeRef"
      :src="iframe.src"
      name="mainFrame"
      frameborder="0"
      scrolling="auto"
      height="100%"
      width="100%"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "PageIframe",
  setup() {
    const { proxy }: any = getCurrentInstance();
    const route = useRoute();
    const iframe = reactive<any>({
      loading: true,
      src: "",
    });

    onMounted(() => {
      iframe.src = route.meta.link;
      proxy.$refs.iframeRef.onload = () => {
        iframe.loading = false;
      };
    });
    return {
      iframe,
    };
  },
});
</script>

<style lang="scss" scoped>
.iframe {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
