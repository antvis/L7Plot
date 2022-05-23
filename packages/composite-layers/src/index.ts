export { default as version } from './version';

/** 类型定义导出 **/
export * from './types';

/** 功能图层 **/
// 图层组及类型定义 | author by [yunji]](https://github.com/lvisei)
export { LayerGroup, LayerGroupOptions } from './core/layer-group';

/** 核心图层 **/
// 点图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { PointLayer, PointLayerOptions } from './core-layers/point-layer';
// 文本图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { TextLayer, TextLayerOptions } from './core-layers/text-layer';
// 热力图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { HeatmapLayer, HeatmapLayerOptions } from './core-layers/heatmap-layer';
// 线图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { LineLayer, LineLayerOptions } from './core-layers/line-layer';
// 面图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { PolygonLayer, PolygonLayerOptions } from './core-layers/polygon-layer';

/** 复合图层 **/
// 气泡图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { BubbleLayer, BubbleLayerOptions } from './composite-layers/bubble-layer';
// 区域图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { ChoroplethLayer, ChoroplethLayerOptions } from './composite-layers/choropleth-layer';
