import { TextLayerConfig } from '../../types/layer';
import { SourceOptions, Source } from '../../types';

export interface TextLayerOptions extends TextLayerConfig {
  /**
   * 具体的数据
   */
  source: SourceOptions | Source;
}
