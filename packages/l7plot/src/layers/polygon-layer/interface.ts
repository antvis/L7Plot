import { IPolygonLayerConfig } from '../../types/layer';
import { ISource, Source } from '../../types';

export interface IPolygonLayerOptions extends IPolygonLayerConfig {
  /**
   * 具体的数据
   */
  source: ISource | Source;
}
