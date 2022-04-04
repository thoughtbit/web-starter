<template>
  <v-chart v-if="renderChart" :option="options" :autoresize="autoresize" :style="{ width, height }" />
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from "vue";
import VueECharts from "vue-echarts";
import Props from "@/utils/props";

export default defineComponent({
  components: {
    VChart: VueECharts,
  },
  props: {
    options: Props.object(),
    autoresize: Props.bool(true),
    width: Props.string("100%"),
    height: Props.string("100%"),
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

<style scoped lang="less"></style>
