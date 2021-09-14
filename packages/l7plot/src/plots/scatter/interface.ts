import { IPlotOptions } from '../../types';
import { IScatterLayerOptions, ISource } from '../../layers/scatter-layer/interface';

/** 散点图的配置类型定义 */
export interface ScatterOptions extends IPlotOptions, IScatterLayerOptions {
  /**
   * 具体的数据
   */
  source: ISource;
}
