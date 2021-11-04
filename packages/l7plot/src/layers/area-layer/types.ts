import { PolygonLayerConfig } from '../../types/layer';
import { ISourceCFG, Source } from '../../types';

/**
 * 数据配置
 */
export interface AreaLayerSourceOptions extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  data: any;
}

type AreaLayerStyle = {
  // 填充透明度
  opacity?: number;
  // 描边
  stroke?: string;
  // 描边的宽度
  lineWidth?: number;
  // 描边的类型
  lineType?: 'solid' | 'dash';
  // 描边的虚线配置
  // 第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。
  lineDash?: [number, number];
  // 描边透明度
  lineOpacity?: number;
};

export type AreaLayerActiveOptions = {
  // 填充颜色
  fill?: false | string;
  // 描边颜色
  stroke?: false | string;
  // 描边的宽度
  lineWidth?: number;
  // 描边透明度
  lineOpacity?: number;
};

export interface AreaLayerOptions extends Omit<PolygonLayerConfig, 'style' | 'state' | 'shape' | 'size'> {
  /**
   * 具体的数据
   */
  source: AreaLayerSourceOptions | Source;
  /**
   * 图层样式
   */
  style?: AreaLayerStyle;
  /**
   * 交互反馈
   */
  state?: {
    active?: boolean | AreaLayerActiveOptions;
    select?: boolean | AreaLayerActiveOptions;
  };
}
