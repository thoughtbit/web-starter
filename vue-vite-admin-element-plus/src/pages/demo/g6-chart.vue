<template>
  <div id="graph" class="graph-container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, nextTick, ref } from "vue";
import G6 from "@antv/g6";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    let graphContainer: HTMLElement | any;
    let graphChart: any;

    const data = {
      "id": "Modeling Methods",
      "children": [
        {
          "id": "Classification",
          "children": [
            { "id": "Logistic regression" },
            { "id": "Linear discriminant analysis" },
            { "id": "Rules" },
            { "id": "Decision trees" },
            { "id": "Naive Bayes" },
            { "id": "K nearest neighbor" },
            { "id": "Probabilistic neural network" },
            { "id": "Support vector machine" },
          ],
        },
        {
          "id": "Consensus",
          "children": [
            {
              "id": "Models diversity",
              "children": [
                { "id": "Different initializations" },
                { "id": "Different parameter choices" },
                { "id": "Different architectures" },
                { "id": "Different modeling methods" },
                { "id": "Different training sets" },
                { "id": "Different feature sets" },
              ],
            },
            {
              "id": "Methods",
              "children": [{ "id": "Classifier selection" }, { "id": "Classifier fusion" }],
            },
            {
              "id": "Common",
              "children": [{ "id": "Bagging" }, { "id": "Boosting" }, { "id": "AdaBoost" }],
            },
          ],
        },
        {
          "id": "Regression",
          "children": [
            { "id": "Multiple linear regression" },
            { "id": "Partial least squares" },
            { "id": "Multi-layer feedforward neural network" },
            { "id": "General regression neural network" },
            { "id": "Support vector regression" },
          ],
        },
      ],
    };

    const renderCharts = () => {
      graphContainer = document.getElementById("graph");

      const width = graphContainer.scrollWidth;
      const height = graphContainer.scrollHeight || 500;

      // 实例化 网格布局 插件
      const grid = new G6.Grid();
      // 实例化 缩略图 插件
      const minimap = new G6.Minimap({
        size: [100, 100],
        className: "minimap",
        type: "delegate",
      });
      // 创建 G6 图实例
      graphChart = new G6.TreeGraph({
        container: "graph", // 指定图画布的容器 id,
        // 画布宽高
        width,
        height,
        // fitView: true,
        // fitCenter: true,
        // fitViewPadding: [10, 20],
        modes: {
          default: [
            "drag-node",
            "drag-canvas",
            "zoom-canvas",
            {
              type: "collapse-expand",
              onChange: function onChange(item: any, collapsed) {
                const m: any = item.get("model");
                m.collapsed = collapsed;
                return true;
              },
            },
          ],
        },
        plugins: [minimap, grid],
        defaultNode: {
          size: 26,
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
          ],
        },
        defaultEdge: {
          type: "cubic-horizontal",
        },
        layout: {
          type: "mindmap",
          direction: "H",
          getHeight: () => {
            return 16;
          },
          getWidth: () => {
            return 16;
          },
          getVGap: () => {
            return 10;
          },
          getHGap: () => {
            return 100;
          },
          getSide: () => {
            return "right";
          },
        },
      });

      let centerX = 0;
      graphChart.node((node: any) => {
        if (node.id === "Modeling Methods") {
          centerX = node.x;
        }

        return {
          label: node.id,
          labelCfg: {
            // eslint-disable-next-line no-nested-ternary
            position: node.children && node.children.length > 0 ? "right" : node.x > centerX ? "right" : "left",
            offset: 5,
          },
        };
      });
      // 读取数据
      graphChart.data(data);
      // 渲染图
      graphChart.render();

      graphChart.fitView();

      if (typeof window !== "undefined")
        window.onresize = () => {
          if (!graphChart || graphChart.get("destroyed")) return;
          if (!graphContainer || !graphContainer.scrollWidth || !graphContainer.scrollHeight) return;
          graphChart.changeSize(graphContainer.scrollWidth, graphContainer.scrollHeight);
        };
    };

    const tags = ref([
      {
        type: "最新的",
        value: "0",
      },
      {
        type: "最近7",
        value: "1",
      },
      {
        type: "最近15",
        value: "1",
      },
    ]);
    const active = ref(0);
    const selectTag = (index: number) => {
      active.value = index;
      console.log(tags.value[index]);
    };

    onMounted(() => {
      nextTick(() => {
        renderCharts();
      });
    });

    return {
      tags,
      selectTag,
      active,
    };
  },
});
</script>

<style scoped lang="scss">
.graph-container {
  position: relative;
  height: 800px;
  width: 100%;
  border: 1px solid #3165f5;
  :deep(.minimap) {
    position: absolute;
    right: -1px;
    bottom: -1px;
  }
  :deep(.g6-minimap-viewport) {
    border: 1px solid #3165f5;
  }

}
</style>
