import { IAreaLayerOptions, ISource } from '../../layers/area-layer/interface';
import { IPlotOptions } from '../../types';

/** 区域图的配置类型定义 */
export interface ChoroplethOptions extends IPlotOptions, IAreaLayerOptions {
  /**
   * 具体的数据
   */
  source: ISource;
}
