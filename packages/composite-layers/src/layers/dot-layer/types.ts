import { CompositeLayerOptions } from '../../core/composite-layer';
import { SourceOptions, Source, PointLayerConfig } from '../../types';

export interface DotLayerOptions extends PointLayerConfig, CompositeLayerOptions {
  /**
   * 具体的数据
   */
  source: SourceOptions | Source;
}
