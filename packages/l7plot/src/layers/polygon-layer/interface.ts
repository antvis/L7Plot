import { IPolygonLayerConfig } from '../../core/layer/interface';
import { Source } from '../../types';

export interface IPolygonLayerOptions extends IPolygonLayerConfig {
  source: Source;
}
