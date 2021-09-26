import { IPolygonLayerConfig } from '../../types/layer';
import { ISourceCFG, Source } from '../../types';

/**
 * 数据配置
 */
export interface ISource extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  data: any;
}

interface IAreaLayerStyle {
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
}

interface IAreaLayerActiveOptions {
  // 填充颜色
  fill: string;
  // 描边颜色
  stroke: string;
  // 描边的宽度
  lineWidth?: number;
}

export interface IAreaLayerOptions extends Omit<IPolygonLayerConfig, 'style' | 'state' | 'shape' | 'size'> {
  /**
   * 具体的数据
   */
  source: ISource | Source;
  /**
   * 图层样式
   */
  style?: IAreaLayerStyle;
  /**
   * 交互反馈
   */
  state?: {
    active?: boolean | IAreaLayerActiveOptions;
    select?: boolean | IAreaLayerActiveOptions;
  };
}
