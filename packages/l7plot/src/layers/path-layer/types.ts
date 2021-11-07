import { SourceOptions, Source } from '../../types';
import { LinesLayerOptions } from '../lines-layer/types';

export interface PathLayerOptions extends Omit<LinesLayerOptions, 'shape'> {
  /**
   * 具体的数据
   */
  source: SourceOptions | Source;
}
