import { PathLayerOptions } from '../../layers/path-layer';
import { PlotOptions, SourceOptions } from '../../types';

/** 路径图的配置类型定义 */
export interface PathOptions extends Omit<PlotOptions, 'label'>, PathLayerOptions {
  /**
   * 具体的数据
   */
  source: SourceOptions;
}
