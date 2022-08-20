import { PolygonLayerOptions } from '../../core-layers/polygon-layer/types';
import { CompositeLayerOptions } from '../../core/composite-layer';
import { ISourceCFG, ISource } from '../../types';
import { LabelOptions } from '../common/types';

/**
 * 数据配置
 */
export interface ChoroplethLayerSourceOptions extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  /** 数据 */
  data: any;
}

export type ChoroplethLayerActiveOptions = {
  /** 填充颜色 */
  fillColor?: false | string;
  /** 描边颜色 */
  strokeColor?: false | string;
  /** 描边的宽度 */
  lineWidth?: number;
  /** 描边透明度 */
  lineOpacity?: number;
};

export interface ChoroplethLayerOptions extends CompositeLayerOptions {
  /**
   * 数据配置
   */
  source: ChoroplethLayerSourceOptions | ISource;
  /**
   * 填充色
   * @default '#5FD3A6'
   */
  fillColor?: PolygonLayerOptions['color'];
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
  strokeColor?: PolygonLayerOptions['color'];
  /**
   * 描边线宽
   * @default 1
   */
  lineWidth?: PolygonLayerOptions['size'];
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
    active?: boolean | ChoroplethLayerActiveOptions;
    /**
     * 选中交互
     * @default false
     */
    select?: boolean | ChoroplethLayerActiveOptions;
  };
  // 文档暂时不透出，后面改多选和单选并存交互
  // https://github.com/antvis/L7Plot/issues/176
  /**
   * 是否启用多选
   * @default false
   */
  enabledMultiSelect?: boolean;
}
