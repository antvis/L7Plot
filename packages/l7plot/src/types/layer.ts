import { IColorRamp } from '@antv/l7-utils';
import { BlendType, ILayer, ILayerConfig, Scene } from './common';
import { ILabelOptions } from './label';
import { animateAttr, ColorAttr, IStateAttribute, ShapeAttr, SizeAttr } from './attr';
import { ISource, Source } from './map';

/**
 * 图层基础配置
 */
export interface IBaseLayerConfig {
  name?: string;
  zIndex?: number;
  visible?: boolean;
  minZoom?: number;
  maxZoom?: number;
  pickingBuffer?: number;
  autoFit?: boolean;
  blend?: keyof typeof BlendType;
}

/**
 * 点图层 图层样式
 */
export interface IPointLayerStyleOptions {
  opacity?: number;
  strokeWidth?: number;
  stroke?: string;
}

/**
 * 点图层 图形形状
 */
export type pointShape2d =
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

export type pointShape3d = 'cylinder' | 'triangleColumn' | 'hexagonColumn' | 'squareColumn';

export type pointShape = pointShape2d | pointShape3d;

/**
 * 点图层基础配置
 */
export interface IPointLayerConfig extends Partial<IBaseLayerConfig> {
  /**
   * 图形形状
   */
  shape?: ShapeAttr<pointShape | string>;
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
  style?: IPointLayerStyleOptions;
  /**
   * animation 配置
   */
  animate?: animateAttr;
  /**
   * 交互反馈
   */
  state?: IStateAttribute;
}

/**
 * 文字图层基础配置
 */
export interface ITextLayerConfig extends Partial<IBaseLayerConfig & ILabelOptions> {
  color?: ColorAttr;
  size?: SizeAttr;
  state?: IStateAttribute;
}

/**
 * 热力普通图层 色带
 */
export type ColorRamp = { color: string; position: number }[];

/**
 * 热力普通图层 图层样式
 */
export interface IHeatmapLayerStyleOptions {
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
}

/**
 * 热力网格图/蜂窝图层 图层样式
 */
export interface IGridHeatmapLayerStyleOptions {
  // 透明度
  opacity?: number;
  // 旋转角度
  angle?: number;
  // 覆盖度
  coverage?: number;
}

/**
 * 热力图层 图形形状
 */
export type heatmapShape2d = 'circle' | 'square' | 'hexagon' | 'triangle';

export type heatmapShape3d = 'cylinder' | 'squareColumn' | 'hexagonColumn' | 'triangleColumn';

export type heatmapShape = 'heatmap' | 'heatmap3D' | heatmapShape2d | heatmapShape3d;

/**
 * 热力图层基础配置
 */
export interface IHeatmapLayerConfig extends Partial<IBaseLayerConfig> {
  /**
   * 图形形状
   */
  shape?: heatmapShape;
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
  style?: IHeatmapLayerStyleOptions | IGridHeatmapLayerStyleOptions;
  /**
   * 交互反馈
   */
  state?: IStateAttribute;
}

/**
 * 线图层 图形形状
 */
export type LineShape = 'line' | 'arc' | 'arc3d' | 'greatcircle';

/**
 * 线图层 线类型
 */
export enum lineStyleType {
  'solid' = 0.0,
  'dash' = 1.0,
}

/**
 * 线图层 图层样式
 */
export interface ILineLayerStyleOptions {
  opacity?: number;
  lineType?: keyof typeof lineStyleType;
  dashArray?: [number, number];
  segmentNumber?: number;
}

/**
 * 线图层基础配置
 */
export interface ILineLayerConfig extends Partial<IBaseLayerConfig> {
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
  style?: ILineLayerStyleOptions;
  /**
   * animation 配置
   */
  animate?: animateAttr;
  /**
   * 交互反馈
   */
  state?: IStateAttribute;
}

/**
 * 面图层 图形形状
 */
export type PolygonShape = 'fill' | 'line' | 'extrude';

/**
 * 面图层 图层样式
 */
export interface IPolygonLayerStyleOptions {
  opacity?: number;
}

/**
 * 面图层基础配置
 */
export interface IPolygonLayerConfig extends Partial<IBaseLayerConfig> {
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
  style?: IPolygonLayerStyleOptions;
  /**
   * 交互反馈
   */
  state?: IStateAttribute;
}

/**
 * 基类图层接口
 */
export interface IBaseLayer {
  name: string;
  type: string;
  layer: ILayer;
  interaction: boolean;
  options: IBaseLayerConfig;

  pickLayerConfig<T extends IBaseLayerConfig>(params: T): Partial<ILayerConfig>;
  addTo(scene: Scene): void;
  remove(scene: Scene): void;
  updateOptions<T>(options: T): void;
  changeData(source: ISource | Source): void;
  show(): void;
  hide(): void;
  toggleVisible(): void;
  on(name: string, callback: (...args: any[]) => void): void;
  once(name: string, callback: (...args: any[]) => void): void;
  off(name: string, callback: (...args: any[]) => void): void;
}
