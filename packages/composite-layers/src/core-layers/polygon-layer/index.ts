import { PolygonLayer as L7PolygonLayer } from '@antv/l7-layers';
import { CoreLayer } from '../../core/core-layer';
import { ILayer } from '../../types';
import { PolygonLayerOptions } from './types';

export type { PolygonLayerOptions };

/**
 * 面图层
 * 对应 L7 的 PolygonLayer
 **/
export class PolygonLayer extends CoreLayer<PolygonLayerOptions> {
  public type = 'polygonLayer';

  /**
   * 创建图层
   */
  protected createLayer(): ILayer {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { source, shape, size, ...config } = this.options;
    const layer = new L7PolygonLayer(config);

    return layer;
  }
}
