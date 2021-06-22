import { ILabelLayerConfig } from '../../core/layer/interface';
import { Source } from '../../types';

export interface ILabelLayerOptions extends ILabelLayerConfig {
  source: Source;
}
