import { CoreLayerOptions } from '../../core/core-layer';
import { IColorRamp, ShapeAttr } from '../../types';

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
