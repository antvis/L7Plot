import { IHeatmapLayerConfig } from '../../core/layer/interface';
import { Source } from '../../types';

export interface IHeatmapLayerOptions extends IHeatmapLayerConfig {
  source: Source;
}
