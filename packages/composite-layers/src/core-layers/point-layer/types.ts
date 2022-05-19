import { CoreLayerOptions } from '../../core/core-layer';
import { ShapeAttr } from '../../types';

/**
 * 点图层 图层样式
 */
export type PointLayerStyleOptions = {
  opacity?: number;
  strokeWidth?: number;
  stroke?: string;
};

/**
 * 点图层 图形形状
 */
export type PointShape2d =
  | 'circle'
  | 'square'
  | 'hexagon'
  | 'triangle'
  | 'pentagon'
  | 'octogon'
  | 'hexagram'
  | 'rhombus'
  | 'vesica'
  | 'dot';

export type PointShape3d = 'cylinder' | 'triangleColumn' | 'hexagonColumn' | 'squareColumn';

export type PointShape = PointShape2d | PointShape3d | 'text';

/**
 * 点图层 文本相对锚点
 */
export type AnchorType =
  | 'right'
  | 'top-right'
  | 'left'
  | 'bottom-right'
  | 'left'
  | 'top-left'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right'
  | 'bottom-left'
  | 'top'
  | 'top-right'
  | 'top-left'
  | 'center';

/**
 * 点图层 文本样式
 */
export type PointTextLayerStyleOptions = {
  /* 透明度 */
  opacity?: number;
  /* 文本相对锚点的位置 */
  textAnchor?: AnchorType;
  /* 文本相对锚点的偏移量 */
  textOffset?: [number, number];
  /* 字符间距 */
  spacing?: number;
  /* 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近 */
  padding?: [number, number];
  // TODO:注释
  halo?: number;
  // TODO:注释
  gamma?: number;
  /* 描边颜色 */
  stroke?: string;
  /* 描边宽度 */
  strokeWidth?: number;
  /* 描边透明度 */
  strokeOpacity?: number;
  /* 字体 */
  fontFamily?: string;
  /* 字体的粗细程度 */
  fontWeight?: string;
  /* 是否换行 */
  textAllowOverlap?: boolean;
};

/**
 * 点图层配置
 */
export interface PointLayerOptions extends CoreLayerOptions {
  /**
   * 图形形状
   */
  shape?: ShapeAttr<PointShape | string>;
  /**
   * 图层样式
   */
  style?: PointLayerStyleOptions | PointTextLayerStyleOptions;
}
