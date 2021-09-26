import { IPlotOptions } from '../../types';
import { IDotDensityLayerOptions, ISource } from '../../layers/dot-density-layer/interface';

/** 点密度图的配置类型定义 */
export interface DotDensityOptions extends IPlotOptions, IDotDensityLayerOptions {
  /**
   * 具体的数据
   */
  source: ISource;
}
