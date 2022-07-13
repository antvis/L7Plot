import { PointLayerOptions } from '../../core-layers/point-layer/types';
import { CompositeLayerOptions } from '../../core/composite-layer';
import { ISource, SourceOptions } from '../../types';
import { LabelOptions } from '../common/types';

export type BubbleLayerActiveOptions = {
  /** 填充颜色 */
  fillColor?: false | string;
  /** 描边颜色 */
  strokeColor?: false | string;
  /** 描边的宽度 */
  lineWidth?: number;
  /** 描边透明度 */
  lineOpacity?: number;
};

export interface BubbleLayerOptions extends CompositeLayerOptions {
  /**
   * 具体的数据
   */
  source: SourceOptions | ISource;
  /**
   * 点半径
   */
  radius?: PointLayerOptions['size'];
  /**
   * 填充色
   */
  fillColor?: PointLayerOptions['color'];
  /**
   * 填充透明度
   */
  opacity?: number;
  /**
   * 描边线宽
   */
  lineWidth?: number;
  /**
   * 描边色
   */
  strokeColor?: string;
  /**
   * 描边透明度
   */
  lineOpacity?: number;
  /**
   * 文本标注
   */
  label?: LabelOptions;
  /**
   * 交互反馈
   */
  state?: {
    /** 高亮交互 */
    active?: boolean | BubbleLayerActiveOptions;
    /** 选中交互 */
    select?: boolean | BubbleLayerActiveOptions;
  };
  /**
   * 是否启用多选
   */
  enabledMultiSelect?: boolean;
}
