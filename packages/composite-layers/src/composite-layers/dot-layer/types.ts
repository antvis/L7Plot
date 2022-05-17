import { PointLayerOptions, PointLayerStyleOptions } from '../../core-layers/point-layer/types';
import { CompositeLayerOptions } from '../../core/composite-layer';
import { ISource, SourceOptions } from '../../types';

export interface DotLayerOptions extends PointLayerOptions, CompositeLayerOptions {
  /**
   * 具体的数据
   */
  source: SourceOptions | ISource;
  /**
   * 图层样式
   */
  style?: PointLayerStyleOptions;
}
