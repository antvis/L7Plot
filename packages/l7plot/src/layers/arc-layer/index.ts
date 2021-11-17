import { deepAssign } from '../../utils';
import { LinesLayer } from '../lines-layer';
import { ArcLayerOptions } from './types';

export type { ArcLayerOptions };

export class ArcLayer extends LinesLayer<ArcLayerOptions> {
  /**
   * 图层类型
   */
  public type = LinesLayer.LayerType.ArcLayer;

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<ArcLayerOptions> {
    return deepAssign({}, LinesLayer.DefaultOptions, {
      shape: 'arc',
    });
  }
}
