import { deepAssign } from '../../utils';
import { DotLayer } from '../dot-layer';
import { ColumnLayerOptions } from './types';

export type { ColumnLayerOptions };

export class ColumnLayer extends DotLayer<ColumnLayerOptions> {
  /**
   * 图层类型
   */
  public type = DotLayer.LayerType.ColumnLayer;

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<ColumnLayerOptions> {
    return deepAssign({}, DotLayer.DefaultOptions, {
      shape: 'cylinder',
    });
  }
}
