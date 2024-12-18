<template>
  <vue-chart
    v-if="renderChart"
    :option="options"
    :autoresize="autoresize"
    :loading="loading"
    :loading-options="loadingOptions"
    :style="{ width, height }"
  />
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from "vue";
import VueECharts from "vue-echarts";
import Props from "@/utils/props";

export default defineComponent({
  name: "chart",
  components: {
    VueChart: VueECharts,
  },
  props: {
    options: Props.object(),
    autoresize: Props.bool(true),
    width: Props.string("100%"),
    height: Props.string("100%"),
    loading: Props.bool(false),
    loadingOptions: Props.object({
      text: "数据加载中...",
      color: "#404040",
      fontSize: 14,
      textColor: "rgba(0, 0, 0, .6)",
      maskColor: "rgba(0, 0, 0, 0.1)",
      zlevel: 0,
    }),
  },
  setup() {
    const renderChart = ref(false);
    // wait container expand
    nextTick(() => {
      renderChart.value = true;
    });
    return {
      renderChart,
    };
  },
});
</script>
