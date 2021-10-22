import { PlotOptions } from '../../types';
import { DotDensityLayerOptions, DotDensityLayerSourceOptions } from '../../layers/dot-density-layer/types';

/** 点密度图的配置类型定义 */
export interface DotDensityOptions extends PlotOptions, DotDensityLayerOptions {
  /**
   * 具体的数据
   */
  source: DotDensityLayerSourceOptions;
}
