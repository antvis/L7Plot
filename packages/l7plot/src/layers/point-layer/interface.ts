import { IPointLayerConfig } from '../../core/layer/interface';
import { Source } from '../../types';

export interface IPointLayerOptions extends IPointLayerConfig {
  source: Source;
}
