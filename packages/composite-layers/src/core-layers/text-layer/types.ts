import { ColorAttr, SizeAttr } from '../../types';
import { CoreLayerOptions } from '../../core/core-layer';
import { PointTextLayerStyleOptions } from '../point-layer/types';

/**
 * 文本图层 文本样式
 */
export type TextLayerStyleOptions = PointTextLayerStyleOptions & {
  /* 字体颜色 */
  fill?: ColorAttr;
  /* 字体大小 */
  fontSize?: SizeAttr;
};

/**
 * 文本图层配置
 */
export interface TextLayerOptions extends Omit<CoreLayerOptions, 'shape' | 'color' | 'size' | 'animate'> {
  /** 映射的字段 */
  field?: string;
  // TODO: 多字段支持
  //  fields?: string[];
  /** 映射文本回调函数 */
  // content?: string;
  // TODO: 多字段 CallBack 支持
  //  content?: string | ((data: Record<string, string | number>) => string);
  /**
   * 字体样式
   */
  style?: TextLayerStyleOptions;
}
