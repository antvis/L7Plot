import { deepAssign } from '../../utils';
import { LinesLayer } from '../lines-layer';
import { ConnectionLayerOptions } from './types';

export type { ConnectionLayerOptions };

export class ConnectionLayer extends LinesLayer<ConnectionLayerOptions> {
  /**
   * 图层类型
   */
  public type = LinesLayer.LayerType.ConnectionLayer;

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<ConnectionLayerOptions> {
    return deepAssign({}, LinesLayer.DefaultOptions, {
      shape: 'arc3d',
    });
  }
}
