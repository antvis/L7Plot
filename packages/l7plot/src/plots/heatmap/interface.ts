import { IPlotOptions } from '../../types';
import { IHeatmapLayerOptions, ISource } from '../../layers/heatmap-layer/interface';

/** 热力图的配置类型定义 */
export interface HeatmapOptions extends IPlotOptions, IHeatmapLayerOptions {
  /**
   * 具体的数据
   */
  source: ISource;
}
