import { CoreLayerOptions } from '../../core/core-layer';
import { OptionStyleAttribute, ShapeAttr } from '../../types';

/**
 * 线图层 图形形状
 */
export type ArcLineShape = 'arc' | 'arc3d' | 'greatcircle';

export type LineShape = 'line' | 'flowline' | ArcLineShape;

/**
 * 线图层 线类型
 */
export enum LineStyleType {
  'solid' = 0.0,
  'dash' = 1.0,
}

/**
 * 线图层 图层样式
 */
export type LineLayerStyleOptions = {
  // 透明度
  opacity?: OptionStyleAttribute<number>;
  // 线类型
  lineType?: keyof typeof LineStyleType;
  // 虚线间隔
  dashArray?: [number, number];
  // 弧线分段数
  segmentNumber?: number;
  // 渐变起点颜色
  sourceColor?: string;
  // 渐变终点颜色
  targetColor?: string;
  // 是否反向，arc 支持
  forward?: boolean;
  // 弧线的偏移量，arc 支持
  thetaOffset?: number;
  // 是否开启纹理贴图
  lineTexture?: boolean;
  // 纹理贴图步长
  iconStep?: number;
  // 纹理混合方式
  textureBlend?: string;
  // 边框颜色
  stroke?: OptionStyleAttribute<string>;
  // 边框宽度
  strokeWidth?: OptionStyleAttribute<number>;
  // 边框透明度
  strokeOpacity?: number;
  // 线间隙
  gapWidth?: OptionStyleAttribute<number>;
  // 线头尾偏移量
  offsets?: OptionStyleAttribute<[number, number]>;
};

/**
 * 线图层配置
 */
export interface LineLayerOptions extends CoreLayerOptions {
  /**
   * 图形形状
   */
  shape?: ShapeAttr<LineShape>;
  /**
   * 图层样式
   */
  style?: LineLayerStyleOptions;
}
