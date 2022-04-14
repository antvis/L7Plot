export { default as version } from './version';

/** 资源静态注册 **/
export {
  registerImage,
  registerImages,
  unregisterImage,
  registerFontFace,
  unregisterFontFace,
  registerIconFont,
  registerIconFonts,
  unregisterIconFont,
} from './core/map/register';

/** 主题注册 **/
export { getTheme, registerTheme } from './theme';

/** 类型定义导出 **/
export * from './types';

/** L7Plot 的基类 **/
export { Map } from './core/map';

/** 各图表的基类 Plot **/
export { Plot } from './core/plot';

/** 高级图表 **/
export { L7Plot } from './plot';

/** 图层 **/
// 散点图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { DotLayer, DotLayerOptions } from './layers/dot-layer';

// 图标图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { IconLayer, IconLayerOptions } from './layers/icon-layer';

// 点密度图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { DotDensityLayer, DotDensityLayerOptions } from './layers/dot-density-layer';

// 文本图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { TextLayer, TextLayerOptions } from './layers/text-layer';

// 热力图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { HeatmapLayer, HeatmapLayerOptions } from './layers/heatmap-layer';

// 网格聚合图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { GridLayer, GridLayerOptions } from './layers/grid-layer';

// 蜂窝聚合图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { HexbinLayer, HexbinLayerOptions } from './layers/hexbin-layer';

// 路径图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { PathLayer, PathLayerOptions } from './layers/path-layer';

// 弧线图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { ArcLayer, ArcLayerOptions } from './layers/arc-layer';

// 区域图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { AreaLayer, AreaLayerOptions } from './layers/area-layer';

// 水晶体图层及类型定义 | author by [yunji]](https://github.com/lvisei)
export { PrismLayer, PrismLayerOptions } from './layers/prism-layer';

/** 图表 **/
// 散点图及类型定义 | author by [yunji]](https://github.com/lvisei)
export { Dot, DotOptions } from './plots/dot';

// 点密度图及类型定义 | author by [yunji]](https://github.com/lvisei)
export { DotDensity, DotDensityOptions } from './plots/dot-density';

// 热力图及类型定义 | author by [yunji]](https://github.com/lvisei)
export { Heatmap, HeatmapOptions } from './plots/heatmap';

// 网格聚合图及类型定义 | author by [yunji]](https://github.com/lvisei)
export { Grid, GridOptions } from './plots/grid';

// 蜂窝聚合图及类型定义 | author by [yunji]](https://github.com/lvisei)
export { Hexbin, HexbinOptions } from './plots/hexbin';

// 路径图及类型定义 | author by [yunji]](https://github.com/lvisei)
export { Path, PathOptions } from './plots/path';

// 流向图及类型定义 | author by [yunji]](https://github.com/lvisei)
export { Flow, FlowOptions } from './plots/flow';

// 区域图及类型定义 | author by [yunji]](https://github.com/lvisei)
export { Area, AreaOptions } from './plots/area';

// 行政区域图及类型定义 | author by [yunji]](https://github.com/lvisei)
export { Choropleth, ChoroplethOptions } from './plots/choropleth';
