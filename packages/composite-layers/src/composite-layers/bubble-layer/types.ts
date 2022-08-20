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
   * 数据配置
   */
  source: SourceOptions | ISource;
  /**
   * 点半径
   * @default 12
   */
  radius?: PointLayerOptions['size'];
  /**
   * 填充色
   * @default '#5FD3A6'
   */
  fillColor?: PointLayerOptions['color'];
  /**
   * 填充透明度
   * @default 1
   */
  opacity?: number;
  /**
   * 描边线宽
   * @default 1
   */
  lineWidth?: number;
  /**
   * 描边色
   */
  strokeColor?: string;
  /**
   * 描边透明度
   * @default 1
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
    /**
     * 高亮交互
     * @default false
     */
    active?: boolean | BubbleLayerActiveOptions;
    /** 选中交互
     * @default false
     */
    select?: boolean | BubbleLayerActiveOptions;
  };
  // 文档暂时不透出，后面改多选和单选并存交互
  // https://github.com/antvis/L7Plot/issues/176
  /**
   * 是否启用多选
   * @default false
   */
  enabledMultiSelect?: boolean;
}
