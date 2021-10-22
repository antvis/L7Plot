import { LinesLayerConfig } from '../../types/layer';
import { SourceOptions, Source } from '../../types';

export interface LinesLayerOptions extends LinesLayerConfig {
  /**
   * 具体的数据
   */
  source: SourceOptions | Source;
}
