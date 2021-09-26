import { deepAssign } from '../../utils';
import { DotLayer } from '../dot-layer';
import { IColumnLayerOptions } from './interface';

export type { IColumnLayerOptions };

export class ColumnLayer extends DotLayer<IColumnLayerOptions> {
  public type = DotLayer.LayerType.ColumnLayer;

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<IColumnLayerOptions> {
    return deepAssign({}, DotLayer.DefaultOptions, {
      shape: 'cylinder',
    });
  }
}
