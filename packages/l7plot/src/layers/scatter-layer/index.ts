import { deepAssign } from '../../utils';
import { DotLayer } from '../dot-layer';
import { IScatterLayerOptions } from './interface';

export class ScatterLayer extends DotLayer<IScatterLayerOptions> {
  public type = 'scatterLayer';

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<IScatterLayerOptions> {
    return deepAssign({}, DotLayer.DefaultOptions, {
      shape: 'circle',
      size: 5,
    });
  }
}
