import { IGridHeatmapLayerStyleOptions, IHeatmapLayerConfig } from '../../types';
import { IGridAggregation, ISourceCFG, Source } from '../../types';

/**
 * 数据配置
 */
export interface ISource extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  data: any;
  /**
   * 六边形网格聚合
   */
  aggregation: IGridAggregation;
}

export interface IHexagonLayerOptions extends IHeatmapLayerConfig {
  /**
   * 具体的数据
   */
  source: ISource | Source;
  /**
   * 图形形状
   */
  shape?: 'hexagon' | 'hexagonColumn';
  /**
   * 图层样式
   */
  style?: IGridHeatmapLayerStyleOptions;
}
