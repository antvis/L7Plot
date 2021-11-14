import { PlotOptions } from '../../types';
import { HexbinLayerOptions, HexbinLayerSourceOptions } from '../../layers/hexbin-layer/types';

/** 蜂窝图的配置类型定义 */
export interface HexbinOptions extends PlotOptions, HexbinLayerOptions {
  /**
   * 具体的数据
   */
  source: HexbinLayerSourceOptions;
}
