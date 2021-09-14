import { ILabelLayerConfig } from '../../types/layer';
import { ISource, Source } from '../../types';

export interface ILabelLayerOptions extends ILabelLayerConfig {
  /**
   * 具体的数据
   */
  source: ISource | Source;
}
