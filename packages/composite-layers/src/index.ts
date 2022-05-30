export { default as version } from './version';

/** 类型定义导出 **/
export * from './types';

/** 功能图层 **/
// 图层组及类型定义 | author by [yunji]](https://github.com/lvisei)
export { LayerGroup, LayerGroupOptions } from './core/layer-group';

/** 核心图层 **/
// 点图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { PointLayer } from './core-layers/point-layer';
export * from './core-layers/point-layer/types';
// 文本图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { TextLayer } from './core-layers/text-layer';
export * from './core-layers/text-layer/types';
// 热力图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { HeatmapLayer } from './core-layers/heatmap-layer';
export * from './core-layers/heatmap-layer/types';
// 线图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { LineLayer } from './core-layers/line-layer';
export * from './core-layers/line-layer/types';
// 面图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { PolygonLayer } from './core-layers/polygon-layer';
export * from './core-layers/polygon-layer/types';

/** 复合图层 **/
// 气泡图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { BubbleLayer } from './composite-layers/bubble-layer';
export * from './composite-layers/bubble-layer/types';
// 区域图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { ChoroplethLayer } from './composite-layers/choropleth-layer';
export * from './composite-layers/choropleth-layer/types';

// 客流走向图层及类型定义 | author by [yanxiong](https://github.com/heiyexing)
export { TrafficFlowLayer } from './composite-layers/traffic-flow-layer';
export * from './composite-layers/traffic-flow-layer/types';
