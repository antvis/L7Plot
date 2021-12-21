import { ShapeAttr, Source, SourceOptions } from '../../types';
import { DotLayerOptions } from '../dot-layer/types';

export interface IconLayerOptions extends DotLayerOptions {
  /**
   * 具体的数据
   */
  source: SourceOptions | Source;
  /**
   * 图标形状
   */
  shape: ShapeAttr<string>;
}
