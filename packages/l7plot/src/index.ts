export const version = '0.0.1-alpha.1';

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

// 聚合地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { ClustereMap } from './maps/clustere-map';
export type { ClustereMapOptions } from './maps/clustere-map/interface';

// 散点地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { ScatterMap } from './maps/scatter-map';
export type { ScatterMapOptions } from './maps/scatter-map/interface';

// 符号地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { SymbolMap } from './maps/symbol-map';
export type { SymbolMapOptions } from './maps/symbol-map/interface';

// 热力地图及类型定义 | author by [yunji]](https://github.com/liuvigongzuoshi)
export { HeatMap } from './maps/heat-map';
export type { HeatMapOptions } from './maps/heat-map/interface';
