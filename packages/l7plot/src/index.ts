export const version = '0.0.2-alpha.2';

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

// 网格图层及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { GridLayer, GridLayerOptions } from './layers/grid-layer';

// 蜂窝图层及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { HexagonLayer, HexagonLayerOptions } from './layers/hexagon-layer';

// 区域图层及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { AreaLayer, AreaLayerOptions } from './layers/area-layer';

/** 图表 **/
// 散点图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { Dot, DotOptions } from './plots/dot';

// 点密度图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { DotDensity, DotDensityOptions } from './plots/dot-density';

// 热力图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { Heatmap, HeatmapOptions } from './plots/heatmap';

// 网格图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { Grid, GridOptions } from './plots/grid';

// 蜂窝图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { Hexagon, HexagonOptions } from './plots/hexagon';

// 区域图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { Area, AreaOptions } from './plots/area';

// 地区分布图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { Choropleth, ChoroplethOptions } from './plots/choropleth';
