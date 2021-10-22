import { GridHeatmapLayerStyleOptions, HeatmapLayerConfig } from '../../types';
import { GridAggregation, ISourceCFG, Source } from '../../types';

/**
 * 数据配置
 */
export interface HexagonLayerSourceOptions extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  data: any;
  /**
   * 六边形网格聚合
   */
  aggregation: GridAggregation;
}

export interface HexagonLayerOptions extends HeatmapLayerConfig {
  /**
   * 具体的数据
   */
  source: HexagonLayerSourceOptions | Source;
  /**
   * 图形形状
   */
  shape?: 'hexagon' | 'hexagonColumn';
  /**
   * 图层样式
   */
  style?: GridHeatmapLayerStyleOptions;
}
