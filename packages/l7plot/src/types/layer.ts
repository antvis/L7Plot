import { IColorRamp } from '@antv/l7-utils';
import { BlendType, ILayer, ILayerConfig, Scene } from './common';
import { LabelOptions } from './label';
import { AnimateAttr, ColorAttr, StateAttribute, ShapeAttr, SizeAttr } from './attr';
import { SourceOptions, Source } from './map';

/**
 * 图层基础配置
 */
export interface PlotLayerConfig {
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
export interface PointLayerConfig extends Partial<PlotLayerConfig> {
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

/**
 * 文字图层基础配置
 */
export interface TextLayerConfig extends Partial<PlotLayerConfig & LabelOptions> {
  color?: ColorAttr;
  size?: SizeAttr;
  state?: StateAttribute;
}

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
export interface HeatmapLayerConfig extends Partial<PlotLayerConfig> {
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

/**
 * 线图层 图形形状
 */
export type LineShape = 'line' | 'arc' | 'arc3d' | 'greatcircle';

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
};

/**
 * 线图层基础配置
 */
export interface LinesLayerConfig extends Partial<PlotLayerConfig> {
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
}

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
export interface PolygonLayerConfig extends Partial<PlotLayerConfig> {
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

/**
 * L7Plot 内置图层的基类接口
 */
export interface IPLotLayer {
  name: string;
  type: string;
  layer: ILayer;
  interaction: boolean;
  options: PlotLayerConfig;

  pickLayerConfig<T extends PlotLayerConfig>(params: T): Partial<ILayerConfig>;
  addTo(scene: Scene): void;
  remove(scene: Scene): void;
  updateOptions<T>(options: T): void;
  changeData(source: SourceOptions | Source): void;
  show(): void;
  hide(): void;
  toggleVisible(): void;
  fitBounds(fitBoundsOptions?: unknown): void;
  on(name: string, callback: (...args: any[]) => void): this;
  once(name: string, callback: (...args: any[]) => void): this;
  off(name: string, callback: (...args: any[]) => void): this;
}

/**
 * L7Plot 内置图层类型
 */
export enum LayerType {
  TextLayer = 'textLayer',
  DotLayer = 'dotLayer',
  DotDensity = 'dotDensityLayer',
  ColumnLayer = 'columnLayer',
  HeatmapLayer = 'heatmapLayer',
  GridLayer = 'gridLayer',
  HexagonLayer = 'hexagonLayer',
  LinesLayer = 'linesLayer',
  AreaLayer = 'areaLayer',
  PrismLayer = 'prismLayer',
}
