import { TextLayerOptions } from '../../core-layers/text-layer/types';

/**
 * 文本标注
 */

export type LabelCoord = {
  /**
   * 标注图层是否自动计算
   * { x: string, y: string } 指定经纬度字断
   * coordinates 指定坐标
   * @default false
   */
   position?: { x: string, y: string } | { coordinates: string } | boolean,
}
export type LabelOptions = Omit<TextLayerOptions, 'source'> & LabelCoord;
