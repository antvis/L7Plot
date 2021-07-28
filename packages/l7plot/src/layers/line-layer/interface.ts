import { ILineLayerConfig } from '../../core/layer/interface';
import { Source } from '../../types';

export interface ILineLayerOptions extends ILineLayerConfig {
  source: Source;
}
