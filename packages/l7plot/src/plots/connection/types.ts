import { PathLayerOptions } from '../../layers/path-layer';
import { PlotOptions, SourceOptions } from '../../types';

/** 连接图的配置类型定义 */
export interface ConnectionOptions extends Omit<PlotOptions, 'label'>, PathLayerOptions {
  /**
   * 具体的数据
   */
  source: SourceOptions;
}
