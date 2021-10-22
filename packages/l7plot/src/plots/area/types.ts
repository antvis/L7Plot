import { AreaLayerOptions, AreaLayerSourceOptions } from '../../layers/area-layer/types';
import { PlotOptions } from '../../types';

/** 区域图的配置类型定义 */
export interface AreaOptions extends PlotOptions, AreaLayerOptions {
  /**
   * 具体的数据
   */
  source: AreaLayerSourceOptions;
}
