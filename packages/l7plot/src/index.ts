export const version = '0.0.3-alpha.2';

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
// 散点图层及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { DotLayer, DotLayerOptions } from './layers/dot-layer';

// 文本图层及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { TextLayer, TextLayerOptions } from './layers/text-layer';

// 热力图层及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { HeatmapLayer, HeatmapLayerOptions } from './layers/heatmap-layer';

// 网格聚合图层及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { GridLayer, GridLayerOptions } from './layers/grid-layer';

// 蜂窝聚合图层及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { HexbinLayer, HexbinLayerOptions } from './layers/hexbin-layer';

// 路径图层及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { PathLayer, PathLayerOptions } from './layers/path-layer';

// 弧线图层及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { ArcLayer, ArcLayerOptions } from './layers/arc-layer';

// 区域图层及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { AreaLayer, AreaLayerOptions } from './layers/area-layer';

/** 图表 **/
// 散点图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { Dot, DotOptions } from './plots/dot';

// 点密度图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { DotDensity, DotDensityOptions } from './plots/dot-density';

// 热力图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { Heatmap, HeatmapOptions } from './plots/heatmap';

// 网格聚合图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { Grid, GridOptions } from './plots/grid';

// 蜂窝聚合图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { Hexbin, HexbinOptions } from './plots/hexbin';

// 路径图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { Path, PathOptions } from './plots/path';

// 流向图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { Flow, FlowOptions } from './plots/flow';

// 区域图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { Area, AreaOptions } from './plots/area';

// 行政区域图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { Choropleth, ChoroplethOptions } from './plots/choropleth';
