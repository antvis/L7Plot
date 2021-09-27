import { IAreaLayerOptions, ISource } from '../../layers/area-layer/interface';
import { IPlotOptions } from '../../types';

/** 中国行政区域图的配置类型定义 */
export interface ChinaDistrictOptions extends IPlotOptions, IAreaLayerOptions {
  /**
   * 具体的数据
   */
  source: ISource;
  /**
   * 初始化行政级别
   */
  initialLevel: 'china' | 'region' | 'province' | 'city' | 'county';
  /**
   * 初始化显示行政名称
   */
  initialAdname?: string;
  /**
   * 初始化行政范围代码
   */
  initialAdcode?: number;
}
