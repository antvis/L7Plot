import { PointLayerConfig } from '../../types/layer';
import { SourceOptions, Source } from '../../types';

export interface DotLayerOptions extends PointLayerConfig {
  /**
   * 具体的数据
   */
  source: SourceOptions | Source;
}
