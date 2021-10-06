import { ILinesLayerConfig } from '../../types/layer';
import { ISource, Source } from '../../types';

export interface ILinesLayerOptions extends ILinesLayerConfig {
  /**
   * 具体的数据
   */
  source: ISource | Source;
}
