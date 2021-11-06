import { PolygonLayerConfig } from '../../types/layer';
import { ISourceCFG, Source } from '../../types';

/**
 * 数据配置
 */
export interface PrismLayerSourceOptions extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  data: any;
}

export interface PrismLayerOptions extends Omit<PolygonLayerConfig, 'shape'> {
  /**
   * 具体的数据
   */
  source: PrismLayerSourceOptions | Source;
}
