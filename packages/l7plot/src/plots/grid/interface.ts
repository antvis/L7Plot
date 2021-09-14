import { IPlotOptions } from '../../types';
import { IGridLayerOptions, ISource } from '../../layers/grid-layer/interface';

/** 网格图的配置类型定义 */
export interface GridOptions extends IPlotOptions, IGridLayerOptions {
  /**
   * 具体的数据
   */
  source: ISource;
}
