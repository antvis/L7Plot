import { CoreLayerOptions } from '../../core/core-layer';
import { ShapeAttr } from '../../types';

export interface IColorRamp {
  /* 值域色带位置分布 */
  positions: number[];
  /* 值域色带颜色分布 */
  colors: string[];
  /* 值域色带比重分布 */
  weights?: number[];
}

export type RasterDataTileLayerStyleOptions = {
  /* 透明度 */
  opacity?: number;
  /* 定义域 */
  domain?: [number, number];
  /* 默认空数据 */
  noDataValue?: number;
  /* 是否显示数值小于定义域的内容 */
  clampLow?: boolean;
  /* 是否显示数值大于定义域的内容 */
  clampHigh?: boolean;
  /* 值域色带 */
  rampColors: IColorRamp;
};

export type RasterImageTileLayerStyleOptions = {
  /* 透明度 */
  opacity?: number;
};

export interface RasterLayerOptions extends CoreLayerOptions {
  /**
   * 图形形状
   */
  shape?: ShapeAttr<'raster'>;
  /**
   * 图层样式
   */
  style?: RasterDataTileLayerStyleOptions | RasterImageTileLayerStyleOptions;
}
