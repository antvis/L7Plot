import { ILineLayerConfig } from '../../types/layer';
import { ISource, Source } from '../../types';

export interface ILineLayerOptions extends ILineLayerConfig {
  /**
   * 具体的数据
   */
  source: ISource | Source;
}
