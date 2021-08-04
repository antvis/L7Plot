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

/** G7Plot 的 MapWrapper 基类 */
export { Plot as MapWrapper } from './core/plot';

// 类型定义导出
export * from './types';
export * from './core/layer/interface';

// 点地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { PointMap } from './plots/point-map';
export type { PointMapOptions } from './plots/point-map/interface';

// 气泡地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { BubbleMap } from './plots/bubble-map';
export type { BubbleMapOptions } from './plots/bubble-map/interface';

// 散点地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { ScatterMap } from './plots/scatter-map';
export type { ScatterMapOptions } from './plots/scatter-map/interface';

// 点云地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { PointCloudMap } from './plots/point-cloud-map';
export type { PointCloudMapOptions } from './plots/point-cloud-map/interface';

// 图标地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { IconMap } from './plots/icon-map';
export type { IconMapOptions } from './plots/icon-map/interface';

// 聚合地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { ClustereMap } from './plots/clustere-map';
export type { ClustereMapOptions } from './plots/clustere-map/interface';

// 热力地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { HeatMap } from './plots/heat-map';
export type { HeatMapOptions } from './plots/heat-map/interface';

// 网格地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { GridMap } from './plots/grid-map';
export type { GridMapOptions } from './plots/grid-map/interface';

// 蜂窝地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { HexagonMap } from './plots/hexagon-map';
export type { HexagonMapOptions } from './plots/hexagon-map/interface';
