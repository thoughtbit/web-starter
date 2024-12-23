export { default as Echart } from './core';

/*
属性	说明	类型	默认值
className	设置类名	String	''
style	设置样式，默认高度为300px	Object	{height: '300px'}
option	图表的配置项和数据，具体见配置项手册。	Object	-
opts	图表初始化配置项参数，具体见说明文档	Object	-
events	图表事件, 具体见说明文档	Object	-
theme	图表主题, 传入前请确保已经用 registerTheme 注册过，详情见下面说明中的设置主题	String	[默认主题]
notMerge	是否不跟之前设置的option进行合并, 具体见说明文档	Boolean	false
lazyUpdate	在设置完option后是否不立即更新图表, 具体见说明文档	Boolean	false
onChartReady	图表准备好后的回调函数	(obj) => Void	-
loadingOption	图表加载配置, 具体见说明文档	Object	-
showLoading	是否显示加载中蒙层	Boolean	false
echarts	使用按需引入方式，手动导入echart模块，详情见按需引入示例	Object	{}
方法
名称	描述
getInstance()	获取图表实例


// 按需导入
import React from 'react';
// 导入core library
import { Echart } from '@/component/Echart';
// 按需导入echarts模块
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Import charts, all with Chart suffix
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
} from 'echarts/charts';
// import components, all suffixed with Component
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
} from 'echarts/components';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  CanvasRenderer,
  // SVGRenderer,
} from 'echarts/renderers';

// Register the required components
echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]
);

function onChartReady(echarts) {
    console.log('echarts is ready', echarts);
}

function onChartClick(param, echarts) {
    console.log(param, echarts);
};

function onChartLegendselectchanged(param, echarts) {
    console.log(param, echarts);
};

 const option = {
    title : {
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series : [
      {
      name: '访问来源',
      type: 'pie',
      radius : '55%',
      center: ['50%', '60%'],
      data:[
        {value:335, name:'直接访问'},
        {value:310, name:'邮件营销'},
        {value:234, name:'联盟广告'},
        {value:135, name:'视频广告'},
        {value:1548, name:'搜索引擎'}
      ],
      itemStyle: {
        emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
      }
    ]
  };

// API与上面的Echart相同
const echartRef = useRef();

const echartInstance = echartRef.getEchartsInstance();
// const echartInstance = echartRef.echarts_native;
const base64 = echartInstance.getDataURL();

<Echart
  ref={echartRef}
  echarts={echarts}
  option={option}
  notMerge={true}
  lazyUpdate={true}
  theme={"theme_name"}
  onChartReady={onChartReady}
  events={{
    'click': onChartClick,
    'legendselectchanged': onChartLegendselectchanged
  }}
  opts={{renderer: 'svg'}}
/>
*/
