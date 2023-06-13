// organize-imports-ignore

/** 复合图层 **/
// 气泡图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { BubbleLayer } from './composite-layers/bubble-layer';
export * from './composite-layers/bubble-layer/types';
// 区域图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { ChoroplethLayer } from './composite-layers/choropleth-layer';
export * from './composite-layers/choropleth-layer/types';
// 标注图层及类型定义 | author by [lzxue]](https://github.com/lzxue)
export { IconFontLayer, IconImageLayer } from './composite-layers/icon-layer';
export * from './composite-layers/icon-layer/types';
// 热力图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { HeatmapLayer } from './core-layers/heatmap-layer';
export * from './core-layers/heatmap-layer/types';
// 图片图层类型及定义 ｜ author by [shihui](https://github.com/yiiiiiiqianyao)
export { ImageLayer } from './core-layers/image-layer';
export * from './core-layers/image-layer/types';
// 线图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { LineLayer } from './core-layers/line-layer';
export * from './core-layers/line-layer/types';
/** 核心图层 **/
// 点图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { PointLayer } from './core-layers/point-layer';
export * from './core-layers/point-layer/types';
// 面图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { PolygonLayer } from './core-layers/polygon-layer';
export * from './core-layers/polygon-layer/types';
// 栅格图层类型及定义 ｜ author by [shihui](https://github.com/yiiiiiiqianyao)
export { RasterLayer } from './core-layers/raster-layer';
export * from './core-layers/raster-layer/types';
// 文本图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { TextLayer } from './core-layers/text-layer';
export * from './core-layers/text-layer/types';
// 客流聚合图层及类型定义 | author by [heiyexing]](https://github.com/heiyexing)
export { FlowLayer } from './composite-layers/flow-layer';
export { FlowLayerOptions } from './composite-layers/flow-layer/types';
/** 功能图层 **/
// 图层组及类型定义 | author by [yunji]](https://github.com/lvisei)
export { LayerGroup, LayerGroupOptions } from './core/layer-group';
/** 类型定义导出 **/
export * from './types';
export { default as version } from './version';
