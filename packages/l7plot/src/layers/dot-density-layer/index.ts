import { deepAssign } from '../../utils';
import { DotLayer } from '../dot-layer';
import { DotDensityLayerOptions } from './types';

export type { DotDensityLayerOptions };

export class DotDensityLayer extends DotLayer<DotDensityLayerOptions> {
  public type = DotLayer.LayerType.DotDensity;
  public interaction = false;

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<DotDensityLayerOptions> {
    return deepAssign({}, DotLayer.DefaultOptions, {
      shape: 'dot',
      size: 1,
    });
  }
}
