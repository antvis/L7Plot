import { PlotOptions } from '../../types';
import { HeatmapLayerOptions, HeatmapLayerSourceOptions } from '../../layers/heatmap-layer/types';

/** 热力图的配置类型定义 */
export interface HeatmapOptions extends PlotOptions, HeatmapLayerOptions {
  /**
   * 具体的数据
   */
  source: HeatmapLayerSourceOptions;
}
