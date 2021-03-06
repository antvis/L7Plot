import { ArcLineShape } from '../../types';
import { LinesLayerOptions } from '../lines-layer/types';

export interface ArcLayerOptions extends LinesLayerOptions {
  /**
   * 图形形状
   */
  shape?: ArcLineShape;
}
