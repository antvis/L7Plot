import { RasterLayer as L7RasterLayer } from '@antv/l7-layers';
import { CoreLayer } from '../../core/core-layer';
import { ILayer } from '../../types';
import { RasterLayerOptions } from './types';

/**
 * 点图层
 * 对应 L7 的 PointLayer
 **/
export class RasterLayer extends CoreLayer<RasterLayerOptions> {
  public type = 'rasterLayer';

  /**
   * 创建图层
   */
  protected createLayer(): ILayer {
    const config = this.getLayerConfig();
    const layer = new L7RasterLayer(config);

    return layer;
  }
}
