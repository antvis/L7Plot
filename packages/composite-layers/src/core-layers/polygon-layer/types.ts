import { CoreLayerOptions } from '../../core/core-layer';

/**
 * 面图层 图形形状
 */
export type PolygonShape = 'fill' | 'line' | 'extrude';

/**
 * 面图层 图层样式
 */
export type PolygonLayerStyleOptions = {
  opacity?: number;
};

/**
 * 面图层配置
 */
export interface PolygonLayerOptions extends CoreLayerOptions {
  /**
   * 图形形状
   */
  shape?: PolygonShape;
  /**
   * 图层样式
   */
  style?: PolygonLayerStyleOptions;
}
