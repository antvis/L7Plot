import { IDotLayerOptions } from '../../layers/dot-layer/interface';
import { IPlotOptions, ISource } from '../../types';

/** 点地图的配置类型定义 */
export interface DotOptions extends IPlotOptions, IDotLayerOptions {
  /**
   * 具体的数据
   */
  source: ISource;
}
