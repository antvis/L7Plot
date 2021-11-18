import { deepAssign } from '../../utils';
import { DotLayer } from '../dot-layer';
import { DotDensityLayerOptions } from './types';

export type { DotDensityLayerOptions };

const LAYER_OPTIONS_KEYS = ['color', 'size', 'style', 'state', 'animate'];

export class DotDensityLayer extends DotLayer<DotDensityLayerOptions> {
  /**
   * 图层配置项 Keys
   */
  static LayerOptionsKeys = DotLayer.LayerConfigkeys.concat(LAYER_OPTIONS_KEYS);
  /**
   * 图层类型
   */
  public type = DotLayer.LayerType.DotDensity;
  /**
   * 图层是否具有交互属性
   */
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
