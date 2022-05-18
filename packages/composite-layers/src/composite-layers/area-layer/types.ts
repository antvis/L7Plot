import { PolygonLayerOptions } from '../../core-layers/polygon-layer/types';
import { TextLayerOptions } from '../../core-layers/text-layer/types';
import { CompositeLayerOptions } from '../../core/composite-layer';
import { ISourceCFG, ISource } from '../../types';

/**
 * 数据配置
 */
export interface AreaLayerSourceOptions extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  data: any;
}

export type AreaLayerActiveOptions = {
  // 填充颜色
  fillColor?: false | string;
  // 描边颜色
  strokeColor?: false | string;
  // 描边的宽度
  lineWidth?: number;
  // 描边透明度
  lineOpacity?: number;
};

export interface AreaLayerOptions extends CompositeLayerOptions {
  /**
   * 具体的数据
   */
  source: AreaLayerSourceOptions | ISource;
  /**
   * 填充色
   */
  fillColor?: PolygonLayerOptions['color'];
  /**
   * 填充兜底颜色，用于颜色值映值不存在时
   */
  fillBottomColor?: false | string;
  /**
   * 填充透明度
   */
  opacity?: number;
  /**
   * 描边色
   */
  strokeColor?: PolygonLayerOptions['color'];
  /**
   * 描边线宽
   */
  lineWidth?: PolygonLayerOptions['size'];
  /**
   * 描边透明度
   */
  lineOpacity?: number;
  /**
   * 描边的类型
   */
  lineType?: 'solid' | 'dash';
  /**
   * 描边的虚线配置
   * 第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。
   */
  lineDash?: [number, number];
  /**
   * 文本标注
   */
  label?: Omit<TextLayerOptions, 'source'>;
  /**
   * 交互反馈
   */
  state?: {
    active?: boolean | AreaLayerActiveOptions;
    select?: boolean | AreaLayerActiveOptions;
  };
  /**
   * 是否启用多选
   */
  enabledMultiSelect?: boolean;
}
