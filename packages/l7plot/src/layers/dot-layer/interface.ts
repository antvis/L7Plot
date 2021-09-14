import { IPointLayerConfig } from '../../types/layer';
import { ISource, Source } from '../../types';

export interface IDotLayerOptions extends IPointLayerConfig {
  /**
   * 具体的数据
   */
  source: ISource | Source;
}
