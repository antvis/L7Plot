import { IHeatMapLayerConfig } from '../../core/layer/interface';
import { Source } from '../../types';

export interface IHeatMapLayerOptions extends IHeatMapLayerConfig {
  source: Source;
}
