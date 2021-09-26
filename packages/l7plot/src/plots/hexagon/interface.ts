import { IPlotOptions } from '../../types';
import { IHexagonLayerOptions, ISource } from '../../layers/hexagon-layer/interface';

/** 蜂窝图的配置类型定义 */
export interface HexagonOptions extends IPlotOptions, IHexagonLayerOptions {
  /**
   * 具体的数据
   */
  source: ISource;
}
