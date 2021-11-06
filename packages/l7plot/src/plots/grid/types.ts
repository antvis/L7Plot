import { PlotOptions } from '../../types';
import { GridLayerOptions, GridLayerSourceOptions } from '../../layers/grid-layer/types';

/** 网格图的配置类型定义 */
export interface GridOptions extends PlotOptions, GridLayerOptions {
  /**
   * 具体的数据
   */
  source: GridLayerSourceOptions;
}
