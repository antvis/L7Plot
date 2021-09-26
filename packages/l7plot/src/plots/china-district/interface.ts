import { IAreaLayerOptions, ISource } from '../../layers/area-layer/interface';
import { IPlotOptions } from '../../types';

/** 中国行政区域图的配置类型定义 */
export interface ChinaDistrictOptions extends IPlotOptions, IAreaLayerOptions {
  /**
   * 具体的数据
   */
  source: ISource;
}
