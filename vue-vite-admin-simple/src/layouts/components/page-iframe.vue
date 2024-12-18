<template>
  <div v-loading="iframe.loading" class="iframe" :style="getWrapStyle">
    <iframe
      ref="iframeRef"
      :src="iframe.src"
      name="mainFrame"
      frameborder="0"
      scrolling="auto"
      height="100%"
      width="100%"
      @load="hideLoading"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed, reactive, ref, unref, type CSSProperties } from "vue";
import { useRoute } from "vue-router";
import { useWindowSizeFn } from "@/hooks/use-window-size-fn";

export default defineComponent({
  name: "PageIframe",
  setup() {
    const route = useRoute();
    const iframe = reactive<any>({
      loading: true,
      src: "",
    });

    const iframeRef = ref();
    const heightRef = ref(window.innerHeight);

    const getWrapStyle = computed(
      (): CSSProperties => {
        return {
          height: `${unref(heightRef)}px`,
        };
      }
    );

    const calcHeight = () => {
      const iframeEle = unref(iframeRef);
      if (!iframeEle) {
        return;
      }
      let clientHeight = 0;
      let top = 0;

      heightRef.value = window.innerHeight - top;
      clientHeight = document.documentElement.clientHeight - top;
      iframeEle.style.height = `${clientHeight}px`;
    }

    function hideLoading() {
      iframe.loading = false;
      calcHeight();
    }

    useWindowSizeFn<any>(calcHeight, { immediate: true });

    onMounted(() => {
      iframe.src = route.meta.link;
    });

    return {
      iframe,
      iframeRef,
      getWrapStyle,
      hideLoading,
    };
  },
});
</script>

<style lang="scss" scoped>
.iframe {
  width: 100%;
  height: 100%;
}
</style>
