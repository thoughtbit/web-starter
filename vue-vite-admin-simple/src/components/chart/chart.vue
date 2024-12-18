<template>
  <vue-chart
    v-if="renderChart"
    :option="options"
    :autoresize="autoResize"
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
    autoResize: Props.bool(true),
    width: Props.string("100%"),
    height: Props.string("100%"),
    loading: Props.bool(false),
    loadingOptions: Props.object({
      text: "数据加载中...",
      color: "#126ef8",
      fontSize: 14,
      textColor: "#126ef8",
      maskColor: "rgba(255, 255, 255, 0.1)",
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
