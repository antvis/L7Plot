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

/** G7Plot 的 MapWrapper 基类 */
export { MapWrapper } from './core/map';

// 类型定义导出
export * from './types';

// 点地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { PointMap } from './maps/point-map';
export type { PointMapOptions } from './maps/point-map/interface';

// 气泡地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { BubbleMap } from './maps/bubble-map';
export type { BubbleMapOptions } from './maps/bubble-map/interface';

// 散点地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { ScatterMap } from './maps/scatter-map';
export type { ScatterMapOptions } from './maps/scatter-map/interface';

// 符号地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { SymbolMap } from './maps/symbol-map';
export type { SymbolMapOptions } from './maps/symbol-map/interface';

// 聚合地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { ClustereMap } from './maps/clustere-map';
export type { ClustereMapOptions } from './maps/clustere-map/interface';

// 热力地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { HeatMap } from './maps/heat-map';
export type { HeatMapOptions } from './maps/heat-map/interface';

// 网格地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { GridMap } from './maps/grid-map';
export type { GridMapOptions } from './maps/grid-map/interface';

// 蜂窝地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { HexagonMap } from './maps/hexagon-map';
export type { HexagonMapOptions } from './maps/hexagon-map/interface';
