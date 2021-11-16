import { deepAssign } from '../../utils';
import { LinesLayer } from '../lines-layer';
import { FlowLayerOptions } from './types';

export type { FlowLayerOptions };

export class FlowLayer extends LinesLayer<FlowLayerOptions> {
  /**
   * 图层类型
   */
  public type = LinesLayer.LayerType.FlowLayer;

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<FlowLayerOptions> {
    return deepAssign({}, LinesLayer.DefaultOptions, {
      shape: 'arc3d',
    });
  }
}
