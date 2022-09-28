import { CoreLayerOptions } from '../../core/core-layer';
import { ShapeAttr } from '../../types';

export type ImageLayerStyleOptions = {
  /* 透明度 */
  opacity?: number;
};

export interface ImageLayerOptions extends CoreLayerOptions {
  /**
   * 图形形状
   */
  shape?: ShapeAttr<'image'>;
  /**
   * 图层样式
   */
  style?: ImageLayerStyleOptions;
}
