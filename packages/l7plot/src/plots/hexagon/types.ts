import { PlotOptions } from '../../types';
import { HexagonLayerOptions, HexagonLayerSourceOptions } from '../../layers/hexagon-layer/types';

/** 蜂窝图的配置类型定义 */
export interface HexagonOptions extends PlotOptions, HexagonLayerOptions {
  /**
   * 具体的数据
   */
  source: HexagonLayerSourceOptions;
}
