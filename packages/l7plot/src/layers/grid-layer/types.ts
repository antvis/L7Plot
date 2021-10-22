import { HeatmapShape2d, HeatmapShape3d, GridHeatmapLayerStyleOptions, HeatmapLayerConfig } from '../../types';
import { GridAggregation, ISourceCFG, Source } from '../../types';

/**
 * 数据配置
 */
export interface GridLayerSourceOptions extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  data: any;
  /**
   * 方格网格聚合
   */
  aggregation: GridAggregation;
}

export interface GridLayerOptions extends HeatmapLayerConfig {
  /**
   * 具体的数据
   */
  source: GridLayerSourceOptions | Source;
  /**
   * 图形形状
   */
  shape?: HeatmapShape2d | HeatmapShape3d;
  /**
   * 图层样式
   */
  style?: GridHeatmapLayerStyleOptions;
}
