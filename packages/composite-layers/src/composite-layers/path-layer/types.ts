import { LineLayerOptions } from '../../core-layers/line-layer/types';
import { CompositeLayerOptions } from '../../core/composite-layer';
import { ISourceCFG, ISource } from '../../types';

/**
 * 数据配置
 */
export interface PathLayerSourceOptions extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  /** 数据 */
  data: any;
}

export type PathLayerActiveOptions = {
  /** 填充颜色 */
  fillColor?: false | string;
  /** 描边颜色 */
  strokeColor?: false | string;
  /** 描边的宽度 */
  lineWidth?: number;
  /** 描边透明度 */
  lineOpacity?: number;
};

export interface PathLayerOptions extends CompositeLayerOptions {
  /**
   * 数据配置
   */
  source: PathLayerSourceOptions | ISource;
  /**
   * 填充色
   * @default '#5FD3A6'
   */
  fillColor?: LineLayerOptions['color'];
  /**
   * 填充兜底颜色，用于颜色值映值不存在时
   */
  fillBottomColor?: false | string;
  /**
   * 填充透明度
   * @default 1
   */
  opacity?: number;
  /**
   * 描边色
   */
  strokeColor?: LineLayerOptions['color'];
  /**
   * 描边线宽
   * @default 1
   */
  lineWidth?: LineLayerOptions['size'];
  /**
   * 描边透明度
   * @default 1
   */
  lineOpacity?: number;
  /**
   * 描边的类型
   * @default 'solid'
   */
  lineType?: 'solid' | 'dash';
  /**
   * 描边的虚线配置
   * 第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为 [0,0] 的效果为没有描边。
   */
  lineDash?: [number, number];
  /**
   * 交互反馈
   */
  state?: {
    /**
     * 高亮交互
     * @default false
     */
    active?: boolean | PathLayerActiveOptions;
    /**
     * 选中交互
     * @default false
     */
    select?: boolean | PathLayerActiveOptions;
  };
  // 文档暂时不透出，后面改多选和单选并存交互
  // https://github.com/antvis/L7Plot/issues/176
  /**
   * 是否启用多选
   * @default false
   */
  enabledMultiSelect?: boolean;
}
