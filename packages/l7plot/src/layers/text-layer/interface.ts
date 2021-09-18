import { ITextLayerConfig } from '../../types/layer';
import { ISource, Source } from '../../types';

export interface ITextLayerOptions extends ITextLayerConfig {
  /**
   * 具体的数据
   */
  source: ISource | Source;
}
