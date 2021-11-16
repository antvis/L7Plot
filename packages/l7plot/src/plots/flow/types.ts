import { ArcLayerOptions } from '../../layers/arc-layer';
import { PlotOptions, SizeAttr, SourceOptions } from '../../types';

/**
 * 辐射圈配置
 */
type FlowRadiation = {
  /**
   * 颜色
   */
  color?: string;
  /**
   * 图形大小
   */
  size?: SizeAttr;
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
