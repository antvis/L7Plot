import { IColorRamp } from '@antv/l7-utils';
import { CoreLayerOptions } from '../../core/core-layer';

/**
 * 热力普通图层 色带
 */
// export type ColorRamp = { color: string; position: number }[];

/**
 * 热力普通图层 图层样式
 */
export type HeatmapLayerStyleOptions = {
  // 透明度
  opacity?: number;
  // 旋转角度
  angle?: number;
  // 全局热力权重，推荐权重范围 1-5
  intensity: number;
  // 热力半径，单位像素
  radius: number;
  // 色带
  // colorsRamp: ColorRamp;
  // L7 原色带
  rampColors?: IColorRamp;
};

/**
 * 热力网格图/蜂窝图层 图层样式
 */
export type GridHeatmapLayerStyleOptions = {
  // 透明度
  opacity?: number;
  // 旋转角度
  angle?: number;
  // 覆盖度
  coverage?: number;
};

/**
 * 热力图层 图形形状
 */
export type HeatmapShape2d = 'circle' | 'square' | 'hexagon' | 'triangle';

export type HeatmapShape3d = 'cylinder' | 'squareColumn' | 'hexagonColumn' | 'triangleColumn';

export type HeatmapShape = 'heatmap' | 'heatmap3D' | HeatmapShape2d | HeatmapShape3d;

/**
 * 线图层配置
 */
export interface HeatmapLayerOptions extends CoreLayerOptions {
  /**
   * 图形形状
   */
  shape?: HeatmapShape;
  /**
   * 图层样式
   */
  style?: HeatmapLayerStyleOptions | GridHeatmapLayerStyleOptions;
}
