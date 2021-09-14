import { deepAssign } from '../../utils';
import { DotLayer } from '../dot-layer';
import { IColumnLayerOptions } from './interface';

export class ColumnLayer extends DotLayer<IColumnLayerOptions> {
  public type = 'columnLayer';

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<IColumnLayerOptions> {
    return deepAssign({}, DotLayer.DefaultOptions, {
      shape: 'cylinder',
    });
  }
}
