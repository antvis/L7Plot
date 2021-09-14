export const version = '0.0.1-alpha.1';

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

// 点示图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { Dot } from './plots/dot';
export type { DotOptions } from './plots/dot/interface';

// 散点图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { Scatter } from './plots/scatter';
export type { ScatterOptions } from './plots/scatter/interface';

// 点密度图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { DotDensity } from './plots/dot-density';
export type { DotDensityOptions } from './plots/dot-density/interface';

// 热力图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { Heatmap } from './plots/heatmap';
export type { HeatmapOptions } from './plots/heatmap/interface';

// 网格图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { Grid } from './plots/grid';
export type { GridOptions } from './plots/grid/interface';

// 蜂窝图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { Hexagon } from './plots/hexagon';
export type { HexagonOptions } from './plots/hexagon/interface';
