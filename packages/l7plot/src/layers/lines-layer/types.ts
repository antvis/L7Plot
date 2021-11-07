import { LinesLayerConfig } from '../../types/layer';
import { ISourceCFG, Source } from '../../types';

/**
 * 数据配置
 */
export interface LinesLayerSourceOptions extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  data: any;
}

export interface LinesLayerOptions extends LinesLayerConfig {
  /**
   * 具体的数据
   */
  source: LinesLayerSourceOptions | Source;
}
