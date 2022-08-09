import { FC } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import {
  // LineChart,
  BarChart,
  // PieChart,
  // ScatterChart,
  // RadarChart,
  // MapChart,
  // TreeChart,
  // TreemapChart,
  // GraphChart,
  // GaugeChart,
  // FunnelChart,
  // ParallelChart,
  // SankeyChart,
  // BoxplotChart,
  // CandlestickChart,
  // EffectScatterChart,
  // LinesChart,
  // HeatmapChart,
  // PictorialBarChart,
  // ThemeRiverChart,
  // SunburstChart,
  // CustomChart,
} from "echarts/charts";

import {
  // GridSimpleComponent,
  GridComponent,
  // PolarComponent,
  // RadarComponent,
  // GeoComponent,
  // SingleAxisComponent,
  // ParallelComponent,
  // CalendarComponent,
  // GraphicComponent,
  // ToolboxComponent,
  TooltipComponent,
  // AxisPointerComponent,
  // BrushComponent,
  TitleComponent,
  // TimelineComponent,
  // MarkPointComponent,
  // MarkLineComponent,
  // MarkAreaComponent,
  // LegendComponent,
  // LegendScrollComponent,
  // LegendPlainComponent,
  // DataZoomComponent,
  // DataZoomInsideComponent,
  // DataZoomSliderComponent,
  // VisualMapComponent,
  // VisualMapContinuousComponent,
  // VisualMapPiecewiseComponent,
  // AriaComponent,
  // TransformComponent,
  DatasetComponent,
} from "echarts/components";

// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  CanvasRenderer,
  // SVGRenderer,
} from "echarts/renderers";

// Register the required components
echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]);
// register theme object
echarts.registerTheme("my_theme", {
  backgroundColor: "#f4cccc",
});
const Demo5: FC = () => {
  const option = {
    title: {
      text: "堆叠区域图",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["邮件营销", "联盟广告", "视频广告"],
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: true,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "邮件营销",
        type: "bar",
        stack: "总量",
        areaStyle: { normal: {} },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "联盟广告",
        type: "bar",
        stack: "总量",
        areaStyle: { normal: {} },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "视频广告",
        type: "bar",
        stack: "总量",
        areaStyle: { normal: {} },
        data: [150, 232, 201, 154, 190, 330, 410],
      },
    ],
  };

  const loadingOption = {
    text: "加载中...",
    color: "#4413c2",
    textColor: "#270240",
    maskColor: "rgba(194, 88, 86, 0.3)",
    zlevel: 0,
  };

  function onChartClick(param: any, echarts: any) {
    console.log("onChartClick: ", param, echarts);
  }

  function onChartLegendselectchanged(param: any, echarts: any) {
    console.log("onChartLegendselectchanged", param, echarts);
  }

  return (
    <ReactECharts
      option={option}
      style={{ height: 400 }}
      echarts={echarts}
      notMerge={true}
      lazyUpdate={true}
      loadingOption={loadingOption}
      showLoading={false}
      onEvents={{
        "click": onChartClick,
        "legendselectchanged": onChartLegendselectchanged,
      }}
      opts={{ renderer: "svg" }}
      theme="my_theme"
    />
  );
};

export default Demo5;
