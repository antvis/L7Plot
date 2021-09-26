export const version = '0.0.1-alpha.4';

// 资源静态注册
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

/** 主题注册 */
export { getTheme, registerTheme } from './theme';

/** L7Plot 的基类 */
export { Map } from './core/map';

/** 各图表的基类 Plot */
export { Plot } from './core/plot';

// 类型定义导出
export * from './types';

/** 高级图表 */
export { L7Plot } from './plot';

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
export { Choropleth, ChoroplethOptions } from './plots/choropleth';
