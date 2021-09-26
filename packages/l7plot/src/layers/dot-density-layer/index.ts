import { deepAssign } from '../../utils';
import { DotLayer } from '../dot-layer';
import { IDotDensityLayerOptions } from './interface';

export type { IDotDensityLayerOptions };

export class DotDensityLayer extends DotLayer<IDotDensityLayerOptions> {
  public type = DotLayer.LayerType.DotDensity;
  public interaction = false;

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<IDotDensityLayerOptions> {
    return deepAssign({}, DotLayer.DefaultOptions, {
      shape: 'dot',
      size: 1,
    });
  }
}
