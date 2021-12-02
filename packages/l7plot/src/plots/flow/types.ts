import { ArcLayerOptions } from '../../layers/arc-layer';
import { PlotOptions, PointShape2d, SizeAttr, SourceOptions } from '../../types';

/**
 * 辐射圈配置
 */
type FlowRadiation = {
  /**
   * 是否开启辐射圈
   */
  enabled?: boolean;
  /**
   * 颜色
   */
  color?: string;
  /**
   * 图形大小
   */
  size?: SizeAttr;
  /**
   * 图形形状
   */
  shape?: PointShape2d;
  /**
   * 是否启用辐射圈动画
   */
  animate?: boolean;
};

/** 流向图的配置类型定义 */
export interface FlowOptions extends PlotOptions, ArcLayerOptions {
  /**
   * 具体的数据
   */
  source: SourceOptions;
  /**
   * 辐射圈配置
   */
  radiation?: FlowRadiation;
}
