import { deepAssign } from '../../utils';
import { LinesLayer } from '../lines-layer';
import { PathLayerOptions } from './types';

export type { PathLayerOptions };

const LAYER_OPTIONS_KEYS = ['color', 'size', 'style', 'state', 'animate'];

export class PathLayer extends LinesLayer<PathLayerOptions> {
  /**
   * 图层配置项 Keys
   */
  static LayerOptionsKeys = LinesLayer.LayerConfigkeys.concat(LAYER_OPTIONS_KEYS);
  /**
   * 图层类型
   */
  public type = LinesLayer.LayerType.PathLayer;

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<PathLayerOptions> {
    return deepAssign({}, LinesLayer.DefaultOptions, {
      shape: 'line',
    });
  }
}
