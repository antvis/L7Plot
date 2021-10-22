import { DotLayerOptions } from '../../layers/dot-layer/types';
import { PlotOptions, SourceOptions } from '../../types';

/** 散点图的配置类型定义 */
export interface DotOptions extends PlotOptions, DotLayerOptions {
  /**
   * 具体的数据
   */
  source: SourceOptions;
}
