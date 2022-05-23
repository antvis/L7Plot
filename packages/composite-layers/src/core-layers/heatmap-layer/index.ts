import { HeatmapLayer as L7HeatmapLayer } from '@antv/l7-layers';
import { CoreLayer } from '../../core/core-layer';
import { ILayer } from '../../types';
import { HeatmapLayerOptions } from './types';

/**
 * 热力图层
 * 对应 L7 的 HeatmapLayer
 **/
export class HeatmapLayer extends CoreLayer<HeatmapLayerOptions> {
  public type = 'heatmapLayer';

  /**
   * 创建图层
   */
  protected createLayer(): ILayer {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { source, shape, size, ...config } = this.options;
    const layer = new L7HeatmapLayer(config);

    return layer;
  }
}
