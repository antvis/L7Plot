import { PlotLayerConfig } from './layer';
import { ColorAttr, StateAttribute, SizeAttr } from './attr';

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
 * Label
 */
export interface LabelOptions extends PlotLayerConfig {
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
