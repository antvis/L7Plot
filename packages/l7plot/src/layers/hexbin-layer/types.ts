import { GridHeatmapLayerStyleOptions, HeatmapLayerConfig } from '../../types';
import { GridAggregation, ISourceCFG, Source } from '../../types';

/**
 * 数据配置
 */
export interface HexbinLayerSourceOptions extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  data: any;
  /**
   * 六边形网格聚合
   */
  aggregation: GridAggregation;
}

export interface HexbinLayerOptions extends HeatmapLayerConfig {
  /**
   * 具体的数据
   */
  source: HexbinLayerSourceOptions | Source;
  /**
   * 图形形状
   */
  shape?: 'hexagon' | 'hexagonColumn';
  /**
   * 图层样式
   */
  style?: GridHeatmapLayerStyleOptions;
}
