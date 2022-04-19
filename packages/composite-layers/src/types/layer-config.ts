import { IColorRamp } from '@antv/l7-utils';
import { AnimateAttr, ColorAttr, StateAttribute, ShapeAttr, SizeAttr, TextureAttr } from './attr';

/**************************
 * 点图层
 *************************/

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

export type PointShape = PointShape2d | PointShape3d;

/**
 * 点图层基础配置
 */
export interface PointLayerConfig {
  /**
   * 图形形状
   */
  shape?: ShapeAttr<PointShape | string>;
  /**
   * 图形颜色
   */
  color?: ColorAttr;
  /**
   * 图形大小
   */
  size?: SizeAttr;
  /**
   * 图层样式
   */
  style?: PointLayerStyleOptions;
  /**
   * animation 配置
   */
  animate?: AnimateAttr;
  /**
   * 交互反馈
   */
  state?: StateAttribute;
}

/**************************
 * 文字图层
 *************************/

/**
 * 文字图层 文本相对锚点
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
 * 文字图层 样式
 */
export type PointTextLayerStyleOptions = {
  /* 字体颜色 */
  fill?: ColorAttr;
  /* 字体大小 */
  fontSize?: SizeAttr;
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
 * 文字图层基础配置
 */
export interface TextLayerConfig {
  /** 映射的字段 */
  field?: string;
  // TODO: 多字段支持
  //  fields?: string[];
  /** 回调函数 */
  content?: string;
  // TODO: 多字段 CallBack 支持
  //  content?: string | ((data: Record<string, string | number>) => string);
  /** 字体样式 */
  style?: PointTextLayerStyleOptions;
  /* 旋转文字 */
  // rotate?: RotateAttr;
  /* 交互反馈 */
  state?: StateAttribute;
}

/**************************
 * 热力图层
 *************************/

/**
 * 热力普通图层 色带
 */
export type ColorRamp = { color: string; position: number }[];

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
  colorsRamp: ColorRamp;
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
 * 热力图层基础配置
 */
export interface HeatmapLayerConfig {
  /**
   * 图形形状
   */
  shape?: HeatmapShape;
  /**
   * 图形颜色
   */
  color?: ColorAttr;
  /**
   * 图形大小
   */
  size?: SizeAttr;
  /**
   * 图层样式
   */
  style?: HeatmapLayerStyleOptions | GridHeatmapLayerStyleOptions;
  /**
   * 交互反馈
   */
  state?: StateAttribute;
}

/**************************
 * 线图层
 *************************/

/**
 * 线图层 图形形状
 */
export type ArcLineShape = 'arc' | 'arc3d' | 'greatcircle';

export type LineShape = 'line' | ArcLineShape;

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
export type LinesLayerStyleOptions = {
  // 透明度
  opacity?: number | [string, (data: any) => number] | [string, [number, number]];
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
};

/**
 * 线图层基础配置
 */
export interface LinesLayerConfig {
  /**
   * 图形形状
   */
  shape?: ShapeAttr<LineShape>;
  /**
   * 图形颜色
   */
  color?: ColorAttr;
  /**
   * 图形大小
   */
  size?: SizeAttr;
  /**
   * 图层样式
   */
  style?: LinesLayerStyleOptions;
  /**
   * animation 配置
   */
  animate?: AnimateAttr;
  /**
   * 交互反馈
   */
  state?: StateAttribute;
  /**
   * 纹理贴图
   */
  texture?: TextureAttr;
}

/**************************
 * 面图层
 *************************/

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
 * 面图层基础配置
 */
export interface PolygonLayerConfig {
  /**
   * 图形形状
   */
  shape?: PolygonShape;
  /**
   * 图形颜色
   */
  color?: ColorAttr;
  /**
   * 图形大小
   */
  size?: SizeAttr;
  /**
   * 图层样式
   */
  style?: PolygonLayerStyleOptions;
  /**
   * 交互反馈
   */
  state?: StateAttribute;
}
