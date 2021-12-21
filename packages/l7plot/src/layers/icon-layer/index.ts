import { deepAssign } from '../../utils';
import { DotLayer } from '../dot-layer';
import { IconLayerOptions } from './types';

export type { IconLayerOptions };

export class IconLayer extends DotLayer<IconLayerOptions> {
  /**
   * 图层类型
   */
  public type = DotLayer.LayerType.IconLayer;

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<IconLayerOptions> {
    return deepAssign({}, DotLayer.DefaultOptions, {
      color: undefined,
    });
  }
}
