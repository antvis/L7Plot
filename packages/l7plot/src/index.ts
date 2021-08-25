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
export * from './core/layer/interface';

// 点地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { PointMap } from './plots/point-map';
export type { PointMapOptions } from './plots/point-map/interface';

// 气泡图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { BubbleMap } from './plots/bubble-map';
export type { BubbleMapOptions } from './plots/bubble-map/interface';

// 散点图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { ScatterMap } from './plots/scatter-map';
export type { ScatterMapOptions } from './plots/scatter-map/interface';

// 点密度图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { DotDensityMap } from './plots/dot-density-map';
export type { DotDensityMapOptions } from './plots/dot-density-map/interface';

// 图标图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { IconMap } from './plots/icon-map';
export type { IconMapOptions } from './plots/icon-map/interface';

// 聚合图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { ClustereMap } from './plots/clustere-map';
export type { ClustereMapOptions } from './plots/clustere-map/interface';

// 热力图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { Heatmap } from './plots/heatmap';
export type { HeatmapOptions } from './plots/heatmap/interface';

// 网格图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { GridMap } from './plots/grid-map';
export type { GridMapOptions } from './plots/grid-map/interface';

// 蜂窝图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { HexagonMap } from './plots/hexagon-map';
export type { HexagonMapOptions } from './plots/hexagon-map/interface';
