import { PointLayerOptions } from '../../core-layers/point-layer/types';
import { TextLayerOptions } from '../../core-layers/text-layer/types';
import { CompositeLayerOptions } from '../../core/composite-layer';
import { ISource, SourceOptions } from '../../types';

type DotLayerStyle = {
  // 填充透明度
  opacity?: number;
  // 描边
  stroke?: string;
  // 描边的宽度
  lineWidth?: number;
  // 描边透明度
  lineOpacity?: number;
};

export type DotLayerActiveOptions = {
  // 填充颜色
  fill?: false | string;
  // 描边颜色
  stroke?: false | string;
  // 描边的宽度
  lineWidth?: number;
  // 描边透明度
  lineOpacity?: number;
};

export interface DotLayerOptions extends Pick<PointLayerOptions, 'size' | 'color'>, CompositeLayerOptions {
  /**
   * 具体的数据
   */
  source: SourceOptions | ISource;
  /**
   * 文本标注
   */
  label?: Omit<TextLayerOptions, 'source'>;
  /**
   * 图层样式
   */
  style?: DotLayerStyle;
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
