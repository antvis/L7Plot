import { PointLayerOptions } from '../../core-layers/point-layer/types';
import { TextLayerOptions } from '../../core-layers/text-layer/types';
import { CompositeLayerOptions } from '../../core/composite-layer';
import { ISource, SourceOptions } from '../../types';

export type DotLayerActiveOptions = {
  // 填充颜色
  fillColor?: false | string;
  // 描边颜色
  strokeColor?: false | string;
  // 描边的宽度
  lineWidth?: number;
  // 描边透明度
  lineOpacity?: number;
};

export interface ScatterLayerOptions extends CompositeLayerOptions {
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
  label?: Omit<TextLayerOptions, 'source'>;
  /**
   * 交互反馈
   */
  state?: {
    active?: boolean | DotLayerActiveOptions;
    select?: boolean | DotLayerActiveOptions;
  };
  /**
   * 是否启用多选
   */
  enabledMultiSelect?: boolean;
}
